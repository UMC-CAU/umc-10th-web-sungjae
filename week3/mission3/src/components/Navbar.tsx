import { NavLink } from 'react-router-dom';

const Navbar = () => {
  // 현재 활성화된 메뉴의 스타일을 결정하는 함수
  const activeStyle = ({ isActive }: { isActive: boolean }) => 
    isActive ? "text-pink-500 font-bold" : "text-white hover:text-gray-300";

  return (
    <nav className="flex gap-6 p-4 border-b border-gray-800 bg-black sticky top-0 z-50">
      <NavLink title="홈" to="/" className={activeStyle}>홈</NavLink>
      <NavLink title="인기 영화" to="/movies/popular" className={activeStyle}>인기 영화</NavLink>
      <NavLink title="상영 중" to="/movies/now-playing" className={activeStyle}>상영 중</NavLink>
      <NavLink title="평점 높은" to="/movies/top-rated" className={activeStyle}>평점 높은</NavLink>
      <NavLink title="개봉 예정" to="/movies/upcoming" className={activeStyle}>개봉 예정</NavLink>
    </nav>
  );
};

export default Navbar;