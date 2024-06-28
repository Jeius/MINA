
import { useEffect } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';

export const updateHash = (zoom: number, lat: number, lng: number) => {
    const latNumber = Number(lat);
    const lngNumber = Number(lng);

    if (isNaN(latNumber) || isNaN(lngNumber)) {
        console.error("Latitude or Longitude is not a valid number");
        return;
    }

    const hash = `#map=${zoom}/${latNumber.toFixed(6)}/${lngNumber.toFixed(6)}`;
    history.replaceState(null, '', hash);
};

export const MapCenterUpdater = () => {
    const map = useMap();

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#map=')) {
                const [hashZoom, hashLat, hashLng] = hash.replace('#map=', '').split('/');
                const center = [parseFloat(hashLat), parseFloat(hashLng)] as [number, number];
                const zoom = parseInt(hashZoom);
                map.setView(center, zoom);
                console.log("MapUpdater Executed")
            }
        };

        // Handle initial load
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


const MapEventsHandler = () => {
    MapCenterUpdater();

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
