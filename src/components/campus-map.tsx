"use client";

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression, LatLngBoundsExpression } from 'leaflet';

const CampusMap: React.FC = () => {
    const campusBounds: LatLngBoundsExpression = [
        [8.244424, 124.241822], // Southwest corner
        [8.239023, 124.245358]  // Northeast corner
    ];

    const center: LatLngExpression = [8.241530595, 124.243854763];

    return (
        <div className="w-screen h-screen">
            <MapContainer
                className='w-full h-full'
                center={center}
                zoom={16}
                scrollWheelZoom={true}
                minZoom={15}
                maxZoom={22}
                maxBounds={campusBounds}
                maxBoundsViscosity={1.0}
                zoomControl={false}
            >
                <TileLayer
                    maxZoom={22}
                    url='https://jeius.github.io/MSUIIT_raster_tiles/tile/{z}/{x}/{y}.png'
                />
            </MapContainer>
        </div>
    );
}

export default CampusMap;
