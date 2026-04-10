export const useLocalStorage = () => {
  // 토큰 저장 (로그인 성공 시 호출)
  const setToken = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };

  // 저장된 액세스 토큰 가져오기 (API 요청 시 사용)
  const getAccessToken = () => localStorage.getItem('accessToken');

  // 로그아웃 시 토큰 삭제
  const removeToken = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return { setToken, getAccessToken, removeToken };
};