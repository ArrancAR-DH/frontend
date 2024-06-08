import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {registerMessage, errorMessageRegister} from "../utils/modals"
import { useContextGlobal } from "../Context/GlobalContext";
import {routes} from "../utils/routes";
import axios from "axios";

const Register = () => {
  const { registerAPICall } = useContextGlobal();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    lastName: "",
  });

  const { name, username, email, password, lastName } = user;
  const navigator = useNavigate();

  const [validateUserEmail, setValidateUserEmail] = useState(false);
  const [validateName, setValidateName] = useState(false);
  const [validateUsername, setValidateUsername] = useState(false);
  const [validateUserLastName, setValidateUserLastName] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);
  const [boton, habilitarBoton] = useState(true);

  const fullName = name +" " +lastName;

  const postEmail = (fullName, email) => {
    axios.post(routes.url_notificate, {
        toUser : email,
        fullName : fullName},
    {
      headers:{
          headers: { 'Content-Type': 'application/json' }
        }
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
        setError("Hubo un error al enviar el email.");
    });
}


const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    postEmail(fullName, email);
    await registerAPICall(user)
    registerMessage();
    setTimeout(() => {
      navigator("/login");
    }, 1800);
  } catch (error) {
    errorMessageRegister(error.response.data.message);
  }
};


  useEffect(() => {
    if (username.length !== 0) {
      setValidateUsername(username.length > 3);
    }
  }, [username]);

  useEffect(() => {
    if (password.length !== 0) {
      setValidatePassword(password.length > 4);
    }
  }, [password]);

  useEffect(() => {
    if (email.length !== 0) {
      setValidateUserEmail(email.includes(".") && email.includes("@"));
    }
  }, [email]);

  useEffect(() => {
    if (lastName.length !== 0) {
      setValidateUserLastName(lastName.length > 3);
    }
  }, [lastName]);

  useEffect(() => {
    if (name.length !== 0) {
      setValidateName(name.length > 3);
    }
  }, [name]);

  useEffect(() => {
    if (!!validatePassword && !!validateUsername && !!validateUserEmail && !!validateName && !!validateUserLastName ) {
      habilitarBoton(false);
    } else {
      habilitarBoton(true);
    }
  }, [validatePassword, validateUsername, validateUserEmail, validateUserLastName, validateName]);

  return (
    <div className="flex-container centered">
      <form onSubmit={handleSubmit} id="form">
        <div className="card ">
          <p className="title-form">Crear Cuenta</p>
          <div className="inputContainer">
            <input
              value={name}
              placeholder="Ingrese su nombre"
              name="name"
              type="text"
              onChange={(e) => setUser({ ...user, name: e.target.value })}/>
          <span
            id="comment-register"
            className={validateName ? " error" : " visible error"}>
            Este campo debe contener mas de 3 caracteres
          </span>
          </div>
          <div className="inputContainer">
            <input
              value={email}
              placeholder="Ingrese su email"
              name="email"
              type="text"
              onChange={(e) => setUser({ ...user, email: e.target.value })}/>
            <span
              id="comment-register"
              className={validateUserEmail ? " error" : " visible error"}>
              Este campo debe contener un formato correcto
            </span>
          </div>
          <div className="inputContainer">
            <input
              value={username}
              placeholder="Ingrese su nombre de usuario"
              name="username"
              type="text"
              onChange={(e) =>
                setUser({ ...user, username: e.target.value })}/>   
                <span id="comment-register"
                     className={validateUsername ? " error" : " visible error"}>
                     Este campo debe contener mas de 3 caracteres
                </span>
            </div>
          <div className="inputContainer">
            <input
              value={lastName}
              placeholder="Ingrese su apellido"
              name="lastName"
              type="text"
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}/>   
            <span
            id="comment-register"
            className={validateUserLastName ? " error" : " visible error"}>
            Este campo debe contener mas de 3 caracteres
          </span>
          </div>
          <div className="inputContainer">
            <input
              value={password}
              placeholder="Ingrese su contraseña"
              name="password"
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })} /> 
            <span
            id="comment-register"
            className={validatePassword ? " error" : " visible error"}>
            Este campo debe contener mas de 4 caracteres
          </span>
          </div>
          <div className="inputContainer terminos__condiciones">
            <label htmlFor="aceptar">
              Acepto los terminos y condiciones de ArrancAR
            </label>
            <input
              className="checkbox"
              id="checkbox"
              value={false}
              name="aceptar"
              type="checkbox"/>
          </div>
          <button className="btn" 
          disabled={boton}>
            Enviar Datos
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};
export default Register;
