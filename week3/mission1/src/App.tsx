import { useEffect, useState } from 'react';
import api from './api/axios';
import type { Movie, MovieResponse } from './types/movie.ts';
import MovieList from './components/MovieList';

function App() {
  //useState 사용: 영화 목록 저장할 movie 상태 생성 
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //useEffect 사용: 
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // popular 영화 데이터 가져옴 
        const response = await api.get<MovieResponse>('/movie/popular?language=ko-KR&page=1');

        console.log("TMDB 데이터 확인:", response.data);
        console.log("영화 목록 배열:", response.data.results);
        
        setMovies(response.data.results);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []); //의존성 배열을 빈 배열로 설정해서 페이지 처음 로드될 때만 영화 데이터 가져옴 

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">인기 영화</h1>
      {isLoading ? (
        <div className="text-center">로딩 중...</div>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
}

export default App;