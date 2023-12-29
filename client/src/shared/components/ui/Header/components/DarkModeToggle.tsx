import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

import { useDarkMode } from '@/store/ui';

export type DarkModeToggleProps = {};

const DarkModeToggle: React.FC<DarkModeToggleProps> = () => {
  const isDarkMode = useDarkMode(s => s.darkMode);
  const toggleDarkMode = useDarkMode(s => s.toggleDarkMode);

  return (
    <button onClick={toggleDarkMode} type="button">
      {isDarkMode ? (
        <BsFillMoonStarsFill
          size={20}
          className="text-slate-200 hover:text-white "
        />
      ) : (
        <BsFillSunFill size={23} className="text-slate-900 hover:text-black" />
      )}
    </button>
  );
};

export default DarkModeToggle;
