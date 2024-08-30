import React, { useState } from "react";
import { addWorkout as addWorkoutDB } from "../../Scripts/firestore";
import { Exercise, Workout, WorkoutDay } from '../../Schema/workout';
import WorkoutDays from "../WorkoutDays/WorkoutDays";
import { workoutDayCardType } from '../../Constants/options';
import { useWorkout, WorkoutProvider } from "../../Contexts/WorkoutContext";
import Input from "../CommonComponents/Input";
import { text } from "../../Constants/text";
import ListValues from "../CommonComponents/ListValues";
import { errorMessages } from "../../Constants/error";
import { successMessage } from "../../Constants/success";
import ErrorMessage from "../CommonComponents/ErrorMessage";
import AddDay from "../AddDay/AddDay";
import SuccessMessage from "../CommonComponents/SuccessMessage";

const AddWorkoutComponent = () => {
    const {
        workout,
        updateWorkoutName,
        removeWorkoutDayFromWorkout,
        resetWorkout,
        removeDayFromWorkout
    } = useWorkout();

    const [err, setErr] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal visibility

    const addWorkout = async () => {
        if (workout.name === "") {
            setErr(errorMessages.INVALID_NAME_ERROR);
            setSuccess(null);
            return errorMessages.INVALID_NAME_ERROR;
        }

        if (workout.workoutDays.length === 0) {
            setErr(errorMessages.NO_WORKOUT_DAY_WORKOUT);
            setSuccess(null);
            return errorMessages.NO_WORKOUT_DAY_WORKOUT;
        }

        if (workout.days.length === 0) {
            setErr(errorMessages.NO_DAYS_WORKOUT);
            setSuccess(null);
            return errorMessages.NO_DAYS_WORKOUT;
        }

        try {
            await addWorkoutDB(workout);
            setSuccess(successMessage.ADD_WORKOUT);
            setErr(null);
            resetWorkout();
        } catch (error) {
            setErr(errorMessages.GENERAL_ERROR);
            setSuccess(null);
            return errorMessages.GENERAL_ERROR;
        }
    };

    const closeModal = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            setIsModalOpen(false);
        }
    };

    return (
        <div className="flex flex-col justify-center m-3 items-center">
            <Input
                value={workout.name}
                setValue={(name) => updateWorkoutName(name)}
                label={text.NAME}
                stylesContainer="mb-5"
            />
            <button
                onClick={() => setIsModalOpen(true)} // Open the modal on button click
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5"
            >
                {text.ADD_DAYS}
            </button>
            <ListValues
                values={workout.days}
                title={text.DAYS}
                remove={removeDayFromWorkout}
            />
            <button
                onClick={addWorkout}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5"
            >
                {text.SUBMIT}
            </button>
            {success && <SuccessMessage message={success} />}
            {err && <ErrorMessage message={err} />}

            {isModalOpen && (
                <div 
                    onClick={closeModal} 
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                >
                    <div 
                        onClick={(e) => e.stopPropagation()} // Prevent the modal from closing when clicking inside
                        className="bg-white p-8 rounded shadow-lg w-11/12 h-5/6 max-w-screen-lg max-h-screen overflow-auto"
                    >
                        <AddDay />
                        <button
                            onClick={() => setIsModalOpen(false)} // Close the modal on button click
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                        >
                            {text.EXIT}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const AddWorkout = () => {
    return (
        <WorkoutProvider>
            <AddWorkoutComponent />
        </WorkoutProvider>
    );
};

export default AddWorkout;