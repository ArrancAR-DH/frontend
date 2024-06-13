import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import utils from "../functions/utils.js";
import { useContextGlobal } from '../Context/GlobalContext.jsx'
import { FaHeart } from "react-icons/fa";
import { FaShapes } from "react-icons/fa6";
import { PiCube } from "react-icons/pi";
import { SiRoundcube } from "react-icons/si";
import { FaBoxOpen } from "react-icons/fa";
import { MdOutlinePlaylistAddCheckCircle } from "react-icons/md";
import { FiAlertCircle } from "react-icons/fi";
import DateRangePicker from "../Components/DateRangePicker.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { carReserved } from "../utils/modals.js";


const Detail = () => {
  const { id } = useParams();
  const { state, likeVehicle, dislikeVehicle } = useContextGlobal();
  const [car, setCar] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/vehicle/${id}`).then((res) => {
      setCar(res.data);
    });
  }, []);

      const handleLike = async () => {
            const isAlreadyLiked = state.likes.includes(car.idVehicle);
            if (isAlreadyLiked) {
                  await dislikeVehicle(car.idVehicle);
                  // alert("Este vehículo ha sido eliminado de tu lista de favoritos.");
            } else {
                  await likeVehicle(car.idVehicle);
                  // alert("El vehículo se agregó satisfactoriamente a tu lista de favoritos.");
            }
            console.log("car.idVehicle: " + car.idVehicle);
      };

      const isLiked = state.likes.includes(car.idVehicle);

      console.log(car);

      return (
            <div className="detail__container">
                  <h2>Vehículo seleccionado:</h2>
                  <div className='selected__car__detail__container'>
                        <img src={car.imgUrls?.[0]?.url} />
                        <div className='detalles__container'>
                              <div className="descripciones">
                                    <h2>
                                          <button className={`container__heart ${isLiked ? "liked" : ""}`} onClick={handleLike}>
                                                <FaHeart className="heart" />
                                          </button>
                                          {car.brand?.name} {car.model?.name}
                                    </h2>
                                    <p>{car.reserved ? "Reservado" : "Disponible"}</p>
                                    <p>{car.description}</p>
                                    <p>${utils.convertirPrecioIntAPesosStr(car.price)} ARS</p>
                                    <Link to={`/cars/${id}/images`}>Ver más imágenes</Link>
                              </div>
                              <div className="features__container">
                                    <h3>Características</h3>
                                    <div className="items__frame">
                                          <div><FiAlertCircle />&nbsp;&nbsp;{car.brand?.name}</div>
                                          <div><MdOutlinePlaylistAddCheckCircle />&nbsp;&nbsp;{car.model?.name}</div>
                                          <div><FaShapes />&nbsp;&nbsp;{car.type?.name}</div>
                                    </div>
                              </div>
                              <DateRangePicker />
                        </div>
                  </div>
            </div>
      )
}
export default Detail
