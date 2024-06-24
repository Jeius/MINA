"use client"

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { CancelSVG, SearchSVG } from "./ui/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import debounce from "debounce";

type Props = React.HTMLAttributes<HTMLElement> & {
    placeholder?: string,
};


export const SearchField: React.FC<Props> = ({ className, placeholder }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const [focus, setFocus] = useState(false);
    const [search, setSearch] = useState(new URLSearchParams(searchParams).get('query'));
    const debouncedsetSearch = debounce(setSearch, 500);


    const glass = 'backdrop-blur-md bg-black bg-opacity-70';
    const outline = `rounded-xl outline outline-1 `;
    const outlineColor = focus ? 'outline-slate-200' : 'outline-slate-400';
    const size = 'w-full h-auto';
    const textStyle = 'text-sm';
    const placeholderStyle = 'placeholder:text-slate-300';
    const dropShadow = 'drop-shadow-lg';
    const style = 'relative flex items-center justify-center px-4 py-2';
    const iconStyle = 'h-full w-auto relative flex items-center fill-white';

    const clearInput = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        setSearch('');
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        e.preventDefault();
        setFocus(true);
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        e.preventDefault();
        setFocus(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        debouncedsetSearch(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const hash = window.location.hash;
        if (search && focus) {
            params.set('query', search);
        } else {
            params.delete('query');
        }
        if (focus) {
            params.set('s', focus.toString());
        } else {
            params.delete('s');
        }
        router.replace(`${pathname}?${params.toString()}${hash}`, { scroll: false });
    }, [focus, pathname, router, search, searchParams]);


    return (
        <form
            role="search"
            className={cn(
                style, glass, outline,
                outlineColor, size, dropShadow, className)
            }>
            <input
                name='query'
                type='text'
                role='searchbox'
                ref={inputRef}
                defaultValue={search || ''}
                placeholder={placeholder}
                autoComplete='off'
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={cn(
                    `w-full h-auto mr-2 bg-transparent outline-none`,
                    textStyle,
                    placeholderStyle,
                )}
            />
            {search
                ? <CancelSVG role='button' onClick={clearInput} className={iconStyle} />
                : <SearchSVG role='img' className={iconStyle} />}

        </form>
    )
}


