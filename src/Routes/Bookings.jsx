import React from "react";
import { routes } from "../utils/routes";
// import axios from "axios";
// import trashCan from "../assets/trash-solid.svg";
// import { useContextGlobal } from "../Context/GlobalContext";



// import BackButton from "../Components/BackButton/BackButton.jsx";

const Bookings = () => {
  // const { state, getToken } = useContextGlobal();
  // const token = getToken();
  // const [cars, setCars] = useState([state.data]);

console.log(routes.booking)

//   function deleteBooking(id) {
//     if (confirm("¿Estás seguro que deseas eliminar esta reserva?") === false)
//         return;

//     axios.delete(`${routes.url_deleteBooking}/` + id, {
//         headers: {
//             "Content-Type": "application/json",
//             'Authorization': 'Basic ' + token,
//         }
//     })
//         .then((response) => {
//             setCars(cars.filter((car) => car.idVehicle !== id));
//             console.log(response);
//         })
//         .catch((error) => console.log(error));
// }

  return (
    <div>Bookings</div>
  )
}

export default Bookings