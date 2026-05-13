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
    retry: false,
  });
};



// 1. 댓글 작성 Mutation 
export const useAddComment = (lpId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const { data } = await client.post(`/lps/${lpId}/comments`, { content });
      return data;
    },
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ['lpComments', lpId] });
    },
  });
};

// 2. 댓글 삭제 Mutation 훅
export const useDeleteComment = (lpId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: number) => {
      const { data } = await client.delete(`/lps/${lpId}/comments/${commentId}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lpComments', lpId] });
    },
  });
};

// 1. 이미지 업로드 Mutation
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

// 2. LP 생성 Mutation
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



export const useUpdateLP = (lpId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updateData: { title: string; content: string; tags: string[] }) => {
      const { data } = await client.patch(`/lps/${lpId}`, updateData);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lp', lpId] });
      queryClient.invalidateQueries({ queryKey: ['lps'] });
    },
  });
};

// 2. LP 삭제 Mutation
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

// 3. 좋아요 Mutation (Optimistic Update 적용)
export const useLikeLP = (lpId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (isLiked: boolean) => {
      if (isLiked) {
        return await client.delete(`/lps/${lpId}/likes`); // 좋아요 취소
      } else {
        return await client.post(`/lps/${lpId}/likes`); // 좋아요 추가
      }
    },
 
    onMutate: async (isLiked) => {
      await queryClient.cancelQueries({ queryKey: ['lp', lpId] }); 

      const previousLP = queryClient.getQueryData(['lp', lpId]); 

    
      queryClient.setQueryData(['lp', lpId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          likes: isLiked ? old.likes - 1 : old.likes + 1, 
          isLiked: !isLiked, 
        };
      });

      return { previousLP };
    },
    // 실패 시 롤백
      onError: (_err, _variables, context) => {
    if (context?.previousLP) {
      queryClient.setQueryData(['lp', lpId], context.previousLP);
    }
    alert('좋아요 처리에 실패했습니다.');
  },
   
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['lp', lpId] });
    },
  });
};

// 1. 내 정보 조회
export const useMyInfo = () => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: async () => {
      const { data } = await client.get('/users/me');
      return data.data;
    },
  });
};

// 닉네임(내 정보) 수정 Mutation - 낙관적 업데이트 적용
export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateData: { name: string; bio?: string; profileImage?: string }) => {
      const { data } = await client.patch('/users', updateData);
      return data.data;
    },
    // 서버 응답 전 UI를 즉시 업데이트
    onMutate: async (newInfo) => {
      // 1. 관련 쿼리 취소 
      await queryClient.cancelQueries({ queryKey: ['myInfo'] });

      // 2. 이전 데이터 스냅샷 저장 (롤백용)
      const previousUserInfo = queryClient.getQueryData(['myInfo']);

      // 3. 캐시 데이터를 새 정보로 즉시 변경
      queryClient.setQueryData(['myInfo'], (old: any) => ({
        ...old,
        ...newInfo,
      }));

      // 4. 
      const prevName = localStorage.getItem('userName');
      localStorage.setItem('userName', newInfo.name);

      return { previousUserInfo, prevName };
    },
    // 실패 시 롤백 로직
    onError: (err, newInfo, context) => {
      if (context?.previousUserInfo) {
        queryClient.setQueryData(['myInfo'], context.previousUserInfo);
      }
      if (context?.prevName) {
        localStorage.setItem('userName', context.prevName);
      }
      alert('정보 수정에 실패하여 이전 상태로 복구합니다.');
    },
    // 성공 혹은 실패 후 서버 데이터와 최종 동기화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
  });
};