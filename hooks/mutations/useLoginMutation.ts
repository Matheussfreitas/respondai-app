import { useMutation, useQueryClient } from '@tanstack/react-query';

import { respondaiQueryKeys } from '@/hooks/queryKeys';
import { RespondaiApi } from '@/utils/respondaiApi';
import { saveToken } from '@/utils/getToken';

import type { LoginRequest, LoginResponse } from '@/utils/respondaiApiTypes';

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (payload) => RespondaiApi.login(payload),
    onSuccess: async (response) => {
      if (response.token) {
        await saveToken(response.token);
      }

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: respondaiQueryKeys.me() }),
        queryClient.invalidateQueries({
          queryKey: respondaiQueryKeys.quizzes(),
        }),
      ]);
    },
  });
}
