"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchBox from "../../components/SearchBox";


const Search = () => {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(new URLSearchParams(searchParams).get('query'));

    return (
        <SearchBox
            placeholder='Search for places'
            query={search}
            setQuery={setSearch}
        />
    )
}


export default Search;