import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

import { useLoginMutation } from '@/hooks/mutations/useLoginMutation';
import { useMeQuery } from '@/hooks/queries/useMeQuery';

export function AuthAndProtectedExample() {
  const [email, setEmail] = useState('matheus@example.com');
  const [password, setPassword] = useState('123456');

  const loginMutation = useLoginMutation();
  const meQuery = useMeQuery({
    enabled: loginMutation.isSuccess,
    retry: false,
  });

  return (
    <View style={{ gap: 8, padding: 16 }}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="email"
        autoCapitalize="none"
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 }}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="password"
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 }}
      />

      <Button
        title={loginMutation.isPending ? 'Entrando...' : 'Entrar'}
        onPress={() => loginMutation.mutate({ email, password })}
      />

      {loginMutation.error ? <Text>{loginMutation.error.message}</Text> : null}
      {meQuery.data ? <Text>Email autenticado: {meQuery.data.email}</Text> : null}
    </View>
  );
}
