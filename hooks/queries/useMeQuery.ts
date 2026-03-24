import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { respondaiQueryKeys } from '@/hooks/queryKeys';
import { RespondaiApi } from '@/utils/respondaiApi';

import type { MeResponse } from '@/utils/respondaiApiTypes';

type QueryHookOptions<TData> = Omit<
  UseQueryOptions<TData, Error>,
  'queryKey' | 'queryFn'
>;

export function useMeQuery(options?: QueryHookOptions<MeResponse>) {
  return useQuery<MeResponse, Error>({
    queryKey: respondaiQueryKeys.me(),
    queryFn: () => RespondaiApi.me(),
    ...options,
  });
}
