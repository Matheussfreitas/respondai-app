class Topic {
  final String id;
  final String title;
  final String icon; // Using a string to represent icon name or asset path if needed, but for now we might map it in UI
  final int questionCount;

  Topic({
    required this.id,
    required this.title,
    this.icon = '',
    required this.questionCount,
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

  // Convert a QuizResult into a Map. The keys must correspond to the names of the
  // columns in the database.
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'topicId': topicId,
      'score': score,
      'totalQuestions': totalQuestions,
      'date': date,
    };
  }

  // Implement toString to make it easier to see information about
  // each quiz result when using the print statement.
  @override
  String toString() {
    return 'QuizResult{id: $id, topicId: $topicId, score: $score, totalQuestions: $totalQuestions, date: $date}';
  }
}
