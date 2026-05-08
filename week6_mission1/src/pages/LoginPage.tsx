import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      alert('로그인 성공!');
      navigate('/');
    } catch (error) {
      alert('로그인 실패: 이메일 또는 비밀번호를 확인하세요.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '40px', borderRadius: '15px', backgroundColor: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>로그인</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="이메일 주소" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', outline: 'none' }}
            required 
          />
          <input 
            type="password" 
            placeholder="비밀번호" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', outline: 'none' }}
            required 
          />
          <button type="submit" style={{ marginTop: '10px', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#333', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            로그인
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          계정이 없으신가요? <Link to="/signup" style={{ color: '#e91e63', textDecoration: 'none', fontWeight: 'bold' }}>회원가입</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;