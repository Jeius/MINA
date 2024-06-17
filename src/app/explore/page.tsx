import { SearchResults } from "@/components/search-results";
import { SearchField } from "@/components/search-field";
import { cn, stringToBoolean } from "@/lib/utils";
import { Suspense } from "react";
import { AnimatedUl } from "@/components/ui/animated";
import { CustomSkeleton } from "@/components/ui/skeleton";


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
                        <SearchResults query={query} />
                    </Suspense>
                </AnimatedUl>
            }
        </section >
    );
};

export default ExploreTab;
