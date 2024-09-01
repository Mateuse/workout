import React, { useState } from "react";
import { Exercise } from '../../Schema/workout';
import { addExercise as addExerciseToDB } from '../../Scripts/firestore';
import Input from "../CommonComponents/Input";
import SelectInput from "../CommonComponents/SelectInput";
import { buttonType, muscleOptions } from "../../Constants/options";
import { errorMessages } from "../../Constants/error";
import ErrorMessage from "../CommonComponents/ErrorMessage";
import { successMessage } from "../../Constants/success";
import SuccessMessage from "../CommonComponents/SuccessMessage";
import { text } from "../../Constants/text";
import Button from "../CommonComponents/Button";


//Add a user entered exercise to the database 
const AddExercise = () => {
    const [exercise, setExercise] = useState<Exercise>({
        name: "",
        definition: "",
        picture: "",
        video: "",
        targetedMuscles: []
    });

    const [err, setErr] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const addExercise = async () => {
        if (exercise.name === "") {
            setErr(errorMessages.INVALID_NAME_ERROR);
            setSuccess(null);
            return errorMessages.INVALID_NAME_ERROR;
        }

        try {
            setSuccess(`${successMessage.ADD_EXERCISE_SUCCESS}: ${exercise.name}`)
            setErr(null);
            await addExerciseToDB(exercise);
        } catch (error) {
            setErr(errorMessages.GENERAL_ERROR);
            setSuccess(null);
            return errorMessages.GENERAL_ERROR;
        }
    }

    return (
        <div className="flex flex-col justify-center m-3 items-center">
            <Input
                value={exercise?.name}
                setValue={(name) => setExercise({ ...exercise, name })}
                label="Name"
                stylesContainer="mb-5"
            />
            <Input
                value={exercise?.definition}
                setValue={(definition) => setExercise({ ...exercise, definition })}
                label="Definition"
                stylesContainer="mb-5"
            />
            <Input
                value={exercise?.picture}
                setValue={(picture) => setExercise({ ...exercise, picture })}
                label="Picture Url"
                stylesContainer="mb-5"
            />
            <Input
                value={exercise?.video}
                setValue={(video) => setExercise({ ...exercise, video })}
                label="Video Url"
                stylesContainer="mb-5"
            />
            <SelectInput
                values={muscleOptions}
                selected={exercise.targetedMuscles}
                setSelected={(targetedMuscles) => setExercise({ ...exercise, targetedMuscles })}
                label="Targeted Muscles"
                stylesContainer="mb-5"
            />
            <Button
                style={buttonType.GREEN}
                onClick={addExercise}
                text={text.SUBMIT}
            />
            {err && <ErrorMessage message={err} />}
            {success && <SuccessMessage message={success} />}
        </div>
    )
}

export default AddExercise;