"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: {
    children: React.ReactNode;
}) {
    const [userLogged , setUserlogged] = useState(false);
    const [userName , setUserName] = useState('');
    const [userTheme , setUserTheme] = useState('light');
    
    return (
        <AppContext.Provider value={{
            userLogged, setUserlogged,
            userName, setUserName,
            userTheme , setUserTheme,
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}