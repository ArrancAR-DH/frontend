import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
const ImageLibrary = () => {
    const { id } = useParams()
    const [car, setCar] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/vehicle/${id}`).then((res) => {
            setCar(res.data);
        });
    }, []);
    return (
        <div className="image__library__container">
            <Link to={`/cars/${car.idVehicle}`}><h3>Volver</h3></Link>
            <div className='library__container'>
                <div className="main__image">
                    <a href={car.imgUrls?.[0]?.url}>
                        <img src={car.imgUrls?.[0]?.url} alt="main-image" />
                    </a>
                </div>
                <div className="secondary__images">
                    {car.imgUrls?.slice(1).map((img) => {
                        if (img.url == '') return
                        return (
                            <a href={img.url} key={img.url}>
                                <img src={img.url} alt="car-image" key={img.id} />
                            </a>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
export default ImageLibrary;


