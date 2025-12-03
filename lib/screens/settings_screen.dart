import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SettingsScreen extends StatefulWidget {
  final Function(ThemeMode) onThemeChanged;
  final ThemeMode currentThemeMode;

  const SettingsScreen({
    super.key,
    required this.onThemeChanged,
    required this.currentThemeMode,
  });

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  late ThemeMode _selectedThemeMode;

  @override
  void initState() {
    super.initState();
    _selectedThemeMode = widget.currentThemeMode;
  }

  Future<void> _saveThemePreference(ThemeMode mode) async {
    final prefs = await SharedPreferences.getInstance();
    String themeString = mode == ThemeMode.light
        ? 'light'
        : mode == ThemeMode.dark
        ? 'dark'
        : 'system';
    await prefs.setString('theme_mode', themeString);
  }

  void _changeTheme(ThemeMode? mode) {
    if (mode != null) {
      setState(() {
        _selectedThemeMode = mode;
      });
      widget.onThemeChanged(mode);
      _saveThemePreference(mode);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Configurações')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const SizedBox(height: 8),
          Text(
            'Aparência',
            style: Theme.of(
              context,
            ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          Card(
            child: Column(
              children: [
                ListTile(
                  leading: const Icon(Icons.light_mode),
                  title: const Text('Tema Claro'),
                  trailing: Radio<ThemeMode>(
                    value: ThemeMode.light,
                    groupValue: _selectedThemeMode,
                    onChanged: _changeTheme,
                  ),
                  onTap: () => _changeTheme(ThemeMode.light),
                ),
                const Divider(height: 1),
                ListTile(
                  leading: const Icon(Icons.dark_mode),
                  title: const Text('Tema Escuro'),
                  trailing: Radio<ThemeMode>(
                    value: ThemeMode.dark,
                    groupValue: _selectedThemeMode,
                    onChanged: _changeTheme,
                  ),
                  onTap: () => _changeTheme(ThemeMode.dark),
                ),
                const Divider(height: 1),
                ListTile(
                  leading: const Icon(Icons.brightness_auto),
                  title: const Text('Tema do Sistema'),
                  trailing: Radio<ThemeMode>(
                    value: ThemeMode.system,
                    groupValue: _selectedThemeMode,
                    onChanged: _changeTheme,
                  ),
                  onTap: () => _changeTheme(ThemeMode.system),
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),
          Text(
            'Sobre',
            style: Theme.of(
              context,
            ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),
          Card(
            child: Column(
              children: [
                const ListTile(
                  leading: Icon(Icons.info_outline),
                  title: Text('Versão do App'),
                  trailing: Text('1.0.0'),
                ),
                const Divider(height: 1),
                ListTile(
                  leading: const Icon(Icons.privacy_tip_outlined),
                  title: const Text('Política de Privacidade'),
                  trailing: const Icon(Icons.arrow_forward_ios, size: 16),
                  onTap: () {},
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
