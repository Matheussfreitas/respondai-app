import 'package:flutter/material.dart';
import 'models/quiz_models.dart';
import 'screens/login_screen.dart';
import 'screens/quiz_screen.dart';
import 'screens/result_screen.dart';
import 'screens/topics_screen.dart';
import 'utils/app_theme.dart';

void main() {
  runApp(const RespondAIApp());
}

class RespondAIApp extends StatelessWidget {
  const RespondAIApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'RespondAI',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      themeMode: ThemeMode.system, // Respects user's system setting
      initialRoute: '/',
      routes: {
        '/': (context) => LoginScreen(),
        '/topics': (context) => const TopicsScreen(),
      },
      onGenerateRoute: (settings) {
        if (settings.name == '/quiz') {
          final topic = settings.arguments as Topic;
          return MaterialPageRoute(
            builder: (context) => QuizScreen(topic: topic),
          );
        }
        if (settings.name == '/result') {
          final result = settings.arguments as QuizResult;
          return MaterialPageRoute(
            builder: (context) => ResultScreen(result: result),
          );
        }
        return null;
      },
    );
  }
}
