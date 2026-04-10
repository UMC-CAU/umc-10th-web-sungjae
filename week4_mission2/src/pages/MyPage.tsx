import { useEffect, useState } from 'react';
import { getMyInfo } from '../../api/auth';
import { useLocalStorage } from '../hooks/useLocalStorage';

const MyPage = () => {
  const [user, setUser] = useState<any>(null);
  const { getAccessToken } = useLocalStorage();

  useEffect(() => {
    const fetchMyInfo = async () => {
      const token = getAccessToken(); // 1. 저장된 토큰 꺼내기
      
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      try {
        // 2. 토큰을 헤더에 담아 내 정보 요청
        const response = await getMyInfo(token);
        setUser(response.data.data); // 3. 받아온 데이터 상태에 저장
      } catch (error) {
        console.error("내 정보 불러오기 실패:", error);
      }
    };

    fetchMyInfo();
  }, []);

  if (!user) return <div className="text-white p-10">로딩 중...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold mb-6">마이페이지</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <p className="mb-2"><span className="text-gray-400">이름:</span> {user.name}</p>
        <p className="mb-2"><span className="text-gray-400">이메일:</span> {user.email}</p>
        {/* Swagger에 적힌 bio가 있다면 출력 */}
        {user.bio && <p className="mb-2"><span className="text-gray-400">소개:</span> {user.bio}</p>}
      </div>
    </div>
  );
};

export default MyPage;