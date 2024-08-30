import React from "react";
import Label from "./Label";

interface InputProps {
    value: string | undefined;
    setValue: (value: string ) => void;
    label: string;
    stylesContainer?: string;
    stylesLabel?: string;
    stylesInput?: string;
}

const Input: React.FC<InputProps> = ({ value, setValue, label, stylesContainer, stylesLabel, stylesInput }) => {

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
        </div>
    )
}

export default Input;