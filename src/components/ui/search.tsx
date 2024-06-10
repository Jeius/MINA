"use client"

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { CancelSVG, SearchSVG } from "./icons";
import { useAppContext } from "@/lib/context";

type Props = HTMLAttributes<HTMLElement> & {
    placeholder?: string,
};

export const SearchField: React.FC<Props> = ({ className, id, placeholder }) => {
    const glassStyle = 'backdrop-blur-md bg-black bg-opacity-70';
    const outline = 'rounded-2xl outline outline-1 outline-slate-100 focus-visible:outline-primary';
    const size = 'w-full h-auto max-w-xl';
    const textStyle = 'text-sm text-white';
    const placeholderStyle = 'placeholder:text-slate-300';
    const dropShadow = 'drop-shadow-lg';
    const style = 'relative flex place-self-center items-center justify-center m-4 py-2 px-4';
    const iconStyle = 'h-5 w-5 relative ml-2';

    const { searchValue, setSearchValue } = useAppContext();

    const handleClearSearch = () => {
        if (setSearchValue) setSearchValue('');
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (setSearchValue) setSearchValue(event.target.value);
    };

    return (
        <form role="search" className={
            cn(`${style} ${glassStyle} ${outline} ${size} ${dropShadow}`, className)
        }>
            <input
                id={id}
                type="search"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder={placeholder}
                className={`w-full h-auto bg-transparent outline-none ${placeholderStyle} ${textStyle} `}
            />
            {searchValue && (
                <CancelSVG className={iconStyle} onClick={handleClearSearch} />
            )}
            {!searchValue && (
                <SearchSVG className={iconStyle} />
            )}
        </form>
    )
}
