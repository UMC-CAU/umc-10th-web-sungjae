import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black text-white sticky top-0 z-50 border-b border-gray-800">
      {/* 좌상단: 기존의 카테고리 매뉴 */}
      <div className="flex items-center gap-6 text-sm font-medium">
        <Link to="/" className="hover:text-pink-500 transition">홈</Link>
        <Link to="/movies/popular" className="hover:text-pink-500 transition">인기 영화</Link>
        <Link to="/movies/now-playing" className="hover:text-pink-500 transition">상영 중</Link>
        <Link to="/movies/top-rated" className="hover:text-pink-500 transition">평점 높은</Link>
        <Link to="/movies/upcoming" className="hover:text-pink-500 transition">개봉 예정</Link>
      </div>

      {/* 우상단: 로그인 및 회원가입 */}
      <div className="flex gap-3">
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
      </div>
    </nav>
  );
};

export default Navbar;