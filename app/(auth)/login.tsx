import GrainyGradient from '@/components/ui/organisms/grainy-gradient';
import { useAuth } from '@/context/authContext';
import { useLoginMutation } from '@/hooks/mutations/useLoginMutation';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const oAuthProviders = [
  {
    name: 'Google',
    icon: <AntDesign name="google" size={20} color="#7C3AED" />,
    onPress: () => {
      console.log('Login with Google');
    },
  },
  {
    name: 'Github',
    icon: <AntDesign name="github" size={20} color="#7C3AED" />,
    onPress: () => {
      console.log('Login with Github');
    },
  },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAuthSession } = useAuth();
  const loginMutation = useLoginMutation();
  const router = useRouter();

  async function onSubmit() {
    try {
      const response = await loginMutation.mutateAsync({ email, password });
      setAuthSession(response.user, response.token);
      router.replace('/(tabs)');
    } catch {
      // A mensagem de erro já é exibida por loginMutation.error.
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <GrainyGradient
        style={StyleSheet.absoluteFillObject}
        colors={['#e9e8e5', '#2563EB', '#7C3AED', '#D1A5F0']}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, alignItems: 'center', gap: 10, marginTop: 50 }}>
            <Text
              style={{
                fontSize: 50,
                color: '#fff',
                fontFamily: 'Sansation-Bold',
              }}
            >
              RespondAI
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: '#fff',
                fontFamily: 'Sansation-Bold',
              }}
            >
              Access your account!
            </Text>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#7C3AED"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#7C3AED"
              secureTextEntry
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
            />

            {loginMutation.error ? (
              <Text style={styles.errorText}>{loginMutation.error.message}</Text>
            ) : null}

            <TouchableOpacity
              onPress={onSubmit}
              style={styles.button}
              disabled={loginMutation.isPending}
            >
              <Text
                style={{
                  color: '#7C3AED',
                  fontSize: 16,
                  fontWeight: '600',
                  fontFamily: 'Sansation-Bold',
                }}
              >
                {loginMutation.isPending ? 'LOGANDO...' : 'LOGIN'}
              </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={styles.text}>Or login with</Text>
            </View>
            <View style={styles.oAuthContainer}>
              {oAuthProviders.map((provider) => (
                <TouchableOpacity
                  key={provider.name}
                  onPress={provider.onPress}
                  style={styles.buttonOAuth}
                >
                  {provider.icon}
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={styles.text}>
                Don't have an account?{' '}
                <Text
                  onPress={() => {
                    router.push('/(auth)/register');
                  }}
                  style={{ fontWeight: '700', textDecorationLine: 'underline' }}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 25,
  },
  formContainer: {
    padding: 20,
    borderRadius: 10,
    gap: 15,
  },
  input: {
    borderRadius: 10,
    padding: 14,
    fontFamily: 'Sansation-Regular',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    color: '#7C3AED',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 5,
    opacity: 1,
  },
  oAuthContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  buttonOAuth: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Sansation-Regular',
    justifyContent: 'center',
    marginTop: 10,
  },
  errorText: {
    color: '#FEE2E2',
    fontFamily: 'Sansation-Bold',
    fontSize: 13,
    textAlign: 'center',
  },
});
