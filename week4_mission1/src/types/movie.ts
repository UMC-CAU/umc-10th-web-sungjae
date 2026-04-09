export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

export interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

// 영화 상세 정보 타입
export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  tagline: string;
}

// 출연진 타입
export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface CreditsResponse {
  cast: Cast[];
}