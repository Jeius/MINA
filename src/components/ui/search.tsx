"use client"

import { cn } from "@/lib/utils";
import { FormEvent, HTMLAttributes, useEffect, useState } from "react";
import { CancelSVG, SearchSVG } from "./icons";
import { useAppContext } from "@/lib/context";
import { AnimatePresence, motion } from "framer-motion";
import { Result } from "@/app/explore/page"
import { updateQuery } from "@/lib/actions";
import { usePathname } from "next/navigation";

type Props = HTMLAttributes<HTMLElement> & {
    placeholder?: string,
    searchParams?: { [key: string]: string | string[] | undefined }
};

const glassStyle = 'backdrop-blur-md bg-black bg-opacity-70';
const outline = 'rounded-2xl outline outline-1 outline-slate-100';
const size = 'w-full h-auto';
const textStyle = 'text-sm';
const placeholderStyle = 'placeholder:text-slate-300';
const dropShadow = 'drop-shadow-lg';
const style = 'relative flex items-center justify-center';
const searchButtonStyle = 'h-full w-auto relative flex items-center rounded-full bg-primary bg-opacity-90 p-2';

export const SearchField: React.FC<Props> = ({ className, id, placeholder, searchParams }) => {
    const { searchState, setSearchState } = useAppContext();

    const handleOnFocus = (value: boolean) => {
        if (setSearchState) setSearchState({ ...searchState, isFocused: value });
    }
    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

    return (
        <form action={updateQuery} role="search" className={
            cn(`pl-4 ${style} ${glassStyle} ${outline} ${size} ${dropShadow}`, className)
        }>
            {searchState?.isFocused && (<button type='reset' className='relative mr-1 flex items-center'>
                <CancelSVG className='w-6 h-6' />
            </button>)}

            <input
                id={id}
                name='query'
                onFocus={() => handleOnFocus(true)}
                onBlur={() => handleOnFocus(false)}
                placeholder={placeholder}
                className={`w-full h-auto bg-transparent outline-none my-2 ${placeholderStyle} ${textStyle} `}
            />
            <button type='submit' onSubmit={handleSubmit} className={searchButtonStyle}>
                <SearchSVG />
                {searchState?.isFocused && (<span className='ml-1 text-sm'>Search</span>)}
            </button>
        </form>
    )
}

type SearchResultProp = HTMLAttributes<HTMLElement> & { searchResults?: Result }

export const SearchResult: React.FC<SearchResultProp> = ({ className, searchResults }) => {

    const scroll = 'overflow-x-auto overscroll-contain';
    const scrollbar = 'scrollbar-thin scrollbar-thumb-rounded-lg';
    const style = 'relative flex flex-col rounded-xl my-2';
    const size = 'w-full max-h-80';

    return (searchResults &&
        <AnimatePresence>
            <motion.ul
                initial={{ opacity: 0, height: 0, }}
                animate={{ height: 'auto', opacity: 1, }}
                className={
                    cn(`px-3 py-2 ${scroll} ${scrollbar} ${style} ${size} 
                        ${dropShadow} ${glassStyle}`, className)
                }>
                {searchResults.length !== 0
                    ? searchResults.map((result, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1, }}
                            exit={{ opacity: 0 }}
                            className={`relative flex items-center px-2 py-1 min-h-12 
                                text-sm my-1 rounded-xl bg-primary bg-opacity-90 cursor-pointer`}>
                            {result.name}
                        </motion.li>
                    ))
                    : <motion.li
                        key="noResults"
                        initial={{ opacity: 0, height: 0, }}
                        animate={{ height: 'auto', opacity: 1, }}
                        exit={{ opacity: 0, height: 0, }}
                        className="place-self-center text-sm">
                        No results found
                    </motion.li>}
            </motion.ul>
        </AnimatePresence>
    );
}
