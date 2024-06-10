"use client"

import { cn } from "@/lib/utils";
import { HTMLAttributes, useEffect, useState } from "react";
import { CancelSVG, SearchSVG } from "./icons";
import { useAppContext } from "@/lib/context";

type Props = HTMLAttributes<HTMLElement> & {
    placeholder?: string,
};

const glassStyle = 'backdrop-blur-md bg-black bg-opacity-70';
const outline = 'rounded-2xl outline outline-1 outline-slate-100';
const size = 'w-full h-auto';
const textStyle = 'text-sm';
const placeholderStyle = 'placeholder:text-slate-300';
const dropShadow = 'drop-shadow-lg';
const style = 'relative flex items-center justify-center';
const padding = 'py-2 px-4';
const iconStyle = 'h-5 w-5 relative ml-2';

export const SearchField: React.FC<Props> = ({ className, id, placeholder }) => {

    const { searchValue, setSearchValue } = useAppContext();

    const handleClearSearch = () => {
        if (setSearchValue) setSearchValue('');
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (setSearchValue) setSearchValue(event.target.value);
    };

    return (
        <form role="search" className={
            cn(`${style} ${padding} ${glassStyle} ${outline} ${size} ${dropShadow}`, className)
        }>
            <input
                id={id}
                type="search"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder={placeholder}
                className={`w-full h-auto bg-transparent outline-none ${placeholderStyle} ${textStyle} `}
            />
            {searchValue && (
                <CancelSVG className={iconStyle} onClick={handleClearSearch} />
            )}
            {!searchValue && (
                <SearchSVG className={iconStyle} />
            )}
        </form>
    )
}

export const SearchResult: React.FC<Props> = ({ className }) => {
    const { searchValue } = useAppContext();
    const [results, setResults] = useState<{ id: number, name: string }[]>([]);
    const [error, setError] = useState<string | null>(null);

    const scroll = 'overflow-x-auto overscroll-contain';
    const scrollbar = 'scrollbar-thin scrollbar-thumb-rounded-lg';
    const style = 'relative flex flex-col rounded-xl my-2';
    const size = 'w-full max-h-80';

    useEffect(() => {
        const getResult = async () => {
            try {
                const response = await fetch(`/api/search?query=${encodeURIComponent(searchValue)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data = await response.json();
                setResults(data);
            } catch (error: any) {
                setError(error.message);
            }
        };

        if (searchValue) getResult();

    }, [searchValue])

    if (error)
        return (<li className="place-self-center text-sm">{error}</li>);

    return (searchValue &&
        <ul className={
            cn(`${scroll} ${scrollbar} ${style} ${size} ${padding} ${dropShadow} ${glassStyle}`, className)
        }>
            {results.length !== 0 ?
                results.map((result) => (
                    <li key={result.id} className={`relative flex items-center min-h-12 text-sm my-1 
                    rounded-xl bg-primary bg-opacity-90 cursor-pointer ${padding}`}>
                        {result.name}
                    </li>
                )) : <li className="place-self-center text-sm">No results found</li>}
        </ul>
    );
}
