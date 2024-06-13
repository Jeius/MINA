import { SearchResult } from "@/components/search-results";
import { SearchField } from "@/components/search-field";
import { Skeleton } from "@/components/ui/skeleton";
import { stringToBoolean } from "@/lib/utils";
import { Suspense } from "react";
import { AnimatedUl } from "@/components/ui/animated";



type SearchParams = { [key: string]: string | string[] | undefined };

type ExploreTabProps = {
    searchParams: SearchParams;
};

const CustomSkeleton = () => {
    const align = 'flex place-content-center place-items-center';
    const bg = 'bg-transparent';
    const skeletonStyle = `relative w-full text-sm ${align} ${bg}`;
    return (
        <Skeleton className={skeletonStyle} >Searching...</Skeleton>
    );
}

const ExploreTab = async ({ searchParams }: ExploreTabProps) => {

    const isFocused = stringToBoolean(searchParams.f as string);
    const query = searchParams.q as string;

    const scroll = 'overflow-x-auto';
    const scrollbar = 'scrollbar-thin';
    const style = 'relative flex flex-col rounded-xl my-2';
    const outline = `rounded-2xl outline outline-1 outline-slate-500`;
    const size = 'w-full max-h-80';

    return (
        <section className="absolute left-0 right-0 w-full max-w-xl place-self-center flex flex-col p-3 z-10">
            <SearchField placeholder="Search for places" />
            {(query && isFocused) &&
                <AnimatedUl className={`${scroll} ${scrollbar} ${outline} ${style} ${size}`}   >
                    <Suspense fallback={<CustomSkeleton />} >
                        <SearchResult query={query} />
                    </Suspense>
                </AnimatedUl>
            }
        </section >
    );
};

export default ExploreTab;
