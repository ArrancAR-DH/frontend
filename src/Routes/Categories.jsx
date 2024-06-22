import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import AdministracionPhoneError from '../Components/Phone Error/AdministracionPhoneError'
import { Link } from 'react-router-dom'
import { useContextGlobal } from "../Context/GlobalContext";
import { routes } from "../utils/routes";

const CreateCategories = () => {
    const { state, getToken, dispatch } = useContextGlobal();
    const token = getToken();
    const [render, setRender] = useState(true);
    const [ brandInputValue, setBrandInputValue ] = useState("");
    const [ modelInputValue, setModelInputValue ] = useState("");
    const [ typeInputValue, setTypeInputValue ] = useState("");
    const [ featureInputValue, setFeatureInputValue ] = useState("");

    const formReference = useRef(null);
    const handleBrandInput = (e) => {
        setBrandInputValue(e.target.value);
    }
    const handleModelInput = (e) => {
        setModelInputValue(e.target.value);
    }
    const handleTypeInput = (e) => {
        setTypeInputValue(e.target.value);
    }
    const handleFeatureInput = (e) => {
        setFeatureInputValue(e.target.value);
    }

    function createCategory(e, category, value) {
        e.preventDefault()
        if (value === '') return alert("Campos vacios");
        if (value[0] === " ") return alert("Campos vacios");
        let exists;
        switch (category) {
            case 'brand':
                exists = state.brand.filter(brand => brand.name === value);
                setBrandInputValue("");
                if (exists.length > 0) return alert('Ya existe esa categoría');
                break;
            case 'type':
                exists = state.type.filter(type => type.name === value);
                setTypeInputValue("");
                if (exists.length > 0) return alert('Ya existe esa categoría');
                break;
            case 'model':
                exists = state.model.filter(model => model.name === value);
                setModelInputValue("");
                if (exists.length > 0) return alert('Ya existe esa categoría');
                break;
            default:
                break;
        }
        axios.post(`http://localhost:8080/${category}`, { name: value }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Basic " + token,
            },
        }).then(res => {
                alert("Categoría creada con éxito")
                switch (category) {
                    case 'brand':
                        dispatch({ type: 'SET_LIST_BRAND', payload: [...state.brand, res.data] });
                        break;
                    case 'type':
                        dispatch({ type: 'SET_LIST_TYPE', payload: [...state.type, res.data] });
                        break;
                    case 'model':
                        dispatch({ type: 'SET_LIST_MODEL', payload: [...state.model, res.data] });
                        break;
                    default:
                        break;                
                }
            }).catch(err => {
                console.log(err)
            })
    }

    function deleteCategory(e, string) {
        e.preventDefault()
        const categoryToDelete = state[`${string}`].find( 
            (value) => {
                return ( e.target.elements[0].value === value.name );
            }
        );

        let aux = Array.from( string );
        let categoryIdField = ( aux.map( (letter, index) => { return ( index === 0 ) ? letter.toUpperCase() : letter } ) )
        categoryIdField = categoryIdField.join("");
        categoryIdField = "id" + categoryIdField; 
        axios.delete(
            `${ routes.url_base }/${ string }/delete/${ categoryToDelete[`${categoryIdField}`] }`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + token,
                },
            }
        ).then(res => {
                alert("Categoria eliminada")
                    dispatch({ 
                    type: `SET_LIST_${string.toUpperCase()}`, 
                    payload: ( state[`${string}`].filter( (element) => element[`${categoryIdField}`] !== categoryToDelete[`${categoryIdField}`]) ) 
                });
                console.log( state[`${string}`] );
            }).catch(err => {
                alert("Categoria en uso: No es posible, eliminar una categoría que esté siendo usada!");
            })
    }

    function createFeature(e) {
        e.preventDefault()
        if (featureInputValue === "") return alert("Campos vacios");
        if (featureInputValue[0] === " ") return alert("Campos vacios");
        setFeatureInputValue(""); 
        if ( (state.feature.find(feature => feature.name === featureInputValue))) {
            setFeatureInputValue(""); 
            return alert('Ya existe esa categoría');  
        }
        axios.post(`${routes.url_base}/feature`, 
            { 
                name: featureInputValue 
            }, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + token,
                },
            }
        ).then(res => {
                alert("Característica creada con éxito");
 
                setFeatureInputValue(""); 
                dispatch({ type: 'SET_LIST_FEATURES', payload: [...state.feature, res.data] });
            }).catch(err => {
        })
    }

    const deleteFeature = (e) => {
        e.preventDefault();
        const featureToDelete = state.feature.find( 
            (value) => {
                return ( e.target.elements[0].value === value.name );
            }
        );
        axios.delete(`${routes.url_base}/feature/delete/${featureToDelete.idFeature}`, 

            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + token,
                },
            }
        ).then(res => {
                alert("Característica eliminada")
                dispatch({ type: 'SET_LIST_FEATURES', payload: ( state.feature.filter( (feature) => feature.idFeature !== featureToDelete.idFeature)  ) });
            }).catch(err => {
                alert("Característica en uso: No es posible, eliminar una característica que esté siendo usada!");
            })
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
                                            if (state.brand.includes(brand)) return alert("Ya existe esa categoría")
                                            createCategory(e, 'brand', brand, input)
                                        }}>Crear</button>
                                    </div>
                                    <div>
                                        <h4>Modelo: </h4>
                                        <input type="text" id='model-input' value={modelInputValue} onInput={handleModelInput}/>
                                        <button onClick={ (e) => {
                                            const input = document.getElementById('model-input');
                                            const model = input.value;
                                            if (state.model.includes(model)) return alert("Ya existe esa categoría")
                                            createCategory(e, 'model', model, input)
                                        }}>Crear</button>

                                    </div>
                                    <div>
                                        <h4>Tipo: </h4>
                                        <input type="text" id='type-input' value={typeInputValue} onInput={handleTypeInput}/>
                                        <button onClick={(e) => {
                                            const input = document.getElementById('type-input');
                                            const type = input.value;
                                            if (state.type.includes(type)) return alert('Ya existe esa categoría');
                                            createCategory(e, 'type', type, input)
                                        }}>Crear</button>

                                    </div>
                                </form>
                            </div>
                            <div className="delete__categories">
                                <h3>Eliminar categorías</h3>
                                <div>
                                    <h4>Marca: </h4>
                                    <form onSubmit={(e) => deleteCategory(e, "brand")} className='delete-brand-form'>
                                        <select>
                                            {state.brand?.map((type, index) => {
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
                                    <form onSubmit={(e) => deleteCategory(e, "model")} className='delete-model-form'>
                                        <select>
                                            {state.model?.map((type, index) => {
                                                return (
                                                    <option key={index}>{type.name}</option>
                                                )
                                            })}
                                        </select>
                                        <button>Borrar</button>
                                    </form>
                                </div>
                                <div>
                                    <h4>Tipo: </h4>
                                    <form onSubmit={(e) => deleteCategory(e, "type")} className='delete-type-form'>
                                        <select>
                                            {state.type?.map((type, index) => {
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
                        <div className='administracion__features'>
                            <div className="create__features">
                                <form action="" id='formu-caracteristicas'>
                                    <h3 id='create'>Crear característica</h3>
                                    <div>
                                        <h4>Característica: </h4>
                                        <input type="text" id='feature-input' value={featureInputValue} onInput={handleFeatureInput}/>
                                        <button onClick={createFeature}>Crear</button>
                                    </div>

                                </form>
                            </div>
                            <div className="delete__features">
                                <h3>Eliminar característica</h3>
                                <div>
                                    <h4>Característica: </h4>
                                    <form onSubmit={deleteFeature} className='delete-feature-form'>
                                        <select>
                                            {state.feature?.map((type, index) => {
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
