import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import utils from "../functions/utils.js";
import { useContextGlobal } from '../Context/GlobalContext.jsx'
import { FaHeart } from "react-icons/fa";
import DateRangePicker from "../Components/DateRangePicker.jsx";
import "react-toastify/dist/ReactToastify.css";
import ShareRedes from "../Components/ShareRedes.jsx";
import { routes } from "../utils/routes.js";
import BackButton from "../Components/BackButton/BackButton.jsx";
import { FaRegCheckSquare } from "react-icons/fa";

const Detail = () => {
      const { id } = useParams();
      const { state, likeVehicle, dislikeVehicle } = useContextGlobal();
      const [car, setCar] = useState({});
      const shareUrl = routes.url_front + "/cars/" + id;

      useEffect(() => {
            axios.get(`${routes.url_postCar}/${id}`).then((res) => {
                  setCar(res.data);
            });
      }, []);

      const handleLike = async () => {
            const isAlreadyLiked = state.likes.includes(car.idVehicle);
            if (isAlreadyLiked) {
                  await dislikeVehicle(car.idVehicle);
            } else {
                  await likeVehicle(car.idVehicle);
            }
      };

      const isLiked = state.likes.includes(car.idVehicle);

    console.log( "FEATURES" );
    console.log( car.features );
      return (
            <div className="detail__container">
                  <BackButton number={1} />
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
                                    <ShareRedes url={shareUrl} />
                              </div>
                              <div className="features__container">
                                    <h3>Características</h3>
                                    <div className="items__frame">
                                        {
                                            car.features?.map( 
                                                (feature, index) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <div>
                                                                <FaRegCheckSquare />
                                                                &nbsp;&nbsp;{feature.name}
                                                            </div>
                                                        </React.Fragment>
                                                    )
                                                }
                                            )
                                        }
                                    </div>
                              </div>
                              <DateRangePicker bookings={car.bookings} car={car} />
                        </div>
                  </div>
            </div>
      )
}
export default Detail
