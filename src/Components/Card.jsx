import { Link } from "react-router-dom";
import utils from "../functions/utils.js";
import { FaHeart } from "react-icons/fa";
import { useContextGlobal } from "../Context/GlobalContext.jsx";

const Card = ({car, isFav, handleRemoveSingle, key}) => {
  const { state, dispatch } = useContextGlobal();
 


  
  console.log(key);
  
  // const addFav = () => {
  //   const isAlreadyFav = state.favs.some((auto) => auto.idVehicle === car.idVehicle);
  //   if (isAlreadyFav) {
  //     alert("Este vehiculo ya está en la lista de favoritos.");
  //     console.log(isAlreadyFav);
  //   } else {
  //     dispatch({ type: "ADD_FAV", payload: car });
  //     alert("El vehiculo se agrego satisfactoriamente a tu lista.");
  //     console.log(isAlreadyFav);
  //   }
  // };

  const addFav = (index) => {
    if (state.likes.some(value => value.idVehicle === car.id)) {
      console.log(state.likes);

      dispatch({ type: 'DELETE_LIKE', payload: car });
    } else {
      dispatch({ type: 'ADD_LIKE', payload: car });
    }
    console.log(state.likes);
  };



  // const addLike = () => {
  //   const isAlreadyLike = state.likes?.filter((auto) => auto.idVehicle === car.idVehicle);
  //   if (isAlreadyLike) {
  //     alert("Este vehiculo ya está en la lista de favoritos.");

  //   } else {
  //     dispatch({ type: "ADD_FAV", payload: car });
  //     alert("El vehiculo se agrego satisfactoriamente a tu lista.");
  //   }
  // };



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
          {isFav ? (<button className="button" onClick={() => handleRemoveSingle(car.idVehicle)}>
          Eliminar favorito ❌
        </button>
      ) : (
        <button className="container__heart" onClick={addFav}>
        <FaHeart className="heart" />
      </button>
      )}

        </div>
      </div>
    </>
  );
};
export default Card;
