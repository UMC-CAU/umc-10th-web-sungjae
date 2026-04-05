import { useEffect, useState } from 'react';
import axios from 'axios';
// 아까 만드신 타입 파일을 가져옵니다. 경로가 맞는지 꼭 확인하세요!
import type { Movie, MovieResponse } from '../types/movie';

const MoviesPage = () => {
    // 1. 데이터를 담을 바구니 (상태 관리)
    const [movies, setMovies] = useState<Movie[]>([]);
    console.log(movies);

    // 2. 화면이 처음 나타날 때(마운트) 실행되는 함수
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get<MovieResponse>(
                    'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
                    {
                        headers: {
                            // 주의: Bearer 다음에 한 칸 띄우고 토큰을 붙여넣으세요!
                            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTVhZmE5MGEzNmY0NmJmOTcyZWNiYjU2ZGE2ZDg4NiIsIm5iZiI6MTc3NDgzNjUwMy45NzIsInN1YiI6IjY5YzlkYjE3ODc3MzNlNzNkYTgzOTM0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.55xA2uI24qOmakfm1qZsF6NvCg2aHAtgj5YxaYEFS-E`,
                            accept: 'application/json',
                        },
                    }
                );
                // 3. 받아온 데이터를 바구니에 저장
                setMovies(response.data.results);
            } catch (error) {
                console.error("영화 데이터를 불러오는데 실패했습니다.", error);
            }
        };

        fetchMovies();
    }, []); // 빈 배열: 처음 마운트 될 때만 실행

    return (
        <div style={{ padding: '20px' }}>
            <h1>인기 영화 목록</h1>
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', listStyle: 'none' }}>
                {/* 4. 옵셔널 체이닝(?.)을 사용해 안전하게 반복문 돌리기 */}
                {movies?.map((movie) => (
                    <li key={movie.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
                        {/* 영화 포스터 이미지 (TMDB 이미지 주소 규칙) */}
                        <img 
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                            alt={movie.title}
                            style={{ width: '100%', borderRadius: '4px' }}
                        />
                        <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{movie.title}</h3>
                        <p style={{ fontSize: '14px', color: '#666' }}>평점: ⭐{movie.vote_average}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MoviesPage;