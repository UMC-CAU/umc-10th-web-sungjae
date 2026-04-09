//[리뷰 답변] 미션1에서는 단순한 단일 페이지여서 App.tsx에서 처리해도 충분했지만 미션2부터 라우터 사용하면서 확장성 있게 관리할 필요가 생겼습니다. 그래서 main.tsx에서 createBrowserRouter 통해 App.tsx 중간 단계없이 각 경로에 맞는 페이지를 직접 연결해주었습니다
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PopularPage from './pages/PopularPage';
import TopRatedPage from './pages/TopRatedPage';
import UpcomingPage from './pages/UpcomingPage';
import NowPlayingPage from './pages/NowPlayingPage';
import MovieDetailPage from './pages/MovieDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // 공통 레이아웃 적용
    children: [
      { index: true, element: <HomePage /> }, // 주소가 '/' 일 때
      { path: 'movies/popular', element: <PopularPage /> },
      { path: 'movies/now-playing', element: <NowPlayingPage /> },
      { path: 'movies/:movieId', element: <MovieDetailPage /> },
      { path: 'movies/top-rated', element: <TopRatedPage /> },
      { path: 'movies/upcoming', element: <UpcomingPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*위에서 정한 router(어떤 주소로 가면 어떤 페이지 보여줄지)를 들고 있는 컴포넌트*/}
    <RouterProvider router={router} />
  </StrictMode>
);
