import React, { useState, memo, CSSProperties } from 'react';
import { useFetch } from 'hooks/useFetchMovies';
import NightModeButton from 'components/NightModeButton';
// import { IOnClickData, ISearchResults } from 'lib/components/SearchBox/types';
// import SearchBox from 'lib';
// import { IOnClickData, ISearchResults } from 'lib/components/SearchBox/types';
import SearchBox, { ISearchResults, IOnClickData } from 'react-searchbox-like-google';

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
        detail: 'Lorem ipsum dolor sit amet.',
        image: 'https://upload.wikimedia.org/wikipediasdsds/commons/7/74/Kotlin_Icon.png'
      },

      {
        id: 7,
        title: 'Rust Language',
        detail: 'Lorem ipsum dolor sit amet.',
        image: ''
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
