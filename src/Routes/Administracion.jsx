import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../Components/Spinner";
import AdministracionPhoneError from "../Components/Phone Error/AdministracionPhoneError";
import { useContextGlobal } from "../Context/GlobalContext";

const Administracion = () => {
    const { state, getToken, dispatch } = useContextGlobal();
    const token = getToken();

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [render, setRender] = useState(true);

    useEffect(() => {
        setBrands(state.brand);
        setModels(state.model);
        setTypes(state.type)
    }, [state])


    function postVehiculo(postJson) {
        axios.post("http://localhost:8080/vehicle", postJson, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + token,
            },
        }).then((response) => {
                console.log(response);
                setError("");
            }).catch((error) => {
                console.log(error);
                setError("Hubo un error al guardar el vehículo.");
                setSuccess(false);
            });
    }

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [images, setImages] = useState([]);

    const changeUploadImage = async (e) => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "rfricega");

        const response = await axios.post(
            "http://api.cloudinary.com/v1_1/dyypwqwgo/image/upload",
            data
        );

        setImages([...images, response.data.secure_url]);
    };

    // function errorHandling(string) {
    //     if (!string) {
    //         setError("");
    //         return;
    //     }
    //     let result = "Error al enviar al formulario: " + string;
    //     setError(result);
    //     setSuccess(false);
    // }

    const [pressedButton, setPressedButton] = useState(false);
    function pressButton() { //? reiniciar todos los campos al presionar "cancelar"/"agregar vehiculo"
        setPressedButton(!pressedButton);
        setError(false);
        setImages([])
    }

    function submitForm(e) {
        e.preventDefault();
        const marcaLabel = e.target[0].value;
        const modeloLabel = e.target[1].value;
        const tipoLabel = e.target[2].value;
        const year = e.target[3].value;
        const price = e.target[4].value;
        const patente = e.target[5].value.toUpperCase();
        const descripcion = e.target[6].value;
        // if (!patente || !descripcion || !modeloLabel || !tipoLabel || !marcaLabel || !price || !year) {
        //     errorHandling("Por favor, complete todos los campos.");
        //     return;
        // }
        // if (isNaN(parseFloat(price)) || isNaN(parseInt(year))) {
        //     errorHandling("Por favor, ingrese un precio y un año válidos.");
        //     return;
        // }
        // errorHandling(false);
        const marcaId = brands.find((brand) => brand.name === marcaLabel).idBrand;
        const modeloId = models.find((model) => model.name === modeloLabel).idModel;
        const tipoId = types.find((type) => type.name === tipoLabel).idType;

        const postJson = {
            plate: patente,
            description: descripcion,
            price: parseFloat(price),
            // reserved: true/false. // Creo que faltaria este campo para el sprint 4
            model: {
                idModel: modeloId,
            },
            type: {
                idType: tipoId,
            },
            year: year,
            brand: {
                idBrand: marcaId,
            },
            imgUrls: [],
            // "features": [ // Array de caracteristicas
            //     {
            //         "idFeature": 0,
            //         "name": "string"
            //     }
            // ]
        };
        images.forEach((imagen) => {
            postJson.imgUrls.push({ url: imagen });
        });
        postVehiculo(postJson);
        setSuccess(true);
    }

    setTimeout(() => {
        setRender(false)
    }, 780);


    return (
        <>
            {render ? <p className="loader">Loading....</p> : (
                <div className="administracion__container">
                    <h2 className="title__admin">Administración</h2>
                    <div className="administracion__funciones">
                        <div className="botones">
                            <button onClick={pressButton}>Agregar Vehículo</button>
                            <Link to="listvehicles">
                                <button>Ver lista de vehículos</button>
                            </Link>
                            <Link to='categories'>
                                <button>Crear categorías</button>
                            </Link>
                            <Link to='listusers'>
                                <button>Ver lista de usuarios</button>
                            </Link>
                        </div>

                        {error && <p className="administracion__error">{error}</p>}
                        {success && <p className="administracion__success">Vehículo agregado con éxito.</p>}
                        {pressedButton && (
                            <form onSubmit={submitForm} className="administracion__form__agregar__veh">
                                <div>
                                    <p>Marca:</p>
                                    <select>
                                        <option selected disabled hidden>Elegí la marca acá</option>
                                        {state.brand.map((brand, index) => (
                                            <option key={index}>{brand.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <p>Modelo:</p>
                                    <select>
                                        <option selected disabled hidden>Elegí el modelo acá</option>
                                        {state.model.map((model, index) => (
                                            <option key={index}>{model.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <p>Tipo:</p>
                                    <select>
                                        <option selected disabled hidden>Elegí el tipo acá</option>
                                        {state.type.map((type, index) => (
                                            <option key={index}>{type.name}</option>
                                        ))}
                                    </select>
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
                                <div className="features_assignment_section">
                                    <p>Características:</p>
                                    <div className="feature_checkboxes_block">
                                        {
                                            state.feature.map(
                                                (feature) => {
                                                    return(
                                                        <>
                                                            <div className="checkbox_and_feature_couple">
                                                                <input type="checkbox" />
                                                                <p>{feature.name}</p>
                                                            </div>
                                                        </>
                                                    )
                                                }
                                            )
                                        }
                                    </div>
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
                    <AdministracionPhoneError />
                </div>
            )}
        </>
    );
};

export default Administracion;
