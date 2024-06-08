import React, { useState } from "react";
import Card from "../Components/Card";
import { useContextGlobal } from "../Context/GlobalContext";

const Favs = () => {
  const { state } = useContextGlobal();
   const { data, likes } = state;
  const dataCars = [];
  
  
  data.forEach((element) => {
    if (likes.includes(element.idVehicle)) {
      dataCars.push(element);
    }
  });

  return (
    <>
      <h1>Destacados</h1>
      <div className="card__grid">
        {dataCars.map((car) => (
          <Card car={car} key={car.idVehicle} className="car__card"/>
        ))}
      </div>
      {state.likes.length === 0 && (
        <p>Ud. no tiene favoritos agregados aún!</p>
      )}
    </>
  );
};

export default Favs;