import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Card from '../Components/Card'

const Search = () => {
    const { search } = useParams();
    const [cars, setCars] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/vehicle/all").then((res) => {
            setCars(res.data);
        });
    }, []);

    const searchCars = () => {
        let result = [];
        if (!search) return cars;
        cars.forEach(car => {
            if (car.brand?.name.toLowerCase().includes(search.toLowerCase()) || 
                car.model?.name.toLowerCase().includes(search.toLowerCase()) || 
                search.toLowerCase() == car.brand?.name.toLowerCase() + " " + car.model?.name.toLowerCase()) {
                result.push(car);
            }
        });
        return result;
    }

    return (
        <div className="search__container">
            <h2>Resultados de la búsqueda:</h2>
            <div className="search__results">
                {searchCars().map((car, key)=> <Card car={car} key={key}/>)}
            </div>
        </div>
    )
}
export default Search