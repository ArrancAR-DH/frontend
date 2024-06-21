import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Asegúrate de importar los estilos de react-datepicker

const DateRangePicker = ({bookings}) => {
    console.log(bookings);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [hoveredDate, setHoveredDate] = useState(null);
    const today = new Date();

    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (endDate && date > endDate) {
            setEndDate(null); // Reset end date if start date is after end date
        }
        setHoveredDate(null);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        if (startDate && date < startDate) {
            setStartDate(null); // Reset start date if end date is before start date
        }
        setHoveredDate(null);
    };

    const handleDayMouseEnter = (date) => {
        setHoveredDate(date);
    };

    const isDateInRange = (date) => {
        if (startDate && endDate) {
            return date >= startDate && date <= endDate;
        }
        if (startDate && hoveredDate && startDate !== hoveredDate) {
            return date >= startDate && date <= hoveredDate;
        }
        if (endDate && hoveredDate && endDate !== hoveredDate) {
            return date <= endDate && date >= hoveredDate;
        }
        return false;
    };
    const getExcludedDates = () => {
        const excludedDates = [];
        bookings?.forEach(booking => {
            let currentDate = new Date(booking.startsOn);
            let endDate = new Date(booking.endsOn);
            endDate.setDate(endDate.getDate() +1)
            while (currentDate <= endDate) {
                excludedDates.push(new Date(currentDate));
                
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });
        
        return excludedDates;
    };

    const excludedDates = getExcludedDates();

    const isDisabledDate = (date) => {
        return date < today || (startDate && date < startDate) || (endDate && date > endDate);
    };

    return (
        <div className="datepicker-container">
            <div>
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    onMonthChange={() => setHoveredDate(null)}
                    onDayMouseEnter={handleDayMouseEnter}
                    minDate={today}
                    excludeDates={excludedDates}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Fecha inicio"
                    dayClassName={date =>
                        isDateInRange(date)
                            ? 'react-datepicker__day--in-range'
                            : isDisabledDate(date)
                            ? 'react-datepicker__day--disabled'
                            : undefined
                    }
                    className="datepicker-input"
                />
            </div>
            <div>
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    onMonthChange={() => setHoveredDate(null)}
                    onDayMouseEnter={handleDayMouseEnter}
                    minDate={startDate || today}
                    excludeDates={excludedDates}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Fecha finalizacion"
                    dayClassName={date =>
                        isDateInRange(date)
                            ? 'react-datepicker__day--in-range'
                            : isDisabledDate(date)
                            ? 'react-datepicker__day--disabled'
                            : undefined
                    }
                    className="datepicker-input"
                />
            </div>
        </div>
    );
};

export default DateRangePicker;
