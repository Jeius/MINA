'use client';

import { CircleMarker, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { DivIcon, Icon } from 'leaflet';
import { useAppContext } from "@/lib/context";
import { Places, getPlaces } from "@/lib/fetchers";
import { useEffect, useState } from "react";
import { LocationSVG } from "./icons";
import ReactDOMServer from 'react-dom/server';

const markerIcon = new Icon({
    iconUrl: '/assets/icons/location.svg',
    iconSize: [28, 75],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    className: 'fill-blue'
});


export const LocationMarker = () => {
    const appContext = useAppContext();
    const position = appContext.location?.position

    return (
        position == null
            ? <></>
            : <CircleMarker center={position} radius={8} className="bg-rose-100">
                <Popup></Popup>
            </CircleMarker>
    );
}

const CustomIcon = () => {
    const iconhtml = ReactDOMServer.renderToString(<LocationSVG className='w-10 h-10' />);
    return new DivIcon(
        {
            html: iconhtml,
            className: 'bg-transparent w-auto h-auto',
            iconAnchor: [18, 33],
        }
    );
}

const filterMarkers = (category: { name: string }, currentZoom: number) => {
    if (currentZoom >= 16) {
        switch (category.name.toLowerCase()) {
            case 'college':
                return true;
            case 'clinic':
                return true;
            default:
                break;
        }
    }
    if (currentZoom >= 17) {
        switch (category.name.toLowerCase()) {
            case 'building':
                return true;
            case 'park':
                return true;
            case 'library':
                return true;
            default:
                break;
        }
    }
    if (currentZoom >= 18) {
        return true;
    }
    return false;
}

export const MapMarker = async () => {
    const map = useMap();
    const [places, setPlaces] = useState<Places>();
    const [currentZoom, setCurrentZoom] = useState(map.getZoom());

    console.log(currentZoom);

    useEffect(() => {
        const get = async () => {
            setPlaces(await getPlaces());
        }
        get();
    }, []);

    useMapEvent('zoomend', (event) => {
        setCurrentZoom(event.target.getZoom());
    });

    return (
        <>
            {places?.facilities
                .filter(f => (filterMarkers(f.category, currentZoom)))
                .map(f => (
                    <Marker
                        key={f.id}
                        position={[f.node.y_coord, f.node.x_coord]}
                        icon={CustomIcon()}
                    />
                ))}
        </>
    );
}