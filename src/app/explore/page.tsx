import { SearchResult } from "@/components/search-results";
import { SearchField } from "@/components/search-field";
import { Skeleton } from "@/components/ui/skeleton";
import { stringToBoolean } from "@/lib/utils";
import { Suspense } from "react";



type SearchParams = { [key: string]: string | string[] | undefined };

type ExploreTabProps = {
    searchParams: SearchParams;
};

const CustomSkeleton = () => {
    const skeletonStyle = 'w-full h-14 rounded-xl my-2 backdrop-blur-md bg-black bg-opacity-70';
    return (
        <Skeleton className={skeletonStyle} />
    );
}

const ExploreTab = async ({ searchParams }: ExploreTabProps) => {

    const isFocused = stringToBoolean(searchParams.f as string);

    return (
        <section className="absolute left-0 right-0 w-full max-w-xl place-self-center flex flex-col p-3 z-10">
            <SearchField placeholder="Search for places" />
            <Suspense fallback={isFocused && <CustomSkeleton />} >
                {searchParams.q &&
                    <SearchResult
                        query={searchParams.q}
                        isFocused={isFocused} />}
            </Suspense>
        </section>
    );
};

export default ExploreTab;
