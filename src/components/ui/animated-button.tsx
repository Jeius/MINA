'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLElement> & {
    name: string,
    active: string,
    icon: React.ReactNode,
}

const AnimatedButton: React.FC<Props> = ({ className, name, active, icon, }) => {
    const bg = active == name ? 'bg-primary' : 'bg-transparent';
    const style = 'relative flex items-center w-auto z-10 sm:mx-0 md:mx-1 lg:mx-3 px-5 py-2 rounded-full';
    const textStyle = 'text-sm font-medium overflow-clip';
    return (
        <Link
            href={`?${new URLSearchParams({ tab: name })}`}
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
                    {active == name ? name : null}
                </motion.span>
            </AnimatePresence>
        </Link>
    )
}

export default AnimatedButton;