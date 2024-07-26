"use client"
import SearchBox from '@/components/search-box';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

const Form = () => {
    const [searchFrom, setSearchFrom] = useState<string | null>(null);
    const [searchTo, setSearchTo] = useState<string | null>(null);

    return (
        <ul className={cn(
            'w-full gap-2 flex flex-row text-white text-sm',
            'p-3 items-center pointer-events-auto',
            'border-2 border-slate-500 rounded-2xl',
            'backdrop-blur-md bg-black bg-opacity-80',
        )} >
            <li className='relative flex flex-col gap-3 justify-center items-center'>
                <span>From</span>
                <span>To</span>
            </li>
            <li className='relative flex flex-col flex-grow gap-3 justify-center items-center'>
                <SearchBox query={searchFrom} setQuery={setSearchFrom} />
                <SearchBox query={searchTo} setQuery={setSearchTo} />
            </li>
        </ul>
    )
}

export default Form