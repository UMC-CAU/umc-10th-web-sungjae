import MovieList from '../components/MovieList';
import LoadingSpinner from '../components/LoadingSpinner';
import useCustomFetch from '../hooks/useCustomFetch';
import type { MovieResponse } from '../types/movie';
import { useState } from 'react';

const NowPlayingPage = () => {
  const [page, setPage] = useState<number>(1);
  
  // useCustomFetch 훅을 사용하여 현재 상영 중인 영화 데이터를 가져옴
  const { data, isLoading, isError } = useCustomFetch<MovieResponse>(
    `/movie/now_playing?language=ko-KR&page=${page}`
  );

  if (isLoading) return <LoadingSpinner />;
  
  if (isError) return (
    <div className="text-center text-red-500 py-20">
      <p>에러가 발생했습니다. 나중에 다시 시도해주세요.</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-8">
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

      {data && <MovieList movies={data.results} />}
    </div>
  );
};

export default NowPlayingPage;