'use client';

import { CircleMarker, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { DivIcon, LatLngTuple, PointExpression, } from 'leaflet';
import { useAppContext } from "@/lib/context";
import { ReactNode, useEffect, useState } from "react";
import ReactDOMServer from 'react-dom/server';
import { getCategoryMarkers } from "@/lib/data/CategoryMarkerIcons";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { updateHash } from "./map-events-handler";
import MarkerClusterGroup from "react-leaflet-cluster";
import { MyCircleLoader } from "./ui/spinners";
import { useFetchPlaces } from '@/lib/fetch-hooks';


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
    const { places, isError, isLoading } = useFetchPlaces();
    const [selected, setSelected] = useState<string | null>('');
    const [currentZoom, setCurrentZoom] = useState(map.getZoom());

    useEffect(() => {
        setSelected(new URLSearchParams(searchParams).get('name'));
    }, [searchParams]);

    useMapEvent('zoomend', (event) => {
        setCurrentZoom(event.target.getZoom());
    });

    const filterRooms = (id: string, category: string | null) => {
        if (!category) return false;

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
        const hash = `#map=${z}/${pos[0].toFixed(6)}/${pos[1].toFixed(6)}`;
        const params = new URLSearchParams(searchParams);
        params.set('name', name);
        window.history.replaceState(undefined, '', `${pathname}?${params.toString()}${hash}`)
        window.dispatchEvent(new HashChangeEvent("hashchange"));
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
        <>
            {isLoading &&
                <div className="absolute z-50 left-0 bottom-14 flex flex-row p-3 items-center">
                    <span className="text-black text-sm mr-2">Loading Markers</span>
                    <MyCircleLoader size={12} />
                </div>
            }
            {!isError &&
                places?.filter(p => {
                    const name = p.facility ? `${p.name}, ${p.facility}` : p.name;
                    return name === selected;
                })
                    .map(p => {
                        const id = p.id;
                        const name = p.facility ? `${p.name}, ${p.facility}` : p.name;
                        const position = p.position as LatLngTuple;
                        return selected === name &&
                            <Marker   //Marker for the selected place
                                key={id}
                                position={position}
                                icon={createDivIcon({ icon: getCategoryMarkers('default') })}
                                title={name}
                                alt='default'
                                riseOnHover={true}
                                interactive={true}
                                eventHandlers={{
                                    click: () => handleClick({
                                        name: name,
                                        pos: position,
                                        z: 20,
                                    }),
                                }}
                            />;
                    })
            }
            {!isError &&
                <MarkerClusterGroup   //Markers for the map places
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
                            const name = p.facility ? `${p.name}, ${p.facility}` : p.name;
                            const categoryName = p.category && p.category.toLowerCase();
                            const position = p.position as LatLngTuple;
                            return selected !== name &&
                                <Marker
                                    key={id}
                                    position={position}
                                    icon={createDivIcon({ icon: getCategoryMarkers(categoryName || '') })}
                                    title={name}
                                    alt={categoryName || 'none'}
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
                </MarkerClusterGroup>}
        </>
    );
}