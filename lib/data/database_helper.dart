import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';
import '../models/quiz_models.dart';
import '../utils/app_logger.dart';

class DatabaseHelper {
  static final DatabaseHelper _instance = DatabaseHelper._internal();
  static Database? _database;

  factory DatabaseHelper() {
    return _instance;
  }

  DatabaseHelper._internal();

  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }

  Future<Database> _initDatabase() async {
    String path = join(await getDatabasesPath(), 'respondai_database.db');
    logger.i("Initializing Database at $path");
    return await openDatabase(
      path,
      version: 1,
      onCreate: _onCreate,
    );
  }

  Future<void> _onCreate(Database db, int version) async {
    logger.i("Creating Database Tables");
    await db.execute(
      '''
      CREATE TABLE quiz_results(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        topicId TEXT,
        score INTEGER,
        totalQuestions INTEGER,
        date TEXT
      )
      ''',
    );
  }

  Future<int> insertQuizResult(QuizResult result) async {
    Database db = await database;
    logger.i("Inserting Quiz Result: $result");
    return await db.insert('quiz_results', result.toMap());
  }

  Future<List<QuizResult>> getQuizResults() async {
    Database db = await database;
    final List<Map<String, dynamic>> maps = await db.query('quiz_results');
    logger.i("Fetching ${maps.length} Quiz Results");
    return List.generate(maps.length, (i) {
      return QuizResult(
        id: maps[i]['id'],
        topicId: maps[i]['topicId'],
        score: maps[i]['score'],
        totalQuestions: maps[i]['totalQuestions'],
        date: maps[i]['date'],
      );
    });
  }

  Future<List<String>> getCompletedTopicIds() async {
    Database db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'quiz_results',
      columns: ['topicId'],
      distinct: true,
    );
    return maps.map((e) => e['topicId'] as String).toList();
  }
}
