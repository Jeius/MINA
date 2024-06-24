import { getSearchResult } from "@/lib/fetchers";
import { AnimatedLi, } from "./ui/animated";
import { cn } from "@/lib/utils";

const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? <strong key={index}>{part}</strong> : part
    );
};


export const SearchResult = async ({ query }: { query: string | string[] | undefined }) => {
    const searchResults = await getSearchResult(query);
    const outline = 'outline outline-1 outline-primary-dark';
    const bg = 'bg-primary rounded-xl bg-opacity-90';
    const style = 'relative flex items-center p-2 min-h-14 text-sm my-1 cursor-pointer';

    return (
        searchResults.length !== 0
            ? searchResults.map((result, index) => (
                <AnimatedLi
                    key={index}
                    className={cn(bg, style, outline)}
                >
                    <span>
                        {result.facility
                            ? highlightText(`${result.name}, ${result.facility.name}`, typeof query === 'string' ? query : query![0])
                            : highlightText(result.name, typeof query === 'string' ? query : query![0])
                        }
                    </span>
                </AnimatedLi>
            ))
            : <AnimatedLi
                key="noResults"
                className="place-self-center text-sm overflow-hidden">
                No results found
            </AnimatedLi>
    );
};