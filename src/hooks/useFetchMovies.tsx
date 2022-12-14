import { useEffect, useState } from 'react';
import axios from 'axios';
import { ISearchResults } from 'lib/components/SearchBox/types';

interface IFetchApiResponse {
  asyncResults: ISearchResults[] | undefined
  error: string | undefined
  loading: boolean
}

export const useFetch = (param: string): IFetchApiResponse => {
  const [asyncResults, setResults] = useState<ISearchResults[]>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    if (param !== undefined && param.length > 0) {
      const arr: ISearchResults[] = [];
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=204f2cebe811d76c47a873f7233cf17a&language=en-US&query=${param}&page=1&include_adult=false`
        , { signal: controller.signal }).then(response => {
      // ).then(response => {
        setLoading(true);
        response.data.results.forEach((data: any) => {
          const el: ISearchResults = {
            id: data.id,
            title: data.title,
            detail: data.overview,
            image: 'https://image.tmdb.org/t/p/original' + (data.poster_path as string), // backdrop_path
            href: `https://www.google.com/search?q=${data.title as string}`
          };
          arr.push(el);
        });
      }).catch((err) => {
        setError(err);
        setLoading(false);
      }).finally(() => {
        setLoading(false);
        setResults(arr);
      });
    }

    return () => controller.abort();
  }, [param]);
  return { asyncResults, error, loading };
};
