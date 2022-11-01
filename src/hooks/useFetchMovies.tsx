import { useEffect, useState } from 'react';
import { ISearchResult } from '../lib/components/SearchBox/types';
import axios from 'axios';

interface IFetchApiResponse {
  results: ISearchResult[] | undefined
  error: string | undefined
  loading: boolean
}

export const useFetch = (param: string): IFetchApiResponse => {
  const [results, setResults] = useState<ISearchResult[]>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (param !== undefined && param.length > 0) {
      const arr: ISearchResult[] = [];
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=204f2cebe811d76c47a873f7233cf17a&language=en-US&query=${param}&page=1&include_adult=false`
      ).then(response => {
        setLoading(true);
        response.data.results.forEach((data: any) => {
          const el: ISearchResult = {
            id: data.id,
            title: data.title,
            image: 'https://www.pngfind.com/pngs/m/685-6854994_react-logo-no-background-hd-png-download.png',
            href: `https://www.google.com/search?q=${data.title as string}`,
            detail: 'Lorem ipsum dolor sit amet.'
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
  }, [param]);
  return { results, error, loading };
};
