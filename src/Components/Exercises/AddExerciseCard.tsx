import React, { useState } from "react";
import { Exercise, ExerciseRef } from "../../Schema/workout";
import { useWorkoutDay } from "../../Contexts/WorkoutDayContext";
import InputNumber from "../CommonComponents/InputNumber";

interface ExerciseCardProps {
    exercise: Exercise;
    id: string;
}

const AddExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, id }) => {
    const { addExerciseToWorkoutDay } = useWorkoutDay();
    const [exerciseParams, setExerciseParams] = useState({
        weight: 0,
        reps: 0,
        sets: 0
    });

    const addExercise = () => {
        const exerciseRef: ExerciseRef = {
            exerciseId: id,
            name: exercise.name,
            weight: exerciseParams.weight,
            reps: exerciseParams.reps,
            sets: exerciseParams.sets
        };

        addExerciseToWorkoutDay(exerciseRef);
    };

    return (
        <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden mb-4 w-full max-w-sm m-3 justify-between">
            <div className="relative flex items-center justify-center p-3">
                <h3 className="text-lg font-semibold text-center w-32">
                    {exercise.name}
                </h3>
                <button
                    className="absolute right-0 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-green-700 transition duration-200 ease-in-out"
                    onClick={addExercise}
                >
                    +
                </button>
            </div>
            {exercise.definition && <p className="text-gray-700 mt-2 px-3">{exercise.definition}</p>}
            {exercise.targetedMuscles && exercise.targetedMuscles.length > 0 && (
                <div className="mt-4 px-3">
                    <h4 className="text-sm font-semibold text-gray-800">Targeted Muscles</h4>
                    <ul className="">
                        {exercise.targetedMuscles.map((muscle) => (
                            <li key={muscle}>{muscle}</li>
                        ))}
                    </ul>
                </div>
            )}
            {exercise.video && (
                <div className="mt-4 px-3">
                    <a href={exercise.video} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                        Watch Video
                    </a>
                </div>
            )}
            
            <div className="flex flex-col mt-3 px-3">
                <h4 className="text-sm font-semibold text-gray-800 underline">Exercise Parameters</h4>
                <div className="flex flex-row justify-between m-3">
                    <InputNumber
                        label="Weight" 
                        value={exerciseParams.weight} 
                        setValue={(weight) => setExerciseParams({ ...exerciseParams, weight })}
                    />
                    <InputNumber
                        label="Reps" 
                        value={exerciseParams.reps} 
                        setValue={(reps) => setExerciseParams({ ...exerciseParams, reps })}
                    />
                    <InputNumber
                        label="Sets" 
                        value={exerciseParams.sets} 
                        setValue={(sets) => setExerciseParams({ ...exerciseParams, sets })}
                    />
                </div>
            </div>
        </div>
    );
}

export default AddExerciseCard;
