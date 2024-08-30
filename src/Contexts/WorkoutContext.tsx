import React, { createContext, useContext, useState } from "react";
import { Day, Workout, WorkoutDay } from "../Schema/workout";

interface WorkoutContextType {
    workout: Workout;
    addWorkoutDayToWorkout: (workoutDay: WorkoutDay) => void;
    removeWorkoutDayFromWorkout: (index: number) => void;
    updateWorkoutName: (name: string) => void;
    resetWorkout: () => void;
    addDayToWorkout: (day: Day) => void;
    removeDayFromWorkout: (index: number) => void;
    selectedWorkoutDay: WorkoutDay | null;
    setSelectedWorkoutDay: (WorkoutDay: WorkoutDay | null) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const initialWorkoutState: Workout = {
        name: "",
        workoutDays: [],
        days: []
    }
    const [selectedWorkoutDay, setSelectedWorkoutDay] = useState<WorkoutDay | null>(null);
    const [workout, setWorkout] = useState<Workout>(initialWorkoutState);

    const addWorkoutDayToWorkout = (workoutDay: WorkoutDay) => {
        setWorkout((prevWorkout) => ({
            ...prevWorkout,
            workoutDays: [...prevWorkout.workoutDays, workoutDay],
        }));
    };

    const removeWorkoutDayFromWorkout = (index: number) => {
        setWorkout((prevWorkout) => ({
            ...prevWorkout,
            workoutDays: prevWorkout.workoutDays.filter((_, i) => i !== index),
        }));
    };

    const updateWorkoutName = (name: string) => {
        setWorkout((prevWorkout) => ({
            ...prevWorkout,
            name
        }));
    };

    const addDayToWorkout = (day: Day) => {
        setWorkout((prevWorkout) => ({
            ...prevWorkout,
            days: [...prevWorkout.days, day],
        }));
    }

    const removeDayFromWorkout = (index: number) => {
        setWorkout((prevWorkout) => ({
            ...prevWorkout,
            days: prevWorkout.days.filter((_, i) => i !== index),
        }));
    }

    const resetWorkout = () => {
        setWorkout(initialWorkoutState);
    }

    return (
        <WorkoutContext.Provider value={{
            workout,
            addWorkoutDayToWorkout, 
            removeWorkoutDayFromWorkout, 
            updateWorkoutName, 
            resetWorkout, 
            addDayToWorkout, 
            removeDayFromWorkout,
            selectedWorkoutDay,
            setSelectedWorkoutDay
        }}>
            {children}
        </WorkoutContext.Provider>
    );

}

export const useWorkout = () => {
    const context = useContext(WorkoutContext);
    if (!context) {
        throw new Error("useWorkout must be used within a WorkoutProvider");
    }
    return context;
}