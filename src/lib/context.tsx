"use client"
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { Location, getLocation } from './location-services';

type App = {
    location?: Location,
    searchValue: string,
    setSearchValue?: (value: string) => void,
}

const Context = createContext<App>({ searchValue: '' });

export const useAppContext = () => {
    return useContext(Context);
}


const AppContext: React.FC<PropsWithChildren> = ({ children }) => {
    const [appContext, setAppContext] = useState<App>({ searchValue: '' });
    useEffect(() => {
        setAppContext((prevState) => ({
            ...prevState,
            location: getLocation(),
        }));
    }, []);

    const setSearchValue = (value: string) => {
        setAppContext((prevState) => ({
            ...prevState,
            searchValue: value,
        }));
    }


    return (
        <Context.Provider value={{ ...appContext, setSearchValue }}>
            {children}
        </Context.Provider>
    )
}

export default AppContext