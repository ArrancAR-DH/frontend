import React, { useState, useEffect } from "react";
import AdministracionPhoneError from "../Components/Phone Error/AdministracionPhoneError";
import { Link } from "react-router-dom";
import { useStorage } from "../Context/StorageContext";
import axios from "axios";
import trashCan from "../assets/trash-solid.svg";
import pencil from "../assets/pencil-solid.svg"

const ListUsers = () => {
  const { getToken, getRol, getLoggedInUser } = useStorage();
  const token = getToken();
  const [users, setUsers] = useState([]);
  const [rol, setRol] = useState(false);
  const [checkedState, setCheckedState] = useState([]);
 
  console.log(getLoggedInUser());

  useEffect(() => {
    getRol() === "ROLE_SUPER_ADMIN" ? setRol(true) : setRol(false);
  }, [getRol]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + token,
        },
      })
      .then((response) => {
        setUsers(response.data);
        const initialCheckedState = response.data.map(
          (user) => user.role.idRole === 2
        );
        setCheckedState(initialCheckedState);
      })
      .catch((error) => console.log(error));
  }, [token]);

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
      console.log("Respuesta del servidor:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error en la actualización del usuario:", error);
    }
  };

  return (
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
                  onChange={() => handleCheckboxChange(index)}
                />
              )}
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
  );
};

export default ListUsers;
