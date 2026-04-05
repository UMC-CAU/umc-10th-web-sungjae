// src/types/movie.ts

export type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    // 필요하다면 추가 필드(adult, backdrop_path 등)도 정의 가능합니다.
};

export type MovieResponse = {
    page: number;
    results: Movie[]; // Movie 객체들이 담긴 배열
    total_pages: number;
    total_results: number;
};