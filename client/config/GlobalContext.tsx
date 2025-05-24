import { createContext, useState, useContext } from "react";

interface GlobalContextProps {
    loading: boolean;
    setLoading: (value: boolean) => void;
    isAdmin: boolean;
    setIsAdmin: (value: boolean) => void;
    retrievingAppointments: boolean;
    setRetrievingAppointments: (value: boolean) => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [retrievingAppointments, setRetrievingAppointments] = useState(false);

    return (
        <GlobalContext.Provider
            value={{
                loading,
                setLoading,
                isAdmin,
                setIsAdmin,
                retrievingAppointments,
                setRetrievingAppointments,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): GlobalContextProps => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};