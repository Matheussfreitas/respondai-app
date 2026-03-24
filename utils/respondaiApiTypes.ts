export type Difficulty = 'easy' | 'medium' | 'hard';

export type AuthErrorMessage =
  | 'Token não fornecido'
  | 'Formato de token inválido'
  | 'Token inválido ou expirado'
  | 'Token inválido: email não encontrado'
  | 'Token inválido: ID não encontrado';

export type CommonErrorMessage =
  | 'Erro ao ler JSON'
  | 'Erro ao fazer cadastro'
  | 'Erro ao fazer login'
  | 'Erro ao buscar quiz'
  | 'Erro ao criar quiz'
  | 'Erro ao enviar quiz'
  | 'Quota da Gemini está em 0 para este projeto/região. Ative billing/tier no AI Studio ou solicite aumento de quota.'
  | 'Limite da IA atingido (429). Tente novamente em instantes.'
  | 'Integração com IA não configurada no servidor.';

export interface ErrorResponse {
  message: CommonErrorMessage | AuthErrorMessage | string;
}

export type HealthResponse = 'ok';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: 'Usuário criado com sucesso' | string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUser {
  id: string;
  name: string;
  email: string;
  active: boolean;
  token?: string | null;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  message: 'Login realizado com sucesso' | string;
  user: LoginUser;
  token: string;
}

export type SwaggerUiResponse = string;

export type SwaggerDocResponse = Record<string, unknown>;

export interface ReferenceQuery {
  spec?: string;
}

export type ReferenceResponse = string;

export interface MeResponse {
  email: string;
  message: 'Dados do usuário autenticado' | string;
}

export interface Question {
  id: string;
  quiz_id: string;
  statement: string;
  answers: string[];
  correct_answer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  user_id: string;
  title: string;
  content: string;
  difficulty: Difficulty;
  number_questions: number;
  questions?: Question[];
  created_at: string;
}

export type QuizzesResponse = Quiz[];

export type QuizByIdResponse = Quiz | null;

export interface CreateQuizRequest {
  tema: string;
  numQuestoes: number;
  dificuldade: Difficulty;
}

export interface CreateQuizResponse {
  message: 'Quiz criado com sucesso' | string;
  quiz: string;
}

export interface SubmitQuizAnswerRequest {
  question_id: string;
  user_choice: number;
}

export interface SubmitQuizRequest {
  quiz_id: string;
  user_id: string;
  answers: SubmitQuizAnswerRequest[];
}

export interface ResultQuizAnswer {
  question_id: string;
  user_choice: number;
  is_correct: boolean;
}

export interface ResultQuiz {
  id: string;
  quiz_id: string;
  user_id: string;
  score: number;
  total_questions: number;
  answers: ResultQuizAnswer[];
  completed_at: string;
}

export interface SubmitQuizResponse {
  message: 'Quiz enviado com sucesso' | string;
  quiz: ResultQuiz | null;
}
