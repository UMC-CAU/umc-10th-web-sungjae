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
    <RouterProvider router={router} />
  </StrictMode>
);