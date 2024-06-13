import { Suspense } from 'react';
import { ExploreSVG, DirectionsSVG, PlacesSVG } from './ui/icons';
import { AnimatedButton } from "@/components/ui/animated";

const glassStyling = 'backdrop-blur-md bg-black bg-opacity-80';
const position = 'fixed bottom-0';
const outline = `outline outline-1 outline-slate-500`;
const style = 'py-3 w-full flex justify-center';
const iconStyle = 'fill-white drop-shadow-lg size-5 mr-2';

const tabs: { [key: string]: React.ReactNode } = {
    Explore: <ExploreSVG className={iconStyle} />,
    Directions: <DirectionsSVG className={iconStyle} />,
    Places: <PlacesSVG className={iconStyle} />,
};

const BottomNav = () => {
    return (
        <nav className={`${position} ${outline} ${style} ${glassStyling}`}>
            {Object.entries(tabs).map(([tabName, icon]) => (
                <Suspense key={tabName} >
                    <AnimatedButton
                        key={tabName}
                        name={tabName}
                        icon={icon}
                    />
                </Suspense>
            ))}
        </nav>
    );
};

export default BottomNav;

