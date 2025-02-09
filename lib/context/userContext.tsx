import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { currentUser } from "../helpers/current-user";

interface User {
    id: string;
    username: string;
    email: string;
    role: string;
}

interface UserContextType {
    user: User | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const storedUser = await currentUser();
                if (storedUser) {
                    setUser(storedUser);
                }
            } catch (error) {
                console.error("Failed to fetch user data", error);
                // Handle error appropriately

            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);



    return (
        <UserContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
