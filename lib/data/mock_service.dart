import '../models/quiz_models.dart';

class MockService {
  static List<Topic> getTopics() {
    return [
      Topic(
        id: '1',
        title: 'Flutter Basics',
        questionCount: 3,
        icon: 'flutter',
        description: 'Conceitos fundamentais de Widgets e Estado.',
        difficulty: 'Iniciante',
      ),
      Topic(
        id: '2',
        title: 'Dart Language',
        questionCount: 4,
        icon: 'dart',
        description: 'Sintaxe, Coleções e Orientação a Objetos.',
        difficulty: 'Intermediário',
      ),
      Topic(
        id: '3',
        title: 'Web Development',
        questionCount: 5,
        icon: 'web',
        description: 'HTML, CSS e protocolos da Web.',
        difficulty: 'Iniciante',
      ),
      Topic(
        id: '4',
        title: 'Mobile Design',
        questionCount: 2,
        icon: 'design',
        description: 'UX/UI, Material Design e Acessibilidade.',
        difficulty: 'Avançado',
      ),
    ];
  }

  static List<Question> getQuestionsForTopic(String topicId) {
    if (topicId == '1') { // Flutter Basics (3 Questions)
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
      ];
    }

    if (topicId == '2') { // Dart Language (4 Questions)
      return [
        Question(
          id: '1',
          text: 'Dart é uma linguagem...',
          options: ['Funcional', 'Orientada a Objetos', 'Apenas Script', 'Baixo Nível'],
          correctOptionIndex: 1,
        ),
        Question(
          id: '2',
          text: 'Como se declara uma constante?',
          options: ['var', 'let', 'const', 'mutable'],
          correctOptionIndex: 2,
        ),
        Question(
          id: '3',
          text: 'Qual tipo de dado é "true"?',
          options: ['int', 'String', 'bool', 'double'],
          correctOptionIndex: 2,
        ),
        Question(
          id: '4',
          text: 'O que é um Future?',
          options: ['Um erro', 'Uma promessa de valor', 'Uma lista', 'Um widget'],
          correctOptionIndex: 1,
        ),
      ];
    }

    if (topicId == '3') { // Web Dev (5 Questions)
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

    // Mobile Design (2 Questions)
    return [
      Question(
        id: '1',
        text: 'O que é Material Design?',
        options: ['Um software', 'Um sistema de design', 'Uma linguagem', 'Um hardware'],
        correctOptionIndex: 1,
      ),
      Question(
        id: '2',
        text: 'Qual a cor de contraste recomendada?',
        options: ['1:1', '3:1', '4.5:1', '10:1'],
        correctOptionIndex: 2,
      ),
    ];
  }
}
