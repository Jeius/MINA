"use client"
import { Place, Places } from "@/lib/model";
import { AnimatedLi, AnimatedUl, } from "./ui/animated";
import { cn } from "@/lib/utils";
import { useFetchPlaces } from "@/lib/fetch-hooks";
import { useEffect, useState } from "react";
import { CustomSkeleton } from "./ui/skeleton";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";

const highlightText = (text: string, search: string) => {
    if (!search) return text;

    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return parts.map((part, index) =>
        part.toLowerCase() === search.toLowerCase() ? <strong key={index}>{part}</strong> : part
    );
};

type Props = {
    pathname: string,
}

const SearchList: React.FC<Props> = ({
    pathname,
}) => {
    const searchParams = useSearchParams();
    const search = searchParams.get('search');
    const { places, isError, isLoading } = useFetchPlaces();
    const [searchResult, setSearchResult] = useState<Places>();

    const handleClick = (result: Place) => {
        const name = result.facility ? `${result.name}, ${result.facility}` : result.name;
        const zoom = 20;
        const lat = result.position[0];
        const lng = result.position[1];
        const hash = `#map=${zoom}/${lat.toFixed(6)}/${lng.toFixed(6)}`;
        const params = new URLSearchParams(searchParams);
        params.set('name', name);

        window.history.replaceState(undefined, '', `${pathname}?${params.toString()}${hash}`)
        window.dispatchEvent(new HashChangeEvent("hashchange"));
    }

    useEffect(() => {
        const query = Array.isArray(search) ? search.join(',') : search; // Handle array case
        if (!query) return;

        const filteredPlaces = places?.filter(place => place.name.toLowerCase().includes(query.toLowerCase()));
        setSearchResult(filteredPlaces);
    }, [search, places]);

    return (
        <AnimatePresence>
            {search !== null &&
                <AnimatedUl className={cn(
                    'relative flex flex-col rounded-xl my-2 px-3 py-2 w-full max-h-80 outline outline-1',
                    'outline-slate-500 overflow-x-auto overscroll-none scrollbar-thin',
                )}>
                    {isLoading && <CustomSkeleton />}

                    {isError &&
                        <AnimatedLi
                            key='no-result'
                            className='place-self-center text-xs overflow-hidden'>
                            Failed to search {search}
                        </AnimatedLi>}

                    {(pathname === 'directions' && (!search || 'your location'.includes(search.toLowerCase()))) &&
                        <AnimatedLi
                            key='your-location'
                            onClick={() => handleClick({
                                id: "",
                                name: "Your Location",
                                category: null,
                                position: []
                            })}
                            className={cn(
                                'min-h-14 my-1 outline outline-1 outline-primary-dark',
                                'size-full p-2 bg-primary rounded-xl bg-opacity-90',
                                'relative flex items-center text-xs cursor-pointer'
                            )}
                        >
                            <span>
                                {highlightText('Your Location', typeof search === 'string' ? search : search![0])}
                            </span>
                        </AnimatedLi>
                    }

                    {search && searchResult?.length !== 0 &&
                        searchResult?.map((result, index) => {
                            const name = result.facility ? `${result.name}, ${result.facility}` : result.name;
                            return <AnimatedLi
                                key={`${index}:${name}`}
                                onClick={() => handleClick(result)}
                                className={cn(
                                    'min-h-14 my-1 outline outline-1 outline-primary-dark',
                                    'size-full p-2 bg-primary rounded-xl bg-opacity-90',
                                    'relative flex items-center text-xs cursor-pointer'
                                )}
                            >
                                <span>
                                    {highlightText(name, typeof search === 'string' ? search : search![0])}
                                </span>
                            </AnimatedLi>
                        })}

                    {searchResult?.length === 0 && !'your location'.includes(search.toLowerCase()) &&
                        <AnimatedLi
                            key='no-result'
                            className='place-self-center text-xs overflow-hidden'>
                            No result found
                        </AnimatedLi>
                    }
                </AnimatedUl>}
        </AnimatePresence>
    );
};

export default SearchList;