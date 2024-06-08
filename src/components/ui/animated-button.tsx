'use client';

import { useAppContext } from '@/lib/context';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React, { HTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';

type Props = HTMLAttributes<HTMLElement> & {
    name: string,
    icon: React.ReactNode,
}

const AnimatedButton: React.FC<Props> = ({ className, name, icon, }) => {
    const { selectedTab, setSelectedTab } = useAppContext();
    const router = useRouter();

    const bg = selectedTab == name ? 'bg-primary' : 'bg-transparent';
    const style = 'relative flex items-center w-auto z-10 sm:mx-0 md:mx-1 lg:mx-3 px-5 py-2 rounded-full';
    const textStyle = 'text-sm font-medium overflow-clip';

    const handleChangeTab = (newTab: string) => {
        if (setSelectedTab) {
            setSelectedTab(newTab);
        }

        router.push(`/${newTab.toLowerCase()}`);

    };

    return (
        <button
            onClick={() => handleChangeTab(name)}
            className={cn(`${style} ${bg}`, className)}
        >
            {icon}

            <AnimatePresence>
                <motion.span
                    key={`button:${selectedTab}`}
                    initial={{ opacity: 0, width: 0, }}
                    animate={{ width: 'auto', opacity: 1, }}
                    exit={{ opacity: 0, width: 0, }}
                    className={textStyle}
                >
                    {selectedTab == name ? name : null}
                </motion.span>
            </AnimatePresence>
        </button>
    )
}

export default AnimatedButton;