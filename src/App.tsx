import React, { CSSProperties, useState } from 'react';
import SearchBox, { IOnclickData } from './lib/components/SearchBox/SearchBox';
import { useFetch } from './hooks/useFetchMovies';

const App = (): JSX.Element => {
  const [query, setQuery] = useState<string>();
  const { results, error, loading } = useFetch(query as string);
  const [darkMode, setDarkMode] = useState(false);

  const handleOnclick = (onClickDataFromSearchBox: IOnclickData): void => {
    // window.open(onClickDataFromSearchBox.href, '_blank');
  };

  const handleOnChange = (onChangeDataFromSearchBox: string): void => {
    setQuery(onChangeDataFromSearchBox);
  };
  return (
    <div className={`flex justify-center h-screen relative ${!darkMode ? 'bg-white' : 'bg-[#202124]'}`}>
      <div className='absolute right-5 top-5'>
        <button
          type='button'
          onClick={() => setDarkMode(!darkMode)}
          className='text-white bg-red-600 hover:bg-red-500 transition-all w-44 px-4 py-2 rounded-full font-bold'
          >
          Dark Mode {darkMode ? 'On' : ' Off'}
        </button>
      </div>
      <div className='w-[500px] mt-20'>
        <SearchBox
          onChange={handleOnChange}
          onClick={handleOnclick}
          results={results}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default App;
