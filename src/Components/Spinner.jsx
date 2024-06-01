import React from "react";
import aguja from "../assets/arrancar-aguja.png";
import velocimetro from "../assets/arrancar-velocimetro.png";
const Spinner = () => {
  return (
    <>
      <div class="block">
        <img class="img-agu" src={aguja} />
        <img class="img-vel" src={velocimetro} />
      </div>
      <div class="block-fantasy">
        <div class="img-fantasy"></div>
        <div class="mensaje">Loading...</div>
      </div>
    </>
  );
};

export default Spinner;
