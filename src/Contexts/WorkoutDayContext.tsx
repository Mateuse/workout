import React, { createContext, useContext, useState } from "react";
import { ExerciseRef, WorkoutDay } from "../Schema/workout";

interface WorkoutDayContextType {
    workoutDay: WorkoutDay;
    addExerciseToWorkoutDay: (exercise: ExerciseRef) => void;
    removeExerciseFromWorkoutDay: (index: number) => void;
    updateWorkoutDayName: (name: string) => void;
    resetWorkoutDay: () => void;
}

const WorkoutDayContext = createContext<WorkoutDayContextType | undefined>(undefined);

export const WorkoutDayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const initialWorkoutDayState: WorkoutDay = {
        name: "",
        exercises: []
    };

    const [workoutDay, setWorkoutDay] = useState<WorkoutDay>(initialWorkoutDayState);

    const addExerciseToWorkoutDay = (exercise: ExerciseRef) => {
        setWorkoutDay((prevWorkoutDay) => ({
            ...prevWorkoutDay,
            exercises: [...prevWorkoutDay.exercises, exercise],
        }));
    };

    const removeExerciseFromWorkoutDay = (index: number) => {
        setWorkoutDay((prevWorkoutDay) => ({
            ...prevWorkoutDay,
            exercises: prevWorkoutDay.exercises.filter((_, i) => i !== index),
        }));
    };

    const updateWorkoutDayName = (name: string) => {
        setWorkoutDay((prevWorkoutDay) => ({
            ...prevWorkoutDay,
            name,
        }));
    };

    const resetWorkoutDay = () => {
        setWorkoutDay(initialWorkoutDayState);
    };

    return (
        <WorkoutDayContext.Provider value={{ 
            workoutDay, 
            addExerciseToWorkoutDay, 
            removeExerciseFromWorkoutDay, 
            updateWorkoutDayName, 
            resetWorkoutDay }}>
            {children}
        </WorkoutDayContext.Provider>
    );
};

export const useWorkoutDay = () => {
    const context = useContext(WorkoutDayContext);
    if (!context) {
        throw new Error("useWorkoutDay must be used within a WorkoutDayProvider");
    }
    return context;
};
