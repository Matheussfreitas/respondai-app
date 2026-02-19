import { createContext, useContext, useState } from 'react';

export type AuthContextType = {
  user: null;
  handleLogin: (username: string, password: string) => void;
  handleRegister: (username: string, password: string) => void;
  handleLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (username: string, password: string) => {
    // Lógica de login aqui
    setUser({ username } as any);
    setToken('fake-jwt-token');
  };

  const handleRegister = (username: string, password: string) => {
    // Lógica de registro aqui
    setUser({ username } as any);
    setToken('fake-jwt-token');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleRegister, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
