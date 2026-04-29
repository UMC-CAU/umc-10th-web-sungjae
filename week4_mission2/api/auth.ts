// src/api/auth.ts
import api from './axios'; // ✅ 인터셉터가 들어있는 api 인스턴스 임포트

const API_URL = 'http://localhost:8000/v1';

// 회원가입 API
export const signup = (data: any) => api.post(`${API_URL}/auth/signup`, data);

// 로그인 API
export const login = (data: any) => api.post(`${API_URL}/auth/signin`, data);

// 내 정보 조회 API (토큰 필수)
export const getMyInfo = (token: string) =>
  api.get(`${API_URL}/users/me`, { // ✅ axios 대신 api 사용
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });