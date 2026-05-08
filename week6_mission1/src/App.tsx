// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ListPage from './pages/ListPage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CreatePage from './pages/CreatePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 레이아웃이 적용되는 루프 */}
        <Route element={<Layout />}>
          <Route path="/" element={<ListPage />} />
          <Route path="/lp/:lpid" element={<DetailPage />} />
          <Route path="/create" element={<CreatePage />} /> 
        </Route>

        {/* 레이아웃이 필요 없는 페이지 (로그인/회원가입) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* 잘못된 경로로 접근 시 메인으로 이동 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;