import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ProtectedRoute from './components/ProtectedRoute';

// 구성 요소 및 페이지 임포트
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PopularPage from './pages/PopularPage';
import NowPlayingPage from './pages/NowPlayingPage';
import TopRatedPage from './pages/TopRatedPage';
import UpcomingPage from './pages/UpcomingPage';
import MovieDetailPage from './pages/MovieDetailPage';
import LoginPage from './pages/LoginPage'; // 미션 2 로그인 페이지
import SignUpPage from './pages/SignUpPage'; // 미션 2 로그인 페이지
import MyPage from './pages/MyPage';
import GoogleCallback from './pages/GoogleCallback';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // 공통 레이아웃 (Navbar 포함)
    children: [
      { index: true, element: <HomePage /> },
      { path: 'movies/popular', element: <PopularPage /> },
      { path: 'movies/now-playing', element: <NowPlayingPage /> },
      { path: 'movies/top-rated', element: <TopRatedPage /> },
      { path: 'movies/upcoming', element: <UpcomingPage /> },
      { path: 'movies/:movieId', element: <MovieDetailPage /> },
      // 미션 2: 로그인 경로 추가
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignUpPage /> },
      {
        path: 'v1/auth/google/callback',
        element: <GoogleCallback />,
      },
      {
        path: 'mypage',
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);