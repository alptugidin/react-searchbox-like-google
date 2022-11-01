import React, { CSSProperties, useEffect, useRef, useState } from 'react';
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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
    if (inputRef.current !== null) inputRef.current.focus();
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
      if (inputRef.current !== null) inputRef.current.classList.remove(style.sb_rounded_none);
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
          }
          break;

        case 'ArrowUp':
          e.preventDefault();
          if (active > 0) {
            setActive(active - 1);
            setTempVal(arr[active - 1].title);
          } else {
            setActive(arr.length - 1);
          }
          break;

        case 'Enter':
          e.preventDefault();
          if (active > -1) {
            setArr(undefined);
            setTempVal(arr[active].title);
            if (inputRef.current !== null) {
              inputRef.current.classList.remove(!darkMode ? style.sb_shadow : style.sb_shadow_dark);
              inputRef.current.classList.remove(style.sb_rounded_none);
              inputRef.current.classList.remove(style.sb_border_none);
              inputRef.current.classList.remove(style.sb_input_activebg);
              setValue(arr[active].title);
            }
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
  };

  const handleBtn = (fn?: Function): void => {
    if (inputRef.current !== null) inputRef.current.focus();
    if (arr !== undefined && fn !== undefined) {
      if (active === -1) {
        fn(arr[0]);
      } else {
        fn(arr[active]);
      }
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
      if (inputRef.current !== null) {
        inputRef.current.classList.remove(style.sb_rounded_none);
      }
    }
  }, [value]);

  useEffect(() => {
    if (arr !== undefined && inputRef.current !== null) {
      if (arr.length >= 1) {
        inputRef.current.classList.add(style.sb_rounded_none);
      } else if (arr.length < 1) {
        inputRef.current.classList.remove(style.sb_rounded_none);
      }
    }
  }, [arr]);

  useEffect(() => {
    const styleListener = (e: MouseEvent): void => {
      if (inputRef.current !== null && dropdownRef.current !== null) {
        if (!inputRef.current.contains(e.target as Node) && !dropdownRef.current.contains(e.target as Node)) {
          setArr(undefined);
          inputRef.current.classList.remove(!darkMode ? style.sb_shadow : style.sb_shadow_dark);
          inputRef.current.classList.remove(style.sb_rounded_none);
          inputRef.current.classList.remove(style.sb_border_none);
          inputRef.current.classList.remove(style.sb_input_activebg);
        } else if (document.activeElement === inputRef.current) {
          if (darkMode) {
            inputRef.current.classList.add(style.sb_input_activebg);
          }
          inputRef.current.classList.add(!darkMode ? style.sb_shadow : style.sb_shadow_dark);
          inputRef.current.classList.add(style.sb_border_none);
        }
      }
    };
    window.addEventListener('click', styleListener);
    return () => window.removeEventListener('click', styleListener);
  }, [darkMode]);

  return (

    <div className={style.sb_main}
         style={{ '--theme': !darkMode ? '#ffffff' : '#303134' } as CSSProperties}>
      <input
        type='text'
        role='input'
        ref={inputRef}
        value={tempVal}
        placeholder={placeHolder}
        onKeyDown={handleKeyDown}
        onChange={handleOnChange}
        className={darkMode ? style.sb_input_dark : style.sb_input_light} />
      <div className={style.sb_svg}>
        <svg
          focusable='false'
          width='20'
          height='20'
          fill={!darkMode ? '' : '#9AA0A6'}
          fillOpacity={darkMode ? '' : '0.4'}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'>
          <path d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'></path>
        </svg>
      </div>
      {value.length > 0 && (
        <button
          type='button'
          onClick={handleClear}
          className={style.sb_clear}
        >
          <div>
            <svg
              focusable="false"
              fill={!darkMode ? '' : '#9AA0A6'}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>
          </div>
        </button>
      )}
      <div id='dropdown'
        ref={dropdownRef}
        className={darkMode ? style.sb_dropdown_dark : style.sb_dropdown_light}>
        {(arr != null) && arr.length >= 1 && (
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
              <div className={[style.sb_result_image, !showImage ? style.sb_result_image_show : ''].join(' ')}>
                {showImage && (
                  <img width="32" height="32" src={data.image} alt="button image" />
                )}
              </div>
              <button
                className={style.sb_result_button} type='button'
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
    </div >
  );
};

export default SearchBox;
