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
    sx = { },
    handleBtn,
    value
  } = props;

  // set defaults
  const {
    textColor = '#1f2937',
    highlightColor = '#1f2937'
  } = sx;

  const highlighted = (title: string): JSX.Element => {
    let span = <span className={'sb-highlight-span'} style={{ color: !darkMode ? textColor : '#ffffff' }}>{title}</span>;
    const splitted = title.split(new RegExp(`(${value})`, 'gi'));
    if (splitted.length > 1) {
      span =
      <div className={'sb-highlight-div'}>
        <span style={{ color: !darkMode ? textColor : '#ffffff' }}>{splitted[0]}</span>
        <span style={{ color: !darkMode ? highlightColor : '#ffffff', fontWeight: 700 }}>{splitted[1]}</span>
        <span style={{ color: !darkMode ? textColor : '#ffffff' }}>{splitted[2]}</span>
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
          className={darkMode ? 'sb-dropdown-dark' : 'sb-dropdown-light'}>
          <div id='shadowGhost'
            className={ darkMode ? 'sb-ghost-dark' : 'sb-ghost-light'}>
            <div className={'sb-ghost-border'} />
          </div>
          <div>
            {arr?.map((data, index) => (
              <div
                key={data.id.toString() + data.title}
                className={[darkMode ? 'sb-result-dark' : 'sb-result-light', active === index ? (darkMode ? 'sb-result-active-dark' : 'sb-result-active') : ''].join(' ')}>
                <div
                  className={'sb-result-image-div'}>
                  <ImageLoader {...{ showImage, data }} />
                </div>
                <button
                  type='button'
                  className={'sb-result-button'}
                  onClick={() => handleOnClick(data)}
                >
                  <div
                    style={{ padding: data.detail ? '2px 0 2px 0' : 0 }}
                    className={'sb-result-text'}>
                    {highlighted(data.title)}
                    {showDetail &&
                  <span className={'sb-detail'}>
                    {data.detail}
                  </span>}
                  </div>
                </button>
              </div>
            ))}
            {(props.buttons !== undefined && arr !== undefined && !isMobile) && (
              <div className={!darkMode ? 'sb-button-div' : 'sb-button-div-dark'}>
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
