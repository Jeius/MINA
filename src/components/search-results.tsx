import { getSearchResult } from "@/lib/fetchers";
import { AnimatedLi, } from "./ui/animated";


export const SearchResult = async ({ query }: { query: string | string[] | undefined }) => {
    const searchResults = await getSearchResult(query);

    return (
        searchResults.length !== 0
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
            </AnimatedLi>
    );
}