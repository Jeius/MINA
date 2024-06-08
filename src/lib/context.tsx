"use client"
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { Location, getLocation } from './context-providers/location-services';

type App = {
    location?: Location,
    selectedTab: string,
    setSelectedTab?: (tab: string) => void,
}

const Context = createContext<App>({ selectedTab: "Explore" });

export const useAppContext = () => {
    return useContext(Context);
}


const AppContext: React.FC<PropsWithChildren> = ({ children }) => {
    const [appContext, setAppContext] = useState<App>({ selectedTab: "Explore" });
    useEffect(() => {
        setAppContext((prevState) => ({
            ...prevState,
            location: getLocation(),
        }));
    }, []);

    const setSelectedTab = (tab: string) => {
        setAppContext((prevState) => ({
            ...prevState,
            selectedTab: tab,
        }));
    };

    return (
        <Context.Provider value={{ ...appContext, setSelectedTab }}>
            {children}
        </Context.Provider>
    )
}

export default AppContext