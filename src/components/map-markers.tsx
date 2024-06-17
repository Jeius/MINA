'use client';

import { CircleMarker, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { DivIcon, LatLngTuple, PointExpression } from 'leaflet';
import { useAppContext } from "@/lib/context";
import { Places, getPlaces } from "@/lib/fetchers";
import { useEffect, useState } from "react";
import { LocationSVG } from "./ui/icons";
import ReactDOMServer from 'react-dom/server';
import { getCategoryIcons } from "@/lib/data/category-icons";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export type MapIcon = React.HTMLAttributes<HTMLElement> & {
    iconAnchor?: PointExpression,
    category?: string,
}

export const createMapIcon = ({
    category = 'building',
    iconAnchor = [17, 37],
}: MapIcon) => {
    const icon = () => {
        return (
            <>
                <LocationSVG className={`relative fill-slate-900 stroke-slate-400 size-full`} />
                <div className="absolute inset-y-[9px] inset-x-[8.5px] size-[17px]">
                    {getCategoryIcons(category)}
                </div>
            </>
        );
    }

    return new DivIcon(
        {
            html: ReactDOMServer.renderToString(icon()),
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


export const PlacesMarkers = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
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

    const handleClick = ({ id, type, pos, z }: {
        id: number | string,
        type: number,
        pos: LatLngTuple,
        z: number,
    }) => {
        const params = new URLSearchParams(searchParams);
        params.set('id', id.toString());
        params.set('ty', type.toString());
        params.set('x', pos[1].toString());
        params.set('y', pos[0].toString());
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
            {places?.facilities
                .filter(f => (filterMarkers(f.category)))
                .map(f => {
                    const id = f.id;
                    const name = f.name;
                    const type = 1;
                    const categoryName = f.category.name.toLowerCase();
                    const position = [f.node.y_coord, f.node.x_coord] as LatLngTuple;
                    return <Marker
                        key={id}
                        position={position}
                        icon={createMapIcon({ category: categoryName })}
                        title={name}
                        alt={categoryName}
                        riseOnHover={true}
                        interactive={true}
                        eventHandlers={{
                            click: () => handleClick({
                                id: id,
                                type: type,
                                pos: position,
                                z: currentZoom,
                            }),
                        }}
                    />;
                })
            }

            {places?.rooms
                .filter(r => (filterRooms(r.category) && filterMarkers(r.category)))
                .map(r => {
                    const id = r.id;
                    const name = r.name;
                    const type = 2;
                    const categoryName = r.category.name.toLowerCase();
                    const position = [r.y_coord, r.x_coord] as LatLngTuple;
                    return <Marker
                        key={id}
                        position={position}
                        icon={createMapIcon({ category: categoryName })}
                        title={name}
                        alt={categoryName}
                        riseOnHover={true}
                        interactive={true}
                        eventHandlers={{
                            click: () => handleClick({
                                id: id,
                                type: type,
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