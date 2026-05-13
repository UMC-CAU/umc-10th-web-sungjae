import { useState } from 'react';
import { Link } from 'react-router-dom';

interface LPCardProps {
  id: number;
  title: string;
  thumbnail: string;
  likes: any; // 서버 응답이 배열이므로 any로 유연하게 처리
  createdAt: string;
}

const LPCard = ({ id, title, thumbnail, likes, createdAt }: LPCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  // ✅ 핵심 수정: likes가 배열이면 개수를, 아니면 값을 그대로 반환
  const displayLikes = Array.isArray(likes) ? likes.length : (likes || 0);

  return (
    <Link 
      to={`/lp/${id}`} 
      style={{ textDecoration: 'none', color: 'inherit' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        aspectRatio: '1/1', 
        borderRadius: '8px', 
        overflow: 'hidden', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}>
        <img 
          src={thumbnail} 
          alt={title} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'filter 0.3s ease',
            filter: isHovered ? 'blur(2px)' : 'none'
          }} 
        />

        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          boxSizing: 'border-box',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          color: '#fff',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            fontSize: '16px', 
            margin: '0 0 10px 0',
            fontWeight: 'bold',
            wordBreak: 'keep-all',
            lineHeight: '1.4'
          }}>
            {title}
          </h3>

          <p style={{ fontSize: '12px', margin: '0 0 15px 0', color: '#ccc' }}>
            {formatDate(createdAt)}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#e91e63' }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>{displayLikes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LPCard;