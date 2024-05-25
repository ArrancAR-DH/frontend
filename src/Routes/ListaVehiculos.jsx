import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import trashCan from "../assets/trash-solid.svg"
import pencil from "../assets/pencil-solid.svg"

const ListaVehiculos = () => {
  function deleteVehiculo(id) {
    if (confirm("¿Estás seguro que deseas eliminar este vehículo?") === false)
      return;
    setCars(cars.filter((car) => car.idVehicle !== id));
    axios
      .delete("http://localhost:8080/vehicle/delete/" + id)
      .then((response) => {
        console.log(response);
      });
  }

  const [cars, setCars] = useState([]);
  console.log(cars);
  const { imgUrls } = cars;
  useEffect(() => {
    axios.get("http://localhost:8080/vehicle/all").then((res) => {
      setCars(res.data);
    });
  }, []);

  return (
    <div className="lista__vehiculos__container">
      <h2 className="title__admin">Administración</h2>
      <div className="phone__error">
        <h1>No se puede ingresar con un teléfono móvil</h1>
        <h2>Por favor, vuelva a intentar desde una computadora.</h2>
      </div>
      <div className="titulos__categorias">
        <h3>Image</h3>
        <h3>ID</h3>
        <h3>Marca</h3>
        <h3>Modelo</h3>
        <h3>Tipo</h3>
        <h3>Acción</h3>
      </div>
      {cars.map((car, key) => {
        return (
          <div className="vehiculo__container">
            <img className="img-history" src={car.imgUrls?.[0]?.url} alt="" key={key}/>
            <h4>{car.idVehicle}</h4>
            <h4>{car.brand.name}</h4>
            <p>{car.model.name}</p>
            <h4>{car.type.name}</h4>
            <div className="container__buttons">
              <button onClick={() => deleteVehiculo(car.idVehicle)}>
                <img src={trashCan} />
              </button>
              <button onClick={() => alert("Sitio en desarrollo")}>
                <img src={pencil} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ListaVehiculos;
