import React, { createContext, useContext } from "react";
import axios from "axios";


const DataUser = createContext(); 
const Context = ({children}) =>{  
const AUTH_REST_API_BASE_URL = "http://localhost:8080/auth"; 
const registerAPICall = (registerObj) => axios.post(AUTH_REST_API_BASE_URL + '/register', registerObj);
const loginAPICall = (data, token) => axios.post(AUTH_REST_API_BASE_URL + '/login', data, token);
const storeToken = (token) => localStorage.setItem("token", token);
const getToken = () => localStorage.getItem("token");
const saveLoggedInUser = (username) => sessionStorage.setItem("authenticatedUser", username);
const isUserLoggedIn = () => {
    const username = sessionStorage.getItem("authenticatedUser");
       
    if(username == null){
        return false
    }else{
        return true;
    }

}
const getLoggedInUser = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    return username;
}
const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}

return(
    <DataUser.Provider value={{registerAPICall, loginAPICall, storeToken, getToken, saveLoggedInUser, isUserLoggedIn, getLoggedInUser, logout}}>
    {children}
    </DataUser.Provider>

)

}
export default Context; 
export const useStorage=()=> useContext(DataUser);




