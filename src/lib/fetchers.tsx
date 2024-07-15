export type Place = {
    id: string;
    name: string;
    facility?: string;
    category: string | null;
    position: number[];
};

export type Places = Place[];

type Query = string | string[] | undefined;

export const getSearchResult = async (query: Query): Promise<Place[]> => {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/api/places`);

        if (!res.ok) {
            throw new Error('Failed to fetch places');
        }

        const data = await res.json();

        // Verify if the fetched data is an array
        if (!Array.isArray(data)) {
            throw new Error('Expected an array of places');
        }

        const places = data as Places;

        const q = Array.isArray(query) ? query.join(',') : query; // Handle array case
        if (!q) return [];

        const filteredPlaces = places.filter(place => place.name.toLowerCase().includes(q.toLowerCase()));

        return filteredPlaces;

    } catch (error: any) {
        console.error('Error fetching search results:', error);
        throw new Error(error.message);
    }
};




export const getPlaces = async (): Promise<Places> => {
    try {
        const res = await fetch(`/api/places`);

        if (!res.ok) {
            throw new Error('Failed to fetch places');
        }

        const places = (await res.json()) as Places;

        return places;
    } catch (error: any) {
        throw new Error(error.message);
    }
}