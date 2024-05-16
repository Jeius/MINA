import CampusMap from '@/components/ui/campus-map';
import Tab from '@/components/ui/bottom-tab';
import React from 'react';

const Home: React.FC = () => {
    return (
        <div className='flex flex-col h-screen w-screen'>
            <CampusMap/>
            <Tab/>
        </div>
    );
}

export default Home;
