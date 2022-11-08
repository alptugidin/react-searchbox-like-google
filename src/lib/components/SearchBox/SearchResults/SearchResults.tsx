/* eslint  @typescript-eslint/restrict-template-expressions: 0 */
import React, { CSSProperties, Fragment, useEffect, useState } from 'react';
import { SearchSVG } from '../../Svg';
import style from '../SearchBox.module.scss';
import { ISearchResultsProps } from '../types';

const SearchResults: React.FC<ISearchResultsProps> = (props) => {
  const {
    darkMode,
    showImage,
    showDetail,
    buttons,
    handleOnClick,
    arr,
    dropdownRef,
    active,
    isMobile,
    colors,
    handleBtn,
    value
  } = props;

  const [imgLoad, setImgLoad] = useState(false);

  const handleOnLoad = (): void => {
    setImgLoad(true);
  };

  const highlighted = (title: string): JSX.Element => {
    let span = <span className={style.sb_highlight_span} style={{ color: !darkMode ? colors?.text : '#ffffff' }}>{title}</span>;
    const splitted = title.split(new RegExp(`(${value})`, 'gi'));
    if (splitted.length > 1) {
      span =
      <div className={style.sb_highlight_div}>
        <span style={{ color: !darkMode ? colors?.text : '#ffffff' }}>{splitted[0]}</span>
        <span style={{ color: !darkMode ? colors?.highlightText : '#ffffff', fontWeight: 700 }}>{splitted[1]}</span>
        <span style={{ color: !darkMode ? colors?.text : '#ffffff' }}>{splitted[2]}</span>
      </div>;
    }
    return span;
  };

  return (
    <div>
      {arr !== undefined && arr.length > 0 && (
        <div id='dropdown'
          ref={dropdownRef}
          className={darkMode ? style.sb_dropdown_dark : style.sb_dropdown_light}>
          <div id='shadowGhost'
            className={ darkMode ? style.sb_ghost_dark : style.sb_ghost_light}>
            <div className={style.sb_ghost_border} />
          </div>
          <div>
            {value.length > 1 && (arr !== undefined) && arr?.map((data, index) => (
              <div
                key={data.id.toString() + data.title}
                className={[darkMode ? style.sb_result_dark : style.sb_result_light, active === index ? (darkMode ? style.sb_result_active_dark : style.sb_result_active) : ''].join(' ')}>
                <div
                  className={style.sb_result_image_div}>

                  {showImage && (
                    <div className={style.sb_result_image}>
                      {data.image !== undefined
                        ? (
                          <div>
                            {!imgLoad && <div className={style.img_skeleton}></div>}
                            <div style={{
                              width: 32,
                              height: 32,
                              display: imgLoad ? 'block' : 'none'
                            } as CSSProperties}>
                              <img onLoad={handleOnLoad} src={data.image} alt="button image" />
                            </div>
                          </div>
                        )
                        : (
                          <div className={style.sb_result_svg}>
                            <SearchSVG/>
                          </div>
                        )}
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
            {(buttons !== undefined && arr !== undefined && !isMobile) && (
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
