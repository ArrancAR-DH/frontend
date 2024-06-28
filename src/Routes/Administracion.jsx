import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdministracionPhoneError from "../Components/Phone Error/AdministracionPhoneError";
import { useContextGlobal } from "../Context/GlobalContext";
import { routes } from "../utils/routes";
import BackButton from "../Components/BackButton/BackButton";
import { carAdd, carError } from "../utils/modals";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";



const Administracion = () => {
    const { state, getToken, dispatch } = useContextGlobal();
    const token = getToken();

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [render, setRender] = useState(true);
    const [cars, setCars] = useState([]);
    useEffect(() => {
        setBrands(state.brand);
        setModels(state.model);
        setTypes(state.type)
        populateSelectedFeaturesArray();
        setCars(state.data);
    }, [state]);

    function featuresCheckUncheck(e, feature, index) {
        selectedFeatures[index] = e.target.checked; 
    }

    function populateSelectedFeaturesArray() {
        let aux = state.feature.map(
            (element, index) => {
                return false;
            }
        )
        setSelectedFeatures(aux);
    };


    async function esperarAxios(idVehicule, idFeature){
             return axios.post(`${routes.url_postCar}/${idVehicule}/features/${idFeature}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic " + token,
                    },
                }).then((response) => {
                    setError("");
                }).catch((error) => {
                    carError("Hubo un error al guardar el vehículo.")
                });
    }

    async function inyectarFeatures(res, feat, form) {
        for( const element of feat ) {
            await esperarAxios(res.data.idVehicle, element.idFeature);
        }
    }

    function postVehiculo(postJson, features, form) {
        setError("");
        axios.post(`${routes.url_postCar}`, postJson, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + token,
            },
        }).then((response) => {
            inyectarFeatures(response, features, form);
            dispatch({ type: 'ADD_CAR', payload: response.data });
            carError(); 
            carAdd();
            form.reset();
            setImages([])
        }).catch((error) => {
            carError("Hubo un error al guardar el vehículo.")
        });
    }

    const [error, setError] = useState("");
    const [images, setImages] = useState([]);

    const changeUploadImage = async (e) => {
        const file = e.target.files[0];
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "rfricega");

        const response = await axios.post(
            `${routes.url_postCloudinary}`,
            data
        );

        setImages([...images, response.data.secure_url]);
    };

    const [pressedButton, setPressedButton] = useState(false);
    function pressButton() {
        setPressedButton(!pressedButton);
        // setError(false);
        setImages([])
    }

    function validateFields(
        marca,
        modelo,
        tipo,
        year,
        price,
        patente,
        descripcion,
        featuresV
    ) {
        if (
            marca === "" ||
            modelo === "" ||
            tipo === "" ||
            year === "" || year[0] === " " ||
            price === "" || price[0] === " " ||
            patente === "" || patente[0] === " " ||
            descripcion === "" || descripcion[0] === " "
            || featuresV.length === 0 
        ) {
            carError("Por favor completar todos los campos");
            return false;
        }
        return true;
    }

    function submitForm(e) {
        e.preventDefault();
        const featuresV = [];
        selectedFeatures.forEach((element, index) => {
            if (element === true) featuresV.push(state.feature[index]);
        });

        const patente = e.target[5].value.toUpperCase();
        const patenteEnUso = cars.filter((car) => car.plate === patente);
        if (patenteEnUso.length > 0) {
            carError("La patente ingresada ya está en uso.")
            return;
        }

        const marcaLabel = e.target[0].value;
        const modeloLabel = e.target[1].value;
        const tipoLabel = e.target[2].value;
        const year = e.target[3].value;
        const price = e.target[4].value;
        const descripcion = e.target[6].value;

        if (!validateFields(
            marcaLabel,
            modeloLabel,
            tipoLabel,
            year,
            price,
            patente,
            descripcion,
            featuresV)
        ) {
            return;
        }

        const marcaId = brands.find((brand) => brand.name === marcaLabel).idBrand;
        const modeloId = models.find((model) => model.name === modeloLabel).idModel;
        const tipoId = types.find((type) => type.name === tipoLabel).idType;

        const postJson = {
            plate: patente,
            description: descripcion,
            price: parseFloat(price),
            model: {
                idModel: modeloId,
                name: modeloLabel,
            },
            type: {
                idType: tipoId,
                name: tipoLabel,
            },
            year: year,
            brand: {
                idBrand: marcaId,
                name: marcaLabel,
            },
            imgUrls: [],
        };
        images.forEach((imagen) => {
            postJson.imgUrls.push({ url: imagen });
        });
        postVehiculo(postJson, featuresV, e.target);
    }

    setTimeout(() => {
        setRender(false)
    }, 780);

    return (
        <>
            {render ? <p className="loader">Loading....</p> : (
                <div className="administracion__container">
                    <BackButton />
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

                        {pressedButton && (
                            <>
                                <form onSubmit={submitForm} className="administracion__form__agregar__veh">
                                    <h3 className="titulo_agregar_vehiculo_form">Crear un nuevo vehículo</h3>
                                    <div className="vehicle_form_row">
                                        <div className="first_column">Marca:</div>
                                        <select defaultValue="" required>
                                            <option value="" selected disabled hidden>Seleccionar la marca del vehiculo</option>
                                            {state.brand.map((brand, index) => (
                                                <option key={index}>{brand.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="vehicle_form_row">
                                        <div className="first_column">Modelo:</div>
                                        <select defaultValue="" required>
                                            <option value="" selected disabled hidden>Seleccionar el modelo del vehículo</option>
                                            {state.model.map((model, index) => (
                                                <option key={index}>{model.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="vehicle_form_row">
                                        <div className="first_column">Tipo:</div>
                                        <select defaultValue="" required>
                                            <option value="" selected disabled hidden>Seleccionar el tipo del vehículo</option>
                                            {state.type.map((type, index) => (
                                                <option key={index}>{type.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="vehicle_form_row">
                                        <div className="first_column">Año:</div>
                                        <input required type="text" placeholder="Insertar año del vehículo" />
                                    </div>
                                    <div className="vehicle_form_row">
                                        <div className="first_column">Precio:</div>
                                        <input required type="text" placeholder="Insertar precio de vehículo" />
                                    </div>
                                    <div className="vehicle_form_row">
                                        <div className="first_column">Patente:</div>
                                        <input required type="text" placeholder="Insertar patente del vehículo" />
                                    </div>
                                    <div className="vehicle_form_row">
                                        <div className="first_column">Descripción:</div>
                                        <input required type="text" placeholder="Insertar una breve Descripción del vehiculo" />
                                    </div>
                                    <div className="vehicle_form_row">
                                        <div className="first_column">Características:</div>
                                        <div className="second_column feature_checkboxes_block">
                                            {
                                                state.feature.length < 1 ?
                                                    <p>No hay características creadas</p> :
                                                    state.feature.map(
                                                        (feature, index) => {
                                                            return ( 
                                                                <React.Fragment key={feature.idFeature}>
                                                                    <div className="checkbox_and_feature_couple">
                                                                        <input 
                                                                            className="feature_input_checkbox"
                                                                            type="checkbox"
                                                                            id={`feature${feature.idFeature}`}
                                                                            onInput={(e) => featuresCheckUncheck(e, feature, index)}
                                                                        />
                                                                        <label
                                                                            className="feature_checkbox_title"
                                                                            htmlFor={`feature${feature.idFeature}`}
                                                                        >
                                                                            {feature.name}
                                                                        </label>
                                                                    </div>
                                                                </React.Fragment>
                                                            )
                                                        }
                                                    )
                                            }
                                        </div>
                                    </div>
                                    <div className="vehicle_form_row">
                                        <div className="first_column">Imágenes:</div>
                                        <input id="file_input" type="file" accept="image/*" onChange={changeUploadImage} />
                                        <label htmlFor="file_input" className="file_input_label">Choose a file...</label>
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
                            </>
                        )}
                    </div>
                    <AdministracionPhoneError />
                </div>
                    
                )}
                <ToastContainer/>
        </>
    );
};

export default Administracion;
