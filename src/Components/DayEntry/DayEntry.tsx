import React, {useRef, useState} from "react";
import { WorkoutDay, Exercise } from "../../Schema/workout";

interface DayEntryProps {
    day: number;
    show: boolean;
    setShow: (show: boolean) => void;
}

//Displays the days Excercises, sets, weight
//Allows for entry of sets
const DayEntry: React.FC<DayEntryProps> = ({ day, show, setShow }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setShow(!show);
        }
    }
    return (
        <div onClick={handleBackdropClick} className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div ref={modalRef} className="bg-white p-4 rounded-lg shadow-lg w-2/3 h-1/2">
                <h2 className="text-xl font-bold mb-4 text-black">Day {day} Entry</h2>
                <p>This is where you can add details for the day.</p>
                <button className="mt-4 px-4 py-2 bg-blue-500 rounded" onClick={() => setShow(!show)}>
                    Close
                </button>
            </div>
        </div>
    )
}

export default DayEntry;