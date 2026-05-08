import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useLPDetail } from '../hooks/lp';

const DetailPage = () => {
  const { lpid } = useParams();
  const navigate = useNavigate();
  const { data: lp, isLoading, isError } = useLPDetail(lpid as string);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!accessToken) {
      alert('로그인이 필요한 서비스입니다. 로그인 해주세요!');
      navigate('/login');
    }
  }, [accessToken, navigate]);

  if (isLoading) return <div style={{ padding: '20px' }}>데이터 로딩 중...</div>;
  if (isError || !lp) return <div style={{ padding: '20px' }}>데이터를 찾을 수 없습니다.</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', gap: '40px', marginBottom: '30px' }}>
        <img 
          src={lp.thumbnail} 
          alt={lp.title} 
          style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }} 
        />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 10px 0' }}>{lp.title}</h1>
          <p style={{ color: '#888', marginBottom: '20px' }}>
            작성일: {new Date(lp.createdAt).toLocaleDateString()}
          </p>
          <div style={{ fontSize: '24px', color: '#e91e63', marginBottom: '20px' }}>
            ❤️ {lp.likes}
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {lp.tags?.map((tag: string) => (
              <span key={tag} style={{ backgroundColor: '#eee', padding: '5px 12px', borderRadius: '20px', fontSize: '14px' }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '30px 0' }} />
      <div style={{ lineHeight: '1.8', fontSize: '18px', color: '#333', whiteSpace: 'pre-wrap' }}>
        {lp.content}
      </div>
    </div>
  );
};

export default DetailPage;