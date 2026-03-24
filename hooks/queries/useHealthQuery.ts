import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { respondaiQueryKeys } from '@/hooks/queryKeys';
import { RespondaiApi } from '@/utils/respondaiApi';

import type { HealthResponse } from '@/utils/respondaiApiTypes';

type QueryHookOptions<TData> = Omit<
  UseQueryOptions<TData, Error>,
  'queryKey' | 'queryFn'
>;

export function useHealthQuery(options?: QueryHookOptions<HealthResponse>) {
  return useQuery<HealthResponse, Error>({
    queryKey: respondaiQueryKeys.health(),
    queryFn: () => RespondaiApi.health(),
    ...options,
  });
}
