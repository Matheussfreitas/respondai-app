import 'package:flutter/material.dart';
import 'tabs/create_quiz_tab.dart';
import 'tabs/profile_tab.dart';
import 'tabs/topics_tab.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;

  final List<Widget> _tabs = [
    const TopicsTab(),
    const CreateQuizTab(),
    const ProfileTab(),
  ];

  final List<String> _titles = [
    'Temas Disponíveis',
    'Criar Quiz',
    'Meu Perfil',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_titles[_currentIndex]),
        actions: [
          if (_currentIndex == 0)
            IconButton(
              icon: const Icon(Icons.search),
              onPressed: () {},
            ),
        ],
      ),
      body: _tabs[_currentIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        indicatorColor: Colors.orange[200],
        onDestinationSelected: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.grid_view),
            label: 'Temas',
          ),
          NavigationDestination(
            icon: Icon(Icons.add_circle_outline),
            label: 'Criar',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_outline),
            selectedIcon: Icon(Icons.person),
            label: 'Perfil',
          ),
        ],
      ),
    );
  }
}
