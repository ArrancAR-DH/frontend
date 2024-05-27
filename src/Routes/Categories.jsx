import { useEffect, useState } from 'react'
import axios from 'axios'
import AdministracionPhoneError from '../Components/Phone Error/AdministracionPhoneError'
import { useStorage } from '../Context/StorageContext'

const CreateCategories = () => {
    const { getToken } = useStorage();
    const token = getToken();

    const [brands, setBrands] = useState([])
    // const [models, setModels] = useState([])
    const [types, setTypes] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/brand/all").then((res) => {
            setBrands(res.data);
        });
        //? seguramente se elimine esto
        // axios.get('http://localhost:8080/model/all').then(res => {
        //     setModels(res.data)
        // })
        axios.get('http://localhost:8080/type/all').then(res => {
            setTypes(res.data)
        })
    }, [])

    function createCategory(category, value) {
        if (value === '') return;
        let exists;
        switch (category) {
            case 'brand':
                exists = brands.filter(brand => brand.name === value);
                if (exists.length > 0) return alert('Ya existe esa categoría');
                break;
            case 'type':
                exists = types.filter(type => type.name === value);
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
            console.log(res)
            switch (category) {
                case 'brand':
                    setBrands([...brands, res.data])
                    break;
                case 'type':
                    setTypes([...types, res.data])
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

    return (
        <div className='create__categories__container'>
            <h2 className='title__admin'>Administración</h2>
            <div className="administracion__funciones">
                <div className="administracion__categories">
                    <div className="create__categories">
                        <h3>Crear categorías</h3>
                        <div>
                            <h4>Marca: </h4>
                            <input type="text" id='brand-input' />
                            <button onClick={() => {
                                const brand = document.getElementById('brand-input').value
                                createCategory('brand', brand)
                            }}>Crear</button>
                        </div>
                        <div>
                            <h4>Modelo: </h4>
                            <input type="text" />
                            <button>Crear</button>
                        </div>
                        <div>
                            <h4>Tipo: </h4>
                            <input type="text" id='type-input' />
                            <button onClick={() => {
                                const type = document.getElementById('type-input').value
                                if (types.includes(type)) return alert('Ya existe esa categoría')
                                createCategory('type', type)
                            }}>Crear</button>
                        </div>
                    </div>
                    <div className="delete__categories">
                        <h3>Eliminar categorías</h3>
                        <div>
                            <h4>Marca: </h4>
                            <select>
                                {brands?.map((type, index) => {
                                    return (
                                        <option key={index}>{type}</option>
                                    )
                                })}
                            </select>
                            <button onClick={() => {
                                const brandLabel = document.getElementById('delete-brand-select').value.toLowercase().strip();
                                const brandObj = brands.find(brand => brand.name.toLowerCase().strip() === brandLabel);
                                deleteCategory('brand', brandObj.id);
                            }}>Borrar</button>
                        </div>
                        <div>
                            <h4>Modelo: </h4>
                            <select>
                                {["modelo1", "modelo2", "modelo3", "modelo4"].map((type, index) => {
                                    return (
                                        <option key={index}>{type}</option>
                                    )
                                })}
                            </select>
                            <button>Borrar</button>
                        </div>
                        <div>
                            <h4>Tipo: </h4>
                            <select id='delete-type-select'>
                                {types?.map((type, index) => {
                                    return (
                                        <option key={index} value={type}>{type}</option>
                                    )
                                })}
                            </select>
                            <button onClick={() => {
                                const typeLabel = document.getElementById('delete-type-select').value.toLowercase().strip()
                                const typeObj = types.find(type => type.name.toLowerCase() === typeLabel)
                                deleteCategory('type', typeObj.id)
                            }}>Borrar</button>
                        </div>
                    </div>
                </div>
            </div>
            <AdministracionPhoneError />
        </div>
    )
}

export default CreateCategories