import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { loginAPICall } from "../services/AuthService";



const Login = () => {
  const [user, setUser] = useState({email: "", password: ""});
  const [error, setError] = useState(false);
  const{email, password} = user; 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email) && password.length >=6) {
         setError(false);
         setUser({email: "", password: ""}); 
         await loginAPICall(user).then((res)=>{
          console.log(res.data)
          const token = 'Basic ' + window.btoa(email + ":" + password);
            storeToken(token);
            saveLoggedInUser(email);
         })
         notify();    
      } else {
      setError(true);
    }
    // setTimeout(() => setMostrar(false), 800)
  };
  
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

  const validateEmail = (email) => {
    const emailRegex =  /^[^\s@]+@[^\s@]+.[^\s@]+.com$/;
    return emailRegex.test(email);
  };

   return (
    <div className="flex-container centered">
         <form onSubmit={handleSubmit} id="form">
           <div className="card ">         
            <p className="title-form">Iniciar sesión</p>
          <div className="inputContainer">
          <input value={email} placeholder="Ingrese su email" name="email" type="text"
            onChange={(e) => setUser({ ...user, email: e.target.value })}/>
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