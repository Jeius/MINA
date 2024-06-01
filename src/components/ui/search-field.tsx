
type style = {
    className?: string,
    width?: string | number,
    height?: string | number,
    position?: string,
    align?: string,
    maxWidth?: string,
    borderRadius?: string,
    placeholder?: string,
};

const SearchField: React.FC<style> = (
    {
        className = 'fixed m-4 py-2 px-4',
        width = '10/12',
        height = 'auto',
        position = 'top-0',
        align = 'center',
        maxWidth = 'xl',
        borderRadius = 'rounded-2xl',
        placeholder = 'Search for places'
    }
) => {

    return (
        <form className={`${className} ${position} place-self-${align} w-${width} h-${height} 
            max-w-${maxWidth} ${borderRadius} outline outline-1 outline-slate-100
            backdrop-blur-md bg-black bg-opacity-70 `} >
            Search here
        </form>
    )
}

export default SearchField;