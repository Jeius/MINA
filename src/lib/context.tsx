"use client"
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { Location, getLocation } from './location-services';

type App = {
    location?: Location,
    searchState?: SearchState,
    setSearchState?: (state: SearchState) => void,
}

type SearchState = {
    value?: string,
    isFocused?: boolean
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

    const setSearchState = (state: SearchState) => {
        setAppContext((prevState) => ({
            ...prevState,
            searchState: state,
        }));
    }


    return (
        <Context.Provider value={{ ...appContext, setSearchState }}>
            {children}
        </Context.Provider>
    )
}

export default AppContext