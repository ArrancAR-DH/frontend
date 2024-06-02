import { Link } from "react-router-dom";
import utils from "../functions/utils.js";
import { FaHeart } from "react-icons/fa";
import { useContextGlobal } from "../Components/utils/global.context.jsx";

const Card = ( {car} ) => {
  const { state } = useContextGlobal();
  return (
    <>
      <div className="car__card" id={car.idVehicle}>
        <img src={car.imgUrls?.[0]?.url} alt={"main-image"} />
        <button className="container__heart">
          <FaHeart className="heart" />
        </button>
        <div className="card__car__information ">
            <h4>{car.brand.name}</h4>
          <Link to={`/cars/${car.idVehicle}`}>
            <p>{car.model.name}</p>
            <p>${utils.convertirPrecioIntAPesosStr(car.price)} ARS</p>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Card;
