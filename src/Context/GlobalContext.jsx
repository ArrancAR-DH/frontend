import {createContext,useContext,useEffect,useReducer,useState} from "react";
import { reducer } from "../Reducers/reducer";
import axios from "axios";
import { routes } from "../utils/routes";



export const initialState = {
  check: {
    checked: "true" || "false",
  },
   data: [],
   brand: [],
   type: [],
   model:[],
   user:[],
  favs: JSON.parse(localStorage.getItem("favs")) || [],
  carSelected: {},
  likes: []
};

export const ContextGlobal = createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { check } = state;
  const [checked, setChecked] = useState(check.checked);

  
  const registerAPICall = (registerObj) =>
    axios.post(routes.url_rest_api + "/register", registerObj);
  const loginAPICall = async (data, token) => {
    try {
      const response = await axios.post(
        routes.url_rest_api + "/login",
        data,{token}
      );
      return response.data; 
    } catch (error) {
      console.error("Error:", error);
      throw error; 
    }
  };
  const storeToken = (token) => localStorage.setItem("token", token);
  const storeRol = (rol) => localStorage.setItem("rol", rol);
  const getToken = () => localStorage.getItem("token");
  const token = getToken();
  const getRol = () => localStorage.getItem("rol");
  const isAdmin = () => {
  const admin = getRol();
    if (admin === "ROLE_ADMIN" || admin === "ROLE_SUPER_ADMIN") {
      return true;
    } else {
      return false;
    }
};

  const saveLoggedInUser = (username) =>
    sessionStorage.setItem("authenticatedUser", username);

  const isUserLoggedIn = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    return username != null;
  };

  const getLoggedInUser = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    return username;
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
  };

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(state.favs));
  }, [state.favs]);

  useEffect(() => {
    axios(routes.url_allVehicles).then((res) =>
      dispatch({ type: "GET_LIST_VEHICLE", payload: res.data })
    );
  }, []);

  useEffect(() => {
    axios(routes.url_allBrands, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + token,
      },
    }).then((res) => dispatch({ type: "GET_LIST_BRAND", payload: res.data }));
    axios(routes.url_allModels, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + token,
      },
    }).then((res) => dispatch({ type: "GET_LIST_MODEL", payload: res.data }));
    axios(routes.url_allTypes, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + token,
      },
    }).then((res) => dispatch({ type: "GET_LIST_TYPE", payload: res.data }));

  }, []);

  useEffect(() => {
    axios(routes.url_AllUsers, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + token,
      },
    }).then((res) => dispatch({ type: "GET_LIST_USER", payload: res.data }));
  }, []);


  return (
    <ContextGlobal.Provider
      value={{ isAdmin, storeRol, getRol, registerAPICall, loginAPICall, storeToken, getToken, saveLoggedInUser, isUserLoggedIn, getLoggedInUser, logout, state, checked, setChecked, dispatch}}>
        {children}
    </ContextGlobal.Provider>
  );
};
export default ContextProvider;
export const useContextGlobal = () => useContext(ContextGlobal);
