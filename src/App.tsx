import React, { useState, memo, CSSProperties } from 'react';
import { useFetch } from './hooks/useFetchMovies';
import { IOnClickData, ISearchResults } from './lib/components/SearchBox/types';
import { SearchBox } from './lib';

const App = (): JSX.Element => {
  const [query, setQuery] = useState<string>();
  const [darkMode, setDarkMode] = useState(false);

  const { asyncResults, error, loading } = useFetch(query as string);
  const [results, setResults] = useState<ISearchResults[] >(
    [
      {
        id: 1,
        title: 'Javascript language',
        detail: 'Lorem ipsum dolor sit amet.',
        image: 'https://www.sistemkod.com/images/blog/javascriptlogo.png'
      },
      { id: 2, title: 'Java language' },
      {
        id: 3,
        title: 'Kotlin language',
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png'
      },
      { id: 4, title: 'Swift language' },
      { id: 5, title: 'Dart language' },
      {
        id: 6,
        title: 'Python language',
        image: 'https://upload.wikimedia.org/wikipediasdsds/commons/7/74/Kotlin_Icon.png'
      },
      {
        id: 7,
        title: 'Rust Language',
        detail: 'Lorem ipsum dolor sit amet.'
      }
    ]
  );

  const handleOnclick = (onClickData: IOnClickData): void => {
    // you can use react router in here
  };

  const handleOnChange = (onChangeData: string): void => {
    setQuery(onChangeData);
  };

  const handleOnclick2 = (): void => {
    // do something
  };

  const handleOnChange2 = (onChangeData: string): void => {
    // you can also use with onChangeData parameter. it is presents click data.
  };

  const btn1handler = (onClickData: IOnClickData): void => {
    console.log('Button 1 clicked!');
    console.log(onClickData);
    //
  };

  const btn2handler = (): void => {
    console.log('Button 2 clicked!');
  };

  return (
    <div
      className={`flex justify-center h-screen relative transition-all ${!darkMode ? 'bg-white' : 'bg-[#202124]'}`}>

      <button
        type='button'
        onClick={() => setDarkMode(!darkMode)}
        className='absolute right-5 bottom-5 md:top-5 w-14 h-14 rounded-full bg-red-600 overflow-hidden'>
        <img
          src="/sun.svg"
          alt="sun"
          className={`absolute right-0 left-0 ml-auto mr-auto transition-all ${darkMode ? '-bottom-[38px]' : 'bottom-[16px]'}`}
        />
        <img
          src="/moon.svg"
          alt="moon"
          className={`absolute right-0 left-0 ml-auto mr-auto transition-all ${darkMode ? 'bottom-[16px]' : '-bottom-[38px]'}`}
        />
      </button>
      <div className='mt-56 flex gap-20'>
        <div className='w-[400px] md:block hidden'>
          <SearchBox
            onChange={handleOnChange}
            onClick={handleOnclick}
            results={asyncResults}
            darkMode={darkMode}
            // showDetail
            showImage
            buttons={[
              { label: 'Search', handler: btn1handler },
              { label: 'Do something', handler: btn2handler }
            ]}
          />
        </div>
        <div className='w-[400px]'>
          <SearchBox
            onChange={handleOnChange2}
            onClick={handleOnclick2}
            results={results}
            darkMode={darkMode}
            showDetail
            showImage
            buttons={[
              { label: 'Search', handler: btn1handler },
              { label: 'Do something', handler: btn2handler }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(App);
