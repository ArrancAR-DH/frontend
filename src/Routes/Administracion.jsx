import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Administracion = () => {
  function postVehiculo(postJson) {
    axios
      .post("http://localhost:8080/vehicle", postJson, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setError("");
      })
      .catch((error) => {
        console.log(error);
        setError("Esta patente ya está registrada en el sistema.");
        setSuccess(false);
      });
  }

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [images, setImages] = useState([]);
  console.log(images);

  const changeUploadImage = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "rfricega");

    const response = await axios.post(
      "http://api.cloudinary.com/v1_1/dyypwqwgo/image/upload",
      data
    );
    console.log(response.data);

    setImages([...images, response.data.secure_url]);
  };

  function errorHandling(string) {
    if (!string) {
      setError("");
      return;
    }
    let result = "Error al enviar al formulario: " + string;
    setError(result);
    setSuccess(false);
  }


  const [pressedButton, setPressedButton] = useState(false);
  function pressButton() { //? reiniciar todos los campos al presionar "cancelar"/"agregar vehiculo"
    setPressedButton(!pressedButton);
    setError(false);
    setImages([])
  }

  function submitForm(e) {
    e.preventDefault();
    const marca = e.target[0].value;
    const modelo = e.target[1].value;
    const tipo = e.target[2].value;
    const year = e.target[3].value;
    const price = e.target[4].value;
    const patente = e.target[5].value.toUpperCase();
    const descripcion = e.target[6].value;
    // const imagenes = [e.target[7].value, e.target[8].value, e.target[9].value, e.target[10].value, e.target[11].value]
    // console.log(patente, descripcion, modelo, tipo, marca, imagenes)
    if (!patente || !descripcion || !modelo || !tipo || !marca || !price || !year) {
      errorHandling("Por favor, complete todos los campos.");
      return;
    }
    // check if price is double and year is number
    if (isNaN(parseFloat(price)) || isNaN(parseInt(year))) {
      errorHandling("Por favor, ingrese un precio y un año válidos.");
      return;
    }
    errorHandling(false);
    const postJson = {
      plate: patente,
      description: descripcion,
      reserved: false,
      model: {
        name: modelo,
      },
      type: {
        name: tipo,
      },
      price: parseFloat(price),
      // "year": year, //! sera definido mas adelante
      brand: {
        name: marca,
      },
      imgUrls: [],
    };
    // imagenes.forEach(
    images.forEach((imagen) => {
      postJson.imgUrls.push({ url: imagen });
    });
    postVehiculo(postJson);
    setSuccess(true);
  }
  return (
    <div className="administracion__container">
      <h2 className="title__admin">Administración</h2>
      <div className="administracion__funciones">
        <div className="botones">
          <button onClick={pressButton}>Agregar Vehículo</button>
          <Link to="/administracion/listavehiculos">
            <button>Ver lista de vehículos</button>
          </Link>
        </div>
        {error && <p className="administracion__error">{error}</p>}
        {success && <p className="administracion__success">Vehículo agregado con éxito.</p>}
        {pressedButton && (
          <form onSubmit={submitForm} className="administracion__form__agregar__veh">
            <div>
              <p>Marca:</p>
              <input type="text" placeholder="BMW" />
            </div>
            <div>
              <p>Modelo:</p>
              <input type="text" placeholder="328i" />
            </div>
            <div>
              <p>Tipo:</p>
              <input type="text" placeholder="Coupé" />
            </div>
            <div>
              <p>Año:</p>
              <input type="text" placeholder="1997" />
            </div>
            <div>
              <p>Precio:</p>
              <input type="text" placeholder="30000" />
            </div>
            <div>
              <p>Patente:</p>
              <input type="text" placeholder="RNV761" />
            </div>
            <div>
              <p>Descripción:</p>
              <input type="text" placeholder="Vehículo premium, clásico. En perfecto estado, sin detalles." />
            </div>
            <div>
              <p>Imágenes:</p>
              <input type="file" accept="image/*" onChange={changeUploadImage} />
            </div>
            <div className="imagenes__subidas">
              {images.map((imageUrl, index) => (
                <div key={index}>
                  <a href={imageUrl} target="_blank"><img src={imageUrl} alt={`Imagen ${index + 1}`} /></a>
                  <button type="button" onClick={() => setImages(images.filter((_, i) => i !== index))}>Eliminar</button>
                </div>
              ))}
            </div>
            <div className="botones__form">
              <button type="submit" className="administracion__submit__button">Agregar</button>
              <button type="button" onClick={pressButton}>Cancelar</button>
            </div>
          </form>
        )}
      </div>
      <div className="phone__error">
        <h1>No se puede ingresar con un teléfono móvil</h1>
        <h2>Por favor, vuelva a intentar desde una computadora.</h2>
      </div>
    </div>
  );
};

export default Administracion;
