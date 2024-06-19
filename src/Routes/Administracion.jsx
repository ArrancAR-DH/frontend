import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../Components/Spinner";
import AdministracionPhoneError from "../Components/Phone Error/AdministracionPhoneError";
import { useContextGlobal } from "../Context/GlobalContext";
import { routes } from "../utils/routes";

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
        populateSelectedFeaturesArray();
    }, [state]);

    function featuresCheckUncheck( e, feature, index ) {
        // e.preventDefault();
        // console.log( e.target.checked );
        // console.log( index );
        selectedFeatures[index] = e.target.checked; // Modificacion en la referenciad del array de selectedFeatures
        // console.log( selectedFeatures );
    }

    function populateSelectedFeaturesArray() {
        let aux = state.feature.map(
            (element, index) => {
                return false;
            }
        )
        setSelectedFeatures(aux);
    };

    function inyectarFeatures( res, feat, form ){
        console.log(res.data.idVehicle);

        console.log( feat );

        // return;
        //



        feat.forEach(element => {
            axios.post( `${routes.url_postCar}/${res.data.idVehicle}/features/${element.idFeature}`, 
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic " + token,
                },
            }).then((response) => {
                    setError("");
                }).catch((error) => {
                    console.log(error);
                    setError("Hubo un error al guardar el vehículo.");
                    setSuccess(false);
                });
        });
        setSuccess(true);
    }

    function postVehiculo(postJson, features, form) {
        axios.post("http://localhost:8080/vehicle", postJson, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + token,
            },
        }).then((response) => {
                inyectarFeatures(response, features, form);
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

    function validateFields(
        marca,
        modelo,
        tipo,
        year,
        price,
        patente,
        descripcion,
        featuresV
    ){

        // console.log( marca );
        // console.log( featuresV );
        if ( 
            marca === "" |
                modelo === "" |
                tipo === "" |
                year === "" | year[0] === " " |
                price === "" | price[0] === " " |
                patente === "" | patente[0] === " " |
                descripcion === "" | descripcion[0] === " " |
                featuresV.length === 0
        ){
            setError( "Por favor completar todos los campos" );
            return false;
        }
        return true;
    }

    function submitForm(e) {
        e.preventDefault();
        // console.log( e.target );
        //

        const featuresV = [];
        selectedFeatures.forEach((element, index) => {
            if( element === true ) featuresV.push( state.feature[index] );
        });

        const marcaLabel = e.target[0].value;
        const modeloLabel = e.target[1].value;
        const tipoLabel = e.target[2].value;
        const year = e.target[3].value;
        const price = e.target[4].value;
        const patente = e.target[5].value.toUpperCase();
        const descripcion = e.target[6].value;

        // Valido los campos del form de creacion de vehiculo
        if ( !validateFields(
            marcaLabel,
            modeloLabel,
            tipoLabel,
            year,
            price,
            patente,
            descripcion,
            featuresV )
        ){
            // Clear form
            e.target.reset();
            return;
        }

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

        console.log( postJson );

        // return;
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
                                        <input type="text" placeholder="Insertar año del vehículo" />
                                    </div>
                                    <div className="vehicle_form_row">
                                        <div className="first_column">Precio:</div>
                                        <input type="text" placeholder="Insertar precio de vehículo" />
                                    </div>
                                    <div className="vehicle_form_row">
                                        <div className="first_column">Patente:</div>
                                        <input type="text" placeholder="Insertar patente del vehículo" />
                                    </div>
                                    <div className="vehicle_form_row">
                                        <div className="first_column">Descripción:</div>
                                        <input type="text" placeholder="Insertar una breve Descripción del vehiculo" />
                                    </div>
                                    <div className="vehicle_form_row">
                                        <div className="first_column">Características:</div>
                                        <div className="second_column" className="feature_checkboxes_block">
                                            {
                                                state.feature.map(
                                                    (feature, index) => {
                                                        return( // (El key es para eliminar un warning de REACT sobre la performance de la pag.)
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
        </>
    );
};

export default Administracion;
