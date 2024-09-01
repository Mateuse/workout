import React, { useEffect, useRef, useState } from "react";
import { text } from "../../Constants/text";
import { Day, WorkoutDay } from "../../Schema/workout";
import { useWorkout } from "../../Contexts/WorkoutContext";
import Input from "../CommonComponents/Input";
import { buttonType, workoutDayCardType } from "../../Constants/options";
import WorkoutDays from "../WorkoutDays/WorkoutDays";
import WorkoutDayCard from "../WorkoutDays/WorkoutDayCard";
import Button from "../CommonComponents/Button";

const AddDays = () => {
    const {
        removeWorkoutDayFromWorkout,
        addDayToWorkout,
        removeDayFromWorkout,
        selectedWorkoutDay,
        setSelectedWorkoutDay
    } = useWorkout();

    const [name, setName] = useState<string>("");
    const [isRestDay, setIsRestDay] = useState<boolean>(false);
    const [workoutDay, setWorkoutDay] = useState<WorkoutDay | null>(null);

    useEffect(() => {
        setWorkoutDay(selectedWorkoutDay);
    }, [selectedWorkoutDay])

    const clearWorkoutDays = () => {
        setWorkoutDay(null);
        setSelectedWorkoutDay(null);
    }

    const addDay = () => {
        let day: Day = {
            name: name,
            isRestDay: isRestDay,
            workoutDay: workoutDay
        }

        addDayToWorkout(day);

    }

    return (
        <div className="flex flex-col justify-center m-3 items-center">
            <Input
                value={name}
                setValue={setName}
                label={text.NAME}
                stylesContainer="mb-5 w-full"

            />

            <div className="flex">
                {text.REST_DAY}
                <input className="ml-5" type="checkbox" onClick={() => setIsRestDay(!isRestDay)} />
            </div>

            {!isRestDay && (
                <>
                    {selectedWorkoutDay === null ? (
                        <WorkoutDays type={workoutDayCardType.ADD} />
                    ) : (
                        <div>
                            {text.WORKOUT}
                            <WorkoutDayCard workoutDay={selectedWorkoutDay} />
                        </div>

                    )}
                </>
            )}

            <div className="flex justify-between w-full mt-6">
                <Button
                    style={buttonType.ORANGE}
                    onClick={clearWorkoutDays}
                    text={text.CLEAR}
                />
                <Button
                    style={buttonType.GREEN}
                    onClick={addDay}
                    text={text.ADD_DAY}
                />
            </div>



        </div>
    )
}

export default AddDays;