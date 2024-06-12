import React from "react";
import logoConTitulo from "../../assets/ArrancAR logo con titulo sin fondo.png";
import { Link } from "react-router-dom";
import { useContextGlobal } from "../../Context/GlobalContext";
import DropDown from "../Dropdown";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { getLoggedInUser} = useContextGlobal();
  const isAuth = getLoggedInUser();
  const navigator = useNavigate();
  
  const handleRefresh = () =>{
  
    navigator("/");
    window.location.reload();
  
  }
  return (
    <nav>
      <Link onClick={handleRefresh}>
        <img src={logoConTitulo} />
      </Link>
      <div className="navbar__buttons">
        {!isAuth && (
          <>
            <Link to="/register">
              <button>Crear Cuenta</button>
            </Link>
            <Link to="/login">
              <button>Iniciar Sesión</button>
            </Link>
          </>
        )}

    {isAuth && (
      <DropDown isAuth={isAuth}/>      
        )}
      </div>
    </nav>
  );
};

export default Header;