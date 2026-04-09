import { useEffect, useState } from 'react';
import api from '../../api/axios';

// 어떤 타입의 데이터든 처리할 수 있도록 제네릭(<T>) 사용
const useCustomFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await api.get<T>(url);
        setData(response.data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]); // URL이 바뀌면 자동으로 재호출

  return { data, isLoading, isError };
};

export default useCustomFetch;