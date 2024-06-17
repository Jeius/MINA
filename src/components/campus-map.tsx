"use client";

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression, LatLngBoundsExpression } from 'leaflet';
import { LocationMarker } from '@/components/map-markers';
import 'leaflet-rotate';

const CampusMap: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const center: LatLngExpression = [8.241530595, 124.243854763];
    // const tileURL: string = 'https://jeius.github.io/MSUIIT_raster_tiles/framework/{z}/{x}/{y}.png';
    const tileURL: string = 'https://jeius.github.io/MSUIIT_raster_tiles/tile/{z}/{x}/{y}.png';
    // const tileURL: string = '/tiles/{z}/{x}/{y}.png';
    const campusBounds: LatLngBoundsExpression = [
        [8.248, 124.239],
        [8.233, 124.248]
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
                url={tileURL}
                maxZoom={22}
                maxNativeZoom={22}
                minNativeZoom={13}
            />

            <LocationMarker />

            {children}



        </MapContainer>

    );
}


export default CampusMap;
