import React, { useState } from 'react';
import SearchBox, { IOnclickData } from './lib/components/SearchBox/SearchBox';
import { useFetch } from './useFetchMovies';

const App = (): JSX.Element => {
  const [query, setQuery] = useState<string>();
  const { results, error, loading } = useFetch(query as string);

  const handleOnclick = (onClickDataFromSearchBox: IOnclickData): void => {
    window.open(onClickDataFromSearchBox.href, '_blank');
  };

  const handleOnChange = (onChangeDataFromSearchBox: string): void => {
    setQuery(onChangeDataFromSearchBox);
  };
  return (
    <div className='flex justify-center h-screen mt-20'>
      <div className='w-2/5'>
        <SearchBox
          onChange={handleOnChange}
          onClick={handleOnclick}
          results={results}
        />
      </div>
    </div>
  );
};

export default App;
