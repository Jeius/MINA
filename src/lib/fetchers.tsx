
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


export type Places = {
    facilities: {
        id: number | string,
        name: string,
        node: {
            x_coord: number,
            y_coord: number,
        }
        category: { name: string, }
    }[],
    rooms: {
        id: number | string,
        building_id: number | string,
        name: string,
        x_coord: number,
        y_coord: number,
        category: { name: string, }
    }[],
};

export const getPlaces = async (): Promise<Places> => {
    try {
        const res = await fetch(`/api/places`);

        if (!res.ok) {
            throw new Error('Failed to fetch places');
        }

        return (await res.json()) as Places;
    } catch (error: any) {
        throw new Error(error.message);
    }
}