'use client';

import { CircleMarker, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { DivIcon, PointExpression } from 'leaflet';
import { useAppContext } from "@/lib/context";
import { Places, getPlaces } from "@/lib/fetchers";
import { useEffect, useState } from "react";
import { LocationSVG } from "./ui/icons";
import ReactDOMServer from 'react-dom/server';

export type MapIcon = React.HTMLAttributes<HTMLElement> & {
    icon?: React.ReactNode,
    iconAnchor?: PointExpression,
    category?: string,
}

export const createMapIcon = ({
    icon = <LocationSVG className='stroke-slate-900 fill-slate-500 size-12' />,
    iconAnchor = [21.5, 39.5] }: MapIcon) => {

    const myIcon = () => {

    }

    const iconhtml = ReactDOMServer.renderToString(icon);
    return new DivIcon(
        {
            html: iconhtml,
            className: 'bg-transparent size-auto',
            iconAnchor: iconAnchor,
        }
    );
}


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


export const PlacesMarkers = () => {
    const map = useMap();
    const [places, setPlaces] = useState<Places>();
    const [currentZoom, setCurrentZoom] = useState(map.getZoom());

    useEffect(() => {
        const get = async () => {
            setPlaces(await getPlaces());
        }
        get();
    }, []);

    useMapEvent('zoomend', (event) => {
        setCurrentZoom(event.target.getZoom());
    });

    const filterMarkers = (category: { name: string }) => {
        const categoryName = category.name.toLowerCase();

        if (currentZoom >= 19) {
            return true;
        }

        if (currentZoom >= 18) {
            switch (categoryName) {
                case 'building':
                case 'park':
                case 'library':
                    return true;
                default:
                    break;
            }
        }

        if (currentZoom >= 16) {
            switch (categoryName) {
                case 'college':
                case 'clinic':
                    return true;
                default:
                    break;
            }
        }

        return false;
    };

    const filterRooms = (category: { name: string }) => {
        const categoryName = category.name.toLowerCase();
        switch (categoryName) {
            case 'college':
            case 'clinic':
            case 'food':
            case 'library':
                return true;
            default:
                return false;
        }
    }


    return (
        <>
            {places?.facilities
                .filter(f => (filterMarkers(f.category)))
                .map(f => (
                    <Marker
                        key={f.id}
                        position={[f.node.y_coord, f.node.x_coord]}
                        icon={createMapIcon({})}
                    />
                ))
            }

            {places?.rooms
                .filter(r => (filterRooms(r.category) && filterMarkers(r.category)))
                .map(r => (
                    <Marker
                        key={r.id}
                        position={[r.y_coord, r.x_coord]}
                        icon={createMapIcon({})}
                    />
                ))
            }
        </>
    );
}