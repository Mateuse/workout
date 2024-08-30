import React from "react";
import Label from "./Label";
import Select from "react-select";

interface SelectInputProps {
    values: {value: string; label: string}[];
    selected: string[] | undefined;
    setSelected: (value: string[]) => void;
    label: string;
    stylesContainer?: string;
    stylesLabel?: string;
    stylesInput?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
    values, 
    selected, 
    setSelected, 
    label, 
    stylesContainer, 
    stylesLabel, 
    stylesInput
}) => {

    const handleChange = (selectedOptions: any) => {
        const selectedValues = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
        setSelected(selectedValues);
    }

    return (
        <div className={`${stylesContainer} flex flex-col w-1/4`}>
            <Label value={label} styles={stylesLabel}/>
            <Select
                className={stylesInput}
                closeMenuOnSelect={false}
                options={values}
                isMulti
                value={values.filter(option => selected?.includes(option.value))}
                onChange={handleChange}
            />
        </div>
    )
}

export default SelectInput;