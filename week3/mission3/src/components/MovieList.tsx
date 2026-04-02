import type { Movie } from '../types/movie.ts';
import MovieCard from './MovieCard.tsx'; // 추가

interface Props {
  movies: Movie[];
}

const MovieList = ({ movies }: Props) => {
  return (
    //반응형 그리드 레이아웃 생성 (접속하는 기기 화면 크기에 맞춰서 Grid 형태가 자동으로 변하는 것)
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"> 
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;