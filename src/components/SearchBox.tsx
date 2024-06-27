"use client"
import { cn } from "@/lib/utils";
import { memo, useRef } from "react";
import { CancelSVG, SearchSVG } from "./ui/icons";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    focus?: boolean,
    onClear?: () => void,
};


const SearchBox: React.FC<Props> = ({
    className,
    focus,
    onClear,
    ...props
}) => {
    const glass = 'backdrop-blur-md bg-black bg-opacity-70';
    const outline = `rounded-xl outline outline-1 `;
    const outlineColor = focus ? 'outline-slate-200' : 'outline-slate-400';
    const size = 'w-full h-auto';
    const dropShadow = 'drop-shadow-lg';
    const style = 'relative flex items-center justify-center px-4 py-2';
    const iconStyle = 'h-full w-auto relative flex items-center fill-white';

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const handleClear = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        onClear && onClear();
    };


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
                onKeyDown={handleKeyDown}
                className='w-full h-auto mr-2 text-sm placeholder:text-slate-300 bg-transparent outline-none'
                {...props}
            />
            {inputRef.current?.value
                ? <CancelSVG role='button' onClick={handleClear} className={iconStyle} />
                : <SearchSVG role='img' className={iconStyle} />}

        </form>
    )
}


export default memo(SearchBox);