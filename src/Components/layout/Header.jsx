import React from "react";
import logoConTitulo from "../../assets/ArrancAR logo con titulo sin fondo.png";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { useStorage } from "../../Context/StorageContext";

const Header = () => {
  const { getLoggedInUser, logout } = useStorage();
  const isAuth = getLoggedInUser();
  const navigator = useNavigate();

  function handleLogout() {
    logout();
    navigator("/login");
    window.location.reload(); 
  }

  return (
    <nav>
      <Link to="/">
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
            <div className="container__user">
                <h3>
            {isAuth}
                </h3>
             <NavLink to="/" onClick={handleLogout}>
              logout
            </NavLink>
            </div>
         )}
      </div>
    </nav>
  );
};
export default Header;
