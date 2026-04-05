//Link처럼 보이지만, 실제 이동은 브라우저 기본 기능이 아니라 내가 만든 라우터가 처리하게 넘기는 component 
import React from 'react';
import { useRouter } from './RouterContext';

interface LinkProps {
  to: string;
  children: React.ReactNode;
}

export const Link = ({ to, children }: LinkProps) => {
  const { changePath } = useRouter();//RouterContext에서 주소 바꾸는 changePath 가져옴 

  //사용자가 상단 바에 있는 페이지 클릭 시 실행 
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // 브라우저가 서버에 새 페이지 요청(새로고침)하면서 렌더링 하는 것을 막음 
    changePath(to);     // RouterContext에서 가져온 함수 실행 
  };

  return (
    <a href={to} onClick={handleClick} style={{ textDecoration: 'none', color: 'blue' }}>
      {children}
    </a>
  );
};