import { SearchField, SearchResult } from "@/components/ui/search";
import { revalidatePath } from "next/cache";

export type Result = { id: number; name: string }[];

type SearchParams = { [key: string]: string | string[] | undefined };

type ExploreTabProps = {
    searchParams: SearchParams;
};

export const getData = async (query: string | string[] | undefined): Promise<Result> => {
    try {
        const q = Array.isArray(query) ? query.join(',') : query; // Handle array case

        if (!q) return ([]) as Result;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${q}`);
        if (!res.ok) {
            throw new Error('Failed to fetch search results');
        }
        return (await res.json()) as Result;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

const ExploreTab = async ({ searchParams }: ExploreTabProps) => {
    console.log(searchParams.q);
    const results = await getData(searchParams.q);

    return (
        <section className="absolute left-0 right-0 w-full max-w-xl place-self-center flex flex-col p-3 z-10">
            <SearchField placeholder="Search for places" />
            {searchParams.q && <SearchResult searchResults={results} />}
        </section>
    );
};

export default ExploreTab;
