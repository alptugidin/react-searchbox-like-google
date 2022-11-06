import React, { CSSProperties, useEffect, useRef, useState, memo } from 'react';
import { SearchBoxContext } from '../../context/SearchBoxContext';
import DropDown from './DropDown';
import SearchInput from './SearchInput';
import { ISearchResults, ISearchBoxProps } from './types';
import style from '../SearchBox/SearchBox.module.scss';
import useIsMobile from '../../hooks/useIsMobile';
import addWhite from '../../utils/addWhite';

const SearchBox: React.FC<ISearchBoxProps> = ({
  onChange,
  onClick,
  results,
  placeHolder,
  darkMode = false,
  showImage,
  showDetail,
  buttons,
  limit = 10,
  thresHold,
  duration = 150,
  colors = {
    text: '#1f2937',
    highlightText: '#1f2937',
    darkTheme: '#202124'
  }
}) => {
  const { isMobile } = useIsMobile();
  const { lightDark } = addWhite(colors.darkTheme as string, 30);

  const mainRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const [arr, setArr] = useState<ISearchResults[]>();
  const [value, setValue] = useState('');
  const [tempVal, setTempVal] = useState('');
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (results != null) {
      setArr(results.splice(0, (isMobile ? limit - 3 : limit)));
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
      if (arr.length >= 1 && results !== undefined) {
        mainRef.current.classList.add(style.sb_rounded_none);
        /* eslint-disable */
        mainRef.current.classList.add(darkMode ? style.sb_main_focus_dark : style.sb_main_focus_light);
        /* eslint-disable */
      } else if (arr.length < 1) {
        mainRef.current.classList.remove(style.sb_rounded_none);
        mainRef.current.classList.remove(style.sb_main_focus_light);
        setActive(-1);
      }
    }
  }, [arr]);

  useEffect(() => {
    const listener = (e: MouseEvent): void => {
      if (mainRef.current != null && !mainRef.current?.contains(e.target as Node) && !isMobile) {
        mainRef.current.classList.remove(style.sb_main_focus_dark);
        mainRef.current.classList.remove(style.sb_main_focus_light);
        mainRef.current.classList.remove(style.sb_rounded_none);
        setArr(undefined);
        setActive(-1);
      }
    };

    window.addEventListener('click', listener);

    return () => window.removeEventListener('click', listener);
  }, []);

  useEffect(() => {
    mainRef.current?.classList.add(style.border_transition);
    setTimeout(() => {
      mainRef.current?.classList.remove(style.border_transition);
    }, duration);
  }, [darkMode]);

  const values = {
    onChange,
    onClick,
    results,
    placeHolder,
    darkMode,
    showImage,
    showDetail,
    buttons,
    limit,
    thresHold,
    duration,
    colors,
    arr,
    setArr,
    value,
    setValue,
    tempVal,
    setTempVal,
    active,
    setActive,
    mainRef,
    inputRef,
    topRef,
    dropdownRef
  };

  return (
    <div ref={topRef} style={{
      '--text': darkMode ? '#ffffff' : colors.text,
      '--highlightText': darkMode ? '#ffffff' : colors.highlightText,
      '--darkPrimary': colors.darkTheme,
      '--darkSecondary': lightDark,
      '--duration': duration.toString().concat('ms'),
      position: !isMobile ? 'relative' : ''
    } as CSSProperties}>
      <SearchBoxContext.Provider value={values}>
        <SearchInput/>
        <DropDown/>
      </SearchBoxContext.Provider>
    </div>
  );
};

export default memo(SearchBox);
