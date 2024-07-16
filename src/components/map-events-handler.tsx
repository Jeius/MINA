
import { Map } from 'leaflet';
import { useEffect, useState } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';

export const updateHash = (zoom: number, lat: number, lng: number) => {
    const latNumber = Number(lat);
    const lngNumber = Number(lng);

    if (isNaN(latNumber) || isNaN(lngNumber)) {
        console.error("Latitude or Longitude is not a valid number");
        return;
    }

    const hash = `#map=${zoom}/${latNumber.toFixed(6)}/${lngNumber.toFixed(6)}`;
    history.replaceState(undefined, '', hash);
};

const FlyToOnHashChange = (map: Map) => {
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;

            if (hash.startsWith('#map=')) {
                const [hashZoom, hashLat, hashLng] = hash.replace('#map=', '').split('/');
                const center = [parseFloat(hashLat), parseFloat(hashLng)] as [number, number];
                const zoom = parseInt(hashZoom);
                map.flyTo(center, zoom, {
                    animate: true,
                    duration: 0.4,
                    easeLinearity: 0.25,
                });
            }
        };

        // Call the handler to set the initial position based on the current hash
        handleHashChange();

        // Add event listener for hash changes
        window.addEventListener('hashchange', handleHashChange);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };

    }, [map]);

    return null;
};

const MapCenter = (map: Map) => {
    useEffect(() => {
        const hash = window.location.hash;

        if (hash.startsWith('#map=')) {
            const [hashZoom, hashLat, hashLng] = hash.replace('#map=', '').split('/');
            const center = [parseFloat(hashLat), parseFloat(hashLng)] as [number, number];
            const zoom = parseInt(hashZoom);
            map.setView(center, zoom, {
                animate: true,
                duration: 0.4,
                easeLinearity: 0.25,
            });
        } else {
            const center = [8.241531, 124.243855] as [number, number];
            const zoom = 16;
            map.setView(center, zoom, {
                animate: true,
                duration: 0.4,
                easeLinearity: 0.25,
            });
        }
    }, [map]);

    return null;
};


const MapEventsHandler = () => {
    const map = useMap();

    MapCenter(map);
    FlyToOnHashChange(map);

    useMapEvents({
        moveend: (event) => {
            const map = event.target;
            const { lat, lng } = map.getCenter();
            const zoom = map.getZoom();
            updateHash(zoom, lat, lng);
        },
        zoomend: (event) => {
            const map = event.target;
            const { lat, lng } = map.getCenter();
            const zoom = map.getZoom();
            updateHash(zoom, lat, lng);
        },
    });

    return null;
};

export default MapEventsHandler;
