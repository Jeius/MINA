'use client';

import { CircleMarker, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { DivIcon, LatLngTuple, PointExpression, } from 'leaflet';
import { useAppContext } from "@/lib/context";
import { Data, getPlaces } from "@/lib/fetchers";
import { ReactNode, useEffect, useState } from "react";
import ReactDOMServer from 'react-dom/server';
import { getCategoryMarkers } from "@/lib/data/CategoryMarkerIcons";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { updateHash } from "./MapEventsHandler";
import MarkerClusterGroup from "react-leaflet-cluster";

export type MapIcon = React.HTMLAttributes<HTMLElement> & {
    iconAnchor?: PointExpression,
    icon?: ReactNode,
}

export const createDivIcon = ({
    icon = getCategoryMarkers(),
    iconAnchor = [23, 43],
}: MapIcon) => {
    return new DivIcon(
        {
            html: ReactDOMServer.renderToString(icon),
            className: 'bg-transparent size-auto',
            iconAnchor: iconAnchor,
            iconSize: [47, 54.8],
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

    const cluster = (zoom: number) => {
        if (zoom <= 16) {
            return Infinity;
        } else {
            return 40;
        }
    }


    const iconCreateFunction = (cluster: any) => {
        const markers = cluster.getChildCount();
        if (markers >= 54) {
            return createDivIcon({ icon: getCategoryMarkers('campus') });
        }
        return createDivIcon({ icon: getCategoryMarkers('cluster') });
    }


    return (
        <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={iconCreateFunction}
            showCoverageOnHover={false}
            maxClusterRadius={cluster}
            disableClusteringAtZoom={21}
            spiderfyOnMaxZoom={false}
        >
            {places?.filter(p => (filterRooms(p.id, p.category)))
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
                                z: currentZoom,
                            }),
                        }}
                    />;
                })
            }
        </MarkerClusterGroup>
    );
}