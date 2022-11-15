/* eslint  @typescript-eslint/restrict-template-expressions: 0 */
import React from 'react';
import ImageLoader from '../ImageLoader/imageLoader';
import '../style.scss';
import { ISearchBoxProps, ISearchResults } from '../types';
export interface ISearchResultsProps extends Pick<ISearchBoxProps,
 'darkMode' | 'showImage' | 'showDetail' | 'buttons' | 'sx'
 > {
  arr: ISearchResults[] | undefined
  value: string
  dropdownRef: React.RefObject<HTMLDivElement>
  active: number
  isMobile: boolean
  handleOnClick: (onClickData: any) => void
  handleBtn: (fn?: Function) => void
}

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
    let span = <span className={'sb_highlight_span'} style={{ color: !darkMode ? sx?.textColor : '#ffffff' }}>{title}</span>;
    const splitted = title.split(new RegExp(`(${value})`, 'gi'));
    if (splitted.length > 1) {
      span =
      <div className={'sb_highlight_div'}>
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
          className={darkMode ? 'sb_dropdown_dark' : 'sb_dropdown_light'}>
          <div id='shadowGhost'
            className={ darkMode ? 'sb_ghost_dark' : 'sb_ghost_light'}>
            <div className={'sb_ghost_border'} />
          </div>
          <div>
            {arr?.map((data, index) => (
              <div
                key={data.id.toString() + data.title}
                className={[darkMode ? 'sb_result_dark' : 'sb_result_light', active === index ? (darkMode ? 'sb_result_active_dark' : 'sb_result_active') : ''].join(' ')}>
                <div
                  className={'sb_result_image_div'}>
                  <ImageLoader {...{ showImage, data }} />
                </div>
                <button
                  type='button'
                  className={'sb_result_button'}
                  onClick={() => handleOnClick(data)}
                >
                  <div
                    style={{ padding: data.detail ? '2px 0 2px 0' : 0 }}
                    className={'sb_result_text'}>
                    {highlighted(data.title)}
                    {showDetail &&
                  <span className={'sb_detail'}>
                    {data.detail}
                  </span>}
                  </div>
                </button>
              </div>
            ))}
            {(props.buttons !== undefined && arr !== undefined && !isMobile) && (
              <div className={!darkMode ? 'sb_button_div' : 'sb_button_div_dark'}>
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
