import { getSearchResult } from "@/lib/fetchers";
import { HTMLAttributes } from "react";
import { AnimatedLi, AnimatedUl } from "./ui/animated";
import { cn } from "@/lib/utils";

type SearchResultProp = HTMLAttributes<HTMLElement> & { query: string | string[] | undefined, isFocused: boolean, }

export const SearchResult: React.FC<SearchResultProp> = async ({ className, query, isFocused }) => {
    const scroll = 'overflow-x-auto overscroll-contain';
    const scrollbar = 'scrollbar-thin scrollbar-thumb-rounded-lg';
    const style = 'relative flex flex-col rounded-xl my-2';
    const size = 'w-full max-h-80';

    const searchResults = await getSearchResult(query);

    return (isFocused && <AnimatedUl
        className={cn(`${scroll} ${scrollbar} ${style} ${size}`, className)}   >
        {searchResults.length !== 0
            ? searchResults.map((result, index) => (
                <AnimatedLi
                    key={index}
                    className={`relative flex items-center p-2 min-h-14
                        text-sm my-1 rounded-xl bg-primary bg-opacity-90 cursor-pointer`}>
                    {result.name}
                </AnimatedLi>
            ))
            : <AnimatedLi
                key="noResults"
                className="place-self-center text-sm overflow-hidden">
                No results found
            </AnimatedLi>}
    </AnimatedUl>
    );
}