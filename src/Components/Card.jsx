import { Link } from "react-router-dom";
import utils from "../functions/utils.js";
import { FaHeart } from "react-icons/fa";
import { useContextGlobal } from "../Context/GlobalContext.jsx";

const Card = ({ car }) => {
    const { state, likeVehicle, dislikeVehicle, giveLike } = useContextGlobal();
    const userLike = giveLike();
    const isLiked = state.likes.includes(car.idVehicle);

    const handleLike = async (e) => {
        e.preventDefault();
        const isAlreadyLiked = state.likes.includes(car.idVehicle);
        if (isAlreadyLiked) {
            await dislikeVehicle(car.idVehicle);
         } else {
            await likeVehicle(car.idVehicle);
         }
    };

    return (
        <Link to={`/cars/${car.idVehicle}`}>
            <div className="car__card" id={car.idVehicle}>
                <div className="car__image">
                    <img src={car.imgUrls?.[0]?.url} alt={"main-image"} />
                    {userLike ? (
                        <button className={`container__heart ${isLiked ? "liked" : ""}`} onClick={handleLike}>
                            <FaHeart className="heart" />
                        </button>
                    ) : ("")}
                </div>
                <div className="card__car__information">
                    <div className="name">
                        <h4>{car.brand.name}</h4>
                        <p>{car.model.name}</p>
                    </div>
                    <p>${utils.convertirPrecioIntAPesosStr(car.price)} ARS</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;
