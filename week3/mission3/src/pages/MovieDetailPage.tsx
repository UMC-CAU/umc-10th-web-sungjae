import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import type { MovieDetail, CreditsResponse, Cast } from '../types/movie';
import LoadingSpinner from '../components/LoadingSpinner';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>(); // URL에서 ID 추출
  const [detail, setDetail] = useState<MovieDetail | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        // 상세 정보와 출연진 정보 동시에 호출
        const [detailRes, creditsRes] = await Promise.all([
          api.get<MovieDetail>(`/movie/${movieId}?language=ko-KR`),
          api.get<CreditsResponse>(`/movie/${movieId}/credits?language=ko-KR`)
        ]);

        setDetail(detailRes.data);
        setCast(creditsRes.data.cast);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  if (isLoading) return <LoadingSpinner />; // 로딩 처리
  if (isError || !detail) return <div className="text-center py-20">에러가 발생했습니다.</div>;

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
          {cast.slice(0, 10).map((person) => (
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