'use client';

import { CircleMarker, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { DivIcon, LatLngTuple, PointExpression } from 'leaflet';
import { useAppContext } from "@/lib/context";
import { Data, getPlaces } from "@/lib/fetchers";
import { ReactNode, useEffect, useState } from "react";
import ReactDOMServer from 'react-dom/server';
import { getCategoryIcons } from "@/lib/data/category-icons";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

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

    const handleClick = ({ id, pos, z }: {
        id: number | string,
        pos: LatLngTuple,
        z: number,
    }) => {
        const params = new URLSearchParams(searchParams);
        params.set('id', id.toString());
        params.set('pos', pos.toLocaleString());
        params.set('z', z.toString());
        router.replace(`${pathname}?${params.toString()}`);
    }

    const getSearchParams = () => {
        const params = new URLSearchParams(searchParams);
        const x = params.get('x');
        const y = params.get('y');

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
                        icon={createDivIcon({ icon: getCategoryIcons(categoryName) })}
                        title={name}
                        alt={categoryName}
                        riseOnHover={true}
                        interactive={true}
                        eventHandlers={{
                            click: () => handleClick({
                                id: id,
                                pos: position,
                                z: currentZoom,
                            }),
                        }}
                    />;
                })
            }
        </>
    );
}