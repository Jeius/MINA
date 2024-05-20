import CampusMap from '@/components/ui/campus-map';
import BottomNav from '@/components/ui/bottom-nav';
import React from 'react';

const Home: React.FC = () => {
    return (
        <div className='flex flex-col h-screen w-screen'>
            <CampusMap/>
            <BottomNav/>
        </div>
    );
}

export default Home;
