
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLElement> & {
    name: string,
    icon: React.ReactNode,
    active: string,
}

const AnimatedButton: React.FC<Props> = ({ className, name, active, icon }) => {
    const bg = active.toLowerCase() == name.toLowerCase() ? 'bg-primary' : 'bg-transparent';
    const style = 'relative flex items-center w-auto z-10 sm:mx-0 md:mx-1 lg:mx-3 px-5 py-2 rounded-full';
    const textStyle = 'text-sm font-medium overflow-clip';

    return (
        <Link
            href={`/${name.toLowerCase()}`}
            className={cn(`${style} ${bg}`, className)}
        >
            {icon}

            <AnimatePresence>
                <motion.span
                    key={`button:${active}`}
                    initial={{ opacity: 0, width: 0, }}
                    animate={{ width: 'auto', opacity: 1, }}
                    exit={{ opacity: 0, width: 0, }}
                    className={textStyle}
                >
                    {active.toLowerCase() == name.toLowerCase() ? name : null}
                </motion.span>
            </AnimatePresence>
        </Link>
    )
}

export default AnimatedButton;