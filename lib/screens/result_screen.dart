import 'package:flutter/material.dart';
import '../components/custom_widgets.dart';
import '../data/database_helper.dart';
import '../models/quiz_models.dart';
import '../utils/app_logger.dart';

class ResultScreen extends StatelessWidget {
  final QuizResult result;

  const ResultScreen({super.key, required this.result});

  Future<void> _saveResult(BuildContext context) async {
    try {
      await DatabaseHelper().insertQuizResult(result);
      logger.i("Result saved successfully");
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Resultado salvo no banco de dados!')),
        );
        Navigator.popUntil(context, ModalRoute.withName('/home'));
      }
    } catch (e) {
      logger.e("Failed to save result: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Spacer(),
              Text(
                'Parabéns',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
              ),
              const SizedBox(height: 48),
              Container(
                padding: const EdgeInsets.all(32),
                decoration: BoxDecoration(
                  color: Colors.grey[300],
                  borderRadius: BorderRadius.circular(4),
                ),
                child: Column(
                  children: [
                    Text(
                      '${result.score} / ${result.totalQuestions}',
                      style: Theme.of(context).textTheme.displayMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: Colors.black87,
                          ),
                    ),
                    const SizedBox(height: 8),
                    const Text('Acertos'),
                  ],
                ),
              ),
              const Spacer(),
              CustomButton(
                text: 'Avançar',
                onPressed: () => _saveResult(context),
              ),
              const SizedBox(height: 16),
              // Debug button to view logs/db could go here
            ],
          ),
        ),
      ),
    );
  }
}
