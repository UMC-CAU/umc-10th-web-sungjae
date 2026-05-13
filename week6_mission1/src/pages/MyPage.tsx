// src/pages/MyPage.tsx (예시 구조)
import { useState, useEffect } from 'react';
import { useMyInfo, useUpdateMyInfo, useUploadImage } from '../hooks/lp';

const MyPage = () => {
  const { data: userInfo, isLoading } = useMyInfo();
  const updateMutation = useUpdateMyInfo();
  const uploadMutation = useUploadImage();
  
  const [editData, setEditData] = useState({ name: '', bio: '', profileImage: '' });

  useEffect(() => {
    if (userInfo) {
      setEditData({
        name: userInfo.name || '',
        bio: userInfo.bio || '',
        profileImage: userInfo.profileImage || ''
      });
    }
  }, [userInfo]);

  const handleSave = () => {
    updateMutation.mutate(editData);
  };

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', padding: '40px', borderRadius: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        {/* 프로필 이미지 업로드 로직 (CreatePage와 유사하게 구현) */}
        <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#eee', overflow: 'hidden' }}>
            <img src={editData.profileImage || '기본이미지URL'} style={{ width: '100%', height: '100%' }} />
        </div>
        
        <div style={{ flex: 1 }}>
          <input 
            value={editData.name} 
            onChange={(e) => setEditData({...editData, name: e.target.value})}
            style={{ display: 'block', width: '100%', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff', padding: '10px', fontSize: '20px', marginBottom: '10px' }}
          />
          <input 
            value={editData.bio} 
            onChange={(e) => setEditData({...editData, bio: e.target.value})}
            placeholder="Bio를 입력하세요"
            style={{ display: 'block', width: '100%', backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff', padding: '10px', marginBottom: '10px' }}
          />
          <p>{userInfo?.email}</p>
        </div>
        
        <button onClick={handleSave} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '30px', cursor: 'pointer' }}>✓</button>
      </div>
    </div>
  );
};

export default MyPage;