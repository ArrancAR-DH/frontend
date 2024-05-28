import React from "react";
import { useState, useEffect} from "react";
import { Link } from "react-router-dom";




import axios from "axios";
import trashCan from "../assets/trash-solid.svg"
import pencil from "../assets/pencil-solid.svg"
import EditVehicleOverlay from "../Components/EditVehicleOverlay";
import AdministracionPhoneError from "../Components/Phone Error/AdministracionPhoneError";

const ListVehicles = () => {
    function deleteVehiculo(id) {
        if (vehicleBeingEdited)
            return

        if (confirm("¿Estás seguro que deseas eliminar este vehículo?") === false)
            return;
        setCars(cars.filter((car) => car.idVehicle !== id));
        axios
            .delete("http://localhost:8080/vehicle/delete/" + id)
            .then((response) => {
                console.log(response);
            });
    }

    const [vehicleBeingEdited, setVehicleBeingEdited] = useState(false);
    function editVehicle(car) {
        if (vehicleBeingEdited)
            return

        setVehicleBeingEdited(car);
    }

    const [cars, setCars] = useState([]);
    console.log(cars);
    useEffect(() => {
        axios.get("http://localhost:8080/vehicle/all").then((res) => {
            setCars(res.data);
        });
    }, []);

    return (
        
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
            {vehicleBeingEdited && <EditVehicleOverlay vehicle={vehicleBeingEdited} setVehicleBeingEdited={setVehicleBeingEdited} />}
            <AdministracionPhoneError />
        </div>
    );
};

export default ListVehicles;
