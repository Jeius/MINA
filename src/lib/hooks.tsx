import useSWR from 'swr';
import { Places } from './model';

export const useFetchPlaces = () => {
  const fetcher = (url: string): Promise<Places> => fetch(url).then(res => res.json());

  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/places`, fetcher);

  return {
    places: data,
    isError: error,
    isLoading,
  };
}
