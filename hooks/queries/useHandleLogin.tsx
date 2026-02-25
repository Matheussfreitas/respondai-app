import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface LoginPayload {
  email: string;
  password: string;
}

async function handleLogin({ email, password }: LoginPayload) {
  try {
    const response = await axios.post('https://api.example.com/api/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}

export function useHandleLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth'] });
    },
  });
}
