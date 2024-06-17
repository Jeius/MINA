
export type SearchResult = {
    id: number;
    name: string,
    facility?: {
        id: number; name: string,
    }
}[];

type Query = string | string[] | undefined;

export const getSearchResult = async (query: Query): Promise<SearchResult> => {
    try {
        const q = Array.isArray(query) ? query.join(',') : query; // Handle array case

        if (!q) return ([]) as SearchResult;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${encodeURIComponent(q)}`);

        if (!res.ok) {
            throw new Error('Failed to fetch search results');
        }

        return (await res.json()) as SearchResult;

    } catch (error: any) {
        throw new Error(error.message);
    }
};


export type Data = {
    id: string,
    name: string,
    category: string,
    position: number[],
}[]

export const getPlaces = async (): Promise<Data> => {
    try {
        const res = await fetch(`/api/places`);

        if (!res.ok) {
            throw new Error('Failed to fetch places');
        }

        return (await res.json()) as Data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}