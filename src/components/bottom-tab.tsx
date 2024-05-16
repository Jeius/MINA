"use client"

import { useState } from 'react';
import { GlassContainer } from './ui/glass-container';
import clsx from 'clsx';

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
        <GlassContainer height='h-14' className='absolute bottom-0'>
            <div className='w-auto self-center'>
                <div
                    className={clsx(
                        'absolute top-2 h-10 w-32 bg-primary rounded-full transition-transform duration-300',
                        getBackgroundClass(selectedTab)
                    )}
                />
                {tabs.map((tabName) => (
                    <button
                        key={tabName}
                        name={tabName}
                        onClick={() => handleTabClick(tabName)}
                        className='relative px-4 py-2 z-10 w-32'
                    >
                        <div className='flex items-center justify-center'>
                            <img src={tabIcons[tabName]} alt={tabName}
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    filter: 'drop-shadow(3px 3px 3px rgba(255, 255, 255, 0.7)) invert(90%)',
                                    transform: selectedTab == tabName
                                        ? 'translateX(0)'
                                        : 'translateX(250%)',
                                    transition: 'transform 300ms',
                                }}
                            />

                            <span className={`ml-2 ${selectedTab !== tabName
                                ? 'opacity-0 transition-opacity duration-200'
                                : 'opacity-100 transition-opacity duration-200'}
                                font-medium`
                            }>
                                {tabName}
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </GlassContainer>
    );
};

export default Tab;

