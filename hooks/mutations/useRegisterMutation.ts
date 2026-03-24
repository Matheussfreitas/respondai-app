import { useMutation, useQueryClient } from '@tanstack/react-query';

import { respondaiQueryKeys } from '@/hooks/queryKeys';
import { RespondaiApi } from '@/utils/respondaiApi';

import type {
  RegisterRequest,
  RegisterResponse,
} from '@/utils/respondaiApiTypes';

export function useRegisterMutation() {
  const queryClient = useQueryClient();

  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: (payload) => RespondaiApi.register(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: respondaiQueryKeys.me(),
      });
    },
  });
}
