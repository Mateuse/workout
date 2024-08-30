import React from "react";
import Label from "./Label";

interface InputProps {
    value: number | undefined;
    setValue: (value: number ) => void;
    label: string;
    stylesContainer?: string;
    stylesLabel?: string;
    stylesInput?: string;
}

const InputNumber: React.FC<InputProps> = ({ value, setValue, label, stylesContainer, stylesLabel, stylesInput }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numberValue = parseFloat(e.target.value);
        if (!isNaN(numberValue)) {
            setValue(numberValue);
        } else {
            setValue(0);
        }
    };

    return (
        <div className={`${stylesContainer} flex flex-col w-1/4`}>
            <Label value={label} styles={stylesLabel}/>
            <input
                className={`${stylesInput} w-full p-2 border rounded-md focus:outline-none focus:ring-2`}
                type="text"
                value={value}
                placeholder={label}
                onChange={handleChange}
            />
        </div>
    )
}

export default InputNumber;