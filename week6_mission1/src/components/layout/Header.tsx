import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  const isLoggedIn = !!localStorage.getItem('accessToken');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header style={{ padding: '10px 20px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button onClick={onMenuClick} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12H42" stroke="#333" strokeWidth="4" strokeLinecap="round"/>
            <path d="M6 24H42" stroke="#333" strokeWidth="4" strokeLinecap="round"/>
            <path d="M6 36H42" stroke="#333" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </button>
        <Link to="/" style={{ fontSize: '20px', fontWeight: 'bold', textDecoration: 'none', color: '#e91e63' }}>
          6주차 미션
        </Link>
      </div>
      
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        {isLoggedIn ? (
          <>
            <span style={{ fontSize: '14px' }}>{userName}님 반갑습니다.</span>
            <button onClick={handleLogout} style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ddd', backgroundColor: '#fff', cursor: 'pointer' }}>로그아웃</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: '#333', fontSize: '14px' }}>로그인</Link>
            <Link to="/signup">
              <button style={{ padding: '8px 16px', borderRadius: '20px', border: 'none', backgroundColor: '#e91e63', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>회원가입</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;