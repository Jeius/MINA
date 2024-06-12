"use client"
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { Location, getLocation } from './location-services';

type App = {
    location?: Location,
}


const Context = createContext<App>({});

export const useAppContext = () => {
    return useContext(Context);
}


const AppContext: React.FC<PropsWithChildren> = ({ children }) => {
    const [appContext, setAppContext] = useState<App>({});
    useEffect(() => {
        setAppContext((prevState) => ({
            ...prevState,
            location: getLocation(),
        }));
    }, []);


    return (
        <Context.Provider value={{ ...appContext }}>
            {children}
        </Context.Provider>
    )
}

export default AppContext