import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { respondaiQueryKeys } from '@/hooks/queryKeys';
import { RespondaiApi } from '@/utils/respondaiApi';

import type { QuizByIdResponse } from '@/utils/respondaiApiTypes';

type QueryHookOptions<TData> = Omit<
  UseQueryOptions<TData, Error>,
  'queryKey' | 'queryFn'
>;

export function useQuizByIdQuery(
  id: string | undefined | null,
  options?: QueryHookOptions<QuizByIdResponse>,
) {
  return useQuery<QuizByIdResponse, Error>({
    queryKey: respondaiQueryKeys.quizById(id || ''),
    queryFn: () => RespondaiApi.quizById(id as string),
    enabled: Boolean(id) && options?.enabled !== false,
    ...options,
  });
}
