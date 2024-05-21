'use client';

import { CircleMarker, Popup } from "react-leaflet";
import { useLocationContext } from "../context-providers/location-provider";
import {Icon} from 'leaflet';

const markerIcon = new Icon({
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
        : <CircleMarker center={position} radius={8} className="bg-rose-100">
            <Popup></Popup>
        </CircleMarker>
    );
}

export default LocationMarker;