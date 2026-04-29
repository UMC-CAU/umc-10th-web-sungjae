import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // localStorage에서 액세스 토큰을 가져옵니다.
  const token = localStorage.getItem('accessToken');

  // 토큰이 없으면 로그인 페이지로 리다이렉트 시킵니다.
  // replace: true는 뒤로가기를 했을 때 다시 이 보호된 페이지로 오지 못하게 기록을 지웁니다.
  if (!token) {
    alert("로그인이 필요한 서비스입니다.");
    return <Navigate to="/login" replace />;
  }

  // 토큰이 있으면 정상적으로 해당 페이지(children)를 보여줍니다.
  return <>{children}</>;
};

export default ProtectedRoute;