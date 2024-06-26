import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import trashCan from "../assets/trash-solid.svg"
import pencil from "../assets/pencil-solid.svg"
import EditVehicleOverlay from "../Components/EditVehicleOverlay";
import AdministracionPhoneError from "../Components/Phone Error/AdministracionPhoneError";
import { useContextGlobal } from "../Context/GlobalContext";
import { routes } from "../utils/routes.js";
import BackButton from "../Components/BackButton/BackButton.jsx";

const ListVehicles = () => {
    const { state, getToken } = useContextGlobal();
    const token = getToken();
    // const {data} = state; 
    const [loader, setLoader] = useState(true);
    const [cars, setCars] = useState([state.data]);
    let allBookings = []; 

    cars.map((value)=>{
        console.log(value);
        value.bookings?.map((all)=>{
            console.log(all);
            allBookings.push(all); 
        })
    })

    allBookings.map((value)=>{
        console.log(value);
    })



    function deleteVehiculo(id) {
        if (vehicleBeingEdited)
            return
        if (confirm("¿Estás seguro que deseas eliminar este vehículo?") === false)
            return;

        axios.delete(`${routes.url_deleteCar}/` + id, {
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
            return setVehicleBeingEdited(car);
    }

    useEffect(() => {
        setCars(state.data);
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 780);
    }, []);

    return (
        <>
            {loader ? <p className="loader">Loading....</p> :
                <div className="lista__vehiculos__container">
                    <BackButton />
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
