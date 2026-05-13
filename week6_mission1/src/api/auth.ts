// src/api/auth.ts
import client from './client'; 

// 로그인 요청 함수
export const login = async (data: any) => {
  try {
    const response = await client.post('/auth/signin', data);
    const { accessToken, refreshToken, name } = response.data.data;

    // 중요: 로그인 성공 시 받은 토큰을 브라우저에 저장합니다.
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userName', name); 

    return response.data;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};

// 회원가입 요청 함수
export const signup = async (data: any) => {
  const response = await client.post('/auth/signup', data);
  return response.data;
};


export const logout = async () => {
  const response = await client.post('/auth/signout');
  return response.data;
};

export const withdraw = async () => {
  const response = await client.delete('/users');
  return response.data;
};