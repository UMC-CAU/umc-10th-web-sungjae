import { useQuery } from '@tanstack/react-query';
import client from '../api/client'; // 

const fetchLPs = async (order: 'asc' | 'desc') => {
  const { data } = await client.get(`/lps?order=${order}`);
  return data.data.data; 
};


export const useLPs = (sortOrder: 'asc' | 'desc') => {
  return useQuery({
    queryKey: ['lps', sortOrder], 
    queryFn: () => fetchLPs(sortOrder),
    staleTime: 1000 * 60 * 5, 
  });
};


export const useLPDetail = (lpId: string) => {
  return useQuery({
    queryKey: ['lp', lpId],
    queryFn: async () => {
      const { data } = await client.get(`/lps/${lpId}`);
      return data.data;
    },
    enabled: !!lpId, 
  });
};