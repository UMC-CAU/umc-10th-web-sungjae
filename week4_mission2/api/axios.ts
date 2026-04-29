import axios from 'axios';

// 1. Axios 인스턴스 생성 (기존 TMDB 설정 유지)
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    accept: 'application/json',
  },
});

// src/api/axios.ts

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/refresh')) {
      originalRequest._retry = true;

      try {
        // 로컬스토리지에는 'refreshToken'이라는 이름으로 저장되어 있으니 그대로 꺼냅니다.
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) throw new Error("No Refresh Token");

        // ⚠️ 여기서 서버가 원하는 이름인 'refresh'로 변경해서 보냅니다!
        const { data } = await axios.post('http://localhost:8000/v1/auth/refresh', {
          refresh: refreshToken, // 👈 'refreshToken'에서 'refresh'로 수정 완료
        });

        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken; // 서버가 새 리프레시 토큰도 준다면 갱신

        localStorage.setItem('accessToken', newAccessToken);
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;