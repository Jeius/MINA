"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const SearchBox = dynamic(() => import('@/components/SearchBox'), { ssr: false });
const SearchList = dynamic(() => import('@/components/SearchList'), { ssr: false });

const Search = () => {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(new URLSearchParams(searchParams).get('query'));
    const [focus, setFocus] = useState(false);
    return (
        <>
            <SearchBox
                placeholder='Search for places'
                query={search}
                focus={focus}
                setFocus={setFocus}
                setQuery={setSearch}
            />
            <SearchList pathname={'explore'} />
        </>
    )
}


export default Search;