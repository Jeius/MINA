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
            animate={{ opacity: 1, height: 'auto', }}
            exit={{ opacity: 0, height: 0, }}
            transition={{
                duration: 0.3,
                delayChildren: 0.5,
                staggerDirection: 1,
            }}
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

export const AnimatedDiv: React.FC<AnimatedProps> = ({
    className,
    children,
    ...props }) => {
    const glass = "drop-shadow-lg backdrop-blur-md bg-black bg-opacity-70";
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{
                duration: 0.2,
                ease: [0.68, -0.55, 0.27, 1.55],
                y: {
                    type: "spring",
                    damping: 15,
                    stiffness: 200,
                    restDelta: 0.001
                }
            }}
            className={cn(glass, className)}
            {...props}
        >
            {children}
        </motion.div>
    )
};
