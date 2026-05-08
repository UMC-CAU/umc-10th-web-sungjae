import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import client from '../api/client';

export const useLPs = (sortOrder: 'asc' | 'desc') => {
  return useQuery({
    queryKey: ['lps', sortOrder],
    queryFn: async () => {
      const { data } = await client.get(`/lps?order=${sortOrder}`);
      return data.data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useInfiniteLPs = (sortOrder: 'asc' | 'desc') => {
  return useInfiniteQuery({
    queryKey: ['lps', 'infinite', sortOrder],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await client.get(`/lps`, {
        params: { order: sortOrder, cursor: pageParam },
      });
      return data.data;
    },
    getNextPageParam: (lastPage) => lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
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

export const useInfiniteComments = (lpId: string, order: 'asc' | 'desc') => {
  return useInfiniteQuery({
    queryKey: ['lpComments', lpId, order],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = await client.get(`/lps/${lpId}/comments`, {
        params: { order, cursor: pageParam },
      });
      return data.data;
    },
    getNextPageParam: (lastPage) => lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: 0,
    enabled: !!lpId,
    retry: false, // 401 에러 시 무한 재시도 방지
  });
};