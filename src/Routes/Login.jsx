import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerAPICall } from "../services/AuthService";
 


const Login = () => {
  const [user, setUser] = useState({correo: "", password: ""});
  const [error, setError] = useState(false);
  const{correo, password} = user; 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(correo) && password.length >=6) {
         setError(false);
         setUser({correo: "", password: ""}); 
         notify(); 
         
      } else {
      setError(true);
    }
    setTimeout(() => setMostrar(false), 800)};
  
  const notify = () =>
    toast.success("Login exitoso!!!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  const validateEmail = (correo) => {
    const emailRegex =  /^[^\s@]+@[^\s@]+.[^\s@]+.com$/;
    return emailRegex.test(correo);
  };

   return (
    <div className="flex-container centered">
         <form onSubmit={handleSubmit} id="form">
           <div className="card ">         
            <p className="title-form">Iniciar sesión</p>
          <div className="inputContainer">
          <input value={correo} placeholder="Ingrese su email" name="correo" type="text"
            onChange={(e) => setUser({ ...user, correo: e.target.value })}/>
        </div>
        <div className="inputContainer">
          <input value={password} placeholder="Ingrese su contraseña" name="password" type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}/>
        </div>
        <div className="inputContainer recordar__usuario">
          <label htmlFor="recordar">Recordarme</label>
          <input className="checkbox" id="checkbox" value={false} name="recordar" type="checkbox"/>
        </div>
        <button className="btn-login" onClick={handleSubmit}>
            Acceder
          </button>
          <ToastContainer />
        </div>
          {error && <h3 className={error ? "visible error" : "error"}>
              Por favor, verifique los campos ingresados
                  </h3>}
        </form>
    </div>
  );
};
export default Login; 