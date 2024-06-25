import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../Components/Card'
import { useContextGlobal } from '../Context/GlobalContext'

const Search = () => {
    const { search } = useParams();    
    const isNumber = ['0','1','2','3','4','5','6','7','8','9']   
    const { state } = useContextGlobal();
    const { data } = state;
    const [cars, setCars] = useState([]);
    // if (search.split(' ')[0] == '$'){
    //     const nombre = ''
    // }
    // else if (search.split(' ')[0]  != '$') {
    //     const nombre = search.split(' ')[0]
    // } 
    

    // }
    let nombre = ''
    let inicio = ''
    let fin = ''
    console.log();
    if(search.split(' ')[1] == undefined){
        nombre = search.split(' ')[0] == '$'? '': search.split(' ')[0]
    }
    else if (isNumber.includes(search.split(' ')[1][0])) {
        nombre = search.split(' ')[0] == '$'? '': search.split(' ')[0]
        inicio = search.split(' ')[1]
        fin = search.split(' ')[2]
    }
    
    else{
        nombre = search.split(' ')[0] + ' ' + search.split(' ')[1]
        inicio = search.split(' ')[2]
        fin = search.split(' ')[3]
        
    }
    
    
    useEffect(() => {
        setCars(state.data)
    }, [data])
     
     const searchCars = () => {
        let result = [];
        if (!nombre && !inicio && !fin) return cars;
        cars.forEach(car => {
            const nombreEnMarcaOModelo = car.brand?.name.toLowerCase().includes(nombre.toLowerCase()) ||
                                         car.model?.name.toLowerCase().includes(nombre.toLowerCase()) ||
                                         nombre.toLowerCase() == car.brand?.name.toLowerCase() + " " + car.model?.name.toLowerCase();
            
            if (nombreEnMarcaOModelo) {
                let valid = true;
                car.bookings.forEach(booking => {
                    const bookingStartsOn = new Date(booking.startsOn);
                    const bookingEndsOn = new Date(booking.endsOn);
                    const inicioDate = new Date(inicio);
                    const finDate = new Date(fin);
    
                    if ((inicioDate >= bookingStartsOn && inicioDate <= bookingEndsOn) ||
                        (finDate >= bookingStartsOn && finDate <= bookingEndsOn)) {
                        valid = false;
                    }
                });
    
                if (valid) {
                    result.push(car);
                }
            }
        });
        return result;
    };

    return (
        <div className="search__container">
            <h2>Resultados de la búsqueda:</h2>
            <div className="search__results">
                {searchCars().map((car, key) => <Card car={car} key={key} />)}
            </div>
        </div>
    )
}
export default Search