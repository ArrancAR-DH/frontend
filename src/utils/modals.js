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

export const carUnLogged = () =>
    toast.error("Debe loguearse para reservar", {
        position: "top-center",
        autoClose: 1800,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

export const notSelectedDates = () =>
    toast.error("Debe seleccionar dos fechas para reservar", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    export const errorBooking = (message) =>
        toast.error(message, {
            position: "top-center",
            autoClose: 5550,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
                width: "450px",
              },
        });


// CATEGORIES
export const createCategorySuccess = () =>
    toast.success("Categoria creada con éxito", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    
export const createCategoryError = (str) =>
    toast.error("Error al crear una categoria:" + " " + str, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

export const deleteCategorySuccess = () =>
    toast.success("Categoria eliminada con éxito", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

export const createCategoryInUseError = () =>
    toast.error("Ya existe esa categoría", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

export const deleteCategoryInUseError = () =>
    toast.error("Categoria en uso: No es posible eliminar una categoría que esté siendo usada!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

// CATEGORIES AND FEATURES FORM
export const completeFieldsError = () =>
    toast.error("Complete los campos", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

// FEATURES
export const createFeatureSuccess = () =>
    toast.success("Característica creada con éxito", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

export const deleteFeatureSuccess = () =>
    toast.success("Característica eliminada", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

export const createFeatureInUseError = () =>
    toast.error("Ya existe esa Característica", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

export const deleteFeatureInUseError = () =>
    toast.error("Característica en uso: No es posible eliminar una característica que esté siendo usada!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
