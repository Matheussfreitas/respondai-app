import 'package:flutter/material.dart';
import '../components/custom_widgets.dart';
import '../utils/app_logger.dart';

class LoginScreen extends StatelessWidget {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  LoginScreen({super.key});

  void _login(BuildContext context) {
    // Mock login logic
    final email = _emailController.text;
    final password = _passwordController.text;

    logger.i("Attempting login with Email: $email");

    if (email.isNotEmpty && password.isNotEmpty) {
      Navigator.pushReplacementNamed(context, '/topics');
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Por favor, preencha todos os campos.')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).primaryColor,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Spacer(),
              // Logo or Title could go here
              Text(
                'Login',
                style: Theme.of(context).textTheme.headlineLarge?.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
              ),
              const SizedBox(height: 48),
              CustomTextField(
                label: 'Email',
                controller: _emailController,
              ),
              const SizedBox(height: 16),
              CustomTextField(
                label: 'Senha',
                isPassword: true,
                controller: _passwordController,
              ),
              const SizedBox(height: 32),
              CustomButton(
                text: 'Entrar',
                onPressed: () => _login(context),
              ),
              const Spacer(),
            ],
          ),
        ),
      ),
    );
  }
}
