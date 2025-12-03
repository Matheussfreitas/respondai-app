import 'package:flutter/material.dart';
import '../../data/database_helper.dart';
import '../../data/mock_service.dart';
import '../../models/quiz_models.dart';

class TopicsTab extends StatefulWidget {
  const TopicsTab({super.key});

  @override
  State<TopicsTab> createState() => _TopicsTabState();
}

class _TopicsTabState extends State<TopicsTab> {
  List<String> _completedTopicIds = [];

  @override
  void initState() {
    super.initState();
    _loadCompletedTopics();
  }

  Future<void> _loadCompletedTopics() async {
    final ids = await DatabaseHelper().getCompletedTopicIds();
    if (mounted) {
      setState(() {
        _completedTopicIds = ids;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final List<Topic> topics = MockService.getTopics();

    return GridView.builder(
      padding: const EdgeInsets.all(16),
      gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
        maxCrossAxisExtent: 200,
        childAspectRatio: 0.75,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
      ),
      itemCount: topics.length,
      itemBuilder: (context, index) {
        final topic = topics[index];
        final isCompleted = _completedTopicIds.contains(topic.id);
        return _TopicCard(
          topic: topic,
          isCompleted: isCompleted,
          onTap: () async {
            await Navigator.pushNamed(
              context,
              '/quiz',
              arguments: topic,
            );
            // Refresh status when returning
            _loadCompletedTopics();
          },
        );
      },
    );
  }
}

class _TopicCard extends StatelessWidget {
  final Topic topic;
  final bool isCompleted;
  final VoidCallback onTap;

  const _TopicCard({
    required this.topic,
    required this.isCompleted,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.05),
              blurRadius: 10,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Expanded(
              flex: 3,
              child: Container(
                decoration: BoxDecoration(
                  color: isCompleted ? Colors.green[100] : Colors.grey[200],
                  borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
                ),
                child: Center(
                  child: isCompleted
                      ? const Icon(Icons.check_circle, size: 40, color: Colors.green)
                      : const Icon(Icons.image, size: 40, color: Colors.grey),
                ),
              ),
            ),
            Expanded(
              flex: 4,
              child: Padding(
                padding: const EdgeInsets.all(12.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      topic.title,
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.bold,
                          ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      topic.description,
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: Colors.grey[600],
                          ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const Spacer(),
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: Theme.of(context).primaryColor.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: Text(
                            topic.difficulty,
                            style: TextStyle(
                              fontSize: 10,
                              color: Theme.of(context).primaryColor,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                        const Spacer(),
                        if (isCompleted)
                          Text(
                            'Feito',
                            style: TextStyle(
                              fontSize: 10,
                              color: Colors.green[700],
                              fontWeight: FontWeight.bold,
                            ),
                          )
                        else
                          Text(
                            '${topic.questionCount} Qs',
                            style: Theme.of(context).textTheme.bodySmall,
                          ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
