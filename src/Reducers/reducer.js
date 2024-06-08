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
      case 'GET_LIST_USER':
        return { ...state, user: action.payload };
      case 'ADD_CAR':
        return { ...state, data: [...state.data, action.payload] };
      case 'ADD_FAV':
        return { ...state, favs: [...state.favs, action.payload] };
      case 'REMOVE_ALL_FAVS':
        return { ...state, favs: [] };
      case 'REMOVE_SINGLE_FAV':
        return { ...state, favs: state.favs.filter(car => car.idVehicle !== action.payload) };
      case 'ADD_LIKE':
        return { ...state, likes: [...state.likes, action.payload] };
      case 'REMOVE_LIKE':
        return { ...state, likes: state.likes.filter(idVehicle => idVehicle !== action.payload) };
      case 'SET_LIKES':
        return { ...state, likes: action.payload };
      case 'SET_USER_ID':
        return { ...state, idUser: action.payload };  
      default:
        return state;
    }
  };