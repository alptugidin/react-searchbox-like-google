import React, { useEffect, useState } from 'react';

const useIsMobile = (): { isMobile: boolean } => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const isMobile = width <= 768;
  const handleWindowSizeChange = (): void => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return { isMobile };
};

export default useIsMobile;
