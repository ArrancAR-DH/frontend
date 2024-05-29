import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStorage } from "../Context/StorageContext";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const { registerAPICall } = useStorage();
  const [user, setUser] = useState({ name: "", username: "", email: "", password: "", lastName: "" });
  const [error, setError] = useState(false);
  const { name, username, email, password, lastName } = user;
  const navigator = useNavigate();

  const succesMessage = () =>
    toast.success("Registro exitoso!!!", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    const errorMessage = () =>
      toast.error("Verifique los campos!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email) && password.length >= 6 && name.length > 3) {

      try {
        setError(false);
        setUser({ email: "", password: "", name: "", lastName: "", username: "" });
        registerAPICall(user).then(async (res) => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
        succesMessage();
        setTimeout(() => {
          navigator("/login");
          window.location.reload();
          }, 2499);
      } catch (error) {
       console.log(error);;
      }
    }
    else{
        errorMessage();
    }
  };


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+.com$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex-container centered">
      <form onSubmit={handleSubmit} id="form">
        <div className="card ">
          <p className="title-form">Crear Cuenta</p>
          <div className="inputContainer">
            <input value={email} placeholder="Ingrese su email" name="email" type="text"
              onChange={(e) => setUser({ ...user, email: e.target.value })} />
          </div>
          <div className="inputContainer">
            <input value={name} placeholder="Ingrese su nombre" name="name" type="text"
              onChange={(e) => setUser({ ...user, name: e.target.value })} />
          </div>
          <div className="inputContainer">
            <input value={username} placeholder="Ingrese su nombre de usuario" name="username" type="text"
              onChange={(e) => setUser({ ...user, username: e.target.value })} />
          </div>
          <div className="inputContainer">
            <input value={lastName} placeholder="Ingrese su apellido" name="lastName" type="text"
              onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
          </div>
          <div className="inputContainer">
            <input value={password} placeholder="Ingrese su contraseña" name="password" type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })} />
          </div>

          <div className="inputContainer terminos__condiciones">
            <label htmlFor="aceptar">
              Acepto los terminos y condiciones de ArrancAR
            </label>
            <input className="checkbox" id="checkbox" value={false} name="aceptar" type="checkbox" />
          </div>
          <button className="btn-login">
            Enviar Datos
          </button>
          <ToastContainer />
        </div>
        {error && (
          <h3 className={error ? "visible error" : "error"}>
            Por favor, verifique los campos ingresados
          </h3>
        )}
      </form>
    </div>
  );
};
export default Register;
