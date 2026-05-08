import { useState } from 'react';
import { Link } from 'react-router-dom';

interface LPCardProps {
  id: number;
  title: string;
  thumbnail: string;
  likes: number;
  createdAt: string; // Swagger에서 오는 실제 데이터 추가
}

const LPCard = ({ id, title, thumbnail, likes, createdAt }: LPCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // 날짜 형식 변환 함수 (예: 2023.10.27)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <Link 
      to={`/lp/${id}`} 
      style={{ textDecoration: 'none', color: 'inherit' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ 
        position: 'relative', // 오버레이 배치의 기준점
        width: '100%', 
        aspectRatio: '1/1', // 정사각형 유지
        borderRadius: '8px', 
        overflow: 'hidden', // 오버레이가 밖으로 나가지 않게 함
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)', // 호버 시 확대 효과
      }}>
        {/* 1. 기본 앨범 이미지 */}
        <img 
          src={thumbnail} 
          alt={title} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'filter 0.3s ease',
            filter: isHovered ? 'blur(2px)' : 'none' // 호버 시 이미지 살짝 흐리게
          }} 
        />

        {/* 2. 호버 시 나타나는 검은색 오버레이 (첨부 이미지 스타일) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // 반투명 검은 배경
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // 세로 중앙 정렬
          alignItems: 'center', // 가로 중앙 정렬
          padding: '20px',
          boxSizing: 'border-box',
          opacity: isHovered ? 1 : 0, // 호버 시에만 보임
          transition: 'opacity 0.3s ease',
          color: '#fff', // 텍스트는 흰색으로
          textAlign: 'center'
        }}>
          {/* 제목 */}
          <h3 style={{ 
            fontSize: '16px', 
            margin: '0 0 10px 0',
            fontWeight: 'bold',
            wordBreak: 'keep-all', // 단어 단위 줄바꿈
            lineHeight: '1.4'
          }}>
            {title}
          </h3>

          {/* 업로드일 (실제 데이터 사용) */}
          <p style={{ fontSize: '12px', margin: '0 0 15px 0', color: '#ccc' }}>
            {formatDate(createdAt)}
          </p>

          {/* 좋아요 (깔끔한 하트 아이콘 사용) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px' }}>
            {/* SVG를 직접 넣어 깔끔하고 색상 제어가 가능한 하트 사용 */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#e91e63' }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LPCard;