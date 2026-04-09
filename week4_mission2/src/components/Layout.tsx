import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; 

const Layout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar는 모든 페이지에 노출됨 */}
      <Navbar /> 
      <main className="p-8">
        {/* 실제 페이지 콘텐츠가 갈아끼워지는 지점 */}
        {/*나중에 주소에 따라 실제 페이지가 들어올 빈 자리 
           사용자가 인기 영화 누르면 PopurPage가 들어옴
           페이지가 바뀔 때 layout은 리렌더링 되지 않고 이 부분만 교체됨*/}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;