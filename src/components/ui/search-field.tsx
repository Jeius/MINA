import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
    placeholder?: string,
};

const SearchField: React.FC<Props> = ({ className, id, placeholder }) => {
    const glassStyle = 'backdrop-blur-md bg-black bg-opacity-70';
    const outline = 'rounded-2xl outline outline-1 outline-slate-100 focus-visible:outline-primary';
    const size = 'w-full h-auto max-w-xl';
    const textStyle = 'px-3 py-2 text-sm text-white';
    const placeholderStyle = 'placeholder:text-slate-300';
    const dropShadow = 'drop-shadow-lg'
    return (
        <input id={id} type="search" placeholder={placeholder} className={
            cn(`${glassStyle} ${outline} ${size} ${textStyle} ${placeholderStyle} ${dropShadow}`, className)
        } />
    )
}

export default SearchField;