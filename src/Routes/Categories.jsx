import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import AdministracionPhoneError from '../Components/Phone Error/AdministracionPhoneError'
 import { Link } from 'react-router-dom'
import { useContextGlobal } from "../Context/GlobalContext";

const CreateCategories = () => {
     const { state, getToken } = useContextGlobal();
    const token = getToken();
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [types, setTypes] = useState([]);
    const [render, setRender] = useState(true);
    const [referenceToForm, setReferenceToForm] = useState();
    const [ brandInputValue, setBrandInputValue ] = useState();
    const [ modelInputValue, setModelInputValue ] = useState();
    const [ typeInputValue, setTypeInputValue ] = useState();
    
    const formReference = useRef(null);

    useEffect(() => {
        setBrands(state.brand);
        setModels(state.model);
        setTypes(state.type)
    }, [state])
 
    useEffect(() => {
        let formulario = formReference.current;
        console.log( formulario );
        setReferenceToForm( formulario );
        // formulario?.addEventListener('submit', function() {
        //     formulario.reset();
        // });
    });

    const handleBrandInput = (e) => {
        setBrandInputValue(e.target.value);
    }
    const handleModelInput = (e) => {
        setModelInputValue(e.target.value);
    }
    const handleTypeInput = (e) => {
        setTypeInputValue(e.target.value);
    }

    function createCategory(e, category, value, input) {
        e.preventDefault()
        if (value === '') return;
        let exists;
        switch (category) {
            case 'brand':
                exists = brands.filter(brand => brand.name === value);
                setBrandInputValue("");
                if (exists.length > 0) return alert('Ya existe esa categoría');
                break;
            case 'type':
                exists = types.filter(type => type.name === value);
                setTypeInputValue("");
                if (exists.length > 0) return alert('Ya existe esa categoría');
                break;
            case 'model':
                exists = models.filter(model => model.name === value);
                setModelInputValue("");
                if (exists.length > 0) return alert('Ya existe esa categoría');
                break;
            default:
                break;
        }
        // referenceToForm.reset();
        console.log(input);;
        axios.post(`http://localhost:8080/${category}`, { name: value }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Basic " + token,
            },
        }).then(res => {
            alert("Categoría creada con éxito")
            console.log(res)
            switch (category) {
                case 'brand':
                    setBrands([...brands, res.data])
                    break;
                case 'type':
                    setTypes([...types, res.data])
                    break;
                case 'model':
                    setModels([...models, res.data])
                    break;
                default:
                    break;
            }
         }).catch(err => {
            console.log(err)
        })
    }

    // todo: delete category (falta del lado del back)
    function deleteCategory(category, id) {
        axios.delete(`http://localhost:8080/${category}/delete/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + token
            }
        }).then(() => {
            switch (category) {
                case 'brand':
                    setBrands(brands.filter(brand => brand.id !== id))
                    break;
                case 'type':
                    setTypes(types.filter(type => type.id !== id))
                    break;
                default:
                    break;
            }
        })
    }


    // let formulario = formReference.current;
    // formulario.addEventListener('submit', function() {
    //   formulario.reset();
    // });

    function submitDeleteForm(e) {
        e.preventDefault()

        if (confirm("¿Estás seguro de que deseas eliminar esta categoría?") === false) return console.log('cancelado')

        // todo: agregar axios.delete(), eliminar esta linea
        return alert("Función no implementada")

        console.log(e.target[0])
        const catLabel = e.target[0].value.toLowerCase();
        // check for form's class to know which category to delete
        if (e.target.className === 'delete-brand-form') {
            const brandObj = brands.find(brand => brand.name.toLowerCase() === catLabel)
            deleteCategory('brand', brandObj.id)
        } else if (e.target.className === 'delete-type-form') {
            const typeObj = types.find(type => type.name.toLowerCase() === catLabel)
            deleteCategory('type', typeObj.id)
        }
        e.target[0].value = ""
    }

    setTimeout(() => {
        setRender(false)  
    }, 180);

    return (
        <>
           {render ?  <p className="loader">Loading....</p> :  

        <div className='create__categories__container'>
            <Link to={`/administracion`}><h3>Volver</h3></Link>
            <h2 className='title__admin'>Administración</h2>
            <div className="administracion__funciones">
                <div className="administracion__categories">
                    <div className="create__categories">
                    <form action="" id='formu' ref={formReference}>
                        <h3 id='create'>Crear categorías</h3>
                        <div>
                            <h4>Marca: </h4>
                            <input type="text" id='brand-input' value={brandInputValue} onInput={handleBrandInput}/>
                            <button onClick={(e) => {
                                const input = document.getElementById('brand-input');
                                const brand = input.value;
                                if (brands.includes(brand)) return alert("Ya existe esa categoría")
                                createCategory(e, 'brand', brand, input)
                                    .then(brand.value = "")
                            }}>Crear</button>
                        </div>
                        <div>
                            <h4>Modelo: </h4>
                            <input type="text" id='model-input' value={modelInputValue} onInput={handleModelInput}/>
                            <button onClick={ (e) => {

                                const input = document.getElementById('model-input');
                                const model = input.value;
                                if (models.includes(model)) return alert("Ya existe esa categoría")
                                createCategory(e, 'model', model, input)
                                    .then(model.value = "")
                            }}>Crear</button>

                        </div>
                        <div>
                            <h4>Tipo: </h4>
                            <input type="text" id='type-input' value={typeInputValue} onInput={handleTypeInput}/>
                            <button onClick={(e) => {
                                const input = document.getElementById('type-input');
                                const type = input.value;
                                if (types.includes(type)) return alert('Ya existe esa categoría');
                                createCategory(e, 'type', type, input)
                                    .then(type.value = "")
                            }}>Crear</button>

                        </div>
                        </form>
                    </div>
                    <div className="delete__categories">
                        <h3>Eliminar categorías</h3>
                        <div>
                            <h4>Marca: </h4>
                            <form onSubmit={submitDeleteForm} className='delete-brand-form'>
                                <select>
                                    {brands?.map((type, index) => {
                                        return (
                                            <option key={index}>{type.name}</option>
                                        )
                                    })}
                                </select>
                                <button>Borrar</button>
                            </form>
                        </div>
                        <div>
                            <h4>Modelo: </h4>
                            <select>
                                {models?.map((type, index) => {
                                    return (
                                        <option key={index}>{type.name}</option>
                                    )
                                })}
                            </select>
                            <button>Borrar</button>
                        </div>
                        <div>
                            <h4>Tipo: </h4>
                            <form onSubmit={submitDeleteForm} className='delete-type-form'>
                                <select>
                                    {types?.map((type, index) => {
                                        return (
                                            <option key={index}>{type.name}</option>
                                        )
                                    })}
                                </select>
                                <button>Borrar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <AdministracionPhoneError />
        </div>}
        </>
    )
}

export default CreateCategories
