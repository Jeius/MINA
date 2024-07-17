
import { updateHash } from '@/lib/utils';
import { Map } from 'leaflet';
import { useEffect } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';

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
            updateHash({ zoom, lat, lng }, false);
        },
        zoomend: (event) => {
            const map = event.target;
            const { lat, lng } = map.getCenter();
            const zoom = map.getZoom();
            updateHash({ zoom, lat, lng }, false);
        },
    });

    return null;
};

export default MapEventsHandler;
