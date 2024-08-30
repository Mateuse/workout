export interface ExerciseRef {
    exerciseId: string;
    name: string;
    weight: number;
    reps: number;
    sets: number;
}

export interface WorkoutDay {
    id?: string;
    name: string;
    exercises: ExerciseRef[];
}

export interface Workout {
    id?: string;
    name: string;
    workoutDays: WorkoutDay[];
    days: Day[];
}

export interface Day {
    name?: string;
    workoutDay: WorkoutDay | null;
    isRestDay: boolean;
}

export interface Exercise {
    name: string;
    definition?: string;
    picture?: string;
    video?: string;
    targetedMuscles: string[];
}