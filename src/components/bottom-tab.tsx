"use client"

import { useState } from 'react';
import { GlassContainer } from './ui/glass-container';

const Tab: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState('Explore');

    const tabs = ['Explore', 'Directions', 'Places'];

    const tabIcons: { [key: string]: string } = {
        Explore: '/assets/icons/location.svg',
        Directions: '/assets/icons/navigate.svg',
        Places: '/assets/icons/business.svg'
    };

    const handleTabClick = (tabName: string) => {
        setSelectedTab(tabName);
    };

    const getBackgroundClass = (selectedTab: string) => {
        switch (selectedTab) {
            case 'Explore':
                return 'transform translate-x-0';
            case 'Directions':
                return 'transform translate-x-full';
            case 'Places':
                return 'transform translate-x-[200%]';
            default:
                return '';
        }
    };

    return (
        <GlassContainer height='h-14' className='absolute bottom-0 flex items-center p-4'>
            {tabs.map((tabName) => (
                <button
                    key={tabName}
                    name={tabName}
                    onClick={() => handleTabClick(tabName)}
                    className={`relative z-10 w-auto px-4 py-2 rounded-full transition-width duration-200 
                        ${selectedTab == tabName ? 'bg-primary' : 'bg-transparent'}`}
                >
                    <div className='flex items-center justify-around'>
                        <img src={tabIcons[tabName]} alt={tabName}
                            style={{
                                width: '20px',
                                height: '20px',
                                filter: 'drop-shadow(3px 3px 3px rgba(255, 255, 255, 0.7)) invert(90%)',
                                transform: selectedTab == tabName
                                    ? 'translateX(0)'
                                    : 'translateX(200%)',
                                transition: 'transform 300ms',
                            }}
                        />

                        <span className={`ml-1 ${selectedTab !== tabName
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

export default Tab;

