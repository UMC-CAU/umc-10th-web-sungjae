interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <aside style={{ 
      // 모바일일 때는 화면 위에 뜨고(absolute), 데스크탑일 때는 옆에 붙음(relative)
      position: isMobile ? 'absolute' : 'relative',
      zIndex: 10,
      top: 0,
      left: 0,
      bottom: 0,
      width: '200px', 
      backgroundColor: '#f4f4f4', 
      borderRight: '1px solid #ddd',
      display: 'flex', 
      flexDirection: 'column',
      padding: '20px',
      // 열고 닫히는 애니메이션
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s ease',
      // 데스크탑에서 닫혔을 때 공간을 아예 안 차지하게 함
      marginLeft: !isOpen && !isMobile ? '-200px' : '0',
    }}>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={{ padding: '12px 0', fontSize: '15px', color: '#333', fontWeight: '500', cursor: 'pointer' }}>홈</li>
          <li style={{ padding: '12px 0', fontSize: '15px', color: '#333', fontWeight: '500', cursor: 'pointer' }}>검색</li>
          <li style={{ padding: '12px 0', fontSize: '15px', color: '#333', fontWeight: '500', cursor: 'pointer' }}>마이페이지</li>
        </ul>
      </nav>
      <div style={{ marginTop: 'auto', fontSize: '13px', color: '#999', cursor: 'pointer' }}>탈퇴하기</div>
    </aside>
  );
};

export default Sidebar;