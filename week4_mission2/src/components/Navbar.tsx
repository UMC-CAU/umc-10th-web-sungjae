import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage'; // 훅 임포트

const Navbar = () => {
  const navigate = useNavigate();
  const { getAccessToken, removeToken } = useLocalStorage(); // 토큰 관리 함수 가져오기
  
  // 현재 로그인 상태 확인
  const isLoggedIn = !!getAccessToken();

  const handleLogout = () => {
    removeToken(); // 토큰 삭제
    alert("로그아웃 되었습니다.");
    // UI 갱신을 위해 메인으로 이동하며 페이지 새로고침
    window.location.href = '/'; 
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black text-white sticky top-0 z-50 border-b border-gray-800">
      {/* 좌상단: 기존의 카테고리 메뉴 */}
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link to="/" className="hover:text-pink-500 transition">홈</Link>
        <Link to="/movies/popular" className="hover:text-pink-500 transition">인기 영화</Link>
        <Link to="/movies/now-playing" className="hover:text-pink-500 transition">상영 중</Link>
        <Link to="/movies/top-rated" className="hover:text-pink-500 transition">평점 높은</Link>
        <Link to="/movies/upcoming" className="hover:text-pink-500 transition">개봉 예정</Link>
      </div>

      {/* 우상단: 로그인 상태에 따른 버튼 교체[cite: 2] */}
      <div className="flex gap-3">
        {isLoggedIn ? (
          // 로그인 성공 시 보일 버튼들[cite: 2]
          <>
            <Link
              to="/mypage"
              className="px-4 py-1.5 text-sm rounded-md bg-gray-800 hover:bg-gray-700 transition"
            >
              마이페이지
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 text-sm rounded-md bg-pink-600 hover:bg-pink-700 transition font-semibold"
            >
              로그아웃
            </button>
          </>
        ) : (
          // 로그인 안 된 상태에서 보일 버튼들[cite: 2]
          <>
            <Link
              to="/login"
              className="px-4 py-1.5 text-sm rounded-md bg-gray-800 hover:bg-gray-700 transition"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1.5 text-sm rounded-md bg-pink-600 hover:bg-pink-700 transition font-semibold"
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;