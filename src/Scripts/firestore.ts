import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs, query, where, orderBy, limit, QueryConstraint} from "firebase/firestore";
import { Workout, WorkoutDay, Exercise, CalendarDay } from '../Schema/workout';
import { User } from '../Schema/user';

const WORKOUT_COLLECTION_NAME = "Workout";
const WORKOUTDAY_COLLECTION_NAME = "WorkoutDay";
const EXERCISE_COLLECTION_NAME = "Exercise";
const CALENDAR_DAY_COLLECTION_NAME = "CalendarDay";
const CURRENT_SELECTED_WORKOUT_COLLECTION_NAME = "CurrentSelectedWorkout";
const USER_COLLECTION_NAME = "User"

//sets an inputed workout in firestore
export const addWorkout = async (workout: Workout): Promise<boolean> => {

    try {
        await addDoc(collection(db, WORKOUT_COLLECTION_NAME), workout);
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
        await addDoc(collection(db, WORKOUTDAY_COLLECTION_NAME), workoutDay);
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
            ...doc.data() as WorkoutDay
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
export const addExercise = async (exercise: Exercise): Promise<boolean> => {

    try {
        await addDoc(collection(db, EXERCISE_COLLECTION_NAME), exercise);
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
            data: doc.data() as Exercise,
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

export const addCalendarDay = async (calendarDay: CalendarDay): Promise<boolean> => {
    try {
        await addDoc(collection(db, CALENDAR_DAY_COLLECTION_NAME), calendarDay);
        return true
    } catch (error) {
        console.error(error);
        return false;
    }
}

// get all calendar days from db
export const getCalendarDays = async (startDate: Date, endDate: Date, limitCount?: number): Promise<CalendarDay[] | null> => {
    try {
        const calendarCollectionRef = collection(db, CALENDAR_DAY_COLLECTION_NAME);

        // Initialize an array of constraints
        const constraints: QueryConstraint[] = [
            where("date", ">=", startDate),
            where("date", "<=", endDate),
            orderBy("date")
        ];

        // Conditionally add the limit constraint
        if (limitCount !== undefined) {
            constraints.push(limit(limitCount));
        }

        // Build the query with the constraints
        const calendarQuery = query(calendarCollectionRef, ...constraints);

        const docSnap = await getDocs(calendarQuery);
        if (!docSnap.empty) {
            return docSnap.docs.map(doc => doc.data() as CalendarDay);
        }
    } catch (error) {
        console.error("Error fetching calendar days:", error);
        return null;
    }

    return null;
}

//gets a CalendarDay by date from firestore
export const getCalendarDay = async (date: Date): Promise<CalendarDay | null> => {

    try {
        const docRef = await getDocs(query(collection(db, CALENDAR_DAY_COLLECTION_NAME), where('calendarDay.date', '==', date)));
        if (!docRef.empty) {
            const calendarDayDoc = docRef.docs[0];
            return calendarDayDoc.data() as CalendarDay;
        }

    } catch (error) {
        console.error(error);
        return null;
    }

    return null;
}

//sets the current selected workout


//add user  in firestore
export const addUser = async (user: User): Promise<boolean> => {

    try {
        await addDoc(collection(db, USER_COLLECTION_NAME), user);
        return true;
    } catch (error) {
        console.error(`Error adding document: ${error}`);
        return false
    }
}

//get user by username from firestore
export const getUser = async (username: string): Promise<User | null> => {

    try {
        const docRef = await getDocs(query(collection(db, USER_COLLECTION_NAME), where('username', '==', username)));
        if (!docRef.empty) {
            const userDoc = docRef.docs[0];
            return userDoc.data() as User;
        }

    } catch (error) {
        console.error(error);
        return null;
    }

    return null;
}