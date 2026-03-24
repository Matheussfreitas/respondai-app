import { useQueryClient } from '@tanstack/react-query';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { useLoginMutation } from '@/hooks/mutations/useLoginMutation';
import { useRegisterMutation } from '@/hooks/mutations/useRegisterMutation';
import { useMeQuery } from '@/hooks/queries/useMeQuery';
import { clearToken, getToken } from '@/utils/getToken';
import type { LoginUser, RegisterResponse } from '@/utils/respondaiApiTypes';

export type AuthUser = Partial<LoginUser> & {
  email: string;
};

export type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  setAuthSession: (nextUser: AuthUser, nextToken: string) => void;
  handleLogin: (email: string, password: string) => Promise<AuthUser | null>;
  handleRegister: (
    name: string,
    email: string,
    password: string,
  ) => Promise<RegisterResponse | null>;
  handleLogout: () => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderProps = {
  children: ReactNode;
};

const authErrorMessages = [
  'Token não fornecido',
  'Formato de token inválido',
  'Token inválido ou expirado',
  'Token inválido: email não encontrado',
  'Token inválido: ID não encontrado',
];

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [bootstrapping, setBootstrapping] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  useEffect(() => {
    let active = true;

    async function loadSession() {
      const storedToken = await getToken();

      if (!active) {
        return;
      }

      setToken(storedToken);
      setBootstrapping(false);
    }

    loadSession();

    return () => {
      active = false;
    };
  }, []);

  const meQuery = useMeQuery({
    enabled: Boolean(token),
    retry: false,
  });

  useEffect(() => {
    if (meQuery.data?.email) {
      setUser((previous) => ({
        ...(previous || {}),
        email: meQuery.data.email,
      }));
    }
  }, [meQuery.data?.email]);

  useEffect(() => {
    if (!token || !meQuery.error) {
      return;
    }

    const message = meQuery.error.message;
    const shouldLogout = authErrorMessages.some((item) =>
      message.includes(item),
    );

    if (!shouldLogout) {
      return;
    }

    async function resetSession() {
      await clearToken();
      setToken(null);
      setUser(null);
      setError('Sessão expirada. Faça login novamente.');
      queryClient.clear();
    }

    resetSession();
  }, [token, meQuery.error, queryClient]);

  async function handleLogin(email: string, password: string) {
    setError(null);

    try {
      const response = await loginMutation.mutateAsync({ email, password });
      setUser(response.user);
      setToken(response.token);
      return response.user;
    } catch (loginError) {
      const message =
        loginError instanceof Error
          ? loginError.message
          : 'Login falhou. Verifique as credenciais e tente novamente.';
      setError(message);
      return null;
    }
  }

  async function handleRegister(name: string, email: string, password: string) {
    setError(null);

    try {
      const response = await registerMutation.mutateAsync({
        name,
        email,
        password,
      });

      return response;
    } catch (registerError) {
      const message =
        registerError instanceof Error
          ? registerError.message
          : 'Não foi possível criar sua conta agora.';
      setError(message);
      return null;
    }
  }

  async function handleLogout() {
    await clearToken();
    setToken(null);
    setUser(null);
    setError(null);
    queryClient.clear();
  }

  function setAuthSession(nextUser: AuthUser, nextToken: string) {
    setUser(nextUser);
    setToken(nextToken);
    setError(null);
  }

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      loading:
        bootstrapping ||
        loginMutation.isPending ||
        registerMutation.isPending ||
        meQuery.isFetching,
      error,
      setAuthSession,
      handleLogin,
      handleRegister,
      handleLogout,
    }),
    [
      user,
      token,
      bootstrapping,
      loginMutation.isPending,
      registerMutation.isPending,
      meQuery.isFetching,
      error,
      setAuthSession,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
