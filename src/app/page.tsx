import CampusMap from '@/components/ui/campus-map';
import BottomNav from '@/components/ui/bottom-nav';
import React from 'react';
import { LocationProvider } from '@/components/context-providers/location-provider';

const Home: React.FC = () => {
    return (
        <LocationProvider>
            <div className='flex flex-col h-screen w-screen'>
                <CampusMap />
                <BottomNav />
            </div>
        </LocationProvider>
    );
}

export default Home;
