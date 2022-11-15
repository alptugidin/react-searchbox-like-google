import React, { useState, memo, CSSProperties, useEffect } from 'react';
import { useFetch } from 'hooks/useFetchMovies';
import NightModeButton from 'components/NightModeButton';
import SearchBox from 'lib';
import { IOnClickData, ISearchResults } from 'lib/components/SearchBox/types';
const App = (): JSX.Element => {
  const [query, setQuery] = useState<string>();
  const [darkMode, setDarkMode] = useState(false);

  const { asyncResults, error, loading } = useFetch(query as string);
  const [results] = useState<ISearchResults[] >(
    [
      {
        id: 1,
        title: 'Javascript language',
        detail: 'Lorem ipsum dolor sit amet.',
        image: 'https://www.sistemkod.com/images/blog/javascriptlogo.png'
      },

      {
        id: 2,
        title: 'Java language'
      },

      {
        id: 3,
        title: 'Kotlin language',
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png'
      },

      {
        id: 4,
        title: 'Swift language'
      },

      {
        id: 5,
        title: 'Dart language'
      },

      {
        id: 6,
        title: 'Python language',
        detail: 'Lorem ipsum dolor sit amet.'
      },

      {
        id: 7,
        title: 'Rust Language',
        detail: 'Lorem ipsum dolor sit amet.',
        image: ''
      }
    ]
  );

  const handleOnclick = (onClickData: any): void => {
    console.log(onClickData);
  };

  const handleOnChange = (onChangeData: string): void => {
    setQuery(onChangeData);
  };

  const handleOnclick2 = (onClickData: any): void => {
    console.log('Do something!');
    console.log(onClickData);
  };

  const handleOnChange2 = (onChangeData: string): void => {
    // you can also use that with onChangeData parameter.
  };

  const btn1handler = (onClickData: IOnClickData): void => {
    console.log('Button 1 clicked!');
    console.log(onClickData);
  };

  const btn2handler = (): void => {
    console.log('Button 2 clicked!');
  };

  const btn1handler2 = (onClickData: IOnClickData): void => {
    console.log('Button 1 clicked!');
    console.log(onClickData);
    //
  };

  const btn2handler2 = (): void => {
    console.log('Button 2 clicked!');
  };

  return (
    <div
      className={`flex justify-center h-screen relative transition-all ${!darkMode ? 'bg-white' : 'bg-[#202124]'}`}>
      <NightModeButton {...{ setDarkMode, darkMode }} />
      <div className='mt-56 flex md:flex-row flex-col gap-20 w-11/12 md:w-auto'>
        <div className='md:w-[400px] w-full'>
          <div className='mb-5 font-semibold text-center text-sm'>
            <p className={`transition-all ${darkMode ? 'text-white' : 'text-gray-600'}`}>Data from TMDb api</p>
          </div>
          <SearchBox
            onChange={handleOnChange}
            onClick={handleOnclick}
            results={asyncResults}
            darkMode={darkMode}
            placeHolder='Search Movies e.g. The Matrix'
            showDetail
            showImage
            buttons={[
              { label: 'Search', handler: btn1handler },
              { label: 'Do something', handler: btn2handler }
            ]}
          />
        </div>
        <div className='md:w-[400px] w-full'>
          <div className='mb-5 font-semibold text-center text-sm'>
            <p className={`transition-all ${darkMode ? 'text-white' : 'text-gray-600'}`}>Data from an array in the codebase</p>
          </div>
          <SearchBox
            onChange={handleOnChange2}
            onClick={handleOnclick2}
            results={results}
            darkMode={darkMode}
            placeHolder='Search languages e.g Javascript'
            showDetail
            showImage
            buttons={[
              { label: 'Search', handler: btn1handler2 },
              { label: 'Do something', handler: btn2handler2 }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(App);
