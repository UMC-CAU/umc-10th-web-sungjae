import { useState } from 'react';
import { useLPs } from '../hooks/lp';
import LPCard from '../components/LPCard';

const ListPage = () => {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const { data: lps, isLoading, isError, error, refetch } = useLPs(sortOrder);

  if (isLoading) return <div style={{ padding: '20px' }}>데이터를 불러오는 중...</div>;
  if (isError) return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <p>에러가 발생했습니다: {(error as any).message}</p>
      <button 
        onClick={() => refetch()}
        style={{ padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
      >
        다시 시도
      </button>
    </div>
  );

  return (
    <div style={{ padding: '20px' }}>
      {/* 정렬 버튼 영역 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '25px', gap: '8px' }}>
        <button 
          onClick={() => setSortOrder('desc')} 
          style={{ 
            padding: '6px 14px', 
            borderRadius: '20px', 
            border: '1px solid #ddd', 
            backgroundColor: sortOrder === 'desc' ? '#333' : '#fff', 
            color: sortOrder === 'desc' ? '#fff' : '#333',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          최신순
        </button>
        <button 
          onClick={() => setSortOrder('asc')} 
          style={{ 
            padding: '6px 14px', 
            borderRadius: '20px', 
            border: '1px solid #ddd', 
            backgroundColor: sortOrder === 'asc' ? '#333' : '#fff', 
            color: sortOrder === 'asc' ? '#fff' : '#333',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          오래된순
        </button>
      </div>

      {/* LP 카드 격자 레이아웃 */}
     

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
          gap: '25px' 
        }}>
          {lps?.map((lp: any) => (
            <LPCard 
              key={lp.id} 
              id={lp.id} 
              title={lp.title} 
              thumbnail={lp.thumbnail} 
              likes={lp.likes} 
              createdAt={lp.createdAt} // 서버에서 받아온 실제 생성일 데이터를 넘겨줍니다.
            />
          ))}
        </div>
    </div>
  );
};

export default ListPage;