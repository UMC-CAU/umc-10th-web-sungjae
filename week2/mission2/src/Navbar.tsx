import clsx from 'clsx';
import { THEME, useTheme } from './context/ThemeProvider';
import ThemeToggleButton from './ThemeToggleButton';

export default function Navbar() {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    // w-full로 너비를 채우고, justify-end로 오른쪽 끝으로 보냅니다.
    <nav className={clsx(
      'p-4 w-full flex justify-end transition-colors duration-500',
      isLightMode ? 'bg-white' : 'bg-gray-800'
    )}>
      <ThemeToggleButton />
    </nav>
  );
}