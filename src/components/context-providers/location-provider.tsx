'use client';

import { PropsWithChildren, createContext, useContext } from 'react';
import { LocationComponent, location } from '@/models/location-services';

const Context = createContext(location);

export const AppContext: React.FC<PropsWithChildren> = ({ children }) => {

    return (
        <LocationComponent>
            <Context.Provider value={location}>
                {children}
            </Context.Provider>
        </LocationComponent>

    );
}

export const useAppContext = () => {
    return useContext(Context);
}