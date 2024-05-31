import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStorage } from "../Context/StorageContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerAPICall } = useStorage();
  const [user, setUser] = useState({
    name: "",
    usernameOrEmail: "",
    email: "",
    password: "",
    lastName: "",
  });
  const { name, usernameOrEmail, email, password, lastName } = user;
  const navigator = useNavigate();

  const [validateUserEmail, setValidateUserEmail] = useState(false);
  const [validateName, setValidateName] = useState(false);

  const [validateUsername, setValidateUsername] = useState(false);
  const [validateUserLastName, setValidateUserLastName] = useState(false);

  const [validatePassword, setValidatePassword] = useState(false);
  const [boton, habilitarBoton] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        registerAPICall(user)
          .then(async (res) => {
            console.log(res)
            succesMessage();
            setTimeout(() => {
              navigator("/login");
             }, 2499);
          })
          .catch((err) => {
            errorMessage(err.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
  };

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

  const errorMessage = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  useEffect(() => {
    if (usernameOrEmail.length !== 0) {
      setValidateUsername(usernameOrEmail.length > 3);
    }
  }, [usernameOrEmail]);

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
    if (!!validatePassword && !!validateUsername && !!validateUserEmail) {
      habilitarBoton(false);
    } else {
      habilitarBoton(true);
    }
  }, [validatePassword, validateUsername, validateUserEmail]);

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
              value={usernameOrEmail}
              placeholder="Ingrese su nombre de usuario"
              name="usernameOrEmail"
              type="text"
              onChange={(e) =>
                setUser({ ...user, usernameOrEmail: e.target.value })}/>   
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
