import Search from "@/app/explore/search";
import InfoSheet from "@/components/info-sheet";
import { cn } from "@/lib/utils";

type ExploreTabProps = {
    params: {},
    searchParams: { [key: string]: string | string[] | undefined };
};

const ExploreTab = async ({ searchParams, params }: ExploreTabProps) => {
    const place = searchParams.name;

    return (
        <>
            <section role='search' className={cn(
                'relative w-full max-w-xl place-self-center',
                'flex flex-col p-3 z-10 pointer-events-auto',
            )}>
                <Search />
            </section >
            <div className="flex flex-grow" />
            <InfoSheet place={place} />
        </>
    );
};

export default ExploreTab;
