"use client"
import { cn } from "@/lib/utils"
import { AnimatedDiv } from "./ui/animated"
import { Button } from "./ui/button"
import { CancelSVG, PlaceHolderSVG } from "./ui/icons"
import { useSearchParams } from "next/navigation"
import { useFetchPlaces } from "@/lib/fetch-hooks"
import { Skeleton } from "./ui/skeleton"


const InfoSheet = () => {
    const searchParams = useSearchParams();
    const selectedPlace = searchParams.get('name');
    const { places, isLoading } = useFetchPlaces();

    const place = places?.find(p => {
        const name = p.facility ? `${p.name}, ${p.facility}` : p.name;
        return name === selectedPlace;
    })

    const handleCancelClick = () => {

    }

    const handleButtonClick = () => {

    }

    return (selectedPlace &&
        <div className='relative flex w-full place-self-center justify-center max-w-xl px-3 py-2'>
            <AnimatedDiv className={cn(
                'w-full md:w-auto md:min-w-96 relative flex flex-row',
                'items-center justify-center p-4 rounded-lg',
                'outline outline-2 outline-gray-500 pointer-events-auto'
            )}>
                <PlaceHolderSVG className="size-full max-h-20 max-w-20" />

                <div className="flex flex-col gap-y-1 mx-3 py-2 text-sm">
                    {isLoading &&
                        <Skeleton className='h-4 w-28 bg-gray-300 dark:bg-gray-500' />}

                    <strong>{place?.name}</strong>

                    {place?.facility &&
                        <span className='text-xs'>Floor {place.floor}, {place.facility}</span>}

                    <Button onClick={handleButtonClick}>Get Directions</Button>
                </div>

                <CancelSVG
                    role='button'
                    onClick={handleCancelClick}
                    className="absolute top-2 right-2 fill-white"
                />
            </AnimatedDiv>
        </div>
    )
}

export default InfoSheet