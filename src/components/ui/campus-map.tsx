"use client";

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression, LatLngBoundsExpression } from 'leaflet';
import LocationMarker from './location-marker';
import { PropsWithChildren } from 'react';
import 'leaflet-rotate';

const CampusMap: React.FC = ({ children }: PropsWithChildren) => {
    const center: LatLngExpression = [8.241530595, 124.243854763];
    const tileURL: string = 'https://jeius.github.io/MSUIIT_raster_tiles/tile/{z}/{x}/{y}.png';
    const campusBounds: LatLngBoundsExpression = [
        [8.244424, 124.241822], // Southwest corner
        [8.238, 124.245358]  // Northeast corner
    ];

    return (
        <MapContainer
            className='w-full h-full z-0'
            center={center}
            zoom={16}
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
                maxZoom={22}
                url={tileURL}
            />

            <LocationMarker />

            {children}
        </MapContainer>

    );
}


export default CampusMap;
