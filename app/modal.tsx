import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useMemo, useState } from 'react';

import { Text, View } from '@/components/Themed';
import { useAuth } from '@/context/authContext';
import { useSubmitQuizMutation } from '@/hooks/mutations/useSubmitQuizMutation';
import { useHealthQuery } from '@/hooks/queries/useHealthQuery';
import { useQuizByIdQuery } from '@/hooks/queries/useQuizByIdQuery';
import { useQuizzesQuery } from '@/hooks/queries/useQuizzesQuery';
import { useReferenceQuery } from '@/hooks/queries/useReferenceQuery';
import { useSwaggerDocQuery } from '@/hooks/queries/useSwaggerDocQuery';

export default function ModalScreen() {
  const { user } = useAuth();
  const [specInput, setSpecInput] = useState('http://localhost/swagger/doc.json');
  const [appliedSpec, setAppliedSpec] = useState('http://localhost/swagger/doc.json');
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);

  const healthQuery = useHealthQuery({ retry: false });
  const swaggerDocQuery = useSwaggerDocQuery({ retry: false });
  const referenceQuery = useReferenceQuery(
    appliedSpec ? { spec: appliedSpec } : undefined,
    { retry: false },
  );

  const quizzesQuery = useQuizzesQuery({ retry: false });
  const firstQuizId = quizzesQuery.data?.[0]?.id;

  const quizByIdQuery = useQuizByIdQuery(firstQuizId, {
    enabled: Boolean(firstQuizId),
    retry: false,
  });

  const submitQuizMutation = useSubmitQuizMutation();

  const swaggerDocKeysCount = useMemo(() => {
    if (!swaggerDocQuery.data) {
      return 0;
    }

    return Object.keys(swaggerDocQuery.data).length;
  }, [swaggerDocQuery.data]);

  async function handleSubmitFirstQuestion() {
    setSubmitFeedback(null);

    if (!user?.id) {
      setSubmitFeedback('Faça login para testar o envio do quiz.');
      return;
    }

    const quiz = quizByIdQuery.data;
    const firstQuestion = quiz?.questions?.[0];

    if (!quiz || !firstQuestion) {
      setSubmitFeedback('Primeiro quiz sem perguntas para envio de teste.');
      return;
    }

    try {
      const response = await submitQuizMutation.mutateAsync({
        quiz_id: quiz.id,
        user_id: user.id,
        answers: [
          {
            question_id: firstQuestion.id,
            user_choice: 0,
          },
        ],
      });

      setSubmitFeedback(
        response.quiz
          ? `${response.message} Score: ${response.quiz.score}/${response.quiz.total_questions}`
          : `${response.message} (sem resultado detalhado)`,
      );
    } catch (error) {
      setSubmitFeedback(error instanceof Error ? error.message : 'Erro ao enviar quiz.');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>API Playground</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Health</Text>
        <Text>status: {healthQuery.data || '-'}</Text>
        {healthQuery.error ? <Text>erro: {healthQuery.error.message}</Text> : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Swagger Doc</Text>
        <Text>chaves no JSON: {swaggerDocKeysCount}</Text>
        {swaggerDocQuery.error ? <Text>erro: {swaggerDocQuery.error.message}</Text> : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Reference</Text>
        <TextInput
          value={specInput}
          onChangeText={setSpecInput}
          placeholder="URL do spec"
          autoCapitalize="none"
          style={styles.input}
        />
        <Pressable style={styles.button} onPress={() => setAppliedSpec(specInput.trim())}>
          <Text style={styles.buttonText}>Aplicar spec</Text>
        </Pressable>
        <Text>html size: {referenceQuery.data?.length || 0}</Text>
        {referenceQuery.error ? <Text>erro: {referenceQuery.error.message}</Text> : null}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Quiz by Id + Submit</Text>
        <Text>total quizzes: {quizzesQuery.data?.length || 0}</Text>
        <Text>primeiro quiz id: {firstQuizId || '-'}</Text>
        <Text>perguntas no quiz selecionado: {quizByIdQuery.data?.questions?.length || 0}</Text>
        {quizByIdQuery.error ? <Text>erro quizById: {quizByIdQuery.error.message}</Text> : null}

        <Pressable
          style={styles.button}
          onPress={handleSubmitFirstQuestion}
          disabled={submitQuizMutation.isPending}
        >
          <Text style={styles.buttonText}>
            {submitQuizMutation.isPending ? 'Enviando...' : 'Enviar 1a resposta'}
          </Text>
        </Pressable>

        {submitFeedback ? <Text>{submitFeedback}</Text> : null}
      </View>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 12,
    gap: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  button: {
    marginTop: 4,
    backgroundColor: '#7C3AED',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
