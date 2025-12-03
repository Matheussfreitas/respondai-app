import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'models/quiz_models.dart';
import 'screens/home_screen.dart';
import 'screens/login_screen.dart';
import 'screens/quiz_screen.dart';
import 'screens/result_screen.dart';
import 'screens/settings_screen.dart';
import 'utils/app_theme.dart';

void main() {
  runApp(const RespondAIApp());
}

class RespondAIApp extends StatefulWidget {
  const RespondAIApp({super.key});

  @override
  State<RespondAIApp> createState() => _RespondAIAppState();
}

class _RespondAIAppState extends State<RespondAIApp> {
  ThemeMode _themeMode = ThemeMode.system;

  @override
  void initState() {
    super.initState();
    _loadThemePreference();
  }

  Future<void> _loadThemePreference() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final themeIndex = prefs.getInt('theme_mode');
      if (themeIndex != null &&
          themeIndex >= 0 &&
          themeIndex < ThemeMode.values.length) {
        setState(() {
          _themeMode = ThemeMode.values[themeIndex];
        });
      }
    } catch (e) {
      // Ignora erro se houver valor inválido salvo
      // App inicia com tema padrão (system)
    }
  }

  void updateTheme(ThemeMode mode) {
    setState(() {
      _themeMode = mode;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'RespondAI',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: _themeMode,
      initialRoute: '/',
      routes: {
        '/': (context) => LoginScreen(),
        '/home': (context) => const HomeScreen(),
        '/settings': (context) => SettingsScreen(
          currentThemeMode: _themeMode,
          onThemeChanged: updateTheme,
        ),
      },
      onGenerateRoute: (settings) {
        if (settings.name == '/quiz') {
          final topic = settings.arguments as Topic;
          return MaterialPageRoute(
            settings: settings,
            builder: (context) => QuizScreen(topic: topic),
          );
        }
        if (settings.name == '/result') {
          final result = settings.arguments as QuizResult;
          return MaterialPageRoute(
            settings: settings,
            builder: (context) => ResultScreen(result: result),
          );
        }
        return null;
      },
    );
  }
}
