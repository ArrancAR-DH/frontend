import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import { useContextGlobal } from '../../Context/GlobalContext'
import './styles.scss'

const Search = () => {
    const [search, setSearch] = useState('')
    const onSearchChange = (e) => {
        const newSearch = e.target.value;
        setSearch(newSearch)
        if (!newSearch || " " === newSearch) {
            setDropdownList([])
            return;
        }
        const newCarsList = cars.filter(car => {
            const searchTerm = newSearch.toLowerCase();
            return car.brand?.name.toLowerCase().includes(searchTerm) ||
                car.model?.name.toLowerCase().includes(searchTerm) ||
                (car.brand?.name.toLowerCase() + " " + car.model?.name.toLowerCase()).includes(searchTerm);
        })
        const result = newCarsList.map(car => `${car.brand.name} ${car.model.name}`);
        setDropdownList(result);
    }

    const { state } = useContextGlobal();
    const { data } = state;
    const [cars, setCars] = useState([]);

    useEffect(() => {
        setCars(state.data)
    }, [data])

    const onFormSubmit = (e) => {
        e.preventDefault();
        window.location.href = `/search/${search}`;
    };

    //* datepicker
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }

    const [dropdownList, setDropdownList] = useState([]);

    return (
        <div className="outer__search">
            <form className='search' onSubmit={onFormSubmit}>
                <input placeholder="Buscar autos..." type="text" value={search} onChange={onSearchChange} />
                <DatePicker className='datepicker' selected={startDate} onChange={handleDateChange} startDate={startDate} endDate={endDate} dateFormat={'dd/MM/yyyy'} selectsRange />
                <button type="submit">
                    Buscar 🔎
                </button>
            </form>
            {dropdownList.length > 0 &&
                <div className="dropdown">
                    {
                        dropdownList.map((item, index) => {
                            return (
                                <div key={index} className="dropdown__item" onClick={() => { setSearch(item); setDropdownList([]) }}>
                                    <p>{item}</p>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Search