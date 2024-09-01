import React, { ReactElement } from "react";
import { buttonType } from "../../Constants/options";

interface ButtonProps {
    style: string
    onClick: () => void
    text: string
    styles?: string
}

const Button: React.FC<ButtonProps> = ({style, onClick, text, styles}) => {

    const renderStyle = (): string => {
        switch (style) {
            case buttonType.GREEN: {
                return 'bg-green-500 hover:bg-green-700'
            }
            case buttonType.BLUE: {
                return 'bg-blue-500 hover:bg-blue-700'
            }
            case buttonType.ORANGE: {
                return 'bg-orange-500 hover:bg-orange-700'
            }
            case buttonType.RED: {
                return 'bg-red-500 hover:bg-red-700'
            }
            case buttonType.GREY: {
                return 'bg-gray-500 hover:bg-gray-700'
            }
            default: {
                return ''
            }
        }
    }

    return (
        <div>
            <button
                className={`${renderStyle()} ${styles} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-5`}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    )
}

export default Button;