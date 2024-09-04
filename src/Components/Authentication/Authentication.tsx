import React, { useState } from "react";
import { useUser } from "../../Contexts/UserContext";
import { addUser, getUser } from "../../Scripts/firestore";
import bcrypt from 'bcryptjs';
import Input from "../CommonComponents/Input";
import { text } from "../../Constants/text";
import Button from "../CommonComponents/Button";
import { buttonType } from "../../Constants/options";
import ErrorMessage from "../CommonComponents/ErrorMessage";
import { errorMessages } from "../../Constants/error";

const Authentication = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                {isLogin ? (
                    <Login setIsLogin={setIsLogin} />
                ) : (
                    <Register setIsLogin={setIsLogin} />
                )}
            </div>
        </div>
    );
};

interface LoginProps {
    setIsLogin: (isLogin: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsLogin }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { setUser } = useUser();

    const handleLogin = async () => {
        const user = await getUser(username);

        if (user && bcrypt.compareSync(password, user.password)) {
            // User authenticated
            setUser(user);
        } else {
            alert("Invalid username or password");
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <div className="mb-4">
                <Input
                    value={username}
                    setValue={(username) => setUsername(username)}
                    label={text.USERNAME}
                    stylesContainer="w-full"
                />
            </div>
            <div className="mb-4">
                <Input
                    type="password"
                    value={password}
                    setValue={(password) => setPassword(password)}
                    label={text.PASSWORD}
                    stylesContainer="w-full"
                />
            </div>
            <Button
                style={buttonType.GREEN}
                onClick={handleLogin}
                text={text.LOGIN}
            />
            <p className="mt-4 text-sm text-center">
                {text.DONT_HAVE_ACCOUNT}{" "}
                <span
                    onClick={() => setIsLogin(false)}
                    className="text-blue-500 cursor-pointer"
                >
                    {text.REGISTER_HERE}
                </span>
            </p>
        </div>
    );
};

interface RegisterProps {
    setIsLogin: (isLogin: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ setIsLogin }) => {
    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [err, setErr] = useState<string | null>(null);


    const handleRegister = async () => {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = { name, username, password: hashedPassword, activeWorkout: null };
        const existingUser = await getUser(username);
        if (existingUser) {
            setErr("Username already exists. Please choose a different username.");
            return;
        }

        const success = await addUser(user);

        if (success) {
            alert("Registration successful");
            setIsLogin(true);
        } else {
            alert("Registration failed");
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Register</h2>
            <div className="mb-4">
                <Input
                    value={name}
                    setValue={(name) => setName(name)}
                    label={text.NAME}
                    stylesContainer="w-full"
                />
            </div>
            <div className="mb-4">
                <Input
                    value={username}
                    setValue={(username) => setUsername(username)}
                    label={text.USERNAME}
                    stylesContainer="w-full"
                />
            </div>
            <div className="mb-4">
                <Input
                    value={password}
                    setValue={(password) => setPassword(password)}
                    label={text.PASSWORD}
                    stylesContainer="w-full"
                />
            </div>
            {err && (
                <ErrorMessage 
                    message={errorMessages.DUPLICATE_USER}
                />
            )}
            <Button
                style={buttonType.GREEN}
                onClick={handleRegister}
                text={text.REGISTER}
            />
            <p className="mt-4 text-sm text-center">
                {text.HAVE_ACCOUNT}{" "}
                <span
                    onClick={() => setIsLogin(true)}
                    className="text-blue-500 cursor-pointer"
                >
                    {text.SIGNIN_HERE}
                </span>
            </p>
        </div>
    );
};

export default Authentication;