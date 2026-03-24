import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, StyleSheet, Text } from 'react-native';

import { View } from '@/components/Themed';
import QuizCard from '@/components/tabs-screen/quizCard';
import { useQuizzesQuery } from '@/hooks/queries/useQuizzesQuery';

const fallbackQuizzes = [
  {
    id: 'fallback-1',
    title: 'React Native Essentials',
    content: 'Teste seus conhecimentos sobre os fundamentos do React Native.',
    difficulty: 'easy' as const,
    number_questions: 10,
  },
  {
    id: 'fallback-2',
    title: 'JavaScript Avançado',
    content: 'Domine os conceitos avançados de JavaScript e TypeScript.',
    difficulty: 'hard' as const,
    number_questions: 15,
  },
  {
    id: 'fallback-3',
    title: 'Expo Router Basics',
    content: 'Aprenda a navegar entre telas usando Expo Router.',
    difficulty: 'medium' as const,
    number_questions: 8,
  },
  {
    id: 'fallback-4',
    title: 'Style Essentials',
    content: 'Teste seus conhecimentos sobre os fundamentos do React Native.',
    difficulty: 'easy' as const,
    number_questions: 10,
  },
];

function difficultyLabel(level: 'easy' | 'medium' | 'hard') {
  if (level === 'easy') return 'Básico';
  if (level === 'medium') return 'Médio';
  return 'Avançado';
}

export default function QuizzesScreen() {
  const { data, isLoading, error } = useQuizzesQuery({
    retry: false,
  });

  const quizzes = data?.length ? data : fallbackQuizzes;

  return (
    <LinearGradient
      colors={['#f7f8fb', '#7C3AED']}
      start={{ x: 0.2, y: 0.2 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {!!error ? <Text style={styles.errorText}>{error.message}</Text> : null}
      {isLoading ? <Text style={styles.loadingText}>Carregando quizzes...</Text> : null}

      <FlatList
        data={quizzes}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          padding: 16,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        renderItem={({ item }) => (
          <View style={{ width: '49%', marginBottom: 16, backgroundColor: 'transparent' }}>
            <QuizCard
              title={item.title}
              description={item.content}
              level={difficultyLabel(item.difficulty)}
              questionsCount={item.number_questions}
              imageUrl={require('@/assets/images/background-1.png')}
            />
          </View>
        )}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontFamily: 'Sansation-Bold',
    marginTop: 16,
  },
  errorText: {
    color: '#FEE2E2',
    fontFamily: 'Sansation-Bold',
    marginTop: 16,
    paddingHorizontal: 16,
  },
});
