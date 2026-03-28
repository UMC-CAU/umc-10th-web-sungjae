import { type ReactNode } from 'react';

export interface RouteProps {
  path: string;
  element: ReactNode;
}

// props를 통째로 받아서 타입스크립트의 '미사용 변수' 경고를 피함
export const Route = (_props: RouteProps) => {
  return null; 
};