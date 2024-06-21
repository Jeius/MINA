"use client"

import { LatLngBoundsExpression } from 'leaflet';
import { PropsWithChildren, useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapEventsHandler from './MapEventsHandler';
import 'leaflet/dist/leaflet.css';
import 'leaflet-rotate';

type MapComponentProps = PropsWithChildren;

const MapComponent: React.FC<MapComponentProps> = ({ children }) => {
    // const tileURL: string = 'https://jeius.github.io/MSUIIT_raster_tiles/framework/{z}/{x}/{y}.png';
    const tileURL: string = 'https://jeius.github.io/MSUIIT_raster_tiles/tile/{z}/{x}/{y}.png';
    // const tileURL: string = '/tiles/{z}/{x}/{y}.png';
    const campusBounds: LatLngBoundsExpression = [
        [8.248, 124.239],
        [8.233, 124.248]
    ];
    const defaultCenter: [number, number] = [8.241530595, 124.243854763];
    const defaultZoom = 16;
    const [center, setCenter] = useState<[number, number]>(defaultCenter);
    const [currentZoom, setCurrentZoom] = useState<number>(defaultZoom);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#map=')) {
                const [hashZoom, hashLat, hashLng] = hash.replace('#map=', '').split('/');
                setCenter([parseFloat(hashLat), parseFloat(hashLng)]);
                setCurrentZoom(parseInt(hashZoom));
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
    }, []);



    return (
        <MapContainer
            center={center}
            zoom={currentZoom}
            className='absolute w-full h-full z-0 bg-transparent'
            scrollWheelZoom={true}
            minZoom={15}
            maxZoom={22}
            maxBounds={campusBounds}
            maxBoundsViscosity={1.0}
            zoomControl={false}
            attributionControl={false}
            rotateControl={false}
            rotate={true}
            touchRotate={true}
        >
            <TileLayer
                url={tileURL}
                maxZoom={22}
                maxNativeZoom={22}
                minNativeZoom={13}
                zIndex={0}
            />

            <MapEventsHandler />

            {children}
        </MapContainer>
    );
};

export default MapComponent;
