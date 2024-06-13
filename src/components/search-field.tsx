"use client"

import { cn } from "@/lib/utils";
import { ChangeEvent, HTMLAttributes, useEffect, useState } from "react";
import { CancelSVG, SearchSVG } from "./ui/icons";
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
    const [focus, setFocus] = useState('false');
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


