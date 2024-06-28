import React from "react";
import { Link } from "react-router-dom";
import ArrancArLogo from "../../assets/logo-dark-transparente.png";
import { useContextGlobal } from "../../Context/GlobalContext";


const Footer = () => {
  const { isAdmin } = useContextGlobal();
  const rol = isAdmin(); 

  return (
    <footer>
      <div className="footer__logo__div">
        <img src={ArrancArLogo} alt="ArrancAR Logo" />
        <p>COPYRIGHT 2024</p>
      </div>
      <div className="footer__links__div">
        <Link to="/about">Sobre nosotros</Link>
        <Link to="/legal">Legal</Link>
        {rol && <Link to="/administracion">Administración</Link>}
      </div>
      <div className="footer__socials">
      </div>
    </footer>
  );
};

export default Footer;
