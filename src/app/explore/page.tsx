import SearchList from "@/components/search-list";
import Search from "@/app/explore/search";
import { cn, stringToBoolean } from "@/lib/utils";
import { Suspense } from "react";
import { AnimatedUl } from "@/components/ui/animated";
import { CustomSkeleton } from "@/components/ui/skeleton";


type ExploreTabProps = {
    params: {},
    searchParams: { [key: string]: string | string[] | undefined };
};

const ExploreTab = async ({ searchParams, params }: ExploreTabProps) => {
    const query = searchParams.query;
    const show = stringToBoolean(searchParams.s as string);

    return (
        <section role='search' className="w-full max-w-xl place-self-center flex flex-col p-3 z-10 pointer-events-auto">
            <Search />
        </section >
    );
};

export default ExploreTab;
