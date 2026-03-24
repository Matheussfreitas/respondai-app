import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { respondaiQueryKeys } from '@/hooks/queryKeys';
import { RespondaiApi } from '@/utils/respondaiApi';

import type {
  ReferenceQuery,
  ReferenceResponse,
} from '@/utils/respondaiApiTypes';

type QueryHookOptions<TData> = Omit<
  UseQueryOptions<TData, Error>,
  'queryKey' | 'queryFn'
>;

export function useReferenceQuery(
  params?: ReferenceQuery,
  options?: QueryHookOptions<ReferenceResponse> & {
    withTrailingSlash?: boolean;
  },
) {
  const { withTrailingSlash, ...queryOptions } = options || {};

  return useQuery<ReferenceResponse, Error>({
    queryKey: respondaiQueryKeys.reference(params, Boolean(withTrailingSlash)),
    queryFn: () =>
      withTrailingSlash
        ? RespondaiApi.referenceWithSlash(params)
        : RespondaiApi.reference(params),
    ...queryOptions,
  });
}
