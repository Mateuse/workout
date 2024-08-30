import React from "react";
import { Exercise } from "../../Schema/workout";

interface ExerciseCardProps {
    exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise }) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4 w-full max-w-sm m-3">
            {exercise.picture && (
                <img className="w-full h-48 object-cover" src={exercise.picture} alt={exercise.name} />
            )}
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900">{exercise.name}</h3>
                {exercise.definition && <p className="text-gray-700 mt-2">{exercise.definition}</p>}
                {exercise.targetedMuscles && exercise.targetedMuscles.length > 0 && (
                    <div className="mt-4">
                        <h4 className="text-sm font-semibold text-gray-800">Targeted Muscles:</h4>
                        <ul className="list-disc list-inside text-gray-700">
                            {exercise.targetedMuscles.map((muscle) => (
                                <li key={muscle}>{muscle}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {exercise.video && (
                    <div className="mt-4">
                        <a href={exercise.video} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                            Watch Video
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExerciseCard;
