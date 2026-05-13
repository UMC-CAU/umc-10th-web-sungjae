import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { 
  useLPDetail, 
  useInfiniteComments, 
  useAddComment, 
  useDeleteComment,
  useLikeLP,
  useDeleteLP
} from '../hooks/lp';

// 댓글 로딩 스켈레톤
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
  
  // 데이터 페칭
  const { data: lp, isLoading: isLPLoading, isError: isLPError } = useLPDetail(lpid as string);
  const { 
    data: commentData, 
    isLoading: isCommentLoading,
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteComments(lpid as string, commentOrder);
  
  const { ref, inView } = useInView();

  // Mutations
  const addCommentMutation = useAddComment(lpid as string);
  const deleteCommentMutation = useDeleteComment(lpid as string);
  const deleteLPMutation = useDeleteLP();
  const likeMutation = useLikeLP(lpid as string);

  // 무한 스크롤 로직
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 에러 발생 시 처리 (흰 화면 방지)
  if (isLPError) return <div style={{ padding: '100px', textAlign: 'center' }}>데이터를 불러오는 중 에러가 발생했습니다.</div>;
  if (isLPLoading) return <div style={{ padding: '100px', textAlign: 'center' }}>로딩 중...</div>;

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = () => {
    if (!localStorage.getItem('accessToken')) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }
    likeMutation.mutate(lp?.isLiked || false);
  };

  // 삭제 핸들러
  const handleDeleteLP = () => {
    if (window.confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      deleteLPMutation.mutate(lpid as string, {
        onSuccess: () => {
          alert('삭제되었습니다.');
          navigate('/');
        }
      });
    }
  };


  const renderLikeCount = () => {
    if (Array.isArray(lp?.likes)) return lp.likes.length;
    if (typeof lp?.likes === 'number') return lp.likes;
    return 0;
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', gap: '40px', marginBottom: '60px' }}>
        <img src={lp?.thumbnail} style={{ width: '350px', height: '350px', borderRadius: '15px', objectFit: 'cover' }} alt="LP" />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h1 style={{ fontSize: '32px', margin: 0 }}>{lp?.title}</h1>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#999' }}>수정</button>
              <button onClick={handleDeleteLP} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#999' }}>삭제</button>
            </div>
          </div>

          <button 
            onClick={handleLikeClick}
            disabled={likeMutation.isPending}
            style={{ 
              marginTop: '20px', padding: '8px 16px', borderRadius: '20px', 
              border: '1px solid #eee', backgroundColor: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
              color: lp?.isLiked ? '#e91e63' : '#333'
            }}
          >
            <span style={{ fontSize: '18px' }}>{lp?.isLiked ? '❤️' : '🤍'}</span>
            <span style={{ fontWeight: 'bold' }}>{renderLikeCount()}</span>
          </button>

          <div style={{ display: 'flex', gap: '8px', margin: '20px 0' }}>
            {lp?.tags?.map((tag: string) => (
              <span key={tag} style={{ backgroundColor: '#f0f0f0', padding: '5px 12px', borderRadius: '15px', fontSize: '13px' }}>#{tag}</span>
            ))}
          </div>
          <p style={{ lineHeight: '1.8', color: '#555', whiteSpace: 'pre-wrap' }}>{lp?.content}</p>
        </div>
      </div>

      <hr style={{ border: '0', borderTop: '1px solid #eee', marginBottom: '40px' }} />
      
      {/* 댓글 영역 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>댓글</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setCommentOrder('desc')} style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: commentOrder === 'desc' ? 'bold' : 'normal' }}>최신순</button>
          <button onClick={() => setCommentOrder('asc')} style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: commentOrder === 'asc' ? 'bold' : 'normal' }}>과거순</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
        <input 
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="댓글을 남겨주세요" 
          style={{ flex: 1, padding: '14px', borderRadius: '10px', border: '1px solid #ddd' }} 
        />
        <button 
          onClick={() => {
            if (!commentText.trim()) return;
            addCommentMutation.mutate(commentText, { onSuccess: () => setCommentText('') });
          }}
          disabled={addCommentMutation.isPending}
          style={{ padding: '0 25px', borderRadius: '10px', border: 'none', backgroundColor: '#e91e63', color: '#fff', cursor: 'pointer' }}
        >
          {addCommentMutation.isPending ? '...' : '작성'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {isCommentLoading ? (
          Array.from({ length: 3 }).map((_, i) => <CommentSkeleton key={i} />)
        ) : (
          commentData?.pages?.map((page) => page?.data?.map((comment: any) => (
            <div key={comment.id} style={{ display: 'flex', gap: '15px', padding: '20px 0', borderBottom: '1px solid #f9f9f9' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#eee', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{comment?.user?.name || '익명'}</div>
                  <button onClick={() => deleteCommentMutation.mutate(comment.id)} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer' }}>삭제</button>
                </div>
                <div style={{ fontSize: '15px', marginTop: '5px' }}>{comment.content}</div>
              </div>
            </div>
          )))
        )}
        
        {isFetchingNextPage && <CommentSkeleton />}
        <div ref={ref} style={{ height: '20px' }} />
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default DetailPage;