"use client"

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import React, { HTMLAttributes } from 'react'

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
