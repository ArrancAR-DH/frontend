import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useContextGlobal } from "../Context/GlobalContext";


const URL = import.meta.env.VITE_BACKEND_URL;

const EditVehicleOverlay = ({ vehicle, setVehicleBeingEdited, setCars }) => {
    const { getToken } = useContextGlobal();
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
        const brandLabel = e.target[0].value;
        const modelLabel = e.target[1].value;
        const typeLabel = e.target[2].value;
        const year = e.target[3].value;
        const price = e.target[4].value;
        const plate = e.target[5].value.toUpperCase();
        const description = e.target[6].value;

        if (!plate || !description || !modelLabel || !typeLabel || !brandLabel || !price || !year) {
            return errorHandling("Por favor, complete todos los campos.");
        }
        // check if price is double and year is number
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
        console.log(payload)
        axios.put(`http://localhost:8080/vehicle/${vehicle.idVehicle}`, payload, {
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
    const [types, setTypes] = useState([]);
    useEffect(() => {
            axios.get(`${URL}/brand/all`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + token,
            }
        }).then((res) => {
            setBrands(res.data);
        });
        axios.get("http://localhost:8080/model/all", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + token,
            }
        }).then((res) => {
            setModels(res.data);
        });
        axios.get('http://localhost:8080/type/all', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + token,
            }
        }).then(res => {
            setTypes(res.data)
        })
        const images = vehicle.imgUrls.map((img) => img.url);
        setImages(images);
    }, [])

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
    console.log(vehicle)
    return (
        <div className="editing__vehicle__overlay">
            <h2>Edicion de vehículo</h2>
            <form onSubmit={submitForm}>
                <div>
                    <p>Marca:</p>
                    <select defaultValue={vehicle.brand.name}>
                        {brands?.map((brand, index) => {
                            if (brand.name === vehicle.brand.name)
                                return <option key={index} value={brand.name} selected>{brand.name}</option>
                            return <option key={index} value={brand.name}>{brand.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <p>Modelo:</p>
                    <select defaultValue={vehicle.model.name}>
                        {models?.map((model, index) => {
                            if (model.name === vehicle.model.name)
                                return <option key={index} value={model.name} selected>{model.name}</option>
                            return <option key={index} value={model.name}>{model.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <p>Tipo:</p>
                    <select defaultValue={vehicle.type.name}>
                        {types?.map((type, index) => {
                            if (type.name === vehicle.type.name)
                                return <option key={index} value={type.name} selected>{type.name}</option>
                            return <option key={index} value={type.name}>{type.name}</option>
                        })}
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