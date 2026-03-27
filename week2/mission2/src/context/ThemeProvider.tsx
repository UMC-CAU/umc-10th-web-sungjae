import { createContext, type PropsWithChildren, useContext, useState } from 'react';

// 1. enum 대신 const 객체를 사용합니다 (에러 방지)
export const THEME = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
} as const;

type TTheme = typeof THEME[keyof typeof THEME];

interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};