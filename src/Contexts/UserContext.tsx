import React, { createContext, useContext, useState } from "react";
import { User } from "../Schema/user";
import { Workout } from "../Schema/workout";

interface UserContextType {
    user: User;
    setUser: (user: User) => void;
    setActiveWorkout: (workoutId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const initialUserState: User = {
        name: "",
        username: "",
        password: "",
        activeWorkout: null
    }

    const [user, setUser] = useState<User>(initialUserState);

    const setActiveWorkout = (workoutId: string) => {
        setUser((prevUser) => ({
            ...prevUser,
            activeWorkout: workoutId
        }));
    }

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            setActiveWorkout
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("user must be used within a UserProvider");
    }
    return context;
}