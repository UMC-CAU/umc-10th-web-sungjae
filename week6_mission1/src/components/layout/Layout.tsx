import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = () => {
  // 처음 로드될 때 창 너비가 768px 미만이면 사이드바를 닫힌 상태로 시작
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  // 창 크기가 바뀔 때마다 체크해서 모바일/데스크탑 모드 전환 (선택 사항)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        <Sidebar isOpen={isSidebarOpen} />
        
        {/* 모바일에서 사이드바가 열렸을 때 배경을 어둡게 처리 (미션: 외부 영역 클릭 시 닫기) */}
        {isSidebarOpen && window.innerWidth <= 768 && (
          <div 
            onClick={() => setIsSidebarOpen(false)}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9
            }}
          />
        )}

        <main style={{ flex: 1, overflowY: 'auto', padding: '20px', backgroundColor: '#f9f9f9' }}>
          <Outlet />
          <button style={{
            position: 'fixed', bottom: '30px', right: '30px',
            width: '50px', height: '50px', borderRadius: '50%',
            backgroundColor: '#e91e63', color: '#fff', border: 'none',
            fontSize: '24px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            zIndex: 8
          }}>+</button>
        </main>
      </div>
    </div>
  );
};

export default Layout;