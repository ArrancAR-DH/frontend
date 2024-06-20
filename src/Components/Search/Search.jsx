import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { useContextGlobal } from '../../Context/GlobalContext';
import './styles.scss';
import 'react-datepicker/dist/react-datepicker.css';

const Search = () => {
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [dropdownList, setDropdownList] = useState([]);
    const { state } = useContextGlobal();
    const { data } = state;
    const [cars, setCars] = useState([]);

    useEffect(() => {
        setCars(state.data);
    }, [data]);

    const updateSearch = (input, start, end) => {
        const formattedStartDate = start ? moment(start).format('DD/MM/YYYY') : '';
        const formattedEndDate = end ? moment(end).format('DD/MM/YYYY') : '';
        setSearch(`${input} ${formattedStartDate} ${formattedEndDate}`.trim());
    };

    const onSearchChange = (e) => {
        const newSearchInput = e.target.value;
        setSearchInput(newSearchInput);
        updateSearch(newSearchInput, startDate, endDate);

        if (!newSearchInput || newSearchInput.trim() === "") {
            setDropdownList([]);
            return;
        }

        const newCarsList = cars.filter(car => {
            const searchTerm = newSearchInput.toLowerCase();
            return car.brand?.name.toLowerCase().includes(searchTerm) ||
                car.model?.name.toLowerCase().includes(searchTerm) ||
                (car.brand?.name.toLowerCase() + " " + car.model?.name.toLowerCase()).includes(searchTerm);
        });

        const result = newCarsList
            .map(car => `${car.brand.name} ${car.model.name}`)
            .slice(0, 5);
        setDropdownList(result);
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
        updateSearch(searchInput, start, end);
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        window.location.href = `/search/${search}`;
    };

    return (
        <div className="outer__search">
            <form className='search' onSubmit={onFormSubmit}>
                <input placeholder="Buscar autos..." type="text" value={searchInput} onChange={onSearchChange} />
                <DatePicker
                    className='datepicker'
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat='dd/MM/yyyy'
                    selectsRange
                    minDate={new Date()}
                />
                <button type="submit">
                    Buscar 🔎
                </button>
            </form>
            {dropdownList.length > 0 &&
                <div className="dropdown">
                    {dropdownList.map((item, index) => (
                        <div key={index} className="dropdown__item" onClick={() => { setSearch(item); setDropdownList([]) }}>
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default Search;
