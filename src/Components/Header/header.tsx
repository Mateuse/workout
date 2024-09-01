import React from "react";
import Button from "../CommonComponents/Button";
import { buttonType } from "../../Constants/options";
import { text } from "../../Constants/text";

interface HeaderProps {
    setPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setPage }) => {
    return (
        <header className="bg-gray-100 p-4 border-b border-gray-300">
            <nav className="flex justify-around">
                <Button
                    style={buttonType.GREEN}
                    onClick={() => setPage(text.CALENDAR)}
                    text={text.CALENDAR}
                />
                <Button
                    style={buttonType.GREEN}
                    onClick={() => setPage(text.ADD_WORKOUTS)}
                    text={text.ADD_WORKOUTS}
                />
                <Button
                    style={buttonType.GREEN}
                    onClick={() => setPage(text.ADD_WORKOUT_DAYS)}
                    text={text.ADD_WORKOUT_DAYS}
                />
                <Button
                    style={buttonType.GREEN}
                    onClick={() => setPage(text.ADD_EXERCISES)}
                    text={text.ADD_EXERCISES}
                />
            </nav>
        </header>
    );
};

export default Header;