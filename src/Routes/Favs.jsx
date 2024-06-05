import React,{useState} from "react";

import Card from "../Components/Card"
import { useContextGlobal } from "../Context/GlobalContext";

const Favs = () => {
  const { state, dispatch } = useContextGlobal();
  const [isFav, setIsFav] = useState(true);
 console.log(state);

 const handleRemoveAll = () => {
  dispatch({ type: "REMOVE_ALL_FAVS" });
  localStorage.removeItem("favs");
};

const handleRemoveSingle = (id) => {
  dispatch({ type: "REMOVE_SINGLE_FAV", payload: id });
  const updatedFavs = state.favs.filter((value) => value.id !== id);
  localStorage.setItem("favs", JSON.stringify(updatedFavs));
};

  
 return (
    <>
      <h1>Destacados</h1>
      <div className="card-grid">
        {state.favs.map((car) => (
        // console.log(item)
          // <Card key={key} value={value} isFav={isFav}/>
          <Card car={car} key={car.idVehicle} isFav={isFav} className="car__card"
          handleRemoveSingle={handleRemoveSingle} />
        ))}


      </div>
      {state.favs != 0 ? ("") : 
      (<p className="p-destacados">Ud. no tiene favoritos agregados aún!</p>)}
      {state.favs.length >= 2 ? (
      <button onClick={handleRemoveAll} className="button-delAll">
        BORRAR TODOS
      </button>) : ("")}
    </>
  );
};

export default Favs;
