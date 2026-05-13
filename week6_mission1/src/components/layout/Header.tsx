import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import client from '../../api/client';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');
  const isLoggedIn = !!localStorage.getItem('accessToken');

  // 로그아웃 Mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await client.post('/auth/signout');
    },
    onSuccess: () => {
      localStorage.clear();
      navigate('/login');
    },
    onSettled: () => {
     
      localStorage.clear();
      navigate('/login');
    }
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header style={{ padding: '10px 20px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', zIndex: 11 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button onClick={onMenuClick} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12H42" stroke="#333" strokeWidth="4" strokeLinecap="round"/>
            <path d="M6 24H42" stroke="#333" strokeWidth="4" strokeLinecap="round"/>
            <path d="M6 36H42" stroke="#333" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </button>
        <Link to="/" style={{ fontSize: '20px', fontWeight: 'bold', textDecoration: 'none', color: '#e91e63' }}>
          LP STATION
        </Link>
      </div>
      
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        {isLoggedIn ? (
          <>
            <span style={{ fontSize: '14px', color: '#666' }}>{userName}님</span>
            <button 
              onClick={handleLogout} 
              disabled={logoutMutation.isPending}
              style={{ 
                padding: '6px 12px', 
                borderRadius: '6px', 
                border: '1px solid #ddd', 
                backgroundColor: '#fff', 
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              {logoutMutation.isPending ? '...' : '로그아웃'}
            </button>
          </>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', color: '#333', fontSize: '14px', fontWeight: '500' }}>
            로그인
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;