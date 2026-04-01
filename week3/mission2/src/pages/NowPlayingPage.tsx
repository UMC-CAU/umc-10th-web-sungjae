import { useEffect, useState } from 'react';
import api from '../api/axios';
import type { Movie, MovieResponse } from '../types/movie';
import MovieList from '../components/MovieList';
import LoadingSpinner from '../components/LoadingSpinner';

const PopularPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1); // 1. 페이지 상태 관리

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setIsError(false); // 호출 시작 시 에러 초기화
      try {
        // 2. API 호출 시 page 파라미터 전달
        const response = await api.get<MovieResponse>(
          `/movie/now_playing?language=ko-KR&page=${page}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
        setIsError(true); // 에러 발생 시 상태 변경
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [page]); // 3. page가 바뀔 때마다 useEffect 재실행

  // 로딩 중일 때 UI
  if (isLoading) return <LoadingSpinner />;

  // 에러 발생 시 UI 
  if (isError) return (
    <div className="text-center text-red-500 py-20">
      <p>에러가 발생했습니다. 나중에 다시 시도해주세요.</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-8">
      {/* 페이지네이션  */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-30 disabled:cursor-not-allowed"
        >
          &lt;
        </button>
        <span className="font-bold">{page} 페이지</span>
        <button 
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 bg-pink-500 rounded hover:bg-pink-600 transition"
        >
          &gt;
        </button>
      </div>

      <MovieList movies={movies} />
    </div>
  );
};

export default PopularPage;