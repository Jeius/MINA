import useSWR from 'swr';
import { Places } from './model';

export const useFetchPlaces = () => {
    const fetcher = (url: string): Promise<Places> => fetch(url).then(res => res.json());

    const { data, error, isLoading } = useSWR('api/places', fetcher);

    return {
        places: data,
        isError: error,
        isLoading,
    };
}

