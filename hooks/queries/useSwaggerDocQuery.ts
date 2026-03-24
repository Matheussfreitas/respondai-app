import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { respondaiQueryKeys } from '@/hooks/queryKeys';
import { RespondaiApi } from '@/utils/respondaiApi';

import type { SwaggerDocResponse } from '@/utils/respondaiApiTypes';

type QueryHookOptions<TData> = Omit<
  UseQueryOptions<TData, Error>,
  'queryKey' | 'queryFn'
>;

export function useSwaggerDocQuery(
  options?: QueryHookOptions<SwaggerDocResponse>,
) {
  return useQuery<SwaggerDocResponse, Error>({
    queryKey: respondaiQueryKeys.swaggerDoc(),
    queryFn: () => RespondaiApi.swaggerDoc(),
    ...options,
  });
}
