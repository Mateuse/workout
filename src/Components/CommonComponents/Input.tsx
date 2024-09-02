import React from "react";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";
import { text } from '../../Constants/text';

interface InputProps {
    value: string | undefined;
    setValue: (value: string ) => void;
    label: string;
    stylesContainer?: string;
    stylesLabel?: string;
    stylesInput?: string;
    error?: string | null;
}

const Input: React.FC<InputProps> = ({ value, setValue, label, stylesContainer, stylesLabel, stylesInput, error }) => {

    return (
        <div className={`${stylesContainer} flex flex-col w-1/4`}>
            <Label value={label} styles={stylesLabel}/>
            <input
                className={`${stylesInput} w-full p-2 border rounded-md focus:outline-none focus:ring-2`}
                type="text"
                value={value}
                placeholder={label}
                onChange={(e) => setValue(e.target.value)}
            />
            {error && (
                <ErrorMessage 
                    message={error} 
                    styles="mt-5"
                />
            )}
        </div>
    )
}

export default Input;