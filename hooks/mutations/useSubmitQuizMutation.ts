import { useMutation, useQueryClient } from '@tanstack/react-query';

import { respondaiQueryKeys } from '@/hooks/queryKeys';
import { RespondaiApi } from '@/utils/respondaiApi';

import type {
  SubmitQuizRequest,
  SubmitQuizResponse,
} from '@/utils/respondaiApiTypes';

export function useSubmitQuizMutation() {
  const queryClient = useQueryClient();

  return useMutation<SubmitQuizResponse, Error, SubmitQuizRequest>({
    mutationFn: (payload) => RespondaiApi.submitQuiz(payload),
    onSuccess: async (_response, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: respondaiQueryKeys.quizzes(),
        }),
        queryClient.invalidateQueries({
          queryKey: respondaiQueryKeys.quizById(variables.quiz_id),
        }),
      ]);
    },
  });
}
