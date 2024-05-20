'use client';

import { Marker, Popup } from "react-leaflet";
import { useLocationContext } from "../context-providers/location-provider";
import LocationSVG from '@/components/icons/location-icon'
import L from "leaflet";

const markerIcon = L.icon({
    iconUrl: '/assets/icons/location.svg',
    iconSize: [28, 75],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    className: 'fill-blue'
});


const LocationMarker: React.FC = () => {
    const location = useLocationContext();
    const position = location.position

    return(
        position == null
        ? <></>
        : <Marker position={position} icon={markerIcon}>
            <Popup></Popup>
        </Marker>
    );
}

export default LocationMarker;