import SearchList from "@/components/SearchList";
import Search from "@/app/explore/Search";
import { cn, stringToBoolean } from "@/lib/utils";
import { Suspense } from "react";
import { AnimatedUl } from "@/components/ui/animated";
import { CustomSkeleton } from "@/components/ui/skeleton";


type ExploreTabProps = {
    searchParams: { [key: string]: string | string[] | undefined };
};

const ExploreTab = async ({ searchParams }: ExploreTabProps) => {
    const query = searchParams.query;
    const show = stringToBoolean(searchParams.s as string);

    const scroll = 'overflow-x-auto overscroll-none scrollbar-thin';
    const style = 'relative flex flex-col rounded-xl my-2 px-3 py-2';
    const outline = `rounded-2xl outline outline-1 outline-slate-500`;
    const size = 'w-full max-h-80';

    return (
        <section role='search' className="w-full max-w-xl place-self-center flex flex-col p-3 z-10 pointer-events-auto">
            <Search />
            {(query && show) &&
                <AnimatedUl className={cn(scroll, style, outline, size)}>
                    <Suspense fallback={<CustomSkeleton />} >
                        <SearchList query={query} />
                    </Suspense>
                </AnimatedUl>
            }
        </section >
    );
};

export default ExploreTab;
