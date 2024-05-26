import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const EditVehicleOverlay = ({ vehicle, setVehicleBeingEdited }) => {
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

        const brand = e.target[0].value;
        const model = e.target[1].value;
        const type = e.target[2].value;
        const year = e.target[3].value;
        const price = e.target[4].value;
        const plate = e.target[5].value.toUpperCase();
        const description = e.target[6].value;

        if (!plate || !description || !model || !type || !brand || !price || !year) {
            return errorHandling("Por favor, complete todos los campos.");
        }
        // check if price is double and year is number
        if (isNaN(parseFloat(price)) || isNaN(parseInt(year))) {
            return errorHandling("Por favor, ingrese un precio y un año válidos.");
        }
        errorHandling(false);
        // todo: enviar postJson a API
        // todo: axios.post()
        setSuccess("Vehículo editado con éxito.");
    }

    const [images, setImages] = useState([]);
    useEffect(() => {
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

    return (
        <div className="editing__vehicle__overlay">
            <h2>Edicion de vehículo</h2>
            <form onSubmit={submitForm}>
                <div>
                    <p>Marca:</p>
                    <input type="text" placeholder="BMW" defaultValue={vehicle.brand?.name} />
                </div>
                <div>
                    <p>Modelo:</p>
                    <input type="text" placeholder="328i" defaultValue={vehicle.model?.name} />
                </div>
                <div>
                    <p>Tipo:</p>
                    <input type="text" placeholder="Coupé" defaultValue={vehicle.type?.name} />
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