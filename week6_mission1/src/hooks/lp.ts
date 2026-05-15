import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  });
};

export const useAddComment = (lpId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (content: string) => {
      await client.post(`/lps/${lpId}/comments`, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpComments', lpId] });
    },
  });
};

export const useDeleteComment = (lpId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (commentId: number) => {
      await client.delete(`/lps/${lpId}/comments/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpComments', lpId] });
    },
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await client.post('/uploads', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data.data.imageUrl; 
    },
  });
};

export const useCreateLP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newLP: { title: string; content: string; thumbnail: string; tags: string[]; published: boolean }) => {
      const { data } = await client.post('/lps', newLP);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lps'] });
    },
  });
};

// ✅ [Swagger 반영] PATCH 요청 시 데이터 규격 엄격 적용
export const useUpdateLP = (lpId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updateData: { 
      title: string; 
      content: string; 
      thumbnail: string; 
      tags: string[]; 
      published: boolean 
    }) => {
      // 보낼 때 tags가 string[] 인지 최종 확인
      const { data } = await client.patch(`/lps/${lpId}`, updateData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lp', lpId] });
      queryClient.invalidateQueries({ queryKey: ['lps'] });
    },
  });
};

export const useDeleteLP = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (lpId: string) => {
      await client.delete(`/lps/${lpId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lps'] });
    },
  });
};

export const useLikeLP = (lpId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (isLiked: boolean) => {
      if (isLiked) return await client.delete(`/lps/${lpId}/likes`);
      return await client.post(`/lps/${lpId}/likes`);
    },
    onMutate: async (isLiked) => {
      await queryClient.cancelQueries({ queryKey: ['lp', lpId] });
      const previousLP = queryClient.getQueryData(['lp', lpId]);
      queryClient.setQueryData(['lp', lpId], (old: any) => {
        if (!old) return old;
        const currentCount = Array.isArray(old.likes) ? old.likes.length : (Number(old.likes) || 0);
        return {
          ...old,
          likes: isLiked ? currentCount - 1 : currentCount + 1,
          isLiked: !isLiked,
        };
      });
      return { previousLP };
    },
    onError: (_err, _isLiked, context) => {
      if (context?.previousLP) queryClient.setQueryData(['lp', lpId], context.previousLP);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['lp', lpId] });
    },
  });
};

export const useMyInfo = () => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: async () => {
      const { data } = await client.get('/users/me');
      return data.data;
    },
  });
};

export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updateData: { name: string; bio?: string; profileImage?: string }) => {
      const { data } = await client.patch('/users', updateData);
      return data.data;
    },
    onMutate: async (newInfo) => {
      await queryClient.cancelQueries({ queryKey: ['myInfo'] });
      const previousUserInfo = queryClient.getQueryData(['myInfo']);
      queryClient.setQueryData(['myInfo'], (old: any) => ({ ...old, ...newInfo }));
      localStorage.setItem('userName', newInfo.name);
      return { previousUserInfo };
    },
    onError: (_err, _newInfo, context) => {
      if (context?.previousUserInfo) queryClient.setQueryData(['myInfo'], context.previousUserInfo);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
  });
};