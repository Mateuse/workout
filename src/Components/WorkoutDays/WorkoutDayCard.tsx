import React from "react";
import { WorkoutDay } from "../../Schema/workout";
import { text } from "../../Constants/text";

interface WorkoutDayCardProps {
    workoutDay: WorkoutDay;
}

const WorkoutDayCard: React.FC<WorkoutDayCardProps> = ({ workoutDay }) => {
    return (
        <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden mb-4 w-full max-w-sm m-3 p-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{workoutDay.name}</h3>
            <div className="grid grid-cols-4 font-semibold text-gray-700 mb-2">
                <span className="col-span-1"></span>
                <span className="text-center">{text.WEIGHTABR}</span>
                <span className="text-center">{text.REPSABR}</span>
                <span className="text-center px-2">{text.SETSABR}</span>
            </div>
            {workoutDay.exercises.map((exercise, index) => (
                <div key={index} className="grid grid-cols-4 text-gray-900 py-2 border-b last:border-none">
                    <span className="col-span-1">{exercise.name}</span>
                    <span className="text-center">{exercise.weight}</span>
                    <span className="text-center">{exercise.reps}</span>
                    <span className="text-center">{exercise.sets}</span>
                </div>
            ))}
        </div>
    );
};

export default WorkoutDayCard;
