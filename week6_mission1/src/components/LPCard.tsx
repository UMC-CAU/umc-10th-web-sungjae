import { useState } from 'react';
import { Link } from 'react-router-dom';

interface LPCardProps {
  id: number;
  title: string;
  thumbnail: string;
  likes: any; 
  createdAt: string;
}

const LPCard = ({ id, title, thumbnail, likes, createdAt }: LPCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  // ✅ likes가 배열이면 개수를, 아니면 숫자를, 데이터가 없으면 0을 표시
  const displayLikes = Array.isArray(likes) ? likes.length : (Number(likes) || 0);

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
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
          padding: '20px', boxSizing: 'border-box',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          color: '#fff', textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '16px', margin: '0 0 10px 0', fontWeight: 'bold' }}>{title}</h3>
          <p style={{ fontSize: '12px', margin: '0 0 15px 0', color: '#ccc' }}>{formatDate(createdAt)}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px' }}>
            <span style={{ color: '#e91e63' }}>❤️</span>
            <span>{displayLikes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LPCard;