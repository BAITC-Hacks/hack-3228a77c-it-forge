import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:wai/app/work_ai_app.dart';
import 'package:wai/core/services/task_clarification_service.dart';
import 'package:wai/screens/new_task_screen.dart';
import 'package:wai/widgets/ai_task_clarification_dialog.dart';
import 'package:wai/theme/app_theme.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  setUpAll(() async {
    for (final family in {
      'Inter': 'Inter',
      'Plus Jakarta Sans': 'PlusJakartaSans',
      'Manrope': 'Manrope',
    }.entries) {
      final loader = FontLoader(family.key)
        ..addFont(rootBundle.load('assets/fonts/${family.value}.ttf'));
      await loader.load();
    }
  });
  test('questions follow the task topic and keep unrelated tasks generic', () {
    expect(
      questionsForTask(
        'Маған гүл сататын қосымша жасау керек',
      ).first['question'],
      contains('Гүлдер'),
    );
    expect(
      questionsForTask('Курьер маршруттарын жоспарлау').first['context'],
      'Жеткізу үдерісі',
    );
    expect(
      questionsForTask('Киім сататын дүкен жасау').first['context'],
      'Каталог және тапсырыс',
    );
    expect(
      questionsForTask('Онлайн оқу курстарын жасау').first['context'],
      'Оқу форматы',
    );
    expect(
      questionsForTask('Қызметкерлер кестесін басқару').first['question'],
      contains('Қызметкерлер кестесін басқару'),
    );
  });

  testWidgets('employer writes a task before opening contextual questions', (
    tester,
  ) async {
    await tester.pumpWidget(const WorkAiApp());
    final navigator = tester.state<NavigatorState>(find.byType(Navigator));
    navigator.pushNamed('/employer');
    await tester.pumpAndSettle();
    final publish = find.text('+ Жаңа тапсырма жариялау');
    await tester.ensureVisible(publish);
    await tester.tap(publish);
    await tester.pumpAndSettle();
    expect(find.byType(NewTaskScreen), findsOneWidget);
    expect(find.byType(AiTaskClarificationDialog), findsNothing);
    final next = find.text('AI арқылы нақтылау');
    await tester.ensureVisible(next);
    await tester.pumpAndSettle();
    await tester.tap(next);
    await tester.pumpAndSettle();
    expect(
      find.text('Тапсырманы кемінде 10 таңбамен сипаттаңыз.'),
      findsOneWidget,
    );
    const description = 'Маған гүл сататын қосымша жасау керек';
    await tester.enterText(
      find.byKey(const ValueKey('task-description')),
      description,
    );
    await tester.ensureVisible(next);
    await tester.pumpAndSettle();
    await tester.tap(next);
    await tester.pumpAndSettle();
    expect(find.byType(AiTaskClarificationDialog), findsOneWidget);
    expect(
      find.descendant(
        of: find.byType(AiTaskClarificationDialog),
        matching: find.text(description),
      ),
      findsOneWidget,
    );
    expect(find.textContaining('Гүлдер каталогта'), findsOneWidget);
    await tester.tap(find.byIcon(Icons.close));
    await tester.pumpAndSettle();
    expect(find.widgetWithText(TextFormField, description), findsOneWidget);
  });

  testWidgets('custom answers are required and appear in the final brief', (
    tester,
  ) async {
    await tester.pumpWidget(
      MaterialApp(
        theme: AppTheme.lightTheme,
        home: Scaffold(
          body: Builder(
            builder: (context) => TextButton(
              onPressed: () => showDialog<void>(
                context: context,
                builder: (_) => AiTaskClarificationDialog(
                  taskTitle: 'Қызметкерлер кестесін басқару',
                  budget: '',
                  duration: '',
                  onCompleted: () {},
                ),
              ),
              child: const Text('Open'),
            ),
          ),
        ),
      ),
    );
    await tester.tap(find.text('Open'));
    await tester.pumpAndSettle();
    ElevatedButton nextButton() => tester.widget<ElevatedButton>(
      find.widgetWithText(ElevatedButton, 'Келесі сұрақ →'),
    );
    expect(nextButton().onPressed, isNull);
    await tester.ensureVisible(find.text('4-нұсқа: Өз ойымды жазамын'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('4-нұсқа: Өз ойымды жазамын'));
    await tester.pumpAndSettle();
    expect(nextButton().onPressed, isNull);
    await tester.enterText(
      find.byType(TextField),
      'Ауысым жетекшілері және кадр бөлімі',
    );
    await tester.pumpAndSettle();
    expect(nextButton().onPressed, isNotNull);
    await tester.tap(find.text('Келесі сұрақ →'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('1-нұсқа'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Келесі сұрақ →'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('1-нұсқа'));
    await tester.pumpAndSettle();
    await tester.tap(find.text('AI ТЗ-ны бекітіп, жариялау 🚀'));
    await tester.pumpAndSettle();
    expect(find.text('• Ауысым жетекшілері және кадр бөлімі'), findsOneWidget);
    expect(find.textContaining('AI Флорист'), findsNothing);
    expect(find.textContaining('850 000'), findsNothing);
    expect(tester.takeException(), isNull);
  });
}
