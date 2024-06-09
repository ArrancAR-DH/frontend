import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContextGlobal } from "../Context/GlobalContext";
import { routes } from "../utils/routes.js";

const ProtectedRoute = ({children}) => {

      
     const { isAdmin } = useContextGlobal();
      console.log( isAdmin() );

      return (
            <>
                  { isAdmin() ? children : <Navigate to={routes.home} /> }
            </>
      )
}

export default ProtectedRoute;
