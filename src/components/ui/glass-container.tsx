
import { cn } from '@/utils/style-merger';
import { VariantProps, cva } from 'class-variance-authority';
import React from 'react';

const glassStyling = cva(
    'flex justify-center items-center overflow-hidden backdrop-blur-md',
    {
        variants: {
            bg: {
                black: 'bg-black',
                white: 'bg-white',
            },
            textColor: {
                white: 'text-white',
                black: 'text-black',
            },
            opacity: {
                80: 'bg-opacity-80',
                70: 'bg-opacity-70',
                50: 'bg-opacity-50',
                30: 'bg-opacity-30',
            },
            rounded: {
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
                none: 'rounded-none'
            }
        },
        defaultVariants: {
            bg: 'black',
            textColor: 'white',
            opacity: 80,
            rounded: 'none',
        }
    }

)


export interface GlassContainerProps extends VariantProps<typeof glassStyling> {
    className?: string;
    children?: React.ReactNode;
    height?: string;
    width?: string;
}

const GlassContainer: React.FC<GlassContainerProps> = ({
    className,
    children,
    width = 'w-full',
    height = 'h-full',
    bg,
    textColor,
    opacity
}) => {
    return (
        <div className={`${width} ${height} ${cn(glassStyling({ bg, textColor, opacity, className }))}`}>
            {children}
        </div>
    );
}

export {GlassContainer, glassStyling};

