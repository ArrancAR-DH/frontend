import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useStorage } from "../Context/StorageContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ usernameOrEmail: "", password: "" });
  const { usernameOrEmail, password } = user;
  const { loginAPICall, storeToken, saveLoggedInUser, storeRol } = useStorage();
  const navigator = useNavigate();

  const [validateUsername, setValidateUsername] = useState(false);
  const [validatePassword, setValidatePassword] = useState(false);
  const [boton, habilitarBoton] = useState(true);

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
    if (!!validatePassword && !!validateUsername) {
      habilitarBoton(false);
     } else {
      habilitarBoton(true);
    }
  }, [validatePassword, validateUsername]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = window
      .btoa(usernameOrEmail + ":" + password, "utf8")
      .toString("base64");
    const config = {
      headers: {
        Authorization: "Basic " + token,
      },
    };

    try {
      const result = await loginAPICall(user, config);
      console.log(result);
      storeRol(result.role.name);
      storeToken(token);
      saveLoggedInUser(usernameOrEmail);
      setUser({ usernameOrEmail: "", password: "" });
      succesMessage();
      // setTimeout(() => {
      //   navigator("/");
      //   window.location.reload();
      // }, 2499);
    } catch (error) {
      errorMessage();
    }
  };

  const succesMessage = () =>
    toast.success("Login exitoso!!!", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const errorMessage = () =>
    toast.error("Usuario no registrado", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className="flex-container centered">
      <form onSubmit={handleSubmit} id="form">
        <div className="card ">
          <p className="title-form">Iniciar sesión</p>
          <div className="inputContainer">
            <input
              value={usernameOrEmail}
              placeholder="Ingrese su email"
              name="usernameOrEmail"
              type="text"
              onChange={(e) =>
                setUser({ ...user, usernameOrEmail: e.target.value })}/>
            <span
              id="comment-register"
              className={validateUsername ? " error" : " visible error"}>
              Username debe contener mas de 3 caracteres
            </span>
          </div>
          <div className="inputContainer">
            <input
              value={password}
              placeholder="Ingrese su contraseña"
              name="password"
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}/>
            <span
              id="comment-register"
              className={validatePassword ? " error" : " visible error"}>
              Password debe contener mas de 4 caracteres
            </span>
          </div>
          <div className="inputContainer recordar__usuario">
            <label htmlFor="recordar">Recordarme</label>
            <input
              className="checkbox"
              id="checkbox"
              value={false}
              name="recordar"
              type="checkbox"/>
          </div>
          <button className="btn" disabled={boton}>
            Acceder
          </button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
};
export default Login;
