import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import ArrancARLogo from "../assets/logo-light-transparente.png";
import { Link } from "react-router-dom";
import Pagination from "../Components/Pagination";
import backgroundImage from "../assets/rental-cars-image.png"
import Spinner from "../Components/Spinner";
import { useContextGlobal } from "../Components/utils/global.context";


const URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const { state } = useContextGlobal();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const [loader, setLoader] = useState(true);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = state.data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(state.data.length / recordsPerPage);

  console.log(state);
  const onFormSubmit = (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    window.location.href = `/search/${text}`;
  };
  
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 780);
  }, []);

  return (
    <>
       {loader ? <Spinner/> :  <div className="container__home">
        <div className="left__column">
          <img src={backgroundImage} alt="" className="background__image" />
          <div className="info">
            <img src={ArrancARLogo} alt="" />
            <h1>
              Bienvenido a Arranc<span className="span__primary__color">AR</span>!
            </h1>
            <h3>Donde cada viaje empieza.</h3>
            <Link to="/search/">
              <button>Ver todos los autos 🔎</button>
            </Link>
          </div>
        </div>
        <div className="right__column">
          <form className="search" onSubmit={onFormSubmit}>
            <input placeholder="Buscar autos..." type="text" />
            <button type="submit">
              Buscar 🔎
            </button>
          </form>
          <div className="container__cars__showcase">
            {currentRecords.map((car, key) => {
              return (
                <Card car={car} key={car.idVehicle} className="car__card" />
                // <Card car={car} key={key} className="car__card" />
              );
            })}
          </div>
          <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
      </div>}
    </>
  );
};
export default Home;
