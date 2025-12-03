import 'package:flutter_test/flutter_test.dart';
import 'package:respondai_app/main.dart';

void main() {
  testWidgets('App starts smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const RespondAIApp());

    // Verify that the login screen appears
    expect(find.text('Login'), findsNothing); // Login text removed in favor of Logo/Title
    expect(find.text('RespondAI'), findsOneWidget);
    expect(find.text('Entrar'), findsOneWidget);
  });
}
