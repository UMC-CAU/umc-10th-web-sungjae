import clsx from 'clsx';
import { THEME, useTheme } from './context/ThemeProvider';

export default function ThemeContent() {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <div className={clsx(
      'p-10 flex flex-col items-center justify-center transition-colors duration-500',
      isLightMode ? 'text-black' : 'text-white' // 테ma에 따라 글자색 변경
    )}>
      <h1 className="text-4xl font-bold mb-4">Theme Content</h1>
      <p className="text-lg text-center">
        UMC 10기 웹 이성재<br />
    
      </p>
    </div>
  );
}