export const reducer = (state, action) => {
    switch (action.type) {
      case 'GET_LIST_VEHICLE':
        return { ...state, data: action.payload };
      case 'GET_LIST_BRAND':
        return { ...state, brand: action.payload };
      case 'GET_LIST_TYPE':
        return { ...state, type: action.payload };
      case 'GET_LIST_MODEL':
        return { ...state, model: action.payload };
      case 'GET_LIST_FEATURE':
        return { ...state, feature: action.payload };
      case 'GET_LIST_USER':
        return { ...state, user: action.payload };
      case 'ADD_CAR':
        return { ...state, data: [...state.data, action.payload] };
      case 'ADD_LIKE':
        return { ...state, likes: [...state.likes, action.payload] };
      case 'REMOVE_LIKE':
        return { ...state, likes: state.likes.filter(idVehicle => idVehicle !== action.payload) };
      case 'SET_LIKES':
        return { ...state, likes: action.payload };
      case 'SET_USER_ID':
        return { ...state, idUser: action.payload };  

    // Agrego las siguientes funciones para poder manejar las actualizaciones del DOM de React de manera global, y que no tenga que recargar la pagina
      case 'SET_LIST_BRAND': // Sobreescribo array de marcas (en el estado)
        return { ...state, brand: action.payload };
      case 'SET_LIST_TYPE': // Sobreescribo array de tipos (en el estado)
        return { ...state, type: action.payload };
      case 'SET_LIST_MODEL': // Sobreescribo array de modelos (en el estado)
        return { ...state, model: action.payload };
      case 'SET_LIST_FEATURES': // Sobreescribo array de caracteristicas (en el estado)
        return { ...state, feature: action.payload };  

      default:
        return state;
    }
  };
