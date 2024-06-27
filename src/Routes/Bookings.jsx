import React, { useEffect, useState } from "react";
import { useContextGlobal } from "../Context/GlobalContext";
import trashCan from "../assets/trash-solid.svg";
import axios from "axios";
import { routes } from "../utils/routes";
import { ToastContainer } from "react-toastify";
import { bookingDeleted } from "../utils/modals";
import BackButton from "../Components/BackButton/BackButton";



const Bookings = () => {
  const { state, getToken } = useContextGlobal();
  const token = getToken();
  const [bookings, setBookings] = useState([]);
  const [book, setBook] = useState(false);
  const id = state.idUser;

  useEffect(() => {
    axios.get(`${routes.url_getUserBookingsById}/${id}/bookings`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + token,
        },
      })
      .then((response) => {
        setBookings(response.data);
        response.data.length >0 ? setBook(true) : setBook(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state]);
   
  function handleClick(id) {
    if (confirm("¿Estás seguro que deseas eliminar este vehículo?") === false)
      return;

    axios.delete(`${routes.url_deleteBooking}/` + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + token,
        },
      })
      .then((response) => {
        setBookings(bookings.filter((book) => book.idBooking !== id));
        bookingDeleted(); 
        // window.location.reload(); 
      })
      .catch((error) => console.log(error));

  }

  return (
    <>
      <div className="list__bookings__container">
        <BackButton />
        <h2 className="title__admin">Detalle de reservas</h2>
  {book && (
    <div className="administracion__funciones">
          <div className="titulos__bookings">
            <h3>ID Reserva </h3>
            <h3>User</h3>
            <h3>Desde</h3>
            <h3>Hasta</h3>
          </div>
          {bookings.map((car, key) => (
            <div className="booking__container" key={key}>
              <h4>{car.idBooking}</h4>
              <h4>{car.idUser}</h4>
              <h4>{car.startsOn}</h4>
              <h4>{car.endsOn}</h4>
              <div className="container__buttons">
                <button onClick={() => handleClick(car.idBooking)}>
                  <img src={trashCan} alt="delete-image" />
                </button>
              </div>
            </div>
          ))}
        </div> 
)}
     {!book && (
      <p className="render__book">Ud. no tiene reservas agregadas aún!</p>
     )}
           <ToastContainer />
      </div>
    </>
  );
};

export default Bookings;


 