import React, { CSSProperties, Fragment, useEffect, useRef, useState, memo } from 'react';
// import style from './SearchBox.module.scss';
import './style.scss';
import useIsMobile from 'lib/hooks/useIsMobile';
import addWhite from 'lib/utils/addWhite';
import { filterCondition } from 'lib/utils/filterCondition';
import { BackSVG, ClearSVG, SearchSVG } from '../Svg';
import SearchResults from './SearchResults';
import { ISearchBoxProps, ISearchResults } from './types';

const SearchBox: React.FC<ISearchBoxProps> = ({
  onChange,
  onClick,
  results,
  placeHolder,
  darkMode,
  showImage = false,
  showDetail = false,
  buttons = undefined,
  limit = 10,
  thresHold = 1,
  sx = {}
}) => {
  // set defaults
  const {
    darkThemeColor = '#202124',
    borderRadius = 24,
    transitionDuraiton = 150
  } = sx;
  const { isMobile } = useIsMobile();
  const { lightDark } = addWhite(darkThemeColor, 30);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);

  const [arr, setArr] = useState<ISearchResults[]>();
  const [value, setValue] = useState('');
  const [tempVal, setTempVal] = useState('');
  const [active, setActive] = useState(-1);
  const [showRespBg, setShowRespBg] = useState(false);

  const handleClear = (): void => {
    setValue('');
    setTempVal('');
    setActive(-1);

    if (inputRef.current !== null && !isMobile) {
      mainRef.current?.classList.add(darkMode ? 'sb-main-focus-dark' : 'sb-main-focus-light');
      inputRef.current.focus();
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e !== undefined && e.target.value[0] !== '') {
      setValue(e.target.value);
      setTempVal(e.target.value);
      if (e.target.value.length > thresHold) {
        onChange(e.target.value); // export onchange data
        setArr(results?.slice(0, limit).filter(item => filterCondition(item, e.target.value)));
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Backspace' && tempVal.length < 1) {
      setArr(undefined);
      setActive(-1);
      mainRef.current?.classList.remove('sb-rounded-none');
    }
    if (arr !== undefined && arr.length > 0) {
      switch (e.code) {
      case 'ArrowDown':
        e.preventDefault();
        if (active < arr.length - 1) {
          setActive(active + 1);
          setTempVal(arr[active + 1].title);
        } else {
          setActive(0);
          setTempVal(arr[0].title);
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (active > 0) {
          setActive(active - 1);
          setTempVal(arr[active - 1].title);
        } else {
          setActive(arr.length - 1);
          setTempVal(arr[arr.length - 1].title);
        }
        break;

      case 'Enter':
        e.preventDefault();
        if (active > -1) {
          setArr(undefined);
          setTempVal(arr[active].title);
          mainRef.current?.classList.remove('sb-rounded-none');
          mainRef.current?.classList.remove(darkMode ? 'sb-main-focus-dark' : 'sb-main-focus-light');
          inputRef.current?.blur();
          setValue(arr[active].title);
          setActive(-1);
        }
        break;
      }
    }
  };

  const handleOnClick = (onClickData: any): void => {
    setArr(undefined);
    onClick(onClickData);
    setValue(onClickData.title);
    setTempVal(onClickData.title);
    mainRef.current?.classList.remove('sb-rounded-none');
    mainRef.current?.classList.remove(darkMode ? 'sb-main-focus-dark' : 'sb-main-focus-light');
    if (isMobile) {
      mainRef.current?.classList.remove('main-resp-dark');
      mainRef.current?.classList.remove('main-resp-light');
      mainRef.current?.classList.remove('sb-rounded-none');
      inputRef.current?.classList.remove('input-resp');
      topRef.current?.classList.remove('sb-top-resp');
      searchRef.current?.classList.remove('sb-hidden');
      backRef.current?.classList.add('sb-hidden');
      setShowRespBg(false);
    }
  };

  const handleBtn = (fn?: Function): void => {
    if (arr !== undefined && fn !== undefined) {
      if (active === -1) {
        fn(arr[0]);
        setValue(arr[0].title);
        setTempVal(arr[0].title);
      } else {
        fn(arr[active]);
        setValue(arr[active].title);
        setTempVal(arr[active].title);
      }
    }
  };

  const handleBack = (): void => {
    setValue('');
    setTempVal('');
    if (isMobile) {
      mainRef.current?.classList.remove('main-resp-light');
      mainRef.current?.classList.remove('main-resp-dark');
      inputRef.current?.classList.remove('input-resp');
      topRef.current?.classList.remove('sb-top-resp');
      setShowRespBg(false);
    }
    searchRef.current?.classList.remove('sb-hidden');
    backRef.current?.classList.add('sb-hidden');
  };

  const handleInputFocus = (): void => {
    mainRef.current?.classList.add(darkMode ? 'sb-main-focus-dark' : 'sb-main-focus-light');
    if (isMobile) {
      mainRef.current?.classList.add(darkMode ? 'main-resp-dark' : 'main-resp-light');
      inputRef.current?.classList.add('input-resp');
      topRef.current?.classList.add('sb-top-resp');
      searchRef.current?.classList.add('sb-hidden');
      backRef.current?.classList.remove('sb-hidden');
      setShowRespBg(true);
    }
  };

  useEffect(() => {
    setArr(results?.slice(0, !isMobile ? limit : 7).filter(async item => filterCondition(item, value)));
  }, [results]);

  useEffect(() => {
    if (arr !== undefined) {
      if (arr.length > 0 && value.length > 0) {
        mainRef.current?.classList.add('sb-rounded-none');
      } else {
        mainRef.current?.classList.remove('sb-rounded-none');
      }
    }
  }, [arr]);

  useEffect(() => {
    if (value.length < 2) {
      setArr(undefined);
      mainRef.current?.classList.remove('sb-rounded-none');
    }
  }, [value]);

  useEffect(() => {
    setArr(undefined);
    mainRef.current?.classList.add('border-transition');
    inputRef.current?.classList.add('transition');
    setTimeout(() => {
      mainRef.current?.classList.remove('border-transition');
      inputRef.current?.classList.remove('transition');
    }, transitionDuraiton);
  }, [darkMode]);

  useEffect(() => {
    const listener = (e: MouseEvent): void => {
      if (mainRef.current != null && !mainRef.current?.contains(e.target as Node) && !isMobile) {
        mainRef.current.classList.remove('sb-main-focus-dark');
        mainRef.current.classList.remove('sb-main-focus-light');
        mainRef.current.classList.remove('sb-rounded-none');
        setArr(undefined);
        setActive(-1);
      }
    };
    window.addEventListener('click', listener);
    return () => window.removeEventListener('click', listener);
  }, []);

  return (
    <div ref={topRef} style={{
      // '--text': darkMode ? '#ffffff' : textColor,
      // '--highlightText': darkMode ? '#ffffff' : highlightColor,
      '--darkPrimary': darkThemeColor,
      '--darkSecondary': lightDark,
      '--duration': transitionDuraiton.toString().concat('ms'),
      '--borderRadius': borderRadius.toString().concat('px'),
      position: !isMobile ? 'relative' : ''
    } as CSSProperties}>
      <div
        ref={mainRef}
        className={darkMode ? 'sb-main-dark' : 'sb-main-light'}>
        <Fragment>
          {isMobile
            ? (
              <Fragment>
                <div ref={searchRef} className={'search'}>
                  <SearchSVG />
                </div>
                <button ref={backRef} onClick={handleBack} className={['back', 'sb-hidden'].join(' ')}>
                  <BackSVG />
                </button>
              </Fragment>
            )
            : (
              <Fragment>
                <div className={'search'}>
                  <SearchSVG />
                </div>
              </Fragment>
            )}
          <div className={darkMode ? 'input-dark' : 'input-light'}>
            <input
              ref={inputRef}
              value={tempVal}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              onChange={handleOnChange}
              placeholder={placeHolder}
              type="text" />
            {/* {showRespBg && <div className={"resp-bg"}></div>} */}
          </div>
          <div className={'clear'}>
            <button
              type='button'
              style={{ display: value.length > 0 ? 'block' : 'none' }}
              onClick={handleClear}>
              <div>
                <ClearSVG />
              </div>
            </button>
          </div>
        </Fragment>
      </div >

      <SearchResults {...{
        arr,
        dropdownRef,
        active,
        isMobile,
        handleOnClick,
        handleBtn,
        value,
        showDetail,
        showImage,
        darkMode,
        buttons
      }} />
      {showRespBg && <div className={darkMode ? 'resp-bg-dark' : 'resp-bg-light'}></div>}
    </div>
  );
};

export default memo(SearchBox);
