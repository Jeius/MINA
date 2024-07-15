
import { Places } from "@/lib/model";
import { AnimatedLi, AnimatedUl, } from "./ui/animated";
import { stringToBoolean } from "@/lib/utils";
import Link from "next/link";
import { useFetchPlaces } from "@/lib/fetch-hooks";
import { useEffect, useState } from "react";
import { CustomSkeleton } from "./ui/skeleton";
import { useSearchParams } from "next/navigation";

const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? <strong key={index}>{part}</strong> : part
    );
};

type Props = {
    pathName: string,
}

const SearchList: React.FC<Props> = ({
    pathName,
}) => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    const show = stringToBoolean(searchParams.get('s') || undefined);

    const { places, isError, isLoading } = useFetchPlaces();
    const [searchResult, setSearchResult] = useState<Places>();

    useEffect(() => {
        const q = Array.isArray(query) ? query.join(',') : query; // Handle array case
        if (!q) return;
        const filteredPlaces = places?.filter(place => place.name.toLowerCase().includes(q.toLowerCase()));
        setSearchResult(filteredPlaces);
    }, [query, places]);

    return ((query && show) &&
        <AnimatedUl className='relative flex flex-col rounded-xl my-2 px-3 py-2 w-full max-h-80 outline outline-1 outline-slate-500 overflow-x-auto overscroll-none scrollbar-thin'>
            {isLoading && <CustomSkeleton />}
            {isError &&
                <AnimatedLi
                    key="noResults"
                    className="place-self-center text-sm overflow-hidden">
                    Failed to search {query}
                </AnimatedLi>
            }
            {searchResult?.length !== 0
                ? searchResult?.map((result, index) => (
                    <AnimatedLi
                        key={index}
                        className='min-h-14 my-1 outline outline-1 outline-primary-dark bg-primary rounded-xl bg-opacity-90'
                    >
                        <Link
                            href={`/${pathName}?name=${result.name}#map=19/${result.position[0]}/${result.position[1]}`}
                            role='button'
                            scroll={false}
                            className="size-full p-2 relative flex items-center text-sm cursor-pointer"
                        >
                            <span>
                                {result.facility
                                    ? highlightText(`${result.name}, ${result.facility}`, typeof query === 'string' ? query : query![0])
                                    : highlightText(result.name, typeof query === 'string' ? query : query![0])
                                }
                            </span>
                        </Link>
                    </AnimatedLi>
                ))
                : <AnimatedLi
                    key="noResults"
                    className="place-self-center text-sm overflow-hidden">
                    No result found
                </AnimatedLi>}
        </AnimatedUl>
    );
};

export default SearchList;