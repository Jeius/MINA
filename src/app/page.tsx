import React from 'react';
import { LocationProvider } from '@/lib/context-providers/location-provider';
import dynamic from 'next/dynamic';
import ExploreTab from '@/components/explore-tab';
import DirectionsTab from '@/components/directions-tab';
import PlacesTab from '@/components/places-tab';

const CampusMap = dynamic(() => import('@/components/ui/campus-map'), { ssr: false })

const tabs: { [key: string]: React.ReactNode } = {
    'Explore': <ExploreTab />,
    'Directions': <DirectionsTab />,
    'Places': <PlacesTab />,
}

const Home = (searchParams: { [key: string]: string | string[] | undefined }) => {
    const selectedTab = searchParams.tab as string || 'Explore';
    console.log(searchParams.tab);
    return (
        <main className='relative flex flex-col h-screen w-screen bg-gray-200'>
            <LocationProvider>
                <CampusMap />
                {tabs[selectedTab]}
            </LocationProvider>
        </main>
    );
}

export default Home;
