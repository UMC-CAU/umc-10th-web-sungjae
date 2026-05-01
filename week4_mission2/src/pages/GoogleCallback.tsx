import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 1. URL 쿼리 파라미터에서 토큰 뽑음
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refreshToken');

    if (accessToken && refreshToken) {
      // 2. 로컬 스토리지에 저장 
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // 선택: 이름 등 유저 정보가 넘어온다면 같이 저장
      const name = params.get('name');
      if (name) localStorage.setItem('userName', decodeURIComponent(name));

      // 3. 메인으로 리다이렉트 및 새로고침 (Navbar 반영)
      alert("구글 로그인 성공!");
      window.location.href = '/'; 
    } else {
      alert("로그인 정보를 가져오는 데 실패했습니다.");
      navigate('/login');
    }
  }, [location, navigate]);

  return (
    <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>
      <h2>구글 로그인 처리 중...</h2>
      <p>잠시만 기다려 주세요.</p>
    </div>
  );
};

export default GoogleCallback;