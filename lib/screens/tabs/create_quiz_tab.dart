import 'package:flutter/material.dart';
import '../../components/custom_widgets.dart';

class CreateQuizTab extends StatelessWidget {
  const CreateQuizTab({super.key});

  @override
  Widget build(BuildContext context) {
    final TextEditingController titleController = TextEditingController();
    final TextEditingController descController = TextEditingController();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text(
            'Sugerir Novo Quiz',
            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                  fontWeight: FontWeight.bold,
                ),
          ),
          const SizedBox(height: 8),
          const Text('Contribua com a comunidade criando seus próprios questionários.'),
          const SizedBox(height: 32),
          CustomTextField(label: 'Título do Quiz', controller: titleController),
          const SizedBox(height: 16),
          CustomTextField(label: 'Descrição', controller: descController),
          const SizedBox(height: 16),
          // Placeholder for adding questions
          Container(
            height: 150,
            decoration: BoxDecoration(
              color: Colors.grey[100],
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.grey[300]!),
            ),
            child: const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.add_circle_outline, size: 32, color: Colors.grey),
                  SizedBox(height: 8),
                  Text('Adicionar Perguntas (Em breve)'),
                ],
              ),
            ),
          ),
          const SizedBox(height: 32),
          CustomButton(
            text: 'Enviar Sugestão',
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Sugestão enviada com sucesso!')),
              );
              titleController.clear();
              descController.clear();
            },
          ),
        ],
      ),
    );
  }
}
