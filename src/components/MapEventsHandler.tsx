// app/components/MapEventsHandler.tsx

import { useMapEvents } from 'react-leaflet';

const MapEventsHandler = () => {
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

    const updateHash = (zoom: number, lat: number, lng: number) => {
        window.location.hash = `#map=${zoom}/${lat}/${lng}`;
    };

    return null;
};

export default MapEventsHandler;
