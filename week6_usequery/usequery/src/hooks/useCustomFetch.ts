// src/hooks/useCustomFetch.ts
import { useEffect, useState } from 'react';

// 데이터가 '신선하다'고 판단할 시간 (예: 1분)
const STALE_TIME = 60 * 1000; 

export const useCustomFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const currentTime = new Date().getTime();
      const cachedData = localStorage.getItem(url);

      // 1. 캐시된 데이터가 있는지 확인
      if (cachedData) {
        const { data: parsedData, timestamp } = JSON.parse(cachedData);

        // 2. 데이터가 아직 신선한지 확인
        if (currentTime - timestamp < STALE_TIME) {
          console.log("캐시된 데이터를 사용합니다: ", url);
          setData(parsedData);
          return; // 서버에 요청 안 하고 여기서 끝
        }
      }

      // 3. 캐시가 없거나 오래됐으면 서버에 요청
      console.log("서버에서 새로 데이터를 가져옵니다: ", url);
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network error');
        const result = await response.json();

        // 4. 받아온 데이터를 캐시에 저장 
        const cacheEntry = {
          data: result,
          timestamp: new Date().getTime(),
        };
        localStorage.setItem(url, JSON.stringify(cacheEntry));

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};