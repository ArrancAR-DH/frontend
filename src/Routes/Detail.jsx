import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import utils from "../functions/utils.js";
import { useContextGlobal } from "../Context/GlobalContext.jsx";
import { FaHeart } from "react-icons/fa";
import { FaShapes } from "react-icons/fa6";
import { PiCube } from "react-icons/pi";
import { SiRoundcube } from "react-icons/si";
import { FaBoxOpen } from "react-icons/fa";
import { MdOutlinePlaylistAddCheckCircle } from "react-icons/md";
import { FiAlertCircle } from "react-icons/fi";
import DateRangePicker from "../Components/DateRangePicker.jsx";

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
      alert("Este vehículo ha sido eliminado de tu lista de favoritos.");
    } else {
      await likeVehicle(car.idVehicle);
      alert(
        "El vehículo se agregó satisfactoriamente a tu lista de favoritos."
      );
    }
  };

  const isLiked = state.likes.includes(car.idVehicle);
  return (
    <>
      <div className="detail__container">
        <h2 className="detail__title">Vehículo seleccionado:</h2>
        <div className="selected__car__detail__container">
          <img src={car.imgUrls?.[0]?.url} />
          <div className="imagen__y__detalles__container">
            <div className="card__car__information ">
              <div></div>
              <button
                className={`container__heart ${isLiked ? "liked" : ""}`}
                onClick={handleLike}>
                <FaHeart className="heart" />
              </button>
            </div>
            <div className="details_container">
              <h2>{car.brand?.name} {car.model?.name}</h2>
              <p>${utils.convertirPrecioIntAPesosStr(car.price)} ARS</p>
              <br />
              {/* <p>{car.reserved ? "Reservado" : "Disponible"}</p> */}
              <p className="details_paraghrap">{car.description}</p>
            </div>
            <DateRangePicker />
            <button className="btn">Reservar</button>
          </div>
        </div>
        <div className="features__container">
          <div className="features__frame">
            <h3>Características</h3>
            <div className="items__frame">
              <div>
                <FiAlertCircle />
                &nbsp;&nbsp;{car.brand?.name}
              </div>
              <div>
                <MdOutlinePlaylistAddCheckCircle />
                &nbsp;&nbsp;{car.model?.name}
              </div>
              <div>
                <FaShapes />
                &nbsp;&nbsp;{car.type?.name}
              </div>
            </div>
            <Link to={`/cars/${id}/images`} id="detail_link">
              Ver más imágenes
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Detail;
