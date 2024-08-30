import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { Workout, WorkoutDay, Exercise } from '../Schema/workout';

const WORKOUT_COLLECTION_NAME = "Workout";
const WORKOUTDAY_COLLECTION_NAME = "WorkoutDay";
const EXERCISE_COLLECTION_NAME = "Exercise";

//sets an inputed workout in firestore
export const addWorkout = async (workout: Workout): Promise<boolean> => {

    try {
        await addDoc(collection(db, WORKOUT_COLLECTION_NAME), {
            workout
        });
        return true;
    } catch (error) {
        console.error(`Error adding document: ${error}`);
        return false
    }
}

//gets all workouts from firestore
export const getWorkouts = async (): Promise<Workout[] | null> => {

    try {
        const docRef = await getDocs(collection(db, WORKOUT_COLLECTION_NAME));
        const workoutList: Workout[] = docRef.docs.map(doc => doc.data() as Workout);

        return workoutList;
    } catch (error) {
        console.error(error);
        return null;
    }
}

//gets a workout by name from firestore
export const getWorkout = async (name: string): Promise<Workout | null> => {

    try {
        const docRef = await getDocs(query(collection(db, WORKOUT_COLLECTION_NAME), where('workout.name', '==', name)));
        if (!docRef.empty) {
            const workoutDoc = docRef.docs[0];
            return workoutDoc.data() as Workout;
        }

    } catch (error) {
        console.error(error);
        return null;
    }

    return null;
}

//add a workoutday to firestore
export const addWorkoutDayDB = async (workoutDay: WorkoutDay): Promise<boolean> => {

    try {
        await addDoc(collection(db, WORKOUTDAY_COLLECTION_NAME), {
            workoutDay
        });
        return true
    } catch (error) {
        console.error(`Error adding document: ${error}`);
        return false
    }
}

//get all workoutdays from firestore
export const getWorkoutDays = async (): Promise<WorkoutDay[] | null> => {
    try {
        const docRef = await getDocs(collection(db, WORKOUTDAY_COLLECTION_NAME));
        const workoutList: WorkoutDay[] = docRef.docs.map(doc => ({
            id: doc.id, 
            ...doc.data().workoutDay as WorkoutDay
        }));
        return workoutList;
    } catch (error) {
        console.error(error);
        return null;
    }
}

//gets a workoutday by name from firestore
export const getWorkoutDay = async (name: string): Promise<WorkoutDay | null> => {

    try {
        const docRef = await getDocs(query(collection(db, WORKOUTDAY_COLLECTION_NAME), where('workout.name', '==', name)));
        if (!docRef.empty) {
            const workoutDoc = docRef.docs[0];
            return workoutDoc.data() as WorkoutDay;
        }

    } catch (error) {
        console.error(error);
        return null;
    }

    return null;
}

//add a Exercise to firestore
export const addExercise = async (Exercise: Exercise): Promise<boolean> => {

    try {
        await addDoc(collection(db, EXERCISE_COLLECTION_NAME), {
            Exercise
        });
        return true
    } catch (error) {
        console.error(`Error adding document: ${error}`);
        return false
    }
}


//get all exercises from firestore
export const getExercises = async (): Promise<{ id: string; data: Exercise }[] | null> => {
    try {
        const docRef = await getDocs(collection(db, EXERCISE_COLLECTION_NAME));
        const exerciseList = docRef.docs.map(doc => ({
            id: doc.id,
            data: doc.data().Exercise as Exercise,
        }));

        return exerciseList;
    } catch (error) {
        console.error(error);
        return null;
    }
}

//gets an Exercise by name from firestore
export const getExercise = async (id: string): Promise<Exercise | null> => {

    try {
        const docRef = await getDocs(query(collection(db, EXERCISE_COLLECTION_NAME), where('workout.id', '==', id)));
        if (!docRef.empty) {
            const workoutDoc = docRef.docs[0];
            return workoutDoc.data() as Exercise;
        }

    } catch (error) {
        console.error(error);
        return null;
    }

    return null;
}