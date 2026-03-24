import { useMutation, useQueryClient } from '@tanstack/react-query';

import { respondaiQueryKeys } from '@/hooks/queryKeys';
import { RespondaiApi } from '@/utils/respondaiApi';

import type {
  CreateQuizRequest,
  CreateQuizResponse,
} from '@/utils/respondaiApiTypes';

export function useCreateQuizMutation() {
  const queryClient = useQueryClient();

  return useMutation<CreateQuizResponse, Error, CreateQuizRequest>({
    mutationFn: (payload) => RespondaiApi.createQuiz(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: respondaiQueryKeys.quizzes(),
      });
    },
  });
}
