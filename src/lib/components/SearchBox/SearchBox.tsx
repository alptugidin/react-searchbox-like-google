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
  sx
}) => {
  const { isMobile } = useIsMobile();
  const { lightDark } = addWhite((sx?.darkThemeColor ?? '#202124'), 30);
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
      mainRef.current?.classList.add(darkMode ? 'sb_main_focus_dark' : 'sb_main_focus_light');
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
      mainRef.current?.classList.remove('sb_rounded_none');
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
          mainRef.current?.classList.remove('sb_rounded_none');
          mainRef.current?.classList.remove(darkMode ? 'sb_main_focus_dark' : 'sb_main_focus_light');
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
    mainRef.current?.classList.remove('sb_rounded_none');
    mainRef.current?.classList.remove(darkMode ? 'sb_main_focus_dark' : 'sb_main_focus_light');
    if (isMobile) {
      mainRef.current?.classList.remove('main_resp_dark');
      mainRef.current?.classList.remove('main_resp_light');
      mainRef.current?.classList.remove('sb_rounded_none');
      inputRef.current?.classList.remove('input_resp');
      topRef.current?.classList.remove('sb_top_resp');
      searchRef.current?.classList.remove('_hidden');
      backRef.current?.classList.add('_hidden');
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
      mainRef.current?.classList.remove('main_resp_light');
      mainRef.current?.classList.remove('main_resp_dark');
      inputRef.current?.classList.remove('input_resp');
      topRef.current?.classList.remove('sb_top_resp');
      setShowRespBg(false);
    }
    searchRef.current?.classList.remove('_hidden');
    backRef.current?.classList.add('_hidden');
  };

  const handleInputFocus = (): void => {
    mainRef.current?.classList.add(darkMode ? 'sb_main_focus_dark' : 'sb_main_focus_light');
    if (isMobile) {
      mainRef.current?.classList.add(darkMode ? 'main_resp_dark' : 'main_resp_light');
      inputRef.current?.classList.add('input_resp');
      topRef.current?.classList.add('sb_top_resp');
      searchRef.current?.classList.add('_hidden');
      backRef.current?.classList.remove('_hidden');
      setShowRespBg(true);
    }
  };

  useEffect(() => {
    setArr(results?.slice(0, !isMobile ? limit : 7).filter(async item => filterCondition(item, value)));
  }, [results]);

  /** @WARN not properly working on responsive */
  useEffect(() => {
    if (arr !== undefined) {
      if (arr.length > 0 && value.length > 0) {
        mainRef.current?.classList.add('sb_rounded_none');
      } else {
        mainRef.current?.classList.remove('sb_rounded_none');
      }
    }
  }, [arr]);

  useEffect(() => {
    if (value.length < 2) {
      setArr(undefined);
      mainRef.current?.classList.remove('sb_rounded_none');
    }
  }, [value]);

  useEffect(() => {
    setArr(undefined);
    mainRef.current?.classList.add('border_transition');
    setTimeout(() => {
      mainRef.current?.classList.remove('border_transition');
    }, sx?.transitionDuraiton ?? 150);
  }, [darkMode]);

  useEffect(() => {
    const listener = (e: MouseEvent): void => {
      if (mainRef.current != null && !mainRef.current?.contains(e.target as Node) && !isMobile) {
        mainRef.current.classList.remove('sb_main_focus_dark');
        mainRef.current.classList.remove('sb_main_focus_light');
        mainRef.current.classList.remove('sb_rounded_none');
        setArr(undefined);
        setActive(-1);
      }
    };
    window.addEventListener('click', listener);
    return () => window.removeEventListener('click', listener);
  }, []);

  return (
    <div ref={topRef} style={{
      '--text': darkMode ? '#ffffff' : sx?.textColor ?? '#1f2937',
      '--highlightText': darkMode ? '#ffffff' : sx?.highlightColor ?? '#1f2937',
      '--darkPrimary': sx?.darkThemeColor ?? '#202124',
      '--darkSecondary': lightDark,
      '--duration': (sx?.transitionDuraiton ?? 150).toString().concat('ms'),
      '--borderRadius': (sx?.borderRadius ?? '24').toString().concat('px'),
      position: !isMobile ? 'relative' : ''
    } as CSSProperties}>

      <div
        ref={mainRef}
        className={darkMode ? 'sb_main_dark' : 'sb_main_light'}>
        <Fragment>
          {isMobile
            ? (
              <Fragment>
                <div ref={searchRef} className={'search'}>
                  <SearchSVG />
                </div>
                <button ref={backRef} onClick={handleBack} className={['back', '_hidden'].join(' ')}>
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
          <div className={darkMode ? 'input_dark' : 'input_light'}>
            <input
              ref={inputRef}
              value={tempVal}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              onChange={handleOnChange}
              placeholder={placeHolder}
              type="text" />
            {/* {showRespBg && <div className={"resp_bg"}></div>} */}
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
        buttons,
        sx
      }} />
      {showRespBg && <div className={darkMode ? 'resp_bg_dark' : 'resp_bg_light'}></div>}
    </div>
  );
};

export default memo(SearchBox);
