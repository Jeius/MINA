"use client"

import { cn } from "@/lib/utils";
import { HTMLAttributes, useEffect, useState } from "react";
import { CancelSVG, SearchSVG } from "./icons";
import { useAppContext } from "@/lib/context";
import { AnimatePresence, motion } from "framer-motion";

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
    const { searchState, setSearchState } = useAppContext();

    const handleClearSearch = () => {
        if (setSearchState) setSearchState({ ...searchState, value: '' });
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (setSearchState) setSearchState({ ...searchState, value: event.target.value });
    };

    const handleOnFocus = (value: boolean) => {
        if (setSearchState) setSearchState({ ...searchState, isFocused: value });
    }

    return (
        <form role="search" className={
            cn(`${style} ${padding} ${glassStyle} ${outline} ${size} ${dropShadow}`, className)
        }>
            <input
                id={id}
                type="search"
                value={searchState?.value || ''}
                onChange={handleSearchChange}
                onFocus={() => handleOnFocus(true)}
                onBlur={() => handleOnFocus(false)}
                placeholder={placeholder}
                className={`w-full h-auto bg-transparent outline-none ${placeholderStyle} ${textStyle} `}
            />
            {searchState && (
                <CancelSVG className={iconStyle} onClick={handleClearSearch} />
            )}
            {!searchState && (
                <SearchSVG className={iconStyle} />
            )}
        </form>
    )
}

export const SearchResult: React.FC<Props> = ({ className }) => {
    const { searchState, setSearchState } = useAppContext();
    const [results, setResults] = useState<{ id: number, name: string }[]>([]);
    const [error, setError] = useState<string | null>(null);

    const scroll = 'overflow-x-auto overscroll-contain';
    const scrollbar = 'scrollbar-thin scrollbar-thumb-rounded-lg';
    const style = 'relative flex flex-col rounded-xl my-2';
    const size = 'w-full max-h-80';

    const handleOnClick = () => {
        if (setSearchState) setSearchState({ ...searchState, isFocused: true });
    }

    useEffect(() => {
        const getResult = async () => {
            try {
                const response = await fetch(`/api/search?query=${encodeURIComponent(searchState?.value || '')}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch search results');
                }
                const data = await response.json();
                setResults(data);
            } catch (error: any) {
                setError(error.message);
            }
        };

        if (searchState?.value) getResult();

    }, [searchState?.value])


    if (searchState?.isFocused)
        return (searchState.value &&
            <AnimatePresence>
                <motion.ul
                    initial={{ opacity: 0, height: 0, }}
                    animate={{ height: 'auto', opacity: 1, }}
                    onClick={handleOnClick}
                    className={
                        cn(`${scroll} ${scrollbar} ${style} ${size} ${padding} ${dropShadow} ${glassStyle}`, className)
                    }>
                    {results.length !== 0
                        ? results.map((result) => (
                            <motion.li
                                key={result.id}
                                initial={{ opacity: 0, }}
                                animate={{ opacity: 1, }}
                                exit={{ opacity: 0 }}
                                className={`relative flex items-center min-h-12 text-sm my-1 rounded-xl
                                bg-primary bg-opacity-90 cursor-pointer ${padding}`}>
                                {result.name}
                            </motion.li>
                        ))
                        : <motion.li
                            key="noResults"
                            initial={{ opacity: 0, height: 0, }}
                            animate={{ height: 'auto', opacity: 1, }}
                            exit={{ opacity: 0, height: 0, }}
                            className="place-self-center text-sm">
                            {error ? error : 'No results found'}
                        </motion.li>}
                </motion.ul>
            </AnimatePresence>
        );
}
