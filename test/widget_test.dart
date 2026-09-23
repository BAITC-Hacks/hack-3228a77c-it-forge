import 'package:flutter_test/flutter_test.dart';
import 'package:wai/app/work_ai_app.dart';

void main() {
  testWidgets('discovery feed renders', (tester) async {
    await tester.pumpWidget(const WorkAiApp());
    expect(find.text('Іздеу'), findsWidgets);
    expect(find.textContaining('Work.ai'), findsWidgets);
  });
}
