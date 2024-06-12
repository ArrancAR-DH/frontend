import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdministracionPhoneError from "../Components/Phone Error/AdministracionPhoneError";
import trashCan from "../assets/trash-solid.svg";
import pencil from "../assets/pencil-solid.svg";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { userMessage } from "../utils/modals";
import { useContextGlobal } from "../Context/GlobalContext";


const ListUsers = () => {
    const { state, getRol, getToken } = useContextGlobal();
    const token = getToken();
    const [users, setUsers] = useState(state.user);
    const [rol, setRol] = useState(false);
    const [checkedState, setCheckedState] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        getRol() === "ROLE_SUPER_ADMIN" ? setRol(true) : setRol(false);
    }, [getRol]);

    useEffect(() => {
        const initialCheckedState = state.user.map((user) => user.role.idRole === 2);
        setUsers(state.user);
        setCheckedState(initialCheckedState);
    }, [state, token])

    const handleCheckboxChange = (index) => {
        setCheckedState((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const handleApply = async (user, index) => {
        if (checkedState[index] === true) {
            user.role = {
                idRole: 2,
                name: "ROLE_ADMIN",
                description: "ADMIN",
            };
        } else {
            user.role = {
                idRole: 3,
                name: "ROLE_USER",
                description: "USER",
            };
        }

        try {
            const response = await axios.put(
                "http://localhost:8080/user/update",
                user,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Basic " + token,
                    },
                }
            );
            userMessage();
            setTimeout(() => {
                window.location.reload();
            }, 1780);
        } catch (error) {
            console.error("Error en la actualización del usuario:", error);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 780);
    }, []);

    return (
        <>
            {loader ? (<p className="loader">Loading....</p>) : (
                <div className="list__users__container">
                    <Link to={`/administracion`}>
                        <h3>Volver</h3>
                    </Link>
                    <h2 className="title__admin">Administración</h2>
                    <div className="administracion__funciones">
                        <div className="titulos__categorias">
                            <h3>ID</h3>
                            <h3>Nombre</h3>
                            <h3>Apellido</h3>
                            <h3>Administrador</h3>
                            <h3>Acciones</h3>
                        </div>
                        <ToastContainer />
                        {users.map((user, index) => (
                            <div className="user__container" key={user.idUser}>
                                <h4>{user.idUser}</h4>
                                <h4>{user.firstName}</h4>
                                <h4>{user.lastName}</h4>
                                <div>
                                    {rol && (
                                        <input
                                            className="check"
                                            type="checkbox"
                                            checked={checkedState[index]}
                                            onChange={() => handleCheckboxChange(index)} />)}
                                </div>
                                <div className="container__buttons">
                                    <button onClick={() => handleApply(user, index)}>
                                        <img src={pencil} />
                                    </button>
                                    <button>
                                        <img src={trashCan} alt="Delete" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <AdministracionPhoneError />
                </div>
            )}
        </>
    );
};
export default ListUsers;