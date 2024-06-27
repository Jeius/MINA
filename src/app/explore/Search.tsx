"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import debounce from "debounce";
import SearchBox from "../../components/SearchBox";


const Search = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [focus, setFocus] = useState(false);
    const [search, setSearch] = useState(new URLSearchParams(searchParams).get('query'));
    const debouncedsetSearch = debounce(setSearch, 500);


    const handleClear = useCallback(() => {
        setSearch('');
    }, []);

    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement, Element>) => {
        e.preventDefault();
        setFocus(true);
    }, []);

    const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement, Element>) => {
        e.preventDefault();
        setFocus(false);
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        debouncedsetSearch(value);
    }, [debouncedsetSearch]);

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
        <SearchBox
            placeholder='Search for places'
            defaultValue={search || ''}
            focus={focus}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClear={handleClear}
        />
    )
}


export default Search;