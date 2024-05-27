import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import utils from "../functions/utils.js";

const Detail = () => {
    const { id } = useParams();

    const [car, setCar] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:8080/vehicle/${id}`).then((res) => {
            console.log(JSON.stringify(res.data))
            setCar(res.data);
        });
    }, []);

    return (
        <div className="detail__container">
            <h2>Vehículo seleccionado:</h2>
            <div className='selected__car__detail__container'>
                <img src={car.imgUrls?.[0]?.url} />
                <div className='imagen__y__detalles__container'>
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