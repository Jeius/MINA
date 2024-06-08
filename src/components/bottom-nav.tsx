
import { ExploreSVG, DirectionsSVG, PlacesSVG } from './ui/icons';
import AnimatedButton from "./ui/animated-button";

const tabs: { [key: string]: React.ReactNode } = {
    Explore: <ExploreSVG className='fill-white drop-shadow-lg size-5 mr-2' />,
    Directions: <DirectionsSVG className='fill-white drop-shadow-lg size-5 mr-2' />,
    Places: <PlacesSVG className='fill-white drop-shadow-lg size-5 mr-2' />,
};


const BottomNav = () => {
    const glassStyling = 'backdrop-blur-md bg-black bg-opacity-80';
    const position = 'fixed bottom-0';
    const style = 'py-3 w-full flex justify-center';
    return (
        <nav className={`${position} ${style} ${glassStyling}`}>
            {Object.entries(tabs).map(([tabName, icon]) => (
                <AnimatedButton
                    key={tabName}
                    name={tabName}
                    icon={icon}
                />
            ))}
        </nav>
    );
};

export default BottomNav;

