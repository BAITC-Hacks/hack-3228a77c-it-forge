import 'package:flutter/material.dart';

import '../app/theme/app_colors.dart';
import '../app/theme/app_theme.dart';
import '../features/challenges/challenge_builder_screen.dart';
import '../features/challenges/challenge_detail_screen.dart';
import '../features/home/discovery_screen.dart';
import '../features/workspace/workspace_screens.dart';
import '../shared/data/demo_data.dart';
import '../shared/models/challenge.dart';
import '../shared/widgets/app_widgets.dart';

class WorkAiApp extends StatelessWidget {
  const WorkAiApp({super.key});
  @override
  Widget build(BuildContext context) => MaterialApp(
    title: 'Work.ai',
    debugShowCheckedModeBanner: false,
    theme: AppTheme.light,
    home: const WorkAiShell(),
  );
}

class WorkAiShell extends StatefulWidget {
  const WorkAiShell({super.key});
  @override
  State<WorkAiShell> createState() => _WorkAiShellState();
}

class _WorkAiShellState extends State<WorkAiShell> {
  var _tab = 0;
  var _businessMode = false;
  final _saved = <String>{'logistics'};
  final _items = List<Challenge>.of(challenges);

  void _openDetail(Challenge challenge) => Navigator.of(context).push(
    MaterialPageRoute(
      builder: (_) => ChallengeDetailScreen(
        challenge: challenge,
        onApply: () => _openApply(challenge),
      ),
    ),
  );

  void _openApply(Challenge challenge) => Navigator.of(context).push(
    MaterialPageRoute(
      builder: (_) => ApplyScreen(
        challenge: challenge,
        onSuccess: () {
          setState(() => _tab = 1);
        },
      ),
    ),
  );

  Future<void> _openBuilder() async {
    final created = await Navigator.of(context).push<Challenge>(
      MaterialPageRoute(builder: (_) => const ChallengeBuilderScreen()),
    );
    if (created != null && mounted) {
      setState(() {
        _items.insert(0, created);
        _businessMode = true;
        _tab = 4;
      });
      showAppToast(context, 'Челлендж жарияланды және AI скринингі қосылды.');
    }
  }

  @override
  Widget build(BuildContext context) {
    final pages = <Widget>[
      DiscoveryScreen(
        challenges: _items,
        savedIds: _saved,
        onToggleSaved: (id) => setState(
          () => _saved.contains(id) ? _saved.remove(id) : _saved.add(id),
        ),
        onOpen: _openDetail,
        onApply: _openApply,
      ),
      const ResponsesScreen(),
      const TasksScreen(),
      const ChatScreen(),
      ProfileScreen(
        isBusiness: _businessMode,
        onChangeMode: (business) => setState(() => _businessMode = business),
        onCreateChallenge: _openBuilder,
      ),
    ];
    final labels = const ['Іздеу', 'Жауаптар', 'Тапсырмалар', 'Чат', 'Профиль'];
    final icons = const [
      Icons.travel_explore_outlined,
      Icons.work_outline,
      Icons.layers_outlined,
      Icons.forum_outlined,
      Icons.person_outline,
    ];
    return LayoutBuilder(
      builder: (context, constraints) {
        final wide = constraints.maxWidth >= 920;
        final body = AnimatedSwitcher(
          duration: const Duration(milliseconds: 220),
          child: KeyedSubtree(key: ValueKey(_tab), child: pages[_tab]),
        );
        if (wide) {
          return Scaffold(
            body: Row(
              children: [
                SafeArea(
                  child: NavigationRail(
                    selectedIndex: _tab,
                    onDestinationSelected: (value) =>
                        setState(() => _tab = value),
                    leading: const Padding(
                      padding: EdgeInsets.fromLTRB(12, 12, 12, 24),
                      child: BrandMark(compact: true),
                    ),
                    labelType: NavigationRailLabelType.all,
                    destinations: List.generate(
                      labels.length,
                      (index) => NavigationRailDestination(
                        icon: Icon(icons[index]),
                        selectedIcon: Icon(
                          icons[index],
                          color: AppColors.primary,
                        ),
                        label: Text(labels[index]),
                      ),
                    ),
                  ),
                ),
                const VerticalDivider(width: 1),
                Expanded(
                  child: Center(
                    child: ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: 760),
                      child: body,
                    ),
                  ),
                ),
              ],
            ),
          );
        }
        return Scaffold(
          body: body,
          bottomNavigationBar: NavigationBar(
            selectedIndex: _tab,
            onDestinationSelected: (value) => setState(() => _tab = value),
            destinations: List.generate(
              labels.length,
              (index) => NavigationDestination(
                icon: Icon(icons[index]),
                selectedIcon: Icon(icons[index]),
                label: labels[index],
              ),
            ),
          ),
        );
      },
    );
  }
}
