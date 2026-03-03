import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import QuizCard from '@/components/tabs-screen/quizCard';

const quizzes = [
  {
    id: 1,
    title: 'React Native Essentials',
    description:
      'Teste seus conhecimentos sobre os fundamentos do React Native.',
    level: 'Básico',
    questionsCount: 10,
    imageUrl: require('@/assets/images/react-native.png'),
  },
  {
    id: 2,
    title: 'JavaScript Avançado',
    description: 'Domine os conceitos avançados de JavaScript e TypeScript.',
    level: 'Avançado',
    questionsCount: 15,
    imageUrl: require('@/assets/images/background-2.png'),
  },
  {
    id: 3,
    title: 'Expo Router Basics',
    description: 'Aprenda a navegar entre telas usando Expo Router.',
    level: 'Médio',
    questionsCount: 8,
    imageUrl: require('@/assets/images/background-1.png'),
  },
  {
    id: 4,
    title: 'Style Essentials',
    description:
      'Teste seus conhecimentos sobre os fundamentos do React Native.',
    level: 'Básico',
    questionsCount: 10,
    imageUrl: require('@/assets/images/background-3.png'),
  },
];

export default function QuizzesScreen() {
  return (
    <LinearGradient
      colors={['#f7f8fb', '#7C3AED']}
      start={{ x: 0.2, y: 0.2 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
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
              description={item.description}
              level={item.level}
              questionsCount={item.questionsCount}
              imageUrl={item.imageUrl}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
