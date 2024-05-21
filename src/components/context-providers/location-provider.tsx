'use client';

import { LatLngExpression } from 'leaflet';
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

const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000,
};


const LocationProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [location, setLocation] = useState<Location>({
        position: null,
        error: null
    });

    const onSuccess = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setLocation({
            position: [latitude, longitude],
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
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(onSuccess, onError, options);
        } else {
            onError({
                message: 'Geolocation is not supported by your browser'
            });
        }
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