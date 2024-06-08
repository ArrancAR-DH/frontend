import React from "react";
import aguja from "../assets/arrancar-aguja.png";
import velocimetro from "../assets/arrancar-velocimetro.png";
const Spinner = () => {
  return (
    <>
      <div className="block">
        <img className="img-agu" src={aguja} />
        <img className="img-vel" src={velocimetro} />
      </div>
      <div className="block-fantasy">
        <div className="img-fantasy"></div>
        <div className="mensaje">Loading...</div>
      </div>
    </>
  );
};

export default Spinner;
