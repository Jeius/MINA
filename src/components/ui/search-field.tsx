import { cn } from "@/utils/style-merger";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement>;

const SearchField: React.FC<Props> = ({ className }) => {
    const glassStyle = 'backdrop-blur-md bg-black bg-opacity-70';
    const outline = 'rounded-2xl outline outline-1 outline-slate-100';
    const size = 'w-10/12 h-auto max-w-xl';
    return (
        <form className={cn(glassStyle, outline, size, className)}>
            Search here
        </form>
    )
}

export default SearchField;