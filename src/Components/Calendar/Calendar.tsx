import React, { useState } from 'react';
import DayEntry from '../DayEntry/DayEntry';

// months
// days 
// years
export interface DayProps {
    day: number;
}

//Modal to view a selected day
const Day: React.FC<DayProps> = ({ day }) => {
    const [showDayEntry, setShowDayEntry] = useState(false);

    return (
        <div className="w-64 h-32 border border-sky-50">
            {day}
            <div className="relative bottom-0">
                <button onClick={() => setShowDayEntry(!showDayEntry)}>+</button>
            </div>
            {showDayEntry && (<DayEntry day={day} show={showDayEntry} setShow={setShowDayEntry}/>)}
        </div>
    )
}

const Calendar = () => {
    const date = new Date();
    const [month, setMonth] = useState(date.getMonth());
    const [year, setYear] = useState(date.getFullYear());

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const daysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    }

    const prev = () => {
        let newMonth = month - 1
        if (newMonth < 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(newMonth)
        }
    }

    const next = () => {
        let newMonth = month + 1
        if (newMonth > 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(newMonth);
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mx-auto w-2/3 my-10">
                <button onClick={prev}>Prev</button>
                <h2>{months[month]} {year}</h2>
                <button onClick={next}>Next</button>
            </div>
            <div className="flex justify-between items-center flex-wrap m-5">
                {Array.from({ length: daysInMonth(month, year) }, (_, i) => (
                    <Day key={month.toString() + i.toString()} day={i + 1} />
                ))}
            </div>
        </div >
    )
}

export default Calendar