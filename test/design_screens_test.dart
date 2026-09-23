import 'package:wai/l10n/app_language.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:wai/app/work_ai_app.dart';
import 'package:wai/widgets/ai_task_clarification_dialog.dart';

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
  for (final language in ['KZ', 'RU', 'EN']) {
    for (final width in [390.0, 320.0]) {
      testWidgets('$language design screens fit a $width px phone', (
        tester,
      ) async {
        AppLanguage.instance.select(language);
        addTearDown(() => AppLanguage.instance.select('KZ'));
        tester.view.physicalSize = Size(width, 844);
        tester.view.devicePixelRatio = 1;
        addTearDown(tester.view.resetPhysicalSize);
        addTearDown(tester.view.resetDevicePixelRatio);
        await tester.pumpWidget(const WorkAiApp());
        await tester.pumpAndSettle();
        expect(tester.takeException(), isNull, reason: 'home');
        final navigator = tester.state<NavigatorState>(find.byType(Navigator));
        for (final route in [
          '/detail',
          '/apply',
          '/auth',
          '/student',
          '/employer',
          '/tasks',
          '/responses',
          '/chat',
          '/new-task',
        ]) {
          navigator.pushNamed(route);
          await tester.pumpAndSettle();
          expect(tester.takeException(), isNull, reason: route);
          final lists = find.byType(ListView).hitTestable();
          if (lists.evaluate().isNotEmpty) {
            await tester.drag(lists.first, const Offset(0, -600));
            await tester.pumpAndSettle();
            expect(tester.takeException(), isNull, reason: '$route scrolled');
          }
          navigator.pop();
          await tester.pumpAndSettle();
        }
        showDialog<void>(
          context: navigator.context,
          builder: (_) => AiTaskClarificationDialog(
            taskTitle: 'Гүл дүкенінің онлайн витринасы',
            budget: '850 000',
            duration: '3 апта',
            onCompleted: () {},
          ),
        );
        await tester.pumpAndSettle();
        expect(tester.takeException(), isNull, reason: 'AI dialog');
        for (var step = 0; step < 2; step++) {
          await tester.tap(find.text(tr('1-нұсқа')));
          await tester.pumpAndSettle();
          await tester.tap(find.text(tr('Келесі сұрақ →')));
          await tester.pumpAndSettle();
          expect(tester.takeException(), isNull, reason: 'AI step $step');
        }
        await tester.tap(find.text(tr('1-нұсқа')));
        await tester.pumpAndSettle();
        await tester.tap(find.text(tr('AI ТЗ-ны бекітіп, жариялау 🚀')));
        await tester.pumpAndSettle();
        expect(
          find.text(tr('Техникалық тапсырма (ТЗ) толық бекітілді!')),
          findsOneWidget,
        );
        expect(tester.takeException(), isNull, reason: 'AI summary');
      });
    }
  }
}
