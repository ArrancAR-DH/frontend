import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useStorage } from "../Context/StorageContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ usernameOrEmail: "", password: "" });
  const { usernameOrEmail, password } = user;
  const [error, setError] = useState(false); // PENDING (Validations)
  const { loginAPICall, storeToken, saveLoggedInUser, storeRol, getRol } = useStorage();
  const navigator = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = window.btoa(usernameOrEmail + ":" + password, "utf8").toString("base64");
    const config = {
      headers: {
        Authorization: "Basic " + token,
      },
    };

    try {
      const result = await loginAPICall(user,config); 
      storeRol(result.role.name);
      storeToken(token);
      saveLoggedInUser(usernameOrEmail);
      setUser({ usernameOrEmail: "", password: "" });
      succesMessage();
      setTimeout(() => {
      navigator("/");
      window.location.reload();
      }, 2499);
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
    toast.error("Verifique los campos!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  // PENDING VALIDATIONS  
  // const validateEmail = (email) => {
  //   const emailRegex =  /^[^\s@]+@[^\s@]+.[^\s@]+.com$/;
  //   return emailRegex.test(email);
  // };

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
              onChange={(e) => setUser({ ...user, usernameOrEmail: e.target.value })} />
          </div>
          <div className="inputContainer">
            <input
              value={password}
              placeholder="Ingrese su contraseña"
              name="password"
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })} />
          </div>
          <div className="inputContainer recordar__usuario">
            <label htmlFor="recordar">Recordarme</label>
            <input
              className="checkbox"
              id="checkbox"
              value={false}
              name="recordar"
              type="checkbox"
            />
          </div>
          <button className="btn-login">Acceder</button>
          <ToastContainer />
        </div>
        {/* {error && <h3 className={error ? "visible error" : "error"}>
              Por favor, verifique los campos ingresados
                  </h3>} */}
      </form>
    </div>
  );
};
export default Login;
