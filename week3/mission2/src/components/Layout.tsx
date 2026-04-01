import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; 

const Layout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* 모든 페이지에 노출됨 */}
      <Navbar /> 
      <main className="p-8">
        {/* 실제 페이지 콘텐츠가 갈아끼워지는 지점 */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;