import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteLPs } from '../hooks/lp';
import LPCard from '../components/LPCard';


const SkeletonCard = () => (
  <div style={{ 
    width: '100%', 
    aspectRatio: '1/1', 
    backgroundColor: '#e0e0e0', 
    borderRadius: '8px',
    animation: 'pulse 1.5s infinite ease-in-out'
  }} />
);

const ListPage = () => {
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const { ref, inView } = useInView();
  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    refetch, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteLPs(sortOrder);


  useEffect(() => {

    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '25px' }}>
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>에러 발생: {(error as any).message}</p>
        <button onClick={() => refetch()} style={{ padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>다시 시도</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
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
            cursor: 'pointer'
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
            cursor: 'pointer'
          }}
        >
          오래된순
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '25px' }}>
        {data?.pages.map((page) => 
          page.data.map((lp: any) => (
            <LPCard 
              key={lp.id} 
              id={lp.id} 
              title={lp.title} 
              thumbnail={lp.thumbnail} 
              likes={lp.likes} 
              createdAt={lp.createdAt}
            />
          ))
        )}

        {isFetchingNextPage && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={`next-${i}`} />)}
      </div>

      {hasNextPage && !isFetchingNextPage && <div ref={ref} style={{ height: '20px' }} />}

      <style>
        {`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
        `}
      </style>
    </div>
  );
};

export default ListPage;