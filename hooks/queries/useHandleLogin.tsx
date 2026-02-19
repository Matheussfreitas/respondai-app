export const useHandleLogin = () => {
  return {
    login: (username: string, password: string) => {
      // Simula o login
      console.log('Logging in with:', username, password);
    },
  };
};