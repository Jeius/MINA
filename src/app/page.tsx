import BottomNav from '@/components/ui/bottom-nav';
import React from 'react';
import { LocationProvider } from '@/components/context-providers/location-provider';
import dynamic from 'next/dynamic';

const CampusMap = dynamic(()=> import('@/components/ui/campus-map'), {ssr:false})

const Home: React.FC = () => {
    return (
        <LocationProvider>
            <div className='flex flex-col h-screen w-screen bg-gray-200'>
                <CampusMap />
                <BottomNav />
            </div>
        </LocationProvider>
    );
}

export default Home;
