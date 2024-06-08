import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from "axios";
import utils from "../functions/utils.js";
import { useContextGlobal} from '../Context/GlobalContext.jsx'
import { FaHeart } from "react-icons/fa";

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
          alert("El vehículo se agregó satisfactoriamente a tu lista de favoritos.");
        }    
         console.log("car.idVehicle: " + car.idVehicle);
      };
    
      const isLiked = state.likes.includes(car.idVehicle);


    return (
        <div className="detail__container">
            <h2>Vehículo seleccionado:</h2>
            <div className='selected__car__detail__container'>
                <img src={car.imgUrls?.[0]?.url} />
                <div className='imagen__y__detalles__container'>
                <div className="card__car__information ">
                    <button className={`container__heart ${isLiked ? "liked" : ""}`} onClick={handleLike}>
                  <FaHeart className="heart" />
              </button>
                </div>
                    <h2>{car.brand?.name}</h2>
                    <h3>{car.model?.name}</h3>
                    <p>{car.description}</p>
                    <p>${utils.convertirPrecioIntAPesosStr(car.price)} ARS</p>
                    <p>{car.reserved ? "Reservado" : "Disponible"}</p>
                    <Link to={`/cars/${id}/images`}>Ver más imágenes</Link>
                </div>
            </div>
        </div>
    )
}
export default Detail