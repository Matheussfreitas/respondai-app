import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '@/components/Themed';

const difficultyOptions = ['Básico', 'Intermediário', 'Avançado'];

export default function CreateQuizScreen() {
  const [difficulty, setDifficulty] = useState(difficultyOptions[0]);
  const [questionCount, setQuestionCount] = useState(10);

  const canDecrease = questionCount > 5;
  const canIncrease = questionCount < 30;

  return (
    <LinearGradient
      colors={['#f7f8fb', '#c4b5fd']}
      start={{ x: 0.2, y: 0.1 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={styles.headerCard}
          lightColor="#ffffff"
          darkColor="#111827"
        >
          <Text style={styles.title}>Criar quiz</Text>
          <Text style={styles.subtitle}>
            Monte um quiz rápido e compartilhe com a galera.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalhes</Text>
          <View style={styles.card} lightColor="#ffffff" darkColor="#111827">
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>Título do quiz</Text>
              <TextInput
                placeholder="Ex: React Native Essentials"
                placeholderTextColor="#9ca3af"
                style={styles.input}
              />
            </View>
            <View
              style={styles.divider}
              lightColor="#e5e7eb"
              darkColor="#1f2937"
            />
            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>Descrição curta</Text>
              <TextInput
                placeholder="O que a pessoa vai aprender?"
                placeholderTextColor="#9ca3af"
                style={[styles.input, styles.inputMultiline]}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nível</Text>
          <View style={styles.chipRow}>
            {difficultyOptions.map((option) => {
              const isActive = option === difficulty;
              return (
                <Pressable
                  key={option}
                  onPress={() => setDifficulty(option)}
                  style={[styles.chip, isActive && styles.chipActive]}
                >
                  <Text
                    style={[styles.chipText, isActive && styles.chipTextActive]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perguntas</Text>
          <View style={styles.card} lightColor="#ffffff" darkColor="#111827">
            <View style={styles.counterRow}>
              <View>
                <Text style={styles.counterTitle}>Quantidade</Text>
                <Text style={styles.counterDescription}>
                  Entre 5 e 30 perguntas.
                </Text>
              </View>
              <View style={styles.counterControls}>
                <Pressable
                  style={[
                    styles.counterButton,
                    !canDecrease && styles.counterDisabled,
                  ]}
                  disabled={!canDecrease}
                  onPress={() =>
                    setQuestionCount((value) => Math.max(5, value - 1))
                  }
                >
                  <Text style={styles.counterButtonText}>-</Text>
                </Pressable>
                <Text style={styles.counterValue}>{questionCount}</Text>
                <Pressable
                  style={[
                    styles.counterButton,
                    !canIncrease && styles.counterDisabled,
                  ]}
                  disabled={!canIncrease}
                  onPress={() =>
                    setQuestionCount((value) => Math.min(30, value + 1))
                  }
                >
                  <Text style={styles.counterButtonText}>+</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* <View
          style={styles.footerCard}
          lightColor="#ffffff"
          darkColor="#111827"
        >
          <Text style={styles.footerTitle}>Próximos passos</Text>
          <Text style={styles.footerDescription}>
            Depois de criar, você pode adicionar perguntas e compartilhar.
          </Text>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Continuar</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Salvar rascunho</Text>
          </Pressable>
        </View> */}

        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Criar Quiz</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  headerCard: {
    borderRadius: 20,
    padding: 16,
    gap: 8,
    shadowColor: '#111827',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  section: {
    gap: 10,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    opacity: 0.85,
  },
  card: {
    borderRadius: 18,
    padding: 12,
    gap: 12,
    shadowColor: '#111827',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  fieldBlock: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.75,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#f9fafb',
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  divider: {
    height: 1,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    backgroundColor: 'transparent',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  chipActive: {
    backgroundColor: '#7c3aed',
    borderColor: '#7c3aed',
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  chipTextActive: {
    color: '#ffffff',
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  counterTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  counterDescription: {
    fontSize: 12,
    opacity: 0.7,
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  counterButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
  },
  counterDisabled: {
    opacity: 0.3,
  },
  counterButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  counterValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  footerCard: {
    borderRadius: 20,
    padding: 16,
    gap: 10,
    shadowColor: '#111827',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  footerDescription: {
    fontSize: 13,
    opacity: 0.7,
  },
  primaryButton: {
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 6,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  secondaryButton: {
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#f3f4f6',
  },
  secondaryButtonText: {
    color: '#111827',
    fontWeight: '700',
    fontSize: 14,
  },
});
