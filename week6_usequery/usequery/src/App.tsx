// src/App.tsx
import { useQuery } from '@tanstack/react-query';

function App() {
  // 수십 줄의 커스텀 훅 로직이 이 한 줄로 대체
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user', 1], // 캐시를 식별할 고유 키
    queryFn: async () => { // 데이터를 가져오는 함수
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      if (!response.ok) throw new Error('Network error');
      return response.json();
    },
    staleTime: 60 * 1000, // 1분 동안 데이터를 신선하다고 간주 (캐싱)
  });

  if (isLoading) return <div style={{backgroundColor:'#1a1a1a', color:'white', minHeight:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}><h2>로딩 중... (TanStack Query 사용)</h2></div>;
  if (isError) return <div style={{backgroundColor:'#1a1a1a', color:'red', minHeight:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}><h2>에러: {(error as Error).message}</h2></div>;

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh', padding: '50px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '40px' }}>Tanstack Query</h1>
      <div style={{ wordBreak: 'break-all', maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem' }}>
        {data && JSON.stringify(data)}
      </div>
    </div>
  );
}

export default App;