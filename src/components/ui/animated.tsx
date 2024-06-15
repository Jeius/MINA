"use client"

import { cn } from '@/lib/utils'
import { MotionProps, motion } from 'framer-motion'
import React from 'react'

type AnimatedProps = React.HTMLAttributes<HTMLElement> & MotionProps;

export const AnimatedSpan: React.FC<AnimatedProps> = ({
    children,
    ...props }) => {
    return (
        <motion.span
            initial={{ opacity: 0, width: 0, }}
            animate={{ width: 'auto', opacity: 1, }}
            exit={{ opacity: 0, width: 0, }}
            {...props}
        >
            {children}
        </motion.span>
    )
}

export const AnimatedUl: React.FC<AnimatedProps> = ({
    className,
    children,
    ...props }) => {
    const glass = "drop-shadow-lg backdrop-blur-md bg-black bg-opacity-70";
    return (
        <motion.ul
            initial={{ opacity: 0, height: 0, }}
            animate={{ height: 'auto', opacity: 1, }}
            className={cn(glass, className)}
            {...props}
        >
            {children}
        </motion.ul>
    )
};

export const AnimatedLi: React.FC<AnimatedProps> = ({
    children,
    ...props }) => {
    return (
        <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...props}
        >
            {children}
        </motion.li>
    );
};
