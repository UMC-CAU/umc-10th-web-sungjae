import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import client from '../../api/client';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const isMobile = window.innerWidth <= 768;
  const navigate = useNavigate();

  // 회원 탈퇴 Mutation
  const withdrawMutation = useMutation({
    mutationFn: async () => {
      await client.delete('/users');
    },
    onSuccess: () => {
      alert('회원 탈퇴가 완료되었습니다.');
      localStorage.clear();
      navigate('/login');
    },
    onError: () => {
      alert('탈퇴 처리 중 오류가 발생했습니다.');
    }
  });

  const handleWithdraw = () => {
    if (window.confirm('정말 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다.')) {
      withdrawMutation.mutate();
    }
  };

  return (
    <aside style={{ 
      position: isMobile ? 'absolute' : 'relative',
      zIndex: 10, top: 0, left: 0, bottom: 0, width: '200px', 
      backgroundColor: '#f4f4f4', borderRight: '1px solid #ddd',
      display: 'flex', flexDirection: 'column', padding: '20px',
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s ease',
      marginLeft: !isOpen && !isMobile ? '-200px' : '0',
    }}>
      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li onClick={() => navigate('/')} style={{ padding: '12px 0', fontSize: '15px', color: '#333', fontWeight: '500', cursor: 'pointer' }}>홈</li>
          <li style={{ padding: '12px 0', fontSize: '15px', color: '#333', fontWeight: '500', cursor: 'pointer' }}>검색</li>
          <li style={{ padding: '12px 0', fontSize: '15px', color: '#333', fontWeight: '500', cursor: 'pointer' }}>마이페이지</li>
        </ul>
      </nav>
      
      {/* 탈퇴 버튼 */}
      <div 
        onClick={handleWithdraw}
        style={{ 
          padding: '12px 0', 
          fontSize: '13px', 
          color: '#999', 
          cursor: withdrawMutation.isPending ? 'not-allowed' : 'pointer',
          borderTop: '1px solid #eee' 
        }}
      >
        {withdrawMutation.isPending ? '탈퇴 중...' : '회원 탈퇴'}
      </div>
    </aside>
  );
};

export default Sidebar;