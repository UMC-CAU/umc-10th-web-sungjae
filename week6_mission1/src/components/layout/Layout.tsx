import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; // useNavigate 추가
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
  const navigate = useNavigate(); // 네비게이트 함수 생성
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        <Sidebar isOpen={isSidebarOpen} />
        
        {isSidebarOpen && window.innerWidth <= 768 && (
          <div 
            onClick={() => setIsSidebarOpen(false)}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9 }}
          />
        )}

        <main style={{ flex: 1, overflowY: 'auto', padding: '20px', backgroundColor: '#f9f9f9' }}>
          <Outlet />
          
          {/* 플로팅 버튼 (+) 클릭 시 /create로 이동 */}
          <button 
            onClick={() => navigate('/create')}
            style={{
              position: 'fixed', bottom: '30px', right: '30px',
              width: '50px', height: '50px', borderRadius: '50%',
              backgroundColor: '#e91e63', color: '#fff', border: 'none',
              fontSize: '24px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              zIndex: 8
            }}
          >
            +
          </button>
        </main>
      </div>
    </div>
  );
};

export default Layout;