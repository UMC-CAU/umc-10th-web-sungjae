import React from 'react';
import { RouterProvider } from './RouterContext';
import { Routes } from './Routes';
import { Route } from './Route';
import { Link } from './Link';

// 임시 페이지 컴포넌트
const Home = () => <h2>홈 페이지</h2>;
const About = () => <h2>소개 페이지</h2>;
const First = () => <h2>1 페이지 </h2>
function App() {
  return (
    <RouterProvider>
      <nav style={{ display: 'flex', gap: '15px', padding: '10px', background: '#eee' }}>
        <Link to="/">홈</Link>
        <Link to="/about">소개</Link>
        <Link to="/first">1 페이지</Link>
      </nav>
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/first" element={<First />} />
        </Routes>
      </main>
    </RouterProvider>
  );
}

export default App;