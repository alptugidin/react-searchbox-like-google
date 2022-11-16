import React from 'react';

interface INightModeButton {
    setDarkMode: (value: React.SetStateAction<boolean>) => void
    darkMode: boolean

}

const NightModeButton: React.FC<INightModeButton> = (props) => {
  const { setDarkMode, darkMode } = props;
  return (
    <button
      type='button'
      onClick={() => setDarkMode(!darkMode)}
      className='absolute right-5 bottom-5 md:top-5 w-14 h-14 rounded-full bg-red-600 overflow-hidden'>
      <img
        src="./sun.svg"
        alt="sun"
        className={`absolute right-0 left-0 ml-auto mr-auto transition-all ${darkMode ? '-bottom-[38px]' : 'bottom-[16px]'}`}
      />
      <img
        src="./moon.svg"
        alt="moon"
        className={`absolute right-0 left-0 ml-auto mr-auto transition-all ${darkMode ? 'bottom-[16px]' : '-bottom-[38px]'}`}
      />
    </button>
  );
};

export default NightModeButton;
