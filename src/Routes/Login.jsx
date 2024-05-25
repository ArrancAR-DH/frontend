import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { loginAPICall, storeToken, saveLoggedInUser} from "../services/AuthService";

const Login = () => {
  const [user, setUser] = useState({ usernameOrEmail: "", password: "" });
  const [error, setError] = useState(false); // PENDING (Validations)
  const { usernameOrEmail, password } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = window.btoa(usernameOrEmail + ":" + password, "utf8").toString("base64");
    const config = { headers: {
        Authorization: "Basic " + token,
      },
    };
    try {
      const res = await loginAPICall(user, config);
        storeToken(token);
        saveLoggedInUser(usernameOrEmail);
        setUser({ usernameOrEmail: "", password: "" });
        notify();
      } catch (error) {
        console.error("Error:", error);
        notify2();
      }
  };

  const notify = () =>
    toast.success("Login exitoso!!!", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notify2 = () =>
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
              onChange={(e) =>
                setUser({ ...user, usernameOrEmail: e.target.value })
              }
            />
          </div>
          <div className="inputContainer">
            <input
              value={password}
              placeholder="Ingrese su contraseña"
              name="password"
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
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
