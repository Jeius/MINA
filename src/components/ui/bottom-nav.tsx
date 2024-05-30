'use client';
import { motion, AnimatePresence } from "framer-motion"
import { ExploreSVG, DirectionsSVG, PlacesSVG } from './icons';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { url } from 'inspector';

const tabs = ['Explore', 'Directions', 'Places'];

const tabIcons: { [key: string]: React.ReactNode } = {
    Explore: <ExploreSVG className='fill-white drop-shadow-lg size-5 mr-2'/>,
    Directions: <DirectionsSVG className='fill-white drop-shadow-lg size-5 mr-2'/>,
    Places: <PlacesSVG className='fill-white drop-shadow-lg size-5 mr-2'/>,
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

const BottomNav: React.FC= () => {
    const selectedTab = useSearchParams().get("tab") || 'Explore';

    return (
        <nav className='fixed bottom-0 py-3 w-full flex justify-center backdrop-blur-md bg-black bg-opacity-80'>
            {tabs.map((tabName) => (
                <Link
                    key={`button:${tabName}`}
                    href={`?${ new URLSearchParams({ tab: tabName })}`}
                    className={`relative flex items-center w-auto z-10 sm:mx-0 md:mx-1 lg:mx-3 px-5 py-2 rounded-full
                        ${ selectedTab == tabName ? 'bg-primary' : 'bg-transparent' }`
                    }
                >
                    {tabIcons[tabName]}

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
                </Link>
            ))}
        </nav>
    );
};

export default BottomNav;

