import '../style.scss';
import React, { Fragment, FunctionComponent, useState } from 'react';
import { SearchSVG } from 'lib/components/Svg';
interface IImageLoader {
    showImage: boolean | undefined
    data: any
}
const ImageLoader: FunctionComponent<IImageLoader> = (props): JSX.Element => {
  const [imgError, setImgError] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const handleError = (currentTarget: HTMLImageElement): void => {
    setImgError(true);
    currentTarget.style.display = 'none';
  };

  const handleLoad = (): void => {
    setIsLoad(true);
  };

  return (
    (props.showImage && (props.data.image !== '' && props.data.image !== undefined))
      ? (
        <Fragment>
          <div className={imgError ? 'sb-result-svg' : 'sb-result-image'}>
            <img
              onError={({ currentTarget }) => handleError(currentTarget)}
              onLoad={handleLoad}
              style={{ display: isLoad ? 'block' : 'none' }}
              src={props.data.image}
              alt="poster" />
          </div>
          {imgError && <SearchSVG/>}
          {!isLoad && !imgError && <div className={'img-skeleton'}></div>}
        </Fragment>
      )
      : (
        <div className={'sb-result-svg'}>
          <SearchSVG/>
        </div>
      )

  );
};

export default ImageLoader;
