import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import '../l10n/app_language.dart';
import '../theme/app_theme.dart';
import '../screens/home_feed_screen.dart';
import '../screens/vacancy_detail_screen.dart';
import '../screens/application_form_screen.dart';
import '../screens/auth_screen.dart';
import '../screens/student_profile_screen.dart';
import '../screens/employer_profile_screen.dart';
import '../screens/tasks_screen.dart';
import '../screens/responses_screen.dart';
import '../screens/chat_screen.dart';
import '../screens/new_task_screen.dart';
import '../shared/widgets/navigation_icon.dart';

class WorkAiApp extends StatelessWidget {
  const WorkAiApp({super.key});

  @override
  Widget build(BuildContext context) => LanguageScope(
    child: ValueListenableBuilder<Locale>(
      valueListenable: AppLanguage.instance,
      builder: (_, locale, child) => MaterialApp(
        title: 'Work.ai',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.lightTheme,
        locale: locale,
        supportedLocales: AppLanguage.supported,
        localizationsDelegates: GlobalMaterialLocalizations.delegates,
        routes: {
          '/': (_) => const WorkAiShell(),
          '/detail': (_) => const VacancyDetailScreen(),
          '/apply': (_) => const ApplicationFormScreen(),
          '/auth': (_) => const AuthScreen(),
          '/student': (_) => const StudentProfileScreen(),
          '/employer': (_) => const EmployerProfileScreen(),
          '/chat': (_) => const ChatScreen(),
          '/responses': (_) => const ResponsesScreen(),
          '/tasks': (_) => const TasksScreen(),
          '/new-task': (_) => const NewTaskScreen(),
        },
        builder: (context, child) => ColoredBox(
          color: AppTheme.surfaceContainerHigh,
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 760),
              child: child!,
            ),
          ),
        ),
      ),
    ),
  );
}

class WorkAiShell extends StatefulWidget {
  const WorkAiShell({super.key});
  @override
  State<WorkAiShell> createState() => _WorkAiShellState();
}

class _WorkAiShellState extends State<WorkAiShell> {
  int _tab = 0;
  static const _labels = ['Іздеу', 'Жауаптар', 'Тапсырмалар', 'Чат', 'Профиль'];
  final _pages = <int, Widget>{0: const HomeFeedScreen()};

  void _select(int index) => setState(() {
    _tab = index;
    _pages.putIfAbsent(
      index,
      () => switch (index) {
        1 => const ResponsesScreen(),
        2 => const TasksScreen(),
        3 => const ChatScreen(),
        _ => const AuthScreen(),
      },
    );
  });

  @override
  Widget build(BuildContext context) => Scaffold(
    body: IndexedStack(
      index: _tab,
      children: List.generate(
        5,
        (index) => _pages[index] ?? const SizedBox.shrink(),
      ),
    ),
    bottomNavigationBar: Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(top: BorderSide(color: AppTheme.surfaceContainer)),
        boxShadow: [
          BoxShadow(
            color: Color(0x08000000),
            blurRadius: 10,
            offset: Offset(0, -3),
          ),
        ],
      ),
      child: SafeArea(
        top: false,
        child: SizedBox(
          height: 72,
          child: Row(
            children: List.generate(
              5,
              (index) => Expanded(
                child: Semantics(
                  selected: _tab == index,
                  button: true,
                  child: InkWell(
                    onTap: () => _select(index),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        AppNavigationIcon(
                          index: index,
                          selected: _tab == index,
                        ),
                        const SizedBox(height: 4),
                        AppText(
                          _labels[index],
                          maxLines: 1,
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: _tab == index
                                ? FontWeight.w700
                                : FontWeight.w500,
                            color: _tab == index
                                ? AppNavigationIcon.activeColor
                                : AppNavigationIcon.inactiveColor,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );
}
