import 'package:flutter/material.dart';
import '../components/custom_widgets.dart';
import '../data/mock_service.dart';
import '../models/quiz_models.dart';

class QuizScreen extends StatefulWidget {
  final Topic topic;

  const QuizScreen({super.key, required this.topic});

  @override
  State<QuizScreen> createState() => _QuizScreenState();
}

class _QuizScreenState extends State<QuizScreen> {
  late List<Question> _questions;
  int _currentQuestionIndex = 0;
  int _score = 0;
  int? _selectedOptionIndex;

  @override
  void initState() {
    super.initState();
    _questions = MockService.getQuestionsForTopic(widget.topic.id);
  }

  void _answerQuestion() {
    if (_selectedOptionIndex == null) return;

    if (_selectedOptionIndex == _questions[_currentQuestionIndex].correctOptionIndex) {
      _score++;
    }

    if (_currentQuestionIndex < _questions.length - 1) {
      setState(() {
        _currentQuestionIndex++;
        _selectedOptionIndex = null;
      });
    } else {
      Navigator.pushReplacementNamed(
        context,
        '/result',
        arguments: QuizResult(
          topicId: widget.topic.id,
          score: _score,
          totalQuestions: _questions.length,
          date: DateTime.now().toIso8601String(),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final question = _questions[_currentQuestionIndex];

    return Scaffold(
      appBar: AppBar(
        title: const Text('Questões'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              ProgressBar(
                current: _currentQuestionIndex + 1,
                total: _questions.length,
              ),
              const SizedBox(height: 32),
              Text(
                question.text,
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
              ),
              const SizedBox(height: 32),
              ...List.generate(question.options.length, (index) {
                final isSelected = _selectedOptionIndex == index;
                return Padding(
                  padding: const EdgeInsets.only(bottom: 12.0),
                  child: InkWell(
                    onTap: () {
                      setState(() {
                        _selectedOptionIndex = index;
                      });
                    },
                    child: Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: isSelected ? Theme.of(context).primaryColor : const Color(0xFFE0956D),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Row(
                        children: [
                          Container(
                            width: 20,
                            height: 20,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              color: Colors.white,
                              border: Border.all(color: Colors.grey),
                            ),
                            child: isSelected
                                ? Center(
                                    child: Container(
                                      width: 10,
                                      height: 10,
                                      decoration: BoxDecoration(
                                        shape: BoxShape.circle,
                                        color: Theme.of(context).primaryColor,
                                      ),
                                    ),
                                  )
                                : null,
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Text(
                              question.options[index],
                              style: TextStyle(
                                color: isSelected ? Colors.white : Colors.black87,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              }),
              const SizedBox(height: 32),
              CustomButton(
                text: _currentQuestionIndex == _questions.length - 1 ? 'Finalizar' : 'Próximo',
                onPressed: _selectedOptionIndex != null ? _answerQuestion : () {},
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.folder), label: ''),
          BottomNavigationBarItem(icon: Icon(Icons.add_circle_outline), label: ''),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: ''),
        ],
        currentIndex: 1, // Just visual
        selectedItemColor: Theme.of(context).primaryColor,
      ),
    );
  }
}
