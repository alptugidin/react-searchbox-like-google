import React, { CSSProperties, useEffect, useState } from 'react';
import { useFetch } from './hooks/useFetchMovies';
import { IOnClickData } from './lib/components/SearchBox/types';
import { SearchBox } from './lib';
const App = (): JSX.Element => {
  const [query, setQuery] = useState<string>();
  const [darkMode, setDarkMode] = useState(false);
  const { results, error, loading } = useFetch(query as string);

  const handleOnclick = (onClickData: IOnClickData): void => {
    // window.open(onClickData.href, '_blank');
  };

  const handleOnChange = (onChangeData: string): void => {
    setQuery(onChangeData);
  };

  const btn1handler = (onClickData: IOnClickData): void => {
    console.log('Button 1 clicked!');
    console.log(onClickData);
  };

  const btn2handler = (): void => {
    console.log('Button 2 clicked!');
  };

  return (
    <div
      className={`flex justify-center h-screen relative transition-all ${!darkMode ? 'bg-white' : 'bg-[#202124]'}`}>
      <div className='absolute right-5 bottom-5 rounded-full drop-shadow-md flex gap-10'>
        <button
          id='nightMode'
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
          buttons={[
            { label: 'Search', handler: btn1handler },
            { label: 'Do something', handler: btn2handler }
          ]}
        />
      </div>
    </div>
  );
};

export default App;
