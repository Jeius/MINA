'use client';

import { CircleMarker, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { DivIcon, LatLngTuple, PointExpression } from 'leaflet';
import { useAppContext } from "@/lib/context";
import { Data, getPlaces } from "@/lib/fetchers";
import { ReactNode, useEffect, useState } from "react";
import ReactDOMServer from 'react-dom/server';
import { getCategoryMarkers } from "@/lib/data/CategoryMarkerIcons";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { updateHash } from "./MapEventsHandler";
import { animate } from "framer-motion";

export type MapIcon = React.HTMLAttributes<HTMLElement> & {
    iconAnchor?: PointExpression,
    icon?: ReactNode,
}

export const createDivIcon = ({
    icon,
    iconAnchor = [17, 37],
}: MapIcon) => {
    return new DivIcon(
        {
            html: ReactDOMServer.renderToString(icon),
            className: 'bg-transparent size-auto',
            iconAnchor: iconAnchor,
            iconSize: [33, 40.8],
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


export const MapMarkers = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const map = useMap();
    const [places, setPlaces] = useState<Data>();
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

    const filterMarkers = (category: string) => {
        const categoryName = category.toLowerCase();

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

    const filterRooms = (id: string, category: string) => {
        const categoryName = category.toLowerCase();

        if (id.includes('F')) return true;

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

    const handleClick = ({ name, pos, z }: {
        name: string,
        pos: LatLngTuple,
        z: number,
    }) => {
        const params = new URLSearchParams(searchParams);
        params.set('name', name);
        router.replace(
            `${pathname}?${params.toString()}`
        );
        updateHash(z, pos[0], pos[1]);
        map.flyTo(pos, z, {
            animate: true,
            duration: 0.4,
            easeLinearity: 0.25,
        });
    }


    return (
        <>
            {places?.filter(p => (filterRooms(p.id, p.category) && filterMarkers(p.category)))
                .map(p => {
                    const id = p.id;
                    const name = p.name;
                    const categoryName = p.category.toLowerCase();
                    const position = p.position as LatLngTuple;
                    return <Marker
                        key={id}
                        position={position}
                        icon={createDivIcon({ icon: getCategoryMarkers(categoryName) })}
                        title={name}
                        alt={categoryName}
                        riseOnHover={true}
                        interactive={true}
                        eventHandlers={{
                            click: () => handleClick({
                                name: name,
                                pos: position,
                                z: 19,
                            }),
                        }}
                    />;
                })
            }
        </>
    );
}