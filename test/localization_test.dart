import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:wai/app/work_ai_app.dart';
import 'package:wai/core/services/task_clarification_service.dart';
import 'package:wai/l10n/app_language.dart';
import 'package:wai/l10n/translations.dart';
import 'package:wai/screens/new_task_screen.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  setUp(() => AppLanguage.instance.select('KZ'));
  tearDown(() => AppLanguage.instance.select('KZ'));
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

  test('all catalog entries have Russian and English translations', () {
    for (final entry in translations.entries) {
      expect(entry.value, hasLength(2), reason: entry.key);
      expect(
        entry.value.every((text) => text.trim().isNotEmpty),
        isTrue,
        reason: entry.key,
      );
    }
    expect(tr('Іздеу', locale: const Locale('kk')), 'Іздеу');
    expect(
      tr('Табылғаны: 3 вакансия мен тапсырма', locale: const Locale('ru')),
      'Найдено вакансий и задач: 3',
    );
    expect(tr('2 / 3 сұрақ', locale: const Locale('en')), 'Question 2 of 3');
    expect(
      tr('«My own idea» — шешімді кім қолданады?', locale: const Locale('en')),
      '“My own idea” — who will use the solution?',
    );
  });

  test('task topics are recognized in all three languages', () {
    for (final text in [
      'Гүл сататын қосымша',
      'Приложение для продажи цветов',
      'An app to sell flowers',
    ]) {
      expect(
        questionsForTask(text).first['context'],
        'Көрнекілік және 3D Дизайн',
      );
    }
    expect(
      questionsForTask('Delivery route planning').first['context'],
      'Жеткізу үдерісі',
    );
    expect(
      questionsForTask('I need an online clothing store').first['context'],
      'Каталог және тапсырыс',
    );
    expect(
      questionsForTask('Приложение для школы').first['context'],
      'Оқу форматы',
    );
  });

  testWidgets(
    'language selectors update the app and preserve entered task text',
    (tester) async {
      await tester.pumpWidget(const WorkAiApp());
      await tester.pumpAndSettle();
      final navigator = tester.state<NavigatorState>(find.byType(Navigator));
      navigator.pushNamed('/auth');
      await tester.pumpAndSettle();
      await tester.tap(find.text('EN'));
      await tester.pumpAndSettle();
      expect(find.text('The future of work'), findsOneWidget);
      expect(
        Localizations.localeOf(
          tester.element(find.text('The future of work')),
        ).languageCode,
        'en',
      );
      navigator.pop();
      await tester.pumpAndSettle();
      expect(find.text('Search'), findsOneWidget);
      navigator.push(
        MaterialPageRoute<void>(builder: (_) => const NewTaskScreen()),
      );
      await tester.pumpAndSettle();
      expect(find.text('New task'), findsOneWidget);
      const description = 'Маған гүл сататын қосымша жасау керек';
      final field = find.byKey(const ValueKey('task-description'));
      await tester.ensureVisible(field);
      await tester.pumpAndSettle();
      await tester.enterText(field, description);
      navigator.pushNamed('/auth');
      await tester.pumpAndSettle();
      await tester.tap(find.text('RU'));
      await tester.pumpAndSettle();
      navigator.pop();
      await tester.pumpAndSettle();
      expect(find.text('Новая задача'), findsOneWidget);
      expect(find.text('Уточнить с AI'), findsOneWidget);
      expect(tester.widget<TextFormField>(field).controller!.text, description);
      await tester.tap(find.text('Уточнить с AI'));
      await tester.pumpAndSettle();
      expect(
        find.textContaining('Как показывать цветы в каталоге?'),
        findsOneWidget,
      );
      expect(find.text(description), findsWidgets);
      expect(tester.takeException(), isNull);
    },
  );
}
