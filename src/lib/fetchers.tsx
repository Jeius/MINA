

export type SearchResult = { id: number; name: string }[];

export const getSearchResult = async (query: string | string[] | undefined): Promise<SearchResult> => {
    try {
        const q = Array.isArray(query) ? query.join(',') : query; // Handle array case

        if (!q) return ([]) as SearchResult;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${q}`);
        if (!res.ok) {
            throw new Error('Failed to fetch search results');
        }
        return (await res.json()) as SearchResult;
    } catch (error: any) {
        throw new Error(error.message);
    }
};