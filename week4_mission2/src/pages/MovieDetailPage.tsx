import { useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import useCustomFetch from '../hooks/useCustomFetch';
import type { MovieDetail, CreditsResponse } from '../../types/movie';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  // 상세 정보와 출연진 정보를 각각 호출
  const { data: detail, isLoading: isDetailLoading, isError: isDetailError } = 
    useCustomFetch<MovieDetail>(`/movie/${movieId}?language=ko-KR`);
    
  const { data: credits, isLoading: isCreditsLoading } = 
    useCustomFetch<CreditsResponse>(`/movie/${movieId}/credits?language=ko-KR`);

  if (isDetailLoading || isCreditsLoading) return <LoadingSpinner />;
  if (isDetailError || !detail) return <div className="text-center py-20">에러가 발생했습니다.</div>;

  return (
    <div className="text-white">
      {/* 상단 히어로 섹션 */}
      <div 
        className="relative h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${detail.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-black/60 p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2">{detail.title}</h1>
          <p className="text-lg mb-4 italic text-gray-300">{detail.tagline}</p>
          <div className="flex gap-4 mb-4 text-sm">
            <span>평점 {detail.vote_average.toFixed(1)}</span>
            <span>{detail.release_date.split('-')[0]}</span>
            <span>{detail.runtime}분</span>
          </div>
          <p className="max-w-2xl leading-relaxed">{detail.overview}</p>
        </div>
      </div>

      {/* 출연진 섹션 */}
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-6">감독/출연</h2>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4">
          {credits?.cast.slice(0, 10).map((person) => (
            <div key={person.id} className="text-center">
              <img 
                src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : '/default-profile.png'}
                className="w-full aspect-square object-cover rounded-full mb-2 border-2 border-gray-700"
                alt={person.name}
              />
              <p className="text-xs font-bold truncate">{person.name}</p>
              <p className="text-[10px] text-gray-400 truncate">{person.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;