import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface RouterContextType {
  currentPath: string;
  changePath: (to: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider = ({ children }: { children: ReactNode }) => {
  //처음 웹이 커질 때 URL에 적힌 경로 읽어서 그걸 현재 페이지 상태로 쓰겠다. 
  const [currentPath, setCurrentPath] = useState(window.location.pathname); //React는 상태가 바뀌어야 렌더링 하기 때문에, 상태도 바꿔줘야함 

  const changePath = (to: string) => {
    window.history.pushState({}, '', to); //URL만 바꿔주는 역할. 새로고침 X 
    setCurrentPath(to);
  };

  useEffect(() => {
    const handlePopState = () => { //뒤로 가기 버튼 클릭할 땐 주소창은 바뀌어도 React상태는 안 바뀔 수 있음. 따라서 브라우저가 경로 바꿔도 React상태 동기화 시켜야함 
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <RouterContext.Provider value={{ currentPath, changePath }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used within a RouterProvider');
  return context;
};