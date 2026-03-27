import { ThemeProvider } from './context/ThemeProvider';
import Navbar from './Navbar';
import ThemeContent from './ThemeContent';
import { useTheme, THEME } from './context/ThemeProvider';
import clsx from 'clsx';

// 실제 배경색이 변하는 부분을 별도 컴포넌트로 빼면 더 확실합니다.
const PageLayout = () => {
  const { theme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <div className={clsx(
      'min-h-screen w-full transition-colors duration-500',
      isLightMode ? 'bg-white' : 'bg-slate-900' // 전체 배경색 제어
    )}>
      <Navbar />
      <main className="flex flex-col items-center justify-center pt-20">
        <ThemeContent />
      </main>
    </div>
  );
};

export default function ContextPage() {
  return (
    <ThemeProvider>
      <PageLayout />
    </ThemeProvider>
  );
}