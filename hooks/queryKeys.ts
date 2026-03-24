import type { ReferenceQuery } from '@/utils/respondaiApiTypes';

export const respondaiQueryKeys = {
  all: ['respondai'] as const,
  health: () => [...respondaiQueryKeys.all, 'health'] as const,
  swaggerDoc: () => [...respondaiQueryKeys.all, 'swagger-doc'] as const,
  reference: (params?: ReferenceQuery, withTrailingSlash?: boolean) =>
    [
      ...respondaiQueryKeys.all,
      'reference',
      params ?? {},
      Boolean(withTrailingSlash),
    ] as const,
  me: () => [...respondaiQueryKeys.all, 'me'] as const,
  quizzes: () => [...respondaiQueryKeys.all, 'quizzes'] as const,
  quizById: (id: string) => [...respondaiQueryKeys.all, 'quiz', id] as const,
};
