"use client"

import { ExploreSVG, DirectionsSVG, PlacesSVG } from './ui/icons';
import AnimatedButton from "./ui/animated-button";
import { usePathname } from 'next/navigation';

const glassStyling = 'backdrop-blur-md bg-black bg-opacity-80';
const position = 'fixed bottom-0';
const style = 'py-3 w-full flex justify-center';
const iconStyle = 'fill-white drop-shadow-lg size-5 mr-2'

const tabs: { [key: string]: React.ReactNode } = {
    Explore: <ExploreSVG className={iconStyle} />,
    Directions: <DirectionsSVG className={iconStyle} />,
    Places: <PlacesSVG className={iconStyle} />,
};

const BottomNav = () => {
    const pathname = usePathname();
    const activeTab = pathname.substring(1) || 'explore';

    return (
        <nav className={`${position} ${style} ${glassStyling}`}>
            {Object.entries(tabs).map(([tabName, icon]) => (
                <AnimatedButton
                    key={tabName}
                    name={tabName}
                    active={activeTab}
                    icon={icon}
                />
            ))}
        </nav>
    );
};

export default BottomNav;

