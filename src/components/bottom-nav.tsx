"use client"

import { ExploreSVG, DirectionsSVG, PlacesSVG } from './ui/icons';
import { AnimatedSpan } from "@/components/ui/animated";
import { cn } from '@/lib/utils';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

type NavButtonProps = React.HTMLAttributes<HTMLElement> & {
    name: string,
    icon: React.ReactNode,
}

export const NavButton = ({ className, name, icon }: NavButtonProps) => {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = usePathname();
    const active = pathname.substring(1) || 'explore';

    const bg = active.toLowerCase() == name.toLowerCase() && 'bg-primary';
    const style = 'relative flex items-center w-auto z-10 sm:mx-0 md:mx-1 lg:mx-3 px-5 py-2 rounded-full';
    const outline = active.toLowerCase() == name.toLowerCase() && 'outline outline-1 outline-primary-dark';
    const textStyle = 'text-sm font-medium overflow-clip';

    return (
        <Link
            href={`/${name.toLowerCase()}?${params.toString()}`}
            role='button'
            className={cn(style, bg, outline, className)}
        >
            {icon}

            <AnimatePresence>
                <AnimatedSpan
                    key={active}
                    className={textStyle}
                >
                    {active.toLowerCase() === name.toLowerCase() && name}
                </AnimatedSpan>
            </AnimatePresence>
        </Link>
    )
}


const BottomNav = () => {
    const glass = 'backdrop-blur-md bg-black bg-opacity-80';
    const position = 'fixed bottom-0';
    const outline = `outline outline-1 outline-slate-500`;
    const style = 'py-3 w-full flex justify-center';
    const iconStyle = 'fill-white drop-shadow-lg size-5 mr-2';

    const tabs: { [key: string]: React.ReactNode } = {
        Explore: <ExploreSVG className={iconStyle} />,
        Directions: <DirectionsSVG className={iconStyle} />,
        Places: <PlacesSVG className={iconStyle} />,
    };

    return (
        <nav className={cn(position, outline, style, glass)}>
            {Object.entries(tabs).map(([tabName, icon]) => (
                <NavButton
                    key={tabName}
                    name={tabName}
                    icon={icon}
                />
            ))}
        </nav>
    );
};

export default BottomNav;

