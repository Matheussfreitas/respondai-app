import { api } from '@/utils/axios';

import {
  CreateQuizRequest,
  CreateQuizResponse,
  HealthResponse,
  LoginRequest,
  LoginResponse,
  MeResponse,
  QuizByIdResponse,
  QuizzesResponse,
  ReferenceQuery,
  ReferenceResponse,
  RegisterRequest,
  RegisterResponse,
  SubmitQuizRequest,
  SubmitQuizResponse,
  SwaggerDocResponse,
  SwaggerUiResponse,
} from '@/utils/respondaiApiTypes';

class RespondaiApiClient {
  async health(): Promise<HealthResponse> {
    const { data } = await api.get<HealthResponse>('/health', {
      responseType: 'text',
    });

    return data;
  }

  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    const { data } = await api.post<RegisterResponse>('/register', payload);
    return data;
  }

  async login(payload: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/login', payload);
    return data;
  }

  async swaggerUi(): Promise<SwaggerUiResponse> {
    const { data } = await api.get<SwaggerUiResponse>('/swagger/', {
      responseType: 'text',
    });

    return data;
  }

  async swaggerDoc(): Promise<SwaggerDocResponse> {
    const { data } = await api.get<SwaggerDocResponse>('/swagger/doc.json');
    return data;
  }

  async reference(params?: ReferenceQuery): Promise<ReferenceResponse> {
    const { data } = await api.get<ReferenceResponse>('/reference', {
      params,
      responseType: 'text',
    });

    return data;
  }

  async referenceWithSlash(
    params?: ReferenceQuery,
  ): Promise<ReferenceResponse> {
    const { data } = await api.get<ReferenceResponse>('/reference/', {
      params,
      responseType: 'text',
    });

    return data;
  }

  async me(): Promise<MeResponse> {
    const { data } = await api.get<MeResponse>('/me');
    return data;
  }

  async quizzes(): Promise<QuizzesResponse> {
    const { data } = await api.get<QuizzesResponse>('/quizzes');
    return data;
  }

  async quizById(id: string): Promise<QuizByIdResponse> {
    const { data } = await api.get<QuizByIdResponse>(`/quizzes/${id}`);
    return data;
  }

  async createQuiz(payload: CreateQuizRequest): Promise<CreateQuizResponse> {
    const { data } = await api.post<CreateQuizResponse>(
      '/quizzes/create',
      payload,
    );
    return data;
  }

  async submitQuiz(payload: SubmitQuizRequest): Promise<SubmitQuizResponse> {
    const { data } = await api.post<SubmitQuizResponse>(
      '/quizzes/submit',
      payload,
    );
    return data;
  }
}

export const RespondaiApi = new RespondaiApiClient();
