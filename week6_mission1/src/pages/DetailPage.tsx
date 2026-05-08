import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useLPDetail, useInfiniteComments } from '../hooks/lp';

const CommentSkeleton = () => (
  <div style={{ display: 'flex', gap: '15px', padding: '15px 0', borderBottom: '1px solid #eee', animation: 'pulse 1.5s infinite ease-in-out' }}>
    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#eee' }} />
    <div style={{ flex: 1 }}>
      <div style={{ width: '80px', height: '14px', backgroundColor: '#eee', borderRadius: '4px', marginBottom: '8px' }} />
      <div style={{ width: '100%', height: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }} />
    </div>
  </div>
);

const DetailPage = () => {
  const { lpid } = useParams();
  const navigate = useNavigate();
  const [commentOrder, setCommentOrder] = useState<'desc' | 'asc'>('desc');
  const [commentText, setCommentText] = useState('');
  
  const { data: lp, isLoading: isLPLoading } = useLPDetail(lpid as string);
  const { 
    data: commentData, 
    isLoading: isCommentLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteComments(lpid as string, commentOrder);
  
  const { ref, inView } = useInView();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!accessToken) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLPLoading) return <div style={{ padding: '50px', textAlign: 'center' }}>데이터 로딩 중...</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      {/* 1. 상단 LP 정보 섹션 */}
      <div style={{ display: 'flex', gap: '40px', marginBottom: '60px', alignItems: 'flex-start' }}>
        <img 
          src={lp?.thumbnail} 
          alt={lp?.title} 
          style={{ width: '350px', height: '350px', borderRadius: '15px', objectFit: 'cover', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} 
        />
        <div style={{ flex: 1, paddingTop: '10px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0 0 15px 0', color: '#333' }}>{lp?.title}</h1>
          <div style={{ fontSize: '18px', color: '#e91e63', fontWeight: 'bold', marginBottom: '20px' }}>❤️ {lp?.likes}</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '25px' }}>
            {lp?.tags?.map((tag: string) => (
              <span key={tag} style={{ backgroundColor: '#f0f0f0', color: '#666', padding: '6px 14px', borderRadius: '20px', fontSize: '13px' }}>#{tag}</span>
            ))}
          </div>
          <div style={{ lineHeight: '1.8', color: '#555', fontSize: '16px', whiteSpace: 'pre-wrap' }}>{lp?.content}</div>
        </div>
      </div>

      <hr style={{ border: '0', borderTop: '1px solid #eee', marginBottom: '40px' }} />

      {/* 2. 하단 댓글 섹션 */}
      <div style={{ padding: '0 10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>댓글</h3>
          <div style={{ display: 'flex', gap: '5px', backgroundColor: '#f5f5f5', padding: '4px', borderRadius: '8px' }}>
            <button 
              onClick={() => setCommentOrder('desc')} 
              style={{ padding: '6px 12px', border: 'none', borderRadius: '6px', backgroundColor: commentOrder === 'desc' ? '#fff' : 'transparent', color: commentOrder === 'desc' ? '#333' : '#999', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', boxShadow: commentOrder === 'desc' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none' }}
            >최신순</button>
            <button 
              onClick={() => setCommentOrder('asc')} 
              style={{ padding: '6px 12px', border: 'none', borderRadius: '6px', backgroundColor: commentOrder === 'asc' ? '#fff' : 'transparent', color: commentOrder === 'asc' ? '#333' : '#999', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', boxShadow: commentOrder === 'asc' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none' }}
            >오래된순</button>
          </div>
        </div>

        {/* 댓글 입력란 */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
          <input 
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 남겨주세요" 
            style={{ flex: 1, padding: '14px 18px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '15px', outline: 'none' }} 
          />
          <button style={{ padding: '0 25px', borderRadius: '10px', border: 'none', backgroundColor: '#e91e63', color: '#fff', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}>작성</button>
        </div>

        {/* 댓글 목록 */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {isCommentLoading ? Array.from({ length: 5 }).map((_, i) => <CommentSkeleton key={i} />) : (
            commentData?.pages?.map((page) => page?.data?.map((comment: any) => (
              <div key={comment?.id} style={{ display: 'flex', gap: '15px', padding: '20px 0', borderBottom: '1px solid #f9f9f9' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#eee', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '6px', fontSize: '15px', color: '#333' }}>{comment?.user?.name || '익명'}</div>
                  <div style={{ fontSize: '15px', color: '#555', lineHeight: '1.5' }}>{comment?.content}</div>
                </div>
              </div>
            )))
          )}
          
          {/* 추가 로딩 스켈레톤 */}
          {isFetchingNextPage && Array.from({ length: 3 }).map((_, i) => <CommentSkeleton key={`next-${i}`} />)}
          
          {/* 스크롤 트리거 */}
          <div ref={ref} style={{ height: '20px' }} />
        </div>
      </div>

      <style>
        {`@keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }`}
      </style>
    </div>
  );
};

export default DetailPage;