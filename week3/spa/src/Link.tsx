//Link처럼 보이지만, 실제 이동은 브라우저 기본 기능이 아니라 내가 만든 라우터가 처리하게 넘기는 component 
import React from 'react';
import { useRouter } from './RouterContext';

interface LinkProps {
  to: string;
  children: React.ReactNode;
}

export const Link = ({ to, children }: LinkProps) => {
  const { changePath } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // 브라우저 새로고침하면서 이동하는 것 막음 
    changePath(to);     // 우리가 직접 경로 수정 
  };

  return (
    <a href={to} onClick={handleClick} style={{ textDecoration: 'none', color: 'blue' }}>
      {children}
    </a>
  );
};