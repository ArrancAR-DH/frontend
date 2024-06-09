import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "../Reducers/reducer";
import axios from "axios";
import { routes } from "../utils/routes";

export const initialState = {
  data: [],
  brand: [],
  type: [],
  model: [],
  user: [],
  carSelected: {},
  likes: JSON.parse(localStorage.getItem("likes")) || [],
  idUser: JSON.parse(localStorage.getItem("idUser")) || null,
  loggedUser: JSON.parse(localStorage.getItem("user")) || null
};

export const ContextGlobal = createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const registerAPICall = (registerObj) =>
    axios.post(routes.url_rest_api + "/register", registerObj);

  const loginAPICall = async (data, token) => {
    try {
      const response = await axios.post(
        routes.url_rest_api + "/login",
        data, { token }
      );
      const { likedVehicleIds, idUser } = response.data;
      dispatch({ type: 'SET_LIKES', payload: likedVehicleIds });
      dispatch({ type: 'SET_USER_ID', payload: idUser });
      localStorage.setItem("idUser", JSON.stringify(idUser));
      localStorage.setItem("user", JSON.stringify(response.data));
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

  const giveLike = () =>{
    const admin = getRol(); 
    if (admin === "ROLE_ADMIN" || admin === "ROLE_SUPER_ADMIN" || admin === "ROLE_USER") {
      return true;
    } else {
      return false;
    }

  }


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

  const likeVehicle = async (idVehicle) => {
    try {
      const idUser = state.idUser || JSON.parse(localStorage.getItem("idUser"));
      const response = await axios.post("http://localhost:8080/user/like", {
        idUser,
        idVehicle
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + token,
        }
      });
      dispatch({ type: 'SET_LIKES', payload: response.data });
    } catch (error) {
      console.error("Error liking vehicle:", error);
    }
  };
  
  const dislikeVehicle = async (idVehicle) => {
    try {
      const idUser = state.idUser || JSON.parse(localStorage.getItem("idUser"));
      const response = await axios.delete("http://localhost:8080/user/dislike", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + token,
        },
        data: {
          idUser,
          idVehicle
        }
      });
      dispatch({ type: 'SET_LIKES', payload: response.data });
    } catch (error) {
      console.error("Error disliking vehicle:", error);
    }
  };
  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(state.likes));
  }, [state.likes]);


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
      value={{
        isAdmin,
        storeRol,
        getRol,
        registerAPICall,
        loginAPICall,
        storeToken,
        getToken,
        saveLoggedInUser,
        isUserLoggedIn,
        getLoggedInUser,
        logout,
        state,
        dispatch,
        likeVehicle,
        dislikeVehicle,
        giveLike
      }}>
      {children}
    </ContextGlobal.Provider>
  );
};

export default ContextProvider;
export const useContextGlobal = () => useContext(ContextGlobal);
