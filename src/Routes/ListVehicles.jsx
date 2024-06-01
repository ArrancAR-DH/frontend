import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStorage } from "../Context/StorageContext";

import axios from "axios";
import trashCan from "../assets/trash-solid.svg"
import pencil from "../assets/pencil-solid.svg"
import EditVehicleOverlay from "../Components/EditVehicleOverlay";
import AdministracionPhoneError from "../Components/Phone Error/AdministracionPhoneError";

const ListVehicles = () => {
    const { getToken } = useStorage();
    const token = getToken();
    const [loader, setLoader] = useState(true);

    function deleteVehiculo(id) {
        if (vehicleBeingEdited)
            return
        if (confirm("¿Estás seguro que deseas eliminar este vehículo?") === false)
            return;

        axios.delete("http://localhost:8080/vehicle/delete/" + id, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Basic ' + token,
            }
        })
            .then((response) => {
                setCars(cars.filter((car) => car.idVehicle !== id));
                console.log(response);
            })
            .catch((error) => console.log(error));
    }

    const [vehicleBeingEdited, setVehicleBeingEdited] = useState(false);
    function editVehicle(car) {
        if (vehicleBeingEdited)
            return

        setVehicleBeingEdited(car);
    }

    const [cars, setCars] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/vehicle/all").then((res) => {
            setCars(res.data);
        });
    }, []);

    useEffect(() => {
        setTimeout(() => {
          setLoader(false);
        }, 780);
      }, []);
    return (
        <>
       {loader ?  <p className="loader">Loading....</p> :
        <div className="lista__vehiculos__container">
            <Link to={`/administracion`}><h3>Volver</h3></Link>
            <h2 className="title__admin">Administración</h2>
            <div className="administracion__funciones">
                <div className="titulos__categorias">
                    <h3>Image</h3>
                    <h3>ID</h3>
                    <h3>Marca</h3>
                    <h3>Modelo</h3>
                    <h3>Tipo</h3>
                    <h3>Acción</h3>
                </div>
                {cars.map((car, index) => {
                    return (
                        <div className="vehiculo__container" key={index}>
                            <img className="img-history" src={car.imgUrls?.[0]?.url} alt="" />
                            <h4>{car.idVehicle}</h4>
                            <h4>{car.brand.name}</h4>
                            <p>{car.model.name}</p>
                            <h4>{car.type.name}</h4>
                            <div className="container__buttons">
                                <button onClick={() => deleteVehiculo(car.idVehicle)}>
                                    <img src={trashCan} />
                                </button>
                                <button onClick={() => editVehicle(car)}>
                                    <img src={pencil} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            {vehicleBeingEdited && <EditVehicleOverlay vehicle={vehicleBeingEdited} setVehicleBeingEdited={setVehicleBeingEdited} setCars={setCars} />}
            <AdministracionPhoneError />
        </div>
        }
        </>
    );
};

export default ListVehicles;
