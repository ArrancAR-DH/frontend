import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginMessage, errorMessage } from "../utils/modals";
import { useContextGlobal } from "../Context/GlobalContext";


const Login = () => {
  const [user, setUser] = useState({ usernameOrEmail: "", password: "" });
  const { usernameOrEmail, password } = user;
  const { loginAPICall, storeToken, saveLoggedInUser, storeRol, state } = useContextGlobal();
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
      setValidatePassword(password.length > 3);
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
      storeRol(result.role.name);
      storeToken(token);
      saveLoggedInUser(usernameOrEmail);
      setUser({ usernameOrEmail: "", password: "" });
      loginMessage();
      
      setTimeout(() => {
        navigator("/");
        window.location.reload();
      }, 1800);
     } catch (error) {
      errorMessage();
    }
  };

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
