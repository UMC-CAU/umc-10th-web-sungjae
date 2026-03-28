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
  const { currentPath } = useRouter();
  const routes = Children.toArray(children);

  const activeRoute = routes.find(
    (route): route is ReactElement<RouteProps> =>
      isValidElement<RouteProps>(route) &&
      route.type === Route &&
      route.props.path === currentPath
  );

  if (activeRoute) {
    return activeRoute.props.element;
  }

  return <div>404 Not Found</div>;
};