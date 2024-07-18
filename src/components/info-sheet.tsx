"use client"
import { cn, updateHash } from "@/lib/utils"
import { AnimatedDiv } from "./ui/animated"
import { Button } from "./ui/button"
import { CancelSVG, PlaceHolderSVG } from "./ui/icons"
import { useRouter, useSearchParams } from "next/navigation"
import { useFetchPlaces } from "@/lib/hooks"
import { Skeleton } from "./ui/skeleton"
import { AnimatePresence } from "framer-motion"
import Modernizr from '@scripts/modernizr'
import { useState, useEffect } from "react"

const InfoSheet = () => {
    const searchParams = useSearchParams();
    const selectedPlace = searchParams.get('name');
    const router = useRouter();
    const { places, isLoading } = useFetchPlaces();
    const [isMobile, setIsMobile] = useState(false);
    const [isTouching, setIsTouching] = useState(false);

    const place = places?.find(p => {
        const name = p.facility ? `${p.name}, ${p.facility}` : p.name;
        return name === selectedPlace;
    });

    useEffect(() => { // Detects if the device is mobile and disables hover effects
        setIsMobile(Modernizr.touchevents);
    }, []);

    /** Click/Touch Handlers */

    const handleTouchStart = () => setIsTouching(true);

    const handleTouchEnd = () => setIsTouching(false);

    const handleCancelClick = () => {
        const hash = window.location.hash;
        const params = new URLSearchParams(searchParams);
        params.delete('name');
        router.replace(`?${params.toString()}${hash}`, { scroll: false })
    }

    const handleButtonClick = () => {
        console.log('Get Directions: Button clicked');
    }

    const handleDivClick = () => {
        place && updateHash({
            zoom: 20,
            lat: place.position[0],
            lng: place.position[1]
        }, true);
    }

    return (
        <AnimatePresence>
            {selectedPlace &&
                <div className='relative flex w-full place-self-center justify-center max-w-xl px-3 py-2'>
                    <AnimatedDiv
                        key="info-sheet"
                        role='contentinfo'
                        className={cn(
                            'w-full md:w-auto md:min-w-96 relative flex flex-row',
                            'items-center justify-center p-4 rounded-lg',
                            'outline outline-2 outline-gray-500 pointer-events-auto'
                        )}
                    >
                        <PlaceHolderSVG
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                            onTouchCancel={handleTouchEnd}
                            onClick={handleDivClick}
                            className={cn(
                                'size-full max-h-20 max-w-20 rounded-lg bg-gray-500',
                                'border-2 border-gray-700 cursor-pointer transition-colors',
                                !isMobile && 'hover:bg-gray-400 hover:border-gray-500',
                                isTouching ? 'bg-gray-400 border-gray-500' : 'bg-gray-500 border-gray-700'
                            )}
                        />

                        <div className="flex flex-col gap-y-1 mx-3 py-2 text-sm">
                            {isLoading &&
                                <Skeleton className='h-4 w-28 bg-gray-300 dark:bg-gray-500' />}

                            <strong
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                                onTouchCancel={handleTouchEnd}
                                onClick={handleDivClick}
                                className={cn('cursor-pointer transition-colors',
                                    !isMobile && 'hover:underline',
                                    isTouching ? 'underline' : '',
                                )}
                            >
                                {place?.name}
                            </strong>

                            {place?.facility &&
                                <span className='text-xs'>
                                    Floor {place.floor}, {place.facility}
                                </span>}

                            <Button
                                hover={!isMobile ? 'default' : undefined}
                                onClick={handleButtonClick}
                            >Get Directions</Button>
                        </div>

                        <CancelSVG
                            role='button'
                            onClick={handleCancelClick}
                            className="absolute top-2 right-2 fill-white"
                        />
                    </AnimatedDiv>
                </div>}
        </AnimatePresence>
    )
}

export default InfoSheet