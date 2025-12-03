class Topic {
  final String id;
  final String title;
  final String icon; 
  final int questionCount;
  final String description;
  final String difficulty;

  Topic({
    required this.id,
    required this.title,
    this.icon = '',
    required this.questionCount,
    required this.description,
    required this.difficulty,
  });
}

class Question {
  final String id;
  final String text;
  final List<String> options;
  final int correctOptionIndex;

  Question({
    required this.id,
    required this.text,
    required this.options,
    required this.correctOptionIndex,
  });
}

class QuizResult {
  final int? id;
  final String topicId;
  final int score;
  final int totalQuestions;
  final String date;

  QuizResult({
    this.id,
    required this.topicId,
    required this.score,
    required this.totalQuestions,
    required this.date,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'topicId': topicId,
      'score': score,
      'totalQuestions': totalQuestions,
      'date': date,
    };
  }

  @override
  String toString() {
    return 'QuizResult{id: $id, topicId: $topicId, score: $score, totalQuestions: $totalQuestions, date: $date}';
  }
}
