import React, { useEffect, useMemo, useState } from "react";
import { getExercises } from "../../Scripts/firestore";
import { Exercise } from "../../Schema/workout";
import { errorMessages } from "../../Constants/error";
import ExerciseCard from "./ExerciseCard";
import ErrorMessage from "../CommonComponents/ErrorMessage";
import Input from "../CommonComponents/Input";
import { exerciseCardType } from "../../Constants/options";
import AddExerciseCard from "./AddExerciseCard";

interface ExerciseProps {
    type: string;
}

const Exercises: React.FC<ExerciseProps> = ({ type }) => {
    const [exercises, setExercises] = useState<{ id: string; data: Exercise }[] | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [err, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const fetchedExercises = await getExercises();
                setExercises(fetchedExercises);
            } catch (error) {
                setError(errorMessages.SOMETHING_WENT_WRONG_ERROR);
            }
        };

        fetchExercises();
    }, []);

    const filteredExercises: { id: string, data: Exercise }[] | undefined = useMemo(() => {
        return exercises?.filter((e) => {
            return e.data.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }, [exercises, searchQuery])

    if (err) {
        return <ErrorMessage message={err} />;
    }

    if (!exercises) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col w-full">
            <Input value={searchQuery} setValue={setSearchQuery} label="Search Exercises" stylesContainer="m-auto my-5" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-20">
                {filteredExercises?.map(({ id, data }) => (
                    type === exerciseCardType.NORMAL ?
                        <ExerciseCard key={id} exercise={data} />
                        :
                        <AddExerciseCard key={id} exercise={data} id={id} />

                ))}
            </div>
        </div>
    );
};

export default Exercises;
