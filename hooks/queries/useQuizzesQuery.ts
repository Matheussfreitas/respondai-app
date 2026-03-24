import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { respondaiQueryKeys } from '@/hooks/queryKeys';
import { RespondaiApi } from '@/utils/respondaiApi';

import type { QuizzesResponse } from '@/utils/respondaiApiTypes';

type QueryHookOptions<TData> = Omit<
  UseQueryOptions<TData, Error>,
  'queryKey' | 'queryFn'
>;

export function useQuizzesQuery(options?: QueryHookOptions<QuizzesResponse>) {
  return useQuery<QuizzesResponse, Error>({
    queryKey: respondaiQueryKeys.quizzes(),
    queryFn: () => RespondaiApi.quizzes(),
    ...options,
  });
}
