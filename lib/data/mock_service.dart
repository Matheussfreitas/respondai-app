import '../models/quiz_models.dart';

class MockService {
  static List<Topic> getTopics() {
    return [
      Topic(id: '1', title: 'Flutter Basics', questionCount: 5, icon: 'flutter'),
      Topic(id: '2', title: 'Dart Language', questionCount: 5, icon: 'dart'),
      Topic(id: '3', title: 'Web Development', questionCount: 5, icon: 'web'),
      Topic(id: '4', title: 'Mobile Design', questionCount: 5, icon: 'design'),
    ];
  }

  static List<Question> getQuestionsForTopic(String topicId) {
    // In a real app, this would filter by topicId. 
    // For now, we return a generic set or specific ones if we want.
    if (topicId == '3') { // Web Dev
       return [
        Question(
          id: '1',
          text: 'Qual principal linguagem de programcao para web?',
          options: ['JavaScript', 'HTML', 'C#', 'Python', 'Java'],
          correctOptionIndex: 0,
        ),
         Question(
          id: '2',
          text: 'O que significa CSS?',
          options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
          correctOptionIndex: 1,
        ),
         Question(
          id: '3',
          text: 'Qual tag HTML é usada para links?',
          options: ['<link>', '<a>', '<href>', '<url>'],
          correctOptionIndex: 1,
        ),
         Question(
          id: '4',
          text: 'Qual protocolo é usado para transferir páginas web?',
          options: ['FTP', 'SMTP', 'HTTP', 'SSH'],
          correctOptionIndex: 2,
        ),
         Question(
          id: '5',
          text: 'O que é o DOM?',
          options: ['Document Object Model', 'Data Object Model', 'Digital Object Model', 'Document Oriented Model'],
          correctOptionIndex: 0,
        ),
      ];
    }

    // Default questions for other topics
    return [
      Question(
        id: '1',
        text: 'O que é Flutter?',
        options: ['Um banco de dados', 'Um framework UI', 'Uma linguagem', 'Um sistema operacional'],
        correctOptionIndex: 1,
      ),
      Question(
        id: '2',
        text: 'Qual linguagem o Flutter usa?',
        options: ['Java', 'Kotlin', 'Dart', 'Swift'],
        correctOptionIndex: 2,
      ),
      Question(
        id: '3',
        text: 'Quem criou o Flutter?',
        options: ['Facebook', 'Microsoft', 'Google', 'Apple'],
        correctOptionIndex: 2,
      ),
      Question(
        id: '4',
        text: 'O que é um Widget?',
        options: ['Um componente visual', 'Um banco de dados', 'Um servidor', 'Um arquivo de texto'],
        correctOptionIndex: 0,
      ),
      Question(
        id: '5',
        text: 'Como se chama a função principal?',
        options: ['start()', 'run()', 'main()', 'init()'],
        correctOptionIndex: 2,
      ),
    ];
  }
}
