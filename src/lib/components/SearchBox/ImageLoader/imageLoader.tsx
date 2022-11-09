import { SearchSVG } from 'lib/components/Svg';
import React, { Fragment, FunctionComponent, useState } from 'react';
import style from '../SearchBox.module.scss';
interface IImageLoader {
    showImage: boolean | undefined
    data: any
}
const ImageLoader: FunctionComponent<IImageLoader> = (props): JSX.Element => {
  const [imgError, setImgError] = useState(false);
  const handleError = (currentTarget: HTMLImageElement): void => {
    setImgError(true);
    currentTarget.style.display = 'none';
  };
  return (
    (props.showImage && (props.data.image !== '' && props.data.image !== undefined))
      ? (
        <Fragment>
          {!imgError
            ? (
              <div className={style.sb_result_image}>
                <img
                  onError={({ currentTarget }) => handleError(currentTarget)}
                  src={props.data.image}
                  alt="img" />
              </div>
            )
            : (

              <div className={style.sb_result_svg}>
                <SearchSVG/>
              </div>
            )}
        </Fragment>
      )
      : (
        <div className={style.sb_result_svg}>
          <SearchSVG/>
        </div>
      )
  );
};

export default ImageLoader;
