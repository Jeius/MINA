'use client';
import { ExploreSVG, DirectionsSVG, PlacesSVG } from './ui/icons';
import { useSearchParams } from 'next/navigation';
import AnimatedButton from "./ui/animated-button";

const tabs: { [key: string]: React.ReactNode } = {
    Explore: <ExploreSVG className='fill-white drop-shadow-lg size-5 mr-2' />,
    Directions: <DirectionsSVG className='fill-white drop-shadow-lg size-5 mr-2' />,
    Places: <PlacesSVG className='fill-white drop-shadow-lg size-5 mr-2' />,
};

const isValid = (tab: string | undefined) => {
    switch (tab) {
        case 'Explore':
        case 'Directions':
        case 'Places':
            return true;
        default:
            return false;
    }
}

const BottomNav = () => {
    const selectedTab = useSearchParams().get("tab") || 'Explore';

    return (
        <nav className='fixed bottom-0 py-3 w-full flex justify-center backdrop-blur-md bg-black bg-opacity-80'>
            {Object.entries(tabs).map(([tabName, icon]) => (
                <AnimatedButton
                    key={tabName}
                    name={tabName}
                    active={selectedTab}
                    icon={icon}
                />
            ))}
        </nav>
    );
};

export default BottomNav;

