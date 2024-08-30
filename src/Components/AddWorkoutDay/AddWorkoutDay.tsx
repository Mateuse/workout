import React, { useEffect, useState } from 'react';
import Input from '../CommonComponents/Input';
import { WorkoutDay } from '../../Schema/workout';
import { errorMessages } from "../../Constants/error";
import ErrorMessage from "../CommonComponents/ErrorMessage";
import { successMessage } from "../../Constants/success";
import SuccessMessage from "../CommonComponents/SuccessMessage";
import Exercises from '../Exercises/Exercises';
import { exerciseCardType } from '../../Constants/options';
import { useWorkoutDay, WorkoutDayProvider } from '../../Contexts/WorkoutDayContext';
import { addWorkoutDayDB } from '../../Scripts/firestore';
import ListValues from '../CommonComponents/ListValues';
import { text } from '../../Constants/text';


//Add a workout day
//select exercises from exercise list
const AddWorkoutDayComponent = () => {
    const { workoutDay, updateWorkoutDayName, removeExerciseFromWorkoutDay, resetWorkoutDay } = useWorkoutDay();
    const [err, setErr] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);



    const addWorkoutDay = async () => {
        if (workoutDay.name === "") {
            setErr(errorMessages.INVALID_NAME_ERROR);
            setSuccess(null);
            return errorMessages.INVALID_NAME_ERROR;
        }

        if (workoutDay.exercises.length === 0) {
            setErr(errorMessages.NO_EXERCISE_WORKOUT_DAY);
            setSuccess(null);
            return errorMessages.NO_EXERCISE_WORKOUT_DAY;
        }

        try {
            await addWorkoutDayDB(workoutDay);
            setSuccess(successMessage.ADD_WORKOUT_DAY + workoutDay.name);
            setErr(null);
            resetWorkoutDay();
        } catch(error) {
            setErr(errorMessages.GENERAL_ERROR);
            setSuccess(null);
            return errorMessages.GENERAL_ERROR;
        }
        
    }

    return (
        <div className="flex flex-col justify-center m-3 items-center">
            <Input
                value={workoutDay.name}
                setValue={(name) => updateWorkoutDayName(name)}
                label={text.NAME}
                stylesContainer="mb-5"
            />
            <ListValues 
                values={workoutDay.exercises} 
                title={text.EXERCISES}
                remove={removeExerciseFromWorkoutDay}
            />
            <Exercises type={exerciseCardType.ADD} />
            <button
                onClick={addWorkoutDay}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-5"
            >
                {text.SUBMIT}
            </button>
            {err && <ErrorMessage message={err} />}
            {success && <SuccessMessage message={success} />}
        </div>
    )
}

const AddWorkoutDay = () => (
    <WorkoutDayProvider>
        <AddWorkoutDayComponent />
    </WorkoutDayProvider>
);

export default AddWorkoutDay;