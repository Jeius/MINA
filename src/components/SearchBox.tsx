"use client"
import { cn } from "@/lib/utils";
import { Dispatch, memo, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { CancelSVG, SearchSVG } from "./ui/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import debounce from "debounce";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    query: string | null,
    setQuery: Dispatch<SetStateAction<string | null>>,
    onClear?: () => void,
};


const SearchBox: React.FC<Props> = ({
    className,
    query,
    setQuery,
    onClear,
    ...props
}) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    const [focus, setFocus] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const glass = 'backdrop-blur-md bg-black bg-opacity-70';
    const outline = `rounded-xl outline outline-1 `;
    const outlineColor = focus ? 'outline-slate-200' : 'outline-slate-400';
    const size = 'w-full h-auto';
    const dropShadow = 'drop-shadow-lg';
    const style = 'relative flex items-center justify-center px-4 py-2';
    const iconStyle = 'h-full w-auto relative flex items-center fill-white';

    const debouncedsetSearch = debounce(setQuery, 300);

    const handleClear = useCallback(() => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        setQuery('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        debouncedsetSearch(value);
    }, [debouncedsetSearch]);


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement, Element>) => {
        e.preventDefault();
        setFocus(true);
    }, []);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement, Element>) => {
        e.preventDefault();
        setFocus(false);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const hash = window.location.hash;
        if (query && focus) {
            params.set('query', query);
        } else {
            params.delete('query');
        }
        if (focus) {
            params.set('s', focus.toString());
        } else {
            params.delete('s');
        }
        router.replace(`${pathname}?${params.toString()}${hash}`, { scroll: false });
    }, [focus, pathname, router, query, searchParams]);

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
                autoComplete='off'
                ref={inputRef}
                defaultValue={query || ''}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                className='w-full h-auto mr-2 text-sm placeholder:text-slate-300 bg-transparent outline-none'
                {...props}
            />
            {query
                ? <CancelSVG role='button' onClick={handleClear} className={iconStyle} />
                : <SearchSVG role='img' className={iconStyle} />}

        </form>
    )
}


export default memo(SearchBox);