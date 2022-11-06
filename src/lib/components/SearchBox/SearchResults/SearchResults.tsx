import React, { useEffect, useState } from 'react';
import { SearchSVG } from '../../Svg';
import style from '../SearchBox.module.scss';
import { ISearchBoxProps, ISearchResults, ISearchResultsProps } from '../types';

const SearchResults: React.FC<ISearchResultsProps> = (props) => {
  const {
    darkMode = false,
    showImage,
    showDetail,
    buttons,
    handleOnClick,
    arr,
    dropdownRef,
    active,
    isMobile,
    highlighted,
    handleBtn,
    isAsync,
    value
  } = props;

  const [filterLen, setFilterLen] = useState(0);

  const filterCondition = (param: ISearchResults): any => {
    if (param.title.toLowerCase().includes(value)) {
      return param;
    }
  };

  useEffect(() => {
    const len = arr?.filter(filterCondition).length;
    setFilterLen((len ?? 0));
  }, [arr]);

  return (
    <div>
      <p className='absolute -left-56'>arr len {filterLen}</p>
      {arr !== undefined && arr?.length > 0 && (
        <div id='dropdown'
          ref={dropdownRef}
          className={darkMode ? style.sb_dropdown_dark : style.sb_dropdown_light}>
          <div id='shadowGhost'
            className={ darkMode ? style.sb_ghost_dark : style.sb_ghost_light}>
            <div className={style.sb_ghost_border} />
          </div>
          <div>
            {/* {arr.filter(item => item.title.toLowerCase().includes(value.toLocaleLowerCase())).map((data, index) => ( */}
            {arr.filter(filterCondition).map((data, index) => (
              <div
                key={data.id}
                className={[darkMode ? style.sb_result_dark : style.sb_result_light, active === index ? (darkMode ? style.sb_result_active_dark : style.sb_result_active) : ''].join(' ')}>
                <div
                  className={style.sb_result_image_div}>
                  {showImage
                    ? (
                      <div className={style.sb_result_image}>
                        <img src={data.image} alt="button image" />
                      </div>
                    )
                    : (
                      <div className={style.sb_result_svg}>
                        <SearchSVG/>
                      </div>
                    )}
                </div>
                <button
                  type='button'
                  className={style.sb_result_button}
                  onClick={() => handleOnClick(data)}
                >
                  <div className={style.sb_result_text}>
                    {highlighted(data.title)}
                    {showDetail &&
                  <span className={style.sb_detail}>
                    {data.detail}
                  </span>}
                  </div>
                </button>
              </div>
            ))}
            {(buttons !== undefined && arr !== undefined && arr.length > 0 && !isMobile) && (
              <div className={!darkMode ? style.sb_button_div : style.sb_button_div_dark}>
                {buttons.map((button) => (
                  <button type='button' onClick={() => handleBtn(button?.handler)} key={button?.label}> {button?.label} </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
