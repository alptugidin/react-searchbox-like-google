import React, { CSSProperties, Fragment, useEffect, useRef, useState } from 'react';
import useIsMobile from '../../utils/useIsMobile';
import BackSVG from '../Svg/BackSVG';
import ClearSVG from '../Svg/ClearSVG';
import SearchSVG from '../Svg/SearchSVG';
import style from './SearchBox.module.scss';
import { ISearchResult, SearchBoxProps } from './types';

const SearchBox: React.FC<SearchBoxProps> = ({
  onChange,
  onClick,
  results,
  limit = 10,
  thresHold = 1,
  placeHolder,
  showImage = false,
  textColor = '#1f2937',
  highlightColor = '#1f2937',
  darkMode = false,
  showDetail = false,
  buttons = undefined
}) => {
  const { isMobile } = useIsMobile();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const [arr, setArr] = useState<ISearchResult[]>();
  const [value, setValue] = useState('');
  const [tempVal, setTempVal] = useState('');
  const [active, setActive] = useState(-1);

  const highlighted = (title: string): JSX.Element => {
    let span = <span className={style.sb_highlight_span} style={{ color: !darkMode ? textColor : '#ffffff' }}>{title}</span>;
    const splitted = title.split(new RegExp(`(${value})`, 'gi'));
    if (splitted.length > 1) {
      span =
      <div className={style.sb_highlight_div}>
        <span style={{ color: !darkMode ? textColor : '#ffffff' }}>{splitted[0]}</span>
        <span style={{ color: !darkMode ? highlightColor : '#ffffff', fontWeight: 700 }}>{splitted[1]}</span>
        <span style={{ color: !darkMode ? textColor : '#ffffff' }}>{splitted[2]}</span>
      </div>;
    }
    return span;
  };

  const handleClear = (): void => {
    setValue('');
    setTempVal('');
    setActive(-1);
    if (inputRef.current !== null) inputRef.current.focus();
    mainRef.current?.classList.add(style.sb_main_focus);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e !== undefined) {
      setValue(e.target.value);
      setTempVal(e.target.value);
      if (e.target.value.length > thresHold) {
        onChange(e.target.value);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Backspace' && value.length === 0) {
      setArr(undefined);
      setActive(-1);
      mainRef.current?.classList.remove(style.sb_rounded_none);
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
          mainRef.current?.classList.remove(style.sb_rounded_none);
          mainRef.current?.classList.remove(style.sb_main_focus);
          inputRef.current?.blur();
          setValue(arr[active].title);
          setActive(-1);
        }
        break;
      }
    }
  };

  const handleSelect = (): void => {

  };

  const handleOnClick = (onClickData: any): void => {
    setArr(undefined);
    onClick(onClickData);
    setValue(onClickData.title);
    setTempVal(onClickData.title);
    mainRef.current?.classList.remove(style.sb_rounded_none);
    mainRef.current?.classList.remove(style.sb_main_focus);
    if (isMobile) {
      mainRef.current?.classList.remove(style.main_resp);
      mainRef.current?.classList.remove(style.sb_rounded_none);
      inputRef.current?.classList.remove(style.input_resp);
      topRef.current?.classList.remove(style.sb_top_resp);
      document.getElementById('search')?.classList.remove(style._hidden);
      document.getElementById('back')?.classList.add(style._hidden);
    }
  };

  const handleBtn = (fn?: Function): void => {
    if (arr !== undefined && fn !== undefined) {
      if (active === -1) {
        fn(arr[0]);
      } else {
        fn(arr[active]);
      }
    }
  };

  const handleBack = (): void => {
    setValue('');
    if (isMobile) {
      mainRef.current?.classList.remove(style.main_resp);
      inputRef.current?.classList.remove(style.input_resp);
      topRef.current?.classList.remove(style.sb_top_resp);
    }
    document.getElementById('search')?.classList.remove(style._hidden);
    document.getElementById('back')?.classList.add(style._hidden);
  };

  const handleInputFocus = (): void => {
    mainRef.current?.classList.add(style.sb_main_focus);
    if (isMobile) {
      mainRef.current?.classList.add(style.main_resp);
      inputRef.current?.classList.add(style.input_resp);
      topRef.current?.classList.add(style.sb_top_resp);
      document.getElementById('search')?.classList.add(style._hidden);
      document.getElementById('back')?.classList.remove(style._hidden);
    }
  };

  useEffect(() => {
    if (results != null) {
      setArr(results.splice(0, limit));
    }
  }, [results]);

  useEffect(() => {
    if (value.length < 1 && arr !== null) {
      setArr(undefined);
      setActive(-1);
      if (mainRef.current !== null) {
        mainRef.current.classList.remove(style.sb_rounded_none);
      }
    }
  }, [value]);

  useEffect(() => {
    if (arr !== undefined && mainRef.current !== null) {
      if (arr.length >= 1) {
        mainRef.current.classList.add(style.sb_rounded_none);
        mainRef.current?.classList.add(style.sb_main_focus);
      } else if (arr.length < 1) {
        mainRef.current.classList.remove(style.sb_rounded_none);
        mainRef.current?.classList.remove(style.sb_main_focus);
        setActive(-1);
      }
    }
  }, [arr]);

  useEffect(() => {
    const listener = (e: MouseEvent): void => {
      if (mainRef.current != null && !mainRef.current?.contains(e.target as Node) && !isMobile) {
        mainRef.current.classList.remove(style.sb_main_focus);
        mainRef.current.classList.remove(style.sb_rounded_none);
        setArr(undefined);
        setActive(-1);
      }
    };

    window.addEventListener('click', listener);

    return () => window.removeEventListener('click', listener);
  }, []);

  // useEffect(() => {
  //   const styleListener = (e: MouseEvent): void => {
  //     if (inputRef.current !== null && dropdownRef.current !== null) {
  //       if (!inputRef.current.contains(e.target as Node) && !dropdownRef.current.contains(e.target as Node)) {
  //         setArr(undefined);
  //         inputRef.current.classList.remove(!darkMode ? style.sb_shadow : style.sb_shadow_dark);
  //         inputRef.current.classList.remove(style.sb_rounded_none);
  //         inputRef.current.classList.remove(style.sb_border_none);
  //         inputRef.current.classList.remove(style.sb_input_activebg);
  //       } else if (document.activeElement === inputRef.current) {
  //         if (darkMode) {
  //           inputRef.current.classList.add(style.sb_input_activebg);
  //         }
  //         // inputRef.current.classList.add(!darkMode ? style.sb_shadow : style.sb_shadow_dark);
  //         inputRef.current.classList.add(style.sb_border_none);
  //       }
  //     }
  //   };
  //   window.addEventListener('click', styleListener);
  //   return () => window.removeEventListener('click', styleListener);
  // }, [darkMode]);

  return (
    <div ref={topRef} className={style.sb_top}>
      <div
        ref={mainRef}
        className={style.sb_main}>

        <Fragment>
          {isMobile
            ? (
              <Fragment>
                <div id='search' className={style.search}>
                  <SearchSVG />
                </div>
                <button id='back' onClick={handleBack} className={[style.back, style._hidden].join(' ')}>
                  <BackSVG />
                </button>
              </Fragment>
            )
            : (
              <Fragment>
                <div className={style.search}>
                  <SearchSVG />
                </div>
              </Fragment>
            )}
          <div className={style.input}>
            <input
              ref={inputRef}
              value={tempVal}
              onKeyDown={handleKeyDown}
              onFocus={handleInputFocus}
              onChange={handleOnChange}
              type="text" />
          </div>
          <div className={style.clear}>
            <button
              type='button'
              style={{ opacity: value.length > 0 ? 1 : 0 }}
              onClick={handleClear}>
              <div>
                <ClearSVG />
              </div>
            </button>
          </div>
        </Fragment>
      </div >
      <div id='dropdown'
        ref={dropdownRef}
        className={darkMode ? style.sb_dropdown_dark : style.sb_dropdown_light}>
        {(arr != null) && arr.length >= 1 && !isMobile && (
          <div id='shadowGhost'
            className={ darkMode ? style.sb_ghost_dark : style.sb_ghost_light}>
            <div className={style.sb_ghost_border} />
          </div>
        )}
        <div>
          {arr?.map((data, index) => (
            <div
              key={data.id}
              className={[darkMode ? style.sb_result_dark : style.sb_result_light, active === index ? (darkMode ? style.sb_result_active_dark : style.sb_result_active) : ''].join(' ')}>
              <div
                className={[style.sb_result_image, !showImage ? style.sb_result_image_show : ''].join(' ')}>
                {showImage && (
                  <img width="32" height="32" src={data.image} alt="button image" />
                )}
              </div>
              <button
                type='button'
                className={style.sb_result_button}
                onClick={() => handleOnClick(data)}
              >
                <div className={style.sb_result_text}>
                  {highlighted(data.title)}
                  {showDetail && <span className={style.sb_detail}>{data.detail}</span>}
                </div>
              </button>
            </div>
          ))}
          {(buttons !== undefined && arr !== undefined && arr.length > 0) && (
            <div className={!darkMode ? style.sb_button_div : style.sb_button_div_dark}>
              {buttons.map((button) => (
                <button type='button' onClick={() => handleBtn(button?.handler)} key={button?.label}> {button?.label} </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
