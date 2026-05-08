import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api/auth';

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(formData);
      alert('회원가입 성공! 로그인해 주세요.');
      navigate('/login');
    } catch (error) {
      alert('회원가입 실패: 이미 존재하는 이메일이거나 입력 형식이 잘못되었습니다.');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '40px', borderRadius: '15px', backgroundColor: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: 'bold', color: '#333' }}>회원가입</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="text" 
            placeholder="이름" 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', outline: 'none' }}
            required 
          />
          <input 
            type="email" 
            placeholder="이메일 주소" 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', outline: 'none' }}
            required 
          />
          <input 
            type="password" 
            placeholder="비밀번호" 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            style={{ padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', outline: 'none' }}
            required 
          />
          <button type="submit" style={{ marginTop: '10px', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#e91e63', color: '#fff', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            가입하기
          </button>
        </form>
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          이미 회원이신가요? <Link to="/login" style={{ color: '#333', textDecoration: 'none', fontWeight: 'bold' }}>로그인</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;