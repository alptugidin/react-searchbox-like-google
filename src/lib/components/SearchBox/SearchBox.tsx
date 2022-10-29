import React, { useEffect, useRef, useState } from 'react';
import style from './SearchBox.module.css';

export interface SearchBoxProps {
  onChange: (onChangeData: string) => void
  onClick: (onClickData: IOnclickData) => void
  results: ISearchResult[] | undefined
  limit?: number
  placeHolder?: string
  showImage?: boolean
  textColor?: string
  highlightColor?: string
  darkModa?: boolean
}
export interface ISearchResult {
  id: number
  title: string
  image: string
  href: string
}
export interface IOnclickData extends ISearchResult {
}
const SearchBox: React.FC<SearchBoxProps> = ({
  onChange,
  onClick,
  results,
  limit = 10,
  placeHolder,
  showImage = false,
  textColor = '#1f2937',
  highlightColor = '#1f2937',
  darkModa = false
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [arr, setArr] = useState<ISearchResult[]>();
  const [value, setValue] = useState('');
  const [tempVal, setTempVal] = useState('');
  const [active, setActive] = useState(-1);

  const highlighted = (title: string): JSX.Element => {
    const firstPos = title.toLowerCase().search(value);
    const lastPos = firstPos + value.length;
    const firstText = title.substring(0, firstPos);
    const highlightedText = title.substring(firstPos, lastPos);
    const lastText = title.substring(lastPos, title.length);

    return (
      <div>
        {firstText.length > 0 && <span style={{ color: textColor }}>
          {firstText}
        </span>}
        {highlightedText.length > 0 && <span style={{ color: highlightColor, fontWeight: 700 }}>
          {highlightedText}
        </span>}
        {lastText.length > 0 && <span style={{ color: textColor }} id='sp3'>
          {lastText}
        </span>}
      </div>
    );
  };

  const clear = (): void => {
    setValue('');
    setTempVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (arr !== undefined && arr.length > 0) {
      switch (e.code) {
        case 'ArrowDown':
          e.preventDefault();
          if (active < arr.length - 1) {
            setActive(active + 1);
            setTempVal(arr[active + 1].title);
          }
          break;

        case 'ArrowUp':
          e.preventDefault();
          if (active > 0) {
            setActive(active - 1);
            setTempVal(arr[active - 1].title);
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
    window.addEventListener('click', (e) => {
      if (inputRef.current !== null && dropdownRef.current !== null) {
        if (!inputRef.current.contains(e.target as Node) && !dropdownRef.current.contains(e.target as Node)) {
          setArr(undefined);
          inputRef.current.classList.remove(style.sb_rounded_none);
          inputRef.current.classList.remove(style.sb_shadow);
          inputRef.current.classList.remove(style.sb_border_none);
        } if (document.activeElement === inputRef.current) {
          inputRef.current.classList.add(style.sb_shadow);
          inputRef.current.classList.add(style.sb_border_none);
        }
      }
    });
  }, []);

  return (
    <div className={style.sb_main}>
      <input
        type='text'
        ref={inputRef}
        value={tempVal}
        placeholder={placeHolder}
        onKeyDown={handleKeyDown}
        onChange={e => {
          setValue(e.target.value);
          setTempVal(e.target.value);
          onChange(e.target.value);
        }}
        className={style.sb_input} />
      <div className={style.sb_svg}>
        <svg
          focusable='false'
          width='20'
          height='20'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'>
          <path d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'></path>
        </svg>
      </div>
      {value.length > 0 && (
        <button
          type='button'
          onClick={clear}
          className={style.sb_clear}
        >
          <div>
            <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
          </div>
        </button>
      )}
      <div id='dropdown'
        ref={dropdownRef}
        className={style.sb_dropdown}>
        {(arr != null) && arr.length >= 1 && (
          <div id='shadowGhost'
            className={style.sb_ghost}>
            <div className={style.sb_ghost_border} />
          </div>
        )}
        <div>
          {arr?.map((data, index) => (
            <div
              key={data.id}
              className={[style.sb_result, active === index ? style.sb_result_active : ''].join(' ')}>
              <div className={[style.sb_result_image, !showImage ? style.sb_result_image_show : ''].join(' ')}>
                {showImage && (
                  <img width="32" height="32" src={data.image} alt="button image" />
                )}
              </div>
              <button
                className={style.sb_result_button}
                type='button'
                onClick={() => handleOnClick(data)}
              >
                {highlighted(data.title.replace(/[^a-zA-Z0-9 ]/g, ''))}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default SearchBox;
