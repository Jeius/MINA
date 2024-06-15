import { SearchResult } from "@/components/search-results";
import { SearchField } from "@/components/search-field";
import { cn, stringToBoolean } from "@/lib/utils";
import { Suspense } from "react";
import { AnimatedUl } from "@/components/ui/animated";
import { Skeleton } from "@/components/ui/skeleton";
import { MyPulseLoader } from "@/components/ui/spinners";

const CustomSkeleton = () => {
    const align = 'flex flex-row place-content-center place-items-center items-end';
    const bg = 'bg-transparent';
    const skeletonStyle = `relative w-full text-sm ${align} ${bg}`;
    return (
        <Skeleton className={skeletonStyle} >
            <span className='mr-1'>Searching</span>
            <MyPulseLoader className='mb-1' color="#ffffff" size={3} speedMultiplier={0.5} />
        </Skeleton>
    );
}

type ExploreTabProps = {
    searchParams: { [key: string]: string | string[] | undefined };
};

const ExploreTab = async ({ searchParams }: ExploreTabProps) => {
    const isFocused = stringToBoolean(searchParams.f as string);
    const query = searchParams.q;

    const scroll = 'overflow-x-auto scrollbar-thin';
    const style = 'relative flex flex-col rounded-xl my-2 px-3 py-2';
    const outline = `rounded-2xl outline outline-1 outline-slate-500`;
    const size = 'w-full max-h-80';

    return (
        <section className="absolute left-0 right-0 w-full max-w-xl place-self-center flex flex-col p-3 z-10">
            <SearchField placeholder="Search for places" />
            {(query && isFocused) &&
                <AnimatedUl className={cn(scroll, style, outline, size)}>
                    <Suspense fallback={<CustomSkeleton />} >
                        <SearchResult query={query} />
                    </Suspense>
                </AnimatedUl>
            }
        </section >
    );
};

export default ExploreTab;
