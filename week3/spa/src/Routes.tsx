import React, {
  type ReactNode,
  Children,
  isValidElement,
  type ReactElement,
} from 'react';
import { useRouter } from './RouterContext';
import { Route, type RouteProps } from './Route';

interface RoutesProps {
  children: ReactNode;
}

export const Routes = ({ children }: RoutesProps) => {
  const { currentPath } = useRouter(); //현재 주소 상태를 가져옴
  const routes = Children.toArray(children); //App.tsx에서 넘겨준 <Route>태그들을 하나씩 검사하도록 배열 만듬

  const activeRoute = routes.find(//Route들을 하나씩 대조하기 시작. 
    (route): route is ReactElement<RouteProps> =>
      isValidElement<RouteProps>(route) &&
      route.type === Route &&
      route.props.path === currentPath//각 route의 path가 현재 주소와(currentpath)랑 일치하는지 대조 
  );

  if (activeRoute) {
    return activeRoute.props.element;//주소가 일치하는 Route의 element 선택 
  }

  return <div>404 Not Found</div>;
};