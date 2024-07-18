"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

const SearchBox = dynamic(() => import('@/components/search-box'), { ssr: false });
const SearchList = dynamic(() => import('@/components/search-list'), { ssr: false });

const Search = () => {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(new URLSearchParams(searchParams).get('query'));
    return (
        <>
            <SearchBox
                placeholder='Search for places'
                query={search}
                setQuery={setSearch}
            />
            <SearchList />
        </>
    )
}


export default Search;