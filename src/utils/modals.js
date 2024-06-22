import { toast } from "react-toastify";

export const loginMessage = () =>
    toast.success("Login exitoso!!!", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      
    });


export const errorMessage = () =>
toast.error("Usuario no registrado", {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
});

export const registerMessage = () =>
    toast.success("Registro exitoso!!!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

export const errorMessageRegister = (message) =>
    toast.error(message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });


export const userMessage = () =>
    toast.success("Perfil editado exitosamente", {
        position: "top-center",
        autoClose: 5500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

export const carReserved = () =>
    toast.success("Reserva exitosa", {
        position: "top-right",
        autoClose: 1800,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

export const carReboted = () =>
    toast.error("Debe loguearse para reservar", {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
            
    