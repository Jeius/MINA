import React from 'react';
import { LocationProvider } from '@/context-providers/location-provider';
import dynamic from 'next/dynamic';
import ExploreTab from '@/components/explore-tab';

const CampusMap = dynamic(() => import('@/components/ui/campus-map'), { ssr: false })

const Home: React.FC = () => {
    return (
        <main className='relative flex flex-col h-screen w-screen bg-gray-200'>
            <LocationProvider> <CampusMap /> <ExploreTab /> </LocationProvider>
        </main>
    );
}

export default Home;
