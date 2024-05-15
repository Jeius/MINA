"use client"

import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer } from 'react-leaflet'

const CampusMap = () => {
    const campusBounds = [
        [8.244424, 124.241822],
        [8.239023, 124.245358]
    ];

    return (
        <div className="w-screen h-screen">
            <MapContainer
                className='w-full h-full'
                center={[8.241530595, 124.243854763]}
                zoom={16}
                scrollWheelZoom={true}
                minZoom={15}
                maxZoom={22}
                bounds={campusBounds}
                maxBounds={campusBounds}
                maxBoundsViscosity={1.0}
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