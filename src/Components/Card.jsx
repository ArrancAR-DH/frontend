import { Link } from "react-router-dom";
import utils from "../functions/utils.js";
import { FaHeart } from "react-icons/fa";
import { useContextGlobal } from "../Context/GlobalContext.jsx";

const Card = ({ car, isFav, handleRemoveSingle, key }) => {
  const { state, likeVehicle, dislikeVehicle, giveLike } = useContextGlobal();


  const userLike = giveLike(); 
 
  const handleLike = async () => {
    const isAlreadyLiked = state.likes.includes(car.idVehicle);

    if (isAlreadyLiked) {
      await dislikeVehicle(car.idVehicle);
      alert("Este vehículo ha sido eliminado de tu lista de favoritos.");
    } else {
      await likeVehicle(car.idVehicle);
      alert("El vehículo se agregó satisfactoriamente a tu lista de favoritos.");
    }

     console.log("car.idVehicle: " + car.idVehicle);
  };

  const isLiked = state.likes.includes(car.idVehicle);

  return (
    <>
      <div className="car__card" id={car.idVehicle}>
        <img src={car.imgUrls?.[0]?.url} alt={"main-image"} />
        <div className="card__car__information ">
          <h4>{car.brand.name}</h4>
          <Link to={`/cars/${car.idVehicle}`}>
            <p>{car.model.name}</p>
            <p>${utils.convertirPrecioIntAPesosStr(car.price)} ARS</p>
          </Link>
          {/* ------VER CON TOMI-------------- */}
          {/* {isFav ? (
            <button className="button" onClick={() => handleRemoveSingle(car.idVehicle)}>
              Eliminar favorito ❌
            </button>
          ) : (
            <button
              className={`container__heart ${isLiked ? "liked" : ""}`}
              onClick={handleLike}
            >
              <FaHeart className="heart" />
            </button>
          )} */}
          {/* ------VER CON TOMI-------------- */}
          {userLike? (
              <button className={`container__heart ${isLiked ? "liked" : ""}`} onClick={handleLike}>
                  <FaHeart className="heart" />
              </button>
                ): ("")}
        </div>
      </div>
    </>
  );
};

export default Card;