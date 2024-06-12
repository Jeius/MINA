"use client"

import { cn } from "@/lib/utils";
import { ChangeEvent, HTMLAttributes, useEffect, useState } from "react";
import { CancelSVG, SearchSVG } from "./icons";
import { AnimatePresence, motion } from "framer-motion";
import { Result } from "@/app/explore/page"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
const iconStyle = 'h-full w-auto relative flex items-center';

export const SearchField: React.FC<Props> = ({ className, id, placeholder }) => {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(new URLSearchParams(searchParams).get('q'));
    const [focus, setFocus] = useState(new URLSearchParams(searchParams).get('f'));
    const pathname = usePathname();
    const router = useRouter();

    const handleClick = () => {
        setSearch('');
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearch(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        params.set('q', search || '');
        params.set('f', focus || '');
        router.push(`${pathname}?${params.toString()}`);
    }, [focus, pathname, router, search, searchParams]);


    return (
        <form role="search" className={
            cn(`px-4 py-2 ${style} ${glassStyle} ${outline} ${size} ${dropShadow}`, className)
        }>
            <input
                id={id}
                name='q'
                type='text'
                role='searchbox'
                value={search || ''}
                placeholder={placeholder}
                autoComplete='off'
                onChange={handleChange}
                onFocus={() => setFocus('true')}
                onBlur={() => setFocus('false')}
                onKeyDown={handleKeyDown}
                className={`w-full h-auto mr-2 bg-transparent outline-none ${placeholderStyle} ${textStyle} `}
            />
            {search
                ? <CancelSVG role='button' type='reset' onClick={handleClick} className={iconStyle} />
                : <SearchSVG role='img' className={iconStyle} />}

        </form>
    )
}

type SearchResultProp = HTMLAttributes<HTMLElement> & { searchResults?: Result, isFocused: boolean, }

export const SearchResult: React.FC<SearchResultProp> = ({ className, searchResults, isFocused }) => {
    const scroll = 'overflow-x-auto overscroll-contain';
    const scrollbar = 'scrollbar-thin scrollbar-thumb-rounded-lg';
    const style = 'relative flex flex-col rounded-xl my-2';
    const size = 'w-full max-h-80';

    return (isFocused &&
        <AnimatePresence>
            <motion.ul
                initial={{ opacity: 0, height: 0, }}
                animate={{ height: 'auto', opacity: 1, }}
                className={
                    cn(`px-3 py-2 ${scroll} ${scrollbar} ${style} ${size} 
                        ${dropShadow} ${glassStyle}`, className)
                }>
                {searchResults?.length !== 0
                    ? searchResults?.map((result, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1, }}
                            exit={{ opacity: 0 }}
                            className={`relative flex items-center p-2 min-h-14
                                text-sm my-1 rounded-xl bg-primary bg-opacity-90 cursor-pointer`}>
                            {result.name}
                        </motion.li>
                    ))
                    : <motion.li
                        key="noResults"
                        initial={{ opacity: 0, height: 0, }}
                        animate={{ height: 'auto', opacity: 1, }}
                        exit={{ opacity: 0, height: 0, }}
                        className="place-self-center text-sm overflow-hidden">
                        No results found
                    </motion.li>}
            </motion.ul>
        </AnimatePresence>
    );
}
