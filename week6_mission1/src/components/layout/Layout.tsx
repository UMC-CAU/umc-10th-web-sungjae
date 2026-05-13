import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import CreatePage from '../../pages/CreatePage';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{
              position: 'fixed', bottom: '30px', right: '30px',
              width: '60px', height: '60px', borderRadius: '50%',
              backgroundColor: '#e91e63', color: '#fff', border: 'none',
              fontSize: '30px', cursor: 'pointer', boxShadow: '0 6px 15px rgba(233, 30, 99, 0.3)',
              zIndex: 8, display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}
          >
            +
          </button>
        </main>
      </div>

     
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 100,
          backdropFilter: 'blur(4px)'
        }} onClick={() => setIsModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            {/* CreatePage에 onClose 프롭스를 반드시 넘겨야 합니다 */}
            <CreatePage onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;