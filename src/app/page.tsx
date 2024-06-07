import React from 'react';
import { LocationProvider } from '@/lib/context-providers/location-provider';
import dynamic from 'next/dynamic';
import ExploreTab from '@/components/explore-tab';
import DirectionsTab from '@/components/directions-tab';
import PlacesTab from '@/components/places-tab';
import BottomNav from '@/components/bottom-nav';

const CampusMap = dynamic(() => import('@/components/campus-map'), { ssr: false })

const tabs: { [key: string]: React.ReactNode } = {
    "Explore": <ExploreTab />,
    "Directions": <DirectionsTab />,
    "Places": <PlacesTab />,
}

type Props = {
    params: {},
    searchParams: { [key: string]: string | string[] | undefined },
}

const Home = (props: Props) => {
    const selectedTab = props.searchParams?.tab as string || "Explore";
    return (
        <>
            <main className='relative flex flex-col h-screen w-screen bg-gray-200'>
                <LocationProvider>
                    <CampusMap />
                    {tabs[selectedTab]}
                </LocationProvider>
            </main>

            <footer>
                <BottomNav active={selectedTab} />
            </footer>
        </>
    );
}

export default Home;
