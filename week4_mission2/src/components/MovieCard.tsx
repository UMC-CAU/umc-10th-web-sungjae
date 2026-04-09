import type { Movie } from '../types/movie.ts';
import {Link} from 'react-router-dom';

//외부에서 movie 개체 통째로 받아옴(제목, 줄거리, 포스터 경로가 들어있음)
interface Props {
  movie: Movie;
}

const MovieCard = ({ movie }: Props) => {
  // TMDB 이미지 기본 URL
  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  //react router의 Link 사용해서 카드 클릭하면 /movies/${movie.id}로 이동 
  return (
    <Link to={`/movies/${movie.id}`} className="block">
      {/*부모 요소에 group을 주고 자식 요소에 group-hover 줘서 카드 어디에든 마우스 올리면 반응 */}
      <div className="relative group overflow-hidden rounded-lg bg-gray-900 shadow-lg cursor-pointer">
        {/* 영화 포스터 */}
        <img 
          src={imageUrl} 
          alt={movie.title} 
          className="w-full h-auto transition-transform duration-300 group-hover:scale-110 group-hover:blur-sm"
        />
        
        {/* 호버 시 나타나는 설명 */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-center overflow-hidden">
          <h3 className="text-white font-bold text-sm mb-2">{movie.title}</h3>
          <p className="text-white text-xs line-clamp-6">{movie.overview}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;