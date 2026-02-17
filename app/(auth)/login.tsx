import GrainyGradient from '@/components/ui/organisms/grainy-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
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
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();

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
              Acess your account!
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
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#7C3AED"
              secureTextEntry
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={() => {
                console.log('Login');
                router.push('/(tabs)/index');
              }}
              style={styles.button}
            >
              <Text
                style={{
                  color: '#7C3AED',
                  fontSize: 16,
                  fontWeight: '600',
                  fontFamily: 'Sansation-Bold',
                }}
              >
                LOGIN
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
});
