"use client";

import { useState } from 'react';
import { GlassContainer } from './glass-container';
import { motion, AnimatePresence } from "framer-motion"
import Image from 'next/image';
import { ExploreSVG, DirectionsSVG, PlacesSVG } from './icons';

const tabs = ['Explore', 'Directions', 'Places'];

const tabIcons: { [key: string]: React.ReactNode } = {
    Explore: <ExploreSVG className='fill-white drop-shadow-lg size-5 mr-2'/>,
    Directions: <DirectionsSVG className='fill-white drop-shadow-lg size-5 mr-2'/>,
    Places: <PlacesSVG className='fill-white drop-shadow-lg size-5 mr-2'/>,
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
                    className={`relative flex items-center w-auto z-10 sm:mx-0 md:mx-1 lg:mx-3 px-5 py-2 rounded-full
                        ${ selectedTab == tabName ? 'bg-primary' : 'bg-transparent' }`
                    }
                >
                    {tabIcons[tabName]}

                    <AnimatePresence>
                        <motion.div
                            key={`buttonTitle:${selectedTab}`}
                            initial={{ opacity: 0, width: 0, }}
                            animate={{ width: 'auto', opacity: 1, }}
                            exit={{ opacity: 0, width: 0, }}
                            className={`text-sm font-medium overflow-clip`}
                        >
                            {selectedTab == tabName ? tabName : null}
                        </motion.div>
                    </AnimatePresence>
                </button>
            ))}
        </GlassContainer>
    );
};

export default BottomNav;

