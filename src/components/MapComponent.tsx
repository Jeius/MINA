"use client"

import { LatLngBoundsExpression } from 'leaflet';
import { PropsWithChildren } from 'react';
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

    return (
        <MapContainer
            className='fixed top-0 w-full h-full z-0 bg-transparent'
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
