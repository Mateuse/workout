import React, { useEffect, useMemo, useState } from "react";
import { WorkoutDay } from "../../Schema/workout";
import { errorMessages } from "../../Constants/error";
import { getWorkoutDays } from "../../Scripts/firestore";
import { workoutDayCardType } from "../../Constants/options";
import WorkoutDayCard from "./WorkoutDayCard";
import Input from "../CommonComponents/Input";
import AddWorkoutDayCard from "./AddWorkoutDayCard";

interface WorkoutDayProps {
    type: string;
}

const WorkoutDays: React.FC<WorkoutDayProps> = ({ type }) => {
    const [workoutDays, setWorkoutDays] = useState<WorkoutDay[] | null>();
    const [searchQuery, setSearchQuery] = useState("");
    const [err, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWorkoutDays = async () => {
            try {
                const fetchedWorkoutDays = await getWorkoutDays();
                setWorkoutDays(fetchedWorkoutDays);
            } catch (error) {
                setError(errorMessages.SOMETHING_WENT_WRONG_ERROR);
            }
        }

        fetchWorkoutDays()
    }, []);

    const filteredWorkoutDays: WorkoutDay[] | undefined = useMemo(() => {
        return workoutDays?.filter((e) => {
            return e.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
    }, [workoutDays, searchQuery])
    return (
        <div className="flex flex-col w-full">
            <Input
                label="Search Workout Days"
                value={searchQuery}
                setValue={setSearchQuery}
                stylesContainer="m-auto my-5"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-20">
                {filteredWorkoutDays?.map((workoutDay) => (
                    type === workoutDayCardType.NORMAL ? (
                        <WorkoutDayCard key={workoutDay.id} workoutDay={workoutDay} />
                    ) : (
                        <AddWorkoutDayCard key={workoutDay.id} workoutDay={workoutDay} />
                    )
                ))}
            </div>
        </div>
    )
}

export default WorkoutDays