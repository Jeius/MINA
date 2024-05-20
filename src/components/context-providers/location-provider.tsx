'use client';

import { LatLng } from 'leaflet';
import { useState, useEffect, PropsWithChildren, createContext, useContext } from 'react';


type GeolocationPosition = {
    coords: {
        latitude: number;
        longitude: number;
    };
};

type GeolocationError = {
    message: string;
};

type Location = {
    location: LatLng | null,
    error: string | null,
};

const [location, setLocation] = useState<Location | null>(null);

const Context = createContext(location);

const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
};

const onSuccess = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    setLocation({
        location: new LatLng(latitude, longitude),
        error: null,
    });
};

const onError = (error: GeolocationError) => {
    setLocation({
        location: null,
        error: `Error: ${error.message}`,
    });
};

const LocationProvider: React.FC<PropsWithChildren> = ({ children }) => {
    useEffect(() => {
        if (!navigator.geolocation) {
            onError({
                message: 'Geolocation is not supported by your browser'
            });
            return;
        }

        navigator.geolocation.watchPosition(
            onSuccess, onError, options,
        );
    }, []);

    return (
        <Context.Provider value={location}>
            {children}
        </Context.Provider>
    );
}

const useLocationContext = () => {
    return useContext(Context);
}


export { LocationProvider, location, useLocationContext };