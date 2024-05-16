import CampusMap from '@/components/campus-map';
import Tab from '@/components/bottom-tab';
import React from 'react';

const Home: React.FC = () => {
    return (
        <div className='flex flex-col h-screen w-screen'>
            <CampusMap />
            <Tab>
                
            </Tab>

        </div>
    );
}

export default Home;
