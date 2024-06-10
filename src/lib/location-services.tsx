'use client';

import { LatLngExpression } from 'leaflet';


type GeolocationPosition = {
    coords: {
        latitude: number;
        longitude: number;
    };
};

type GeolocationError = {
    message: string;
};

export type Location = {
    position?: LatLngExpression | null,
    error?: string | null,
};

const options = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 10000,
};


export const getLocation = () => {

    let location = {}

    const onSuccess = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        location = {
            position: [latitude, longitude],
        }
        console.log(`lat: ${latitude}\nlong: ${longitude}`);
    };

    const onError = (error: GeolocationError) => {
        location = {
            error: `Error: ${error.message}`,
        }
        console.log(`Error: ${error.message}`);
    };

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(onSuccess, onError, options);
    } else {
        onError({
            message: 'Geolocation is not supported by your browser'
        });
    }

    return location;
}
