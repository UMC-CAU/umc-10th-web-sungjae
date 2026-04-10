import axios from 'axios';

const API_URL = 'http://localhost:8000/v1';

// 회원가입 API
export const signup = (data: any) => axios.post(`${API_URL}/auth/signup`, data);

// 로그인 API
export const login = (data: any) => axios.post(`${API_URL}/auth/signin`, data);

// 내 정보 조회 API (토큰 필수)
export const getMyInfo = (token: string) => 
  axios.get(`${API_URL}/users/me`, {
    headers: { 
      Authorization: `Bearer ${token}` // 헤더에 토큰 실어 보내기
    }
  });