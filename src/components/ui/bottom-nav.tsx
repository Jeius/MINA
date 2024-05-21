"use client";

import { useState } from 'react';
import { GlassContainer } from './glass-container';
import Image from 'next/image';

const tabs = ['Explore', 'Directions', 'Places'];

const tabIcons: { [key: string]: string } = {
    Explore: '/assets/icons/explore.svg',
    Directions: '/assets/icons/directions.svg',
    Places: '/assets/icons/building.svg'
};

const BottomNav: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    const handleTabClick = (tabName: string) => {
        setSelectedTab(tabName);
    };


    return (
        <GlassContainer height='h-14' className='absolute bottom-0 p-4'>
            {tabs.map((tabName) => (
                <button
                    key={tabName}
                    name={tabName}
                    onClick={() => handleTabClick(tabName)}
                    className={`relative z-10 w-auto px-4 py-2 rounded-full transition-width duration-200 
                        ${selectedTab == tabName ? 'bg-primary' : 'bg-transparent'}`}
                >
                    <div className='flex items-center justify-around'>
                        <Image src={tabIcons[tabName]} alt={tabName} width={21} height={21}
                        className='fill-white'
                            style={{
                                filter: 'drop-shadow(3px 3px 3px rgba(255, 255, 255, 0.7)) invert(90%)',
                                transform: selectedTab == tabName
                                    ? 'translateX(0)'
                                    : 'translateX(150%)',
                                transition: 'transform 300ms',
                            }}
                        />

                        <span className={`ml-1 text-sm ${selectedTab !== tabName
                            ? 'opacity-0 transition-opacity duration-200'
                            : 'opacity-100 transition-opacity duration-200'}
                                font-medium`
                        }>
                            {tabName}
                        </span>
                    </div>
                </button>
            ))}
        </GlassContainer>
    );
};

export default BottomNav;

