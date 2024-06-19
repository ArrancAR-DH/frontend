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
    // const [referenceToForm, setReferenceToForm] = useState();
    const [ brandInputValue, setBrandInputValue ] = useState("");
    const [ modelInputValue, setModelInputValue ] = useState("");
    const [ typeInputValue, setTypeInputValue ] = useState("");
    const [ featureInputValue, setFeatureInputValue ] = useState("");

    const formReference = useRef(null);

    // useEffect(() => {
    //     setBrands(state.brand);
    //     setModels(state.model);
    //     setTypes(state.type);
    //     setFeatures(state.feature);
    // }, [])

    // useEffect(() => {
    //     let formulario = formReference.current;
    //     console.log( formulario );
    //     setReferenceToForm( formulario );
    //     formulario?.addEventListener('submit', function() {
    //         formulario.reset();
    //     });
    //     console.log( features );
    // },[]);

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

    function createCategory(e, category, value, input) {
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
        // referenceToForm.reset();
        // console.log(input);;
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
                // window.location.reload(); // Buenas chicos, saco esto debido a que hace una interrupcion en el flujo normal de actualizaciones del DOM de REACT
            }).catch(err => {
                console.log(err)
            })
    }

    function deleteCategory(e, string) {
        e.preventDefault()

        // Busco en el array correspondiente ( acceso a un campo del objeto <state> dinamicamente -> [`${string}`] ) el 
        // objeto que debo usar como payload para hacer la llamada a la API usando una operacion DELETE en axios
        const categoryToDelete = state[`${string}`].find( 
            (value) => {
                return ( e.target.elements[0].value === value.name );
            }
        );

        // Convierto el string normal que indica el tipo de categoria (brand, model, o type) a un arreglo
        let aux = Array.from( string );

        // Para luego hacer su primera letra, una mayuscula
        let categoryIdField = ( aux.map( (letter, index) => { return ( index === 0 ) ? letter.toUpperCase() : letter } ) )

        // // Prueba
        // console.log( categoryIdField ); // Output: Array(5) [ "B", "r", "a", "n", "d" ]

        // Convierto ahora el array de strings a un objeto de tipo String:
        categoryIdField = categoryIdField.join(""); // Output: "Brand"/"Type"/"Model"

        // Concateno al comienzo del string la palabra "id"
        categoryIdField = "id" + categoryIdField; // Output: "idBrand"/"idType"/"idModel"

        // API Call ( POST /feature ) - Eliminar Category en el back
        axios.delete(
            // URL:
            `${ routes.url_base }/${ string }/delete/${ categoryToDelete[`${categoryIdField}`] }`,  // Ejemplo:
            //        ^          ^     ^        ^                         ^
            //       URL         |     |        |                         |
            //                  "/"    |        |                         |
            //                      category    |                         |
            //                              "/delete/"                    |
            //                                  ObjetoCategoria.campoIDdeObjetoCategoria (accedido dinamicamente)
            // Headers:
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + token,
                },
            }
        ).then(res => {
                alert("Categoria eliminada")
                // setFeatures(features.filter( (feature) => feature.idFeature !== featureToDelete.idFeature) )
                // console.log( state[`${string}`] );
                // state[`${string}`].forEach(element => {
                //     console.log( element );
                //     console.log(element[`${categoryIdField}`]);
                //     console.log(featureToDelete[`${categoryIdField}`]);
                // });
                // console.log( state[`${string}`].filter( (element) => element[`${categoryIdField}`] !== featureToDelete[`${categoryIdField}`] ) );
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

        // Input Vacio
        if (featureInputValue === "") return alert("Campos vacios");
        if (featureInputValue[0] === " ") return alert("Campos vacios");

        setFeatureInputValue(""); 

        // Input existe en el array de features
        if ( (state.feature.find(feature => feature.name === featureInputValue))) {
            // Limpiar input
            setFeatureInputValue(""); 
            return alert('Ya existe esa categoría'); // Salir con mensaje de error
        }

        // API Call ( POST /feature ) - Crear Feature en el back
        axios.post(`${routes.url_base}/feature`, 
            // Payload
            { 
                name: featureInputValue 
            }, 
            // Headers
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + token,
                },
            }
        ).then(res => {
                alert("Característica creada con éxito");
                // Limpiar input
                setFeatureInputValue(""); 
                dispatch({ type: 'SET_LIST_FEATURES', payload: [...state.feature, res.data] });
                // setFeatures([...features, res.data]);
            }).catch(err => {
                // console.log(err)
            })
    }

    const deleteFeature = (e) => {
        e.preventDefault();

        // String Seleccionado
        // console.log( e.target.elements[0].value );

        const featureToDelete = state.feature.find( 
            (value) => {
                return ( e.target.elements[0].value === value.name );
            }
        );

        // Elemento del array local de features encontrado (el que voy a eliminar)
        // console.log(featureToDelete);

        // API Call ( POST /feature ) - Eliminar Feature en el back
        axios.delete(`${routes.url_base}/feature/delete/${featureToDelete.idFeature}`, 
            // Headers
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Basic " + token,
                },
            }
        ).then(res => {
                alert("Característica eliminada")
                // setFeatures(features.filter( (feature) => feature.idFeature !== featureToDelete.idFeature) )
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
