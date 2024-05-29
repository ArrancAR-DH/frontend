import React, { createContext, useContext } from "react";
import axios from "axios";

const DataUser = createContext();
const Context = ({ children }) => {
    const AUTH_REST_API_BASE_URL = "http://localhost:8080/auth";
    const registerAPICall = (registerObj) => axios.post(AUTH_REST_API_BASE_URL + '/register', registerObj);
   
   
    const loginAPICall = async (data, token) => {
        try {
          const response = await axios.post(AUTH_REST_API_BASE_URL + '/login', data, {
            token,
          });
          return response.data; // Puedes devolver la respuesta si lo deseas
        } catch (error) {
          console.error('Error:', error);
          throw error; // Puedes lanzar el error para que sea manejado por el código que llame a esta función
        }
      };

   
   
    const storeToken = (token) => localStorage.setItem("token", token);

    const storeRol = (rol) => localStorage.setItem("rol", rol);
   
    const getToken = () => localStorage.getItem("token");

    const getRol = () => localStorage.getItem("rol");
   
    const isAdmin = () =>{
        const admin = getRol(); 
        if(admin === "ROLE_ADMIN" || admin === "ROLE_SUPER_ADMIN"){
            return true
        } else{
            return false
        }

    }


    const saveLoggedInUser = (username) => sessionStorage.setItem("authenticatedUser", username);
   
    const isUserLoggedIn = () => {
        const username = sessionStorage.getItem("authenticatedUser");
        return username != null;
    }
   
    const getLoggedInUser = () => {
        const username = sessionStorage.getItem("authenticatedUser");
        return username;
    }
   
    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
    }

    return (
        <DataUser.Provider value={{ isAdmin, storeRol, getRol, registerAPICall, loginAPICall, storeToken, getToken, saveLoggedInUser, isUserLoggedIn, getLoggedInUser, logout }}>
            {children}
        </DataUser.Provider>
    )
}
export default Context;
export const useStorage = () => useContext(DataUser);