"use client"

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { HTMLAttributes } from 'react'

type AnimatedButtonProps = HTMLAttributes<HTMLElement> & {
    name: string,
    icon: React.ReactNode,
}

export const AnimatedButton = ({ className, name, icon }: AnimatedButtonProps) => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = usePathname();
    const active = pathname.substring(1) || 'explore';

    const bg = active.toLowerCase() == name.toLowerCase() ? 'bg-primary' : 'bg-transparent';
    const style = 'relative flex items-center w-auto z-10 sm:mx-0 md:mx-1 lg:mx-3 px-5 py-2 rounded-full';
    const textStyle = 'text-sm font-medium overflow-clip';

    return (
        <Link
            href={`/${name.toLowerCase()}?${params.toString()}`}
            role='button'
            className={cn(`${style} ${bg}`, className)}
        >
            {icon}

            <AnimatePresence>
                <motion.span
                    key={active}
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

type AnimatedUlProps = HTMLAttributes<HTMLElement>;

export const AnimatedUl = ({ className, children }: AnimatedUlProps) => {
    return (
        <motion.ul
            initial={{ opacity: 0, height: 0, }}
            animate={{ height: 'auto', opacity: 1, }}
            className={
                cn(`px-3 py-2 drop-shadow-lg backdrop-blur-md bg-black bg-opacity-70`, className)
            }>
            {children}
        </motion.ul>
    )
};

type AnimatedLiProps = HTMLAttributes<HTMLElement> & {
    key: string | number,
};

export const AnimatedLi = ({ className, children, key, }: AnimatedLiProps) => {
    return (
        <motion.li
            key={key}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            exit={{ opacity: 0 }}
            className={className}>
            {children}
        </motion.li>
    );
};
