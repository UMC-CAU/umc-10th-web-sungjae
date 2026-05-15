import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { 
  useLPDetail, 
  useInfiniteComments, 
  useAddComment, 
  useDeleteComment,
  useLikeLP,
  useDeleteLP,
  useUpdateLP
} from '../hooks/lp';

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
  const { lpid } = useParams<{ lpid: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [commentOrder, setCommentOrder] = useState<'desc' | 'asc'>('desc');
  const [commentText, setCommentText] = useState('');
  
  const { data: lp, isLoading: isLPLoading, isError: isLPError } = useLPDetail(lpid || '');
  const { data: commentData, isLoading: isCommentLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteComments(lpid || '', commentOrder);
  
  const { ref, inView } = useInView();
  const addCommentMutation = useAddComment(lpid || '');
  const deleteCommentMutation = useDeleteComment(lpid || '');
  const deleteLPMutation = useDeleteLP();
  const updateLPMutation = useUpdateLP(lpid || ''); 
  const likeMutation = useLikeLP(lpid || '');

  const [editFields, setEditFields] = useState({ 
    title: '', content: '', tags: [] as string[], thumbnail: '', published: true 
  });

  // ✅ [핵심] 서버에서 온 객체 배열 태그 [{id, name}]를 문자열 배열 [name]으로 변환
  useEffect(() => {
    if (lp) {
      const formattedTags = Array.isArray(lp.tags) 
        ? lp.tags.map((tag: any) => typeof tag === 'string' ? tag : tag.name)
        : [];

      setEditFields({ 
        title: lp.title || '', 
        content: lp.content || '', 
        tags: formattedTags,
        thumbnail: lp.thumbnail || '',
        published: lp.published ?? true
      });
    }
  }, [lp]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLPError) return <div style={{ padding: '100px', textAlign: 'center' }}>데이터 로드 실패</div>;
  if (isLPLoading) return <div style={{ padding: '100px', textAlign: 'center' }}>로딩 중...</div>;

  const handleUpdateSubmit = () => {
    if (!lpid) return;
    updateLPMutation.mutate({
      title: editFields.title.trim(),
      content: editFields.content.trim(),
      tags: editFields.tags,
      thumbnail: editFields.thumbnail,
      published: editFields.published
    }, {
      onSuccess: () => {
        alert('수정되었습니다!');
        setIsEditing(false);
      },
      onError: (err: any) => {
        console.error('에러 상세:', err.response?.data);
        alert(`수정 실패: ${err.response?.data?.message || '규격을 확인하세요.'}`);
      }
    });
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <div style={{ display: 'flex', gap: '40px', marginBottom: '60px' }}>
        <img src={lp?.thumbnail} style={{ width: '350px', height: '350px', borderRadius: '15px', objectFit: 'cover' }} alt="LP" />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '32px', margin: 0 }}>{lp?.title}</h1>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setIsEditing(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>수정</button>
              <button onClick={() => { if(window.confirm('삭제하시겠습니까?')) deleteLPMutation.mutate(lpid as string, { onSuccess: () => navigate('/') }) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}>삭제</button>
            </div>
          </div>
          <button onClick={() => likeMutation.mutate(lp?.isLiked)} style={{ marginTop: '15px', background: '#fff', border: '1px solid #eee', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer' }}>
            ❤️ {Array.isArray(lp?.likes) ? lp.likes.length : (lp?.likes || 0)}
          </button>
          
          {/* 태그 렌더링 수정: 객체 배열 대응 */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '15px' }}>
            {lp?.tags?.map((tag: any) => (
              <span key={tag.id || tag} style={{ background: '#f0f0f0', padding: '4px 10px', borderRadius: '15px', fontSize: '13px' }}>
                #{typeof tag === 'string' ? tag : tag.name}
              </span>
            ))}
          </div>

          <p style={{ marginTop: '20px', lineHeight: '1.8', color: '#555', whiteSpace: 'pre-wrap' }}>{lp?.content}</p>
        </div>
      </div>

      <hr style={{ border: '0', borderTop: '1px solid #eee', marginBottom: '40px' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0 }}>댓글</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setCommentOrder('desc')} style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: commentOrder === 'desc' ? 'bold' : 'normal', color: commentOrder === 'desc' ? '#333' : '#999' }}>최신순</button>
          <button onClick={() => setCommentOrder('asc')} style={{ border: 'none', background: 'none', cursor: 'pointer', fontWeight: commentOrder === 'asc' ? 'bold' : 'normal', color: commentOrder === 'asc' ? '#333' : '#999' }}>과거순</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
        <input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="댓글 작성..." style={{ flex: 1, padding: '14px', borderRadius: '10px', border: '1px solid #ddd' }} />
        <button onClick={() => { if (!commentText.trim()) return; addCommentMutation.mutate(commentText, { onSuccess: () => setCommentText('') }); }} style={{ padding: '0 25px', borderRadius: '10px', border: 'none', backgroundColor: '#e91e63', color: '#fff', cursor: 'pointer' }}>작성</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {isCommentLoading ? <CommentSkeleton /> : (
          commentData?.pages?.map((page) => page?.data?.map((comment: any) => (
            <div key={comment.id} style={{ display: 'flex', gap: '15px', padding: '20px 0', borderBottom: '1px solid #f9f9f9' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#eee', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 'bold' }}>{typeof comment?.user?.name === 'object' ? comment.user.name.name : (comment?.user?.name || '익명')}</div>
                  <button onClick={() => deleteCommentMutation.mutate(comment.id)} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer' }}>삭제</button>
                </div>
                <div style={{ fontSize: '15px', marginTop: '5px', color: '#555' }}>{comment.content}</div>
              </div>
            </div>
          )))
        )}
        <div ref={ref} style={{ height: '20px' }} />
      </div>

      {isEditing && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', width: '450px' }}>
            <h2 style={{ marginTop: 0 }}>LP 수정</h2>
            <input style={{ width: '100%', padding: '12px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box' }} value={editFields.title} onChange={(e) => setEditFields({ ...editFields, title: e.target.value })} placeholder="제목" />
            <textarea style={{ width: '100%', height: '150px', padding: '12px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd', boxSizing: 'border-box', resize: 'none' }} value={editFields.content} onChange={(e) => setEditFields({ ...editFields, content: e.target.value })} placeholder="내용" />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleUpdateSubmit} style={{ flex: 1, padding: '12px', backgroundColor: '#e91e63', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>저장</button>
              <button onClick={() => setIsEditing(false)} style={{ flex: 1, padding: '12px', backgroundColor: '#eee', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;