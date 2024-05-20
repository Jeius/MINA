'use client';

import { LatLng, LatLngExpression } from 'leaflet';
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
    position: LatLngExpression | null,
    error: string | null,
};

const Context = createContext<Location>({
    position: null,
    error: null
});


const LocationProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [location, setLocation] = useState<Location>({
        position: null,
        error: null
    });

    const options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
    };

    const onSuccess = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setLocation({
            position: new LatLng(latitude, longitude),
            error: null,
        });

        console.log(`lat: ${latitude}\nlong: ${longitude}`);
    };

    const onError = (error: GeolocationError) => {
        setLocation({
            position: null,
            error: `Error: ${error.message}`,
        });
    };

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


export { LocationProvider, useLocationContext };