import { useHandleLogin } from '@/hooks/queries/useHandleLogin';
import { createContext, useContext, useState } from 'react';
import * as Keychain from 'react-native-keychain';

export type User = {
  userId: string;
  email: string;
  isAdmin: boolean;
  companyId?: string;
  token: string;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  handleLogin: (username: string, password: string) => Promise<User | null>;
  handleRegister: (username: string, password: string) => Promise<User | null>;
  handleLogout: () => void | Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderProps = {
  children: React.ReactNode;
  initialUser?: User | null;
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
  initialUser = null,
}: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useHandleLogin();

  async function handleLogin(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const user = await loginMutation.mutateAsync({ email, password });
      setUser(user);
      await Keychain.setGenericPassword('userToken', user.token); 
      return user;
    } catch (error: any) {
      setError(
        error?.message ||
          'Login failed. Please check your credentials and try again.',
      );
      return null;
    } finally {
      setLoading(false);
    }
  }

  const handleRegister = (username: string, password: string) => {
    // Lógica de registro aqui
    setUser({ username } as any);
    return Promise.resolve({ username } as any);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
