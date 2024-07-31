'use client';

import { CircleMarker, Marker, Popup, useMap, useMapEvent } from "react-leaflet";
import { Icon, LatLngTuple, PointExpression, } from 'leaflet';
import { useAppContext } from "@/lib/context";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useParams } from "next/navigation";
import MarkerClusterGroup from "react-leaflet-cluster";
import { MyCircleLoader } from "./ui/spinners";
import { useFetchPlaces } from '@/lib/hooks';
import { updateHash } from "@/lib/utils";

import L from "leaflet";
import { MarkerIconsURL } from "@/lib/data/markers";

// type MapIcon = React.HTMLAttributes<HTMLElement> & {
//     iconAnchor?: PointExpression,
//     icon?: ReactNode,
// }

// const createDivIcon = ({
//     icon,
//     iconAnchor = [23, 43],
// }: MapIcon) => {
//     return new DivIcon(
//         {
//             html: ReactDOMServer.renderToString(icon),
//             className: 'bg-transparent size-auto',
//             iconAnchor: iconAnchor,
//             iconSize: [47, 54.8],
//         }
//     );
// }

const createIcon = (category?: string) => {

    if (category) {
        const size = category !== 'cluster' ? [28, 43] : [34, 43];
        const anchor = category !== 'cluster' ? [14, 42] : [17, 42];
        const shadowAnchor = category !== 'cluster' ? [13, 40] : [17, 40];

        return new Icon({
            iconUrl: MarkerIconsURL[category],
            shadowUrl: `/markers/marker-shadow.png`,
            iconSize: size as PointExpression,
            iconAnchor: anchor as PointExpression,
            shadowAnchor: shadowAnchor as PointExpression,
        });
    }

    const DefaultIcon = new Icon({
        iconUrl: `/markers/default.png`,
        shadowUrl: `/markers/marker-shadow.png`,
        iconSize: [28, 46],
        iconAnchor: [14, 45],
        shadowAnchor: [14, 40],
    });

    L.Marker.prototype.options.icon = DefaultIcon;
    return DefaultIcon;
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
    const params = useParams();
    const searchParams = useSearchParams();
    const [pathname] = usePathname().substring(1).split('/');
    const map = useMap();
    const { places, isError, isLoading } = useFetchPlaces();
    const [selected, setSelected] = useState<string | null>('');
    const [currentZoom, setCurrentZoom] = useState(map.getZoom());

    console.log('pathname: ', pathname);

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
        const params = new URLSearchParams(searchParams);
        params.set('name', name);
        window.history.replaceState(undefined, '', `${name}`);
        updateHash({ zoom: z, lat: pos[0], lng: pos[1] }, true);
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
            return createIcon('university');
        }
        return createIcon('cluster');
    }

    const selectedMarker = () => {
        const p = places?.find(p => {
            const name = p.facility ? `${p.name}, ${p.facility}` : p.name;
            return name === selected;
        });

        const id = p?.id;
        const name = p?.facility ? `${p.name}, ${p.facility}` : p?.name;
        const position = p?.position as LatLngTuple;
        return selected === name &&
            <Marker   //Marker for the selected place
                key={id}
                position={position}
                icon={createIcon()}
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
                                    icon={createIcon(categoryName || '')}
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

            {!isError && selectedMarker()}
        </>
    );
}