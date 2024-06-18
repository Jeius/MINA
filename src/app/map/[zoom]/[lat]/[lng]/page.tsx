"use client"

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });

const MapPage = ({ params }: { params: { zoom: string, lat: string, lng: string } }) => {
    const router = useRouter();
    const { zoom, lat, lng } = params;

    const [center, setCenter] = useState<[number, number]>([parseFloat(lat), parseFloat(lng)]);
    const [currentZoom, setCurrentZoom] = useState<number>(parseInt(zoom));

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#map=')) {
                const [hashZoom, hashLat, hashLng] = hash.replace('#map=', '').split('/');
                setCenter([parseFloat(hashLat), parseFloat(hashLng)]);
                setCurrentZoom(parseInt(hashZoom));
            }
        };

        // Handle initial load
        handleHashChange();

        // Add event listener for hash changes
        window.addEventListener('hashchange', handleHashChange);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    return (
        // <MapComponent zoom={currentZoom} lat={center[0]} lng={center[1]} />
        null
    );
};

export default MapPage;
