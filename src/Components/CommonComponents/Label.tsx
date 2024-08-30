import React from "react";

export interface LabelProps {
    value: string;
    styles?: string;
}

const Label: React.FC<LabelProps> = ({value, styles}) => {

    const defaultStyles = "text-md mb-1 font-medium text-gray-900 text-left";
    const combinedStyles = `${styles} ${defaultStyles}`

    return (
        <div className={combinedStyles}>
            {value}
        </div>
    )
}

export default Label;