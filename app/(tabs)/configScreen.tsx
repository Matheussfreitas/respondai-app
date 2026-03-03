import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function ConfigScreen() {
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoSync, setAutoSync] = useState(false);

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
          <View style={styles.headerTop}>
            <View style={styles.avatar} />
            <View style={styles.headerText}>
              <Text style={styles.title}>Configurações</Text>
              <Text style={styles.subtitle}>
                Ajuste preferências e personalize sua experiência.
              </Text>
            </View>
          </View>
          <View style={styles.pillsRow}>
            <View style={styles.pill} lightColor="#f3f4f6" darkColor="#1f2937">
              <Text style={styles.pillText}>12 quizzes</Text>
            </View>
            <View style={styles.pill} lightColor="#f3f4f6" darkColor="#1f2937">
              <Text style={styles.pillText}>Nível médio</Text>
            </View>
            <View style={styles.pill} lightColor="#f3f4f6" darkColor="#1f2937">
              <Text style={styles.pillText}>5 favoritos</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências</Text>
          <View style={styles.card} lightColor="#ffffff" darkColor="#111827">
            <View style={styles.settingRow}>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Notificações</Text>
                <Text style={styles.settingDescription}>
                  Receba lembretes e novidades.
                </Text>
              </View>
              <Switch value={notifications} onValueChange={setNotifications} />
            </View>
            <View
              style={styles.divider}
              lightColor="#e5e7eb"
              darkColor="#1f2937"
            />
            <View
              style={styles.divider}
              lightColor="#e5e7eb"
              darkColor="#1f2937"
            />
            <View style={styles.settingRow}>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>
                  Sincronização automática
                </Text>
                <Text style={styles.settingDescription}>
                  Envie resultados em segundo plano.
                </Text>
              </View>
              <Switch value={autoSync} onValueChange={setAutoSync} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conta</Text>
          <View style={styles.card} lightColor="#ffffff" darkColor="#111827">
            <Pressable style={styles.linkRow}>
              <Text style={styles.linkText}>Editar perfil</Text>
              <Text style={styles.linkHint}>&gt;</Text>
            </Pressable>
            <View
              style={styles.divider}
              lightColor="#e5e7eb"
              darkColor="#1f2937"
            />
            <Pressable style={styles.linkRow}>
              <Text style={styles.linkText}>Segurança e login</Text>
              <Text style={styles.linkHint}>&gt;</Text>
            </Pressable>
            <View
              style={styles.divider}
              lightColor="#e5e7eb"
              darkColor="#1f2937"
            />
            <Pressable style={styles.linkRow}>
              <Text style={styles.linkText}>Assinatura</Text>
              <Text style={styles.linkHint}>&gt;</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suporte</Text>
          <View style={styles.card} lightColor="#ffffff" darkColor="#111827">
            <Pressable style={styles.linkRow}>
              <Text style={styles.linkText}>Central de ajuda</Text>
              <Text style={styles.linkHint}>&gt;</Text>
            </Pressable>
            <View
              style={styles.divider}
              lightColor="#e5e7eb"
              darkColor="#1f2937"
            />
            <Pressable style={styles.linkRow}>
              <Text style={styles.linkText}>Enviar feedback</Text>
              <Text style={styles.linkHint}>&gt;</Text>
            </Pressable>
          </View>
        </View>

        <View
          style={styles.footerCard}
          lightColor="#ffffff"
          darkColor="#111827"
        >
          <Text style={styles.footerTitle}>Sessão atual</Text>
          <Text style={styles.footerDescription}>
            Última sincronização há 2 horas. Tudo certo por aqui.
          </Text>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Sair da conta</Text>
          </Pressable>
        </View>
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
    gap: 16,
    shadowColor: '#111827',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#7c3aed',
    opacity: 0.85,
  },
  headerText: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.8,
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
    padding: 4,
    overflow: 'hidden',
    shadowColor: '#111827',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 12,
  },
  settingText: {
    flex: 1,
    gap: 4,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  settingDescription: {
    fontSize: 12,
    opacity: 0.7,
  },
  divider: {
    height: 1,
    marginHorizontal: 12,
  },
  linkRow: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkText: {
    fontSize: 15,
    fontWeight: '600',
  },
  linkHint: {
    fontSize: 16,
    opacity: 0.4,
  },
  footerCard: {
    borderRadius: 20,
    padding: 16,
    gap: 12,
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
    marginTop: 6,
    backgroundColor: '#ef4444',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
});
