import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useContextGlobal } from "../Context/GlobalContext";
import {routes} from "../utils/routes"

const EditVehicleOverlay = ({ vehicle, setVehicleBeingEdited, setCars }) => {
    const { state, getToken } = useContextGlobal();
    const token = getToken();

    const [error, setError] = useState("");
    function errorHandling(string) {
        if (!string) {
            setError("");
            return;
        }
        let result = "Error al enviar al formulario: " + string;
        setError(result);
        setSuccess(false);
    }

    const [success, setSuccess] = useState(false);

    function submitForm(e) {
        e.preventDefault();
        const plate = e.target[5].value.toUpperCase();
        const patenteEnUso = carsList.filter(car => car.plate === plate);
        if (patenteEnUso.length > 0) {
            setError("La patente ingresada ya está en uso.");
            return;
        }
        const brandLabel = e.target[0].value;
        const modelLabel = e.target[1].value;
        const typeLabel = e.target[2].value;
        const year = e.target[3].value;
        const price = e.target[4].value;
        const description = e.target[6].value;

        if (!plate || !description || !modelLabel || !typeLabel || !brandLabel || !price || !year) {
            return errorHandling("Por favor, complete todos los campos.");
        }
        if (isNaN(parseFloat(price)) || isNaN(parseInt(year))) {
            return errorHandling("Por favor, ingrese un precio y un año válidos.");
        }
        errorHandling(false);
        const brandId = brands.find(brand => brand.name === brandLabel).idBrand;
        const modelId = models.find(model => model.name === modelLabel).idModel;
        const typeId = types.find(type => type.name === typeLabel).idType;

        const payload = {
            idVehicle: vehicle.idVehicle,
            plate: plate,
            description: description,
            reserved: vehicle.reserved,
            price: price,
            imgUrls: images.map((url) => { return { url: url } }),
            bookings: vehicle.bookings,
            brand: { idBrand: brandId, name: brandLabel },
            model: { idModel: modelId, name: modelLabel },
            type: { idType: typeId, name: typeLabel },
            features: vehicle.features,
            year: year
        }
        axios.put(`${routes.url_postCar}/${vehicle.idVehicle}`, payload, {

        
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + token,
            }
        })
        setSuccess("Vehículo editado con éxito.");
        setCars(prev => {
            const newCars = [...prev];
            const index = newCars.findIndex(car => car.idVehicle === vehicle.idVehicle);
            newCars[index] = payload;
            return newCars;
        })
    }

    const [images, setImages] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [carsList, setCarsList] = useState([]);
    const [types, setTypes] = useState([]);
    useEffect(() => {
        setBrands(state.brand);
        setModels(state.model);
        setTypes(state.type);
        setCarsList(state.data);
        const images = vehicle.imgUrls.map((img) => img.url);
        setImages(images);
    }, [state]);

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
    const [selectedBrand, setSelectedBrand] = useState(vehicle.brand.name);
    const [selectedModel, setSelectedModel] = useState(vehicle.model.name);
    const [selectedType, setSelectedType] = useState(vehicle.type.name);
    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
    }
    const handleModelChange = (e) => {
        setSelectedModel(e.target.value);
    }
    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    }
    return (
        <div className="editing__vehicle__overlay">
            <h2>Edicion de vehículo</h2>
            <form onSubmit={submitForm}>
                <div>
                    <p>Marca:</p>
                    <select value={selectedBrand} onChange={handleBrandChange}>
                        {brands?.map((brand, index) => (
                            <option key={index} value={brand.name}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <p>Modelo:</p>
                    <select value={selectedModel} onChange={handleModelChange}>
                        {models?.map((model, index) => (
                            <option key={index} value={model.name}>
                                {model.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <p>Tipo:</p>
                    <select value={selectedType} onChange={handleTypeChange}>
                        {types?.map((type, index) => (
                            <option key={index} value={type.name}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <p>Año:</p>
                    <input type="text" placeholder="1997" defaultValue={vehicle.year} />
                </div>
                <div>
                    <p>Precio:</p>
                    <input type="text" placeholder="30000" defaultValue={vehicle.price} />
                </div>
                <div>
                    <p>Patente:</p>
                    <input type="text" placeholder="RNV761" defaultValue={vehicle.plate} />
                </div>
                <div>
                    <p>Descripción:</p>
                    <input type="text" placeholder="Vehículo premium, clásico. En perfecto estado, sin detalles." defaultValue={vehicle.description} />
                </div>
                <div>
                    <p>Imágenes:</p>
                    <input type="file" accept="image/*" onChange={changeUploadImage} />
                </div>
                <div className="imagenes__subidas">
                    {images?.map((url, index) => {
                        if (!url) return;
                        return (
                            <div key={index}>
                                <a href={url} target="_blank"><img src={url} alt={`Imagen ${index + 1}`} /></a>
                                <button type="button" onClick={() => setImages(images.filter((_, i) => i !== index))}>Eliminar</button>
                            </div>
                        )
                    })}
                </div>
                {error && <p className="edicion__vehiculo__error">{error}</p>}
                {success && <p className="edicion__vehiculo__success">{success}</p>}
                <div className='overlay__buttons'>
                    <button type='submit'>Guardar</button>
                    <button type="button" onClick={() => { setVehicleBeingEdited(false) }}>Volver</button>
                </div>
            </form>
        </div>
    )
}

export default EditVehicleOverlay
