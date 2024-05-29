"use client";

import { useState } from 'react';
import { GlassContainer } from './glass-container';
import { motion, AnimatePresence } from "framer-motion"
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
        <GlassContainer height='h-max' className='fixed bottom-0 py-3'>
            {tabs.map((tabName) => (
                <button
                    key={`button:${tabName}`}
                    name={tabName}
                    onClick={() => handleTabClick(tabName)}
                    className={`relative flex w-auto z-10 sm:mx-0 md:mx-1 lg:mx-3 px-5 py-2 rounded-full
                        ${ selectedTab == tabName ? 'bg-primary' : 'bg-transparent' }`
                    }
                >
                    <Image priority
                        src={tabIcons[tabName]}
                        alt={tabName}
                        width={21}
                        height={21}
                        className='fill-white mr-2'
                        style={{
                            filter: 'drop-shadow(3px 3px 3px rgba(255, 255, 255, 0.7)) invert(90%)',
                        }}
                    />

                    <AnimatePresence>
                        <motion.span
                            key={`buttonTitle:${selectedTab}`}
                            initial={{ opacity: 0, width: 0, }}
                            animate={{ width: 'auto', opacity: 1, }}
                            exit={{ opacity: 0, width: 0, }}
                            className={`text-sm font-medium overflow-clip`}
                        >
                            {selectedTab == tabName ? tabName : null}
                        </motion.span>
                    </AnimatePresence>
                </button>
            ))}
        </GlassContainer>
    );
};

export default BottomNav;

