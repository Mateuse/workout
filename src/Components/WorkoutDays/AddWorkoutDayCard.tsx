import React, { useState } from "react";
import { Workout, WorkoutDay } from "../../Schema/workout";
import { useWorkout } from "../../Contexts/WorkoutContext";
import { text } from "../../Constants/text";

interface AddWorkoutDayCardProps {
    workoutDay: WorkoutDay;
}

const AddWorkoutDayCard: React.FC<AddWorkoutDayCardProps> = ({ workoutDay }) => {
    const { addWorkoutDayToWorkout, setSelectedWorkoutDay } = useWorkout();

    const addWorkoutDay = () => {
        addWorkoutDayToWorkout(workoutDay);
        setSelectedWorkoutDay(workoutDay);
    }

    return (
        <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden mb-4 w-full max-w-sm m-3">
            <div className="relative flex items-center justify-center p-3">
                <h3 className="text-lg font-semibold text-center w-full">
                    {workoutDay.name}
                </h3>
                <button
                    className="absolute right-0 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-green-700 transition duration-200 ease-in-out"
                    onClick={addWorkoutDay}
                >
                    +
                </button>
            </div>
            <div className="flex-grow p-3">
                <div className="text-sm font-semibold text-gray-800 mb-2">
                    {text.EXERCISES}
                </div>
                <div className="flex flex-wrap gap-2">
                    {workoutDay.exercises.map((exercise) => (
                        <span key={exercise.exerciseId} className="bg-zinc-300 p-1 rounded">
                            {exercise.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AddWorkoutDayCard;
