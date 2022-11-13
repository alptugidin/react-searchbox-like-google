/* eslint  @typescript-eslint/restrict-template-expressions: 0 */
import React from 'react';
import ImageLoader from '../ImageLoader/imageLoader';
import style from '../SearchBox.module.scss';
import { ISearchResultsProps } from '../types';

const SearchResults: React.FC<ISearchResultsProps> = (props) => {
  const {
    darkMode,
    showImage,
    showDetail,
    handleOnClick,
    arr,
    dropdownRef,
    active,
    isMobile,
    sx,
    handleBtn,
    value
  } = props;

  const highlighted = (title: string): JSX.Element => {
    let span = <span className={style.sb_highlight_span} style={{ color: !darkMode ? sx?.textColor : '#ffffff' }}>{title}</span>;
    const splitted = title.split(new RegExp(`(${value})`, 'gi'));
    if (splitted.length > 1) {
      span =
      <div className={style.sb_highlight_div}>
        <span style={{ color: !darkMode ? sx?.textColor : '#ffffff' }}>{splitted[0]}</span>
        <span style={{ color: !darkMode ? sx?.highlightColor : '#ffffff', fontWeight: 700 }}>{splitted[1]}</span>
        <span style={{ color: !darkMode ? sx?.textColor : '#ffffff' }}>{splitted[2]}</span>
      </div>;
    }
    return span;
  };

  return (
    <div>
      {arr !== undefined && arr.length > 0 && (
        <div id='dropdown'
          ref={dropdownRef}
          style={{ padding: props.buttons === undefined ? '0 0 24px 0' : '0' }}
          className={darkMode ? style.sb_dropdown_dark : style.sb_dropdown_light}>
          <div id='shadowGhost'
            className={ darkMode ? style.sb_ghost_dark : style.sb_ghost_light}>
            <div className={style.sb_ghost_border} />
          </div>
          <div>
            {arr?.map((data, index) => (
              <div
                key={data.id.toString() + data.title}
                className={[darkMode ? style.sb_result_dark : style.sb_result_light, active === index ? (darkMode ? style.sb_result_active_dark : style.sb_result_active) : ''].join(' ')}>
                <div
                  className={style.sb_result_image_div}>
                  <ImageLoader {...{ showImage, data }} />
                </div>
                <button
                  type='button'
                  className={style.sb_result_button}
                  onClick={() => handleOnClick(data)}
                >
                  <div
                    style={{ padding: data.detail ? '2px 0 2px 0' : 0 }}
                    className={style.sb_result_text}>
                    {highlighted(data.title)}
                    {showDetail &&
                  <span className={style.sb_detail}>
                    {data.detail}
                  </span>}
                  </div>
                </button>
              </div>
            ))}
            {(props.buttons !== undefined && arr !== undefined && !isMobile) && (
              <div className={!darkMode ? style.sb_button_div : style.sb_button_div_dark}>
                {props.buttons.map((button) => (
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
