import 'package:flutter/material.dart';

import '../../app/theme/app_colors.dart';
import '../../shared/models/challenge.dart';
import '../../shared/widgets/app_widgets.dart';

class DiscoveryScreen extends StatefulWidget {
  const DiscoveryScreen({
    super.key,
    required this.challenges,
    required this.savedIds,
    required this.onToggleSaved,
    required this.onOpen,
    required this.onApply,
  });
  final List<Challenge> challenges;
  final Set<String> savedIds;
  final ValueChanged<String> onToggleSaved;
  final ValueChanged<Challenge> onOpen;
  final ValueChanged<Challenge> onApply;
  @override
  State<DiscoveryScreen> createState() => _DiscoveryScreenState();
}

class _DiscoveryScreenState extends State<DiscoveryScreen> {
  final _search = TextEditingController(text: 'Логистика және AI');
  String _filter = 'AI & ML';
  @override
  void dispose() {
    _search.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final query = _search.text.toLowerCase();
    final list = widget.challenges
        .where(
          (e) =>
              query.isEmpty ||
              e.title.toLowerCase().contains(query) ||
              e.tags.join(' ').toLowerCase().contains(query),
        )
        .toList();
    return SafeArea(
      child: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 10, 12, 8),
            child: Row(
              children: [
                const BrandMark(),
                const Spacer(),
                IconButton(onPressed: () {}, icon: const Icon(Icons.search)),
                Badge(
                  child: IconButton(
                    onPressed: () =>
                        showAppToast(context, 'Жаңа хабарламалар жоқ'),
                    icon: const Icon(Icons.notifications_none),
                  ),
                ),
                IconButton(
                  onPressed: () {},
                  style: IconButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    foregroundColor: Colors.white,
                  ),
                  icon: const Icon(Icons.person, size: 18),
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.fromLTRB(16, 8, 16, 28),
              children: [
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _search,
                        onChanged: (_) => setState(() {}),
                        decoration: const InputDecoration(
                          prefixIcon: Icon(Icons.search),
                          hintText: 'Лауазым, дағды немесе компания',
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    IconButton(
                      onPressed: () =>
                          showAppToast(context, '2 сүзгі белсенді'),
                      style: IconButton.styleFrom(
                        backgroundColor: AppColors.primary,
                        foregroundColor: Colors.white,
                      ),
                      icon: const Badge(
                        label: Text('2'),
                        child: Icon(Icons.tune),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                SizedBox(
                  height: 37,
                  child: ListView(
                    scrollDirection: Axis.horizontal,
                    children:
                        [
                              'Барлығы',
                              'AI & ML',
                              'Логистика',
                              'IT & Әзірлеу',
                              'Қашықтан',
                            ]
                            .map(
                              (label) => Padding(
                                padding: const EdgeInsets.only(right: 7),
                                child: ChoiceChip(
                                  label: Text(label),
                                  selected: _filter == label,
                                  onSelected: (_) =>
                                      setState(() => _filter = label),
                                  selectedColor: AppColors.primary,
                                  labelStyle: TextStyle(
                                    color: _filter == label
                                        ? Colors.white
                                        : AppColors.muted,
                                    fontSize: 11,
                                    fontWeight: FontWeight.w700,
                                  ),
                                ),
                              ),
                            )
                            .toList(),
                  ),
                ),
                const SizedBox(height: 14),
                _banner(),
                const SizedBox(height: 14),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Табылғаны: ${list.length + 81} вакансия мен тапсырма',
                      style: const TextStyle(
                        fontSize: 11,
                        color: AppColors.muted,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const Text(
                      'Күні бойынша ▾',
                      style: TextStyle(
                        fontSize: 11,
                        color: AppColors.primary,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                for (final item in list)
                  _ChallengeCard(
                    challenge: item,
                    saved: widget.savedIds.contains(item.id),
                    onOpen: () => widget.onOpen(item),
                    onApply: () => widget.onApply(item),
                    onSaved: () => widget.onToggleSaved(item.id),
                  ),
                AppCard(
                  color: AppColors.softBlueStrong,
                  border: AppColors.softBlueStrong,
                  child: Row(
                    children: [
                      const CircleAvatar(
                        backgroundColor: AppColors.violetBright,
                        child: Icon(Icons.auto_awesome, color: Colors.white),
                      ),
                      const SizedBox(width: 10),
                      const Expanded(
                        child: Text(
                          'Өз дағдыларыңызға сай тапсырма табыңыз. Work.ai резюмеңізді сканерлейді.',
                          style: TextStyle(
                            fontSize: 11,
                            color: AppColors.muted,
                          ),
                        ),
                      ),
                      TextButton(
                        onPressed: () => showAppToast(
                          context,
                          'Резюме сканері демо режимінде',
                        ),
                        child: const Text('Талдау'),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _banner() => Container(
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(
      gradient: const LinearGradient(
        colors: [
          AppColors.primaryBright,
          AppColors.violetBright,
          AppColors.violet,
        ],
      ),
      borderRadius: BorderRadius.circular(18),
    ),
    child: const Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              '⚡ Work.ai AI Іріктеу',
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w800,
                fontSize: 11,
              ),
            ),
            Text(
              '142 жаңа тапсырма',
              style: TextStyle(color: Color(0xDDFFFFFF), fontSize: 10),
            ),
          ],
        ),
        SizedBox(height: 10),
        Text(
          'Студенттер мен мамандар үшін нақты бизнес мәселелері',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.w800,
            fontSize: 16,
          ),
        ),
        SizedBox(height: 5),
        Text(
          'AI дайындық деңгейін тексеріп, компаниялардан тікелей грант алуға көмектеседі.',
          style: TextStyle(
            color: Color(0xE6FFFFFF),
            fontSize: 11,
            height: 1.35,
          ),
        ),
      ],
    ),
  );
}

class _ChallengeCard extends StatelessWidget {
  const _ChallengeCard({
    required this.challenge,
    required this.saved,
    required this.onOpen,
    required this.onApply,
    required this.onSaved,
  });
  final Challenge challenge;
  final bool saved;
  final VoidCallback onOpen, onApply, onSaved;
  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.only(bottom: 12),
    child: InkWell(
      onTap: onOpen,
      borderRadius: BorderRadius.circular(18),
      child: AppCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                StatusPill(
                  label: challenge.category,
                  color: challenge.category.contains('Жедел')
                      ? AppColors.green
                      : AppColors.violet,
                ),
                const Spacer(),
                IconButton(
                  onPressed: onSaved,
                  visualDensity: VisualDensity.compact,
                  icon: Icon(
                    saved ? Icons.bookmark : Icons.bookmark_border,
                    color: saved ? AppColors.primary : AppColors.muted,
                  ),
                ),
              ],
            ),
            Text(
              challenge.title,
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(height: 5),
            Row(
              children: [
                Text(
                  challenge.company,
                  style: const TextStyle(
                    fontSize: 11,
                    color: AppColors.muted,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const Icon(Icons.verified, color: AppColors.primary, size: 15),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              challenge.reward,
              style: const TextStyle(
                fontWeight: FontWeight.w800,
                color: AppColors.primary,
                fontSize: 15,
              ),
            ),
            const SizedBox(height: 9),
            Container(
              padding: const EdgeInsets.all(9),
              decoration: BoxDecoration(
                color: AppColors.soft,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                children: [
                  ScoreRing(score: challenge.match, size: 38),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'AI Дайындық индексі: ${challenge.match}/100',
                          style: const TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                        const Text(
                          'Жоғары басымдық · Профильге сәйкес',
                          style: TextStyle(
                            fontSize: 10,
                            color: AppColors.green,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Icon(
                    Icons.auto_awesome,
                    color: AppColors.violet,
                    size: 18,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 9),
            Text(
              challenge.summary,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(fontSize: 11, color: AppColors.muted),
            ),
            const SizedBox(height: 9),
            Wrap(
              spacing: 5,
              children: challenge.tags
                  .map(
                    (tag) => Chip(
                      label: Text(tag),
                      labelStyle: const TextStyle(fontSize: 9),
                      side: BorderSide.none,
                      backgroundColor: AppColors.softBlue,
                      visualDensity: VisualDensity.compact,
                    ),
                  )
                  .toList(),
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Expanded(
                  child: FilledButton.icon(
                    onPressed: onApply,
                    icon: const Icon(Icons.send, size: 15),
                    label: const Text('Үн қату'),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  onPressed: () =>
                      showAppToast(context, 'Чат жақын арада ашылады'),
                  style: IconButton.styleFrom(
                    backgroundColor: AppColors.softBlue,
                    foregroundColor: AppColors.primary,
                  ),
                  icon: const Icon(Icons.chat_bubble_outline),
                ),
              ],
            ),
          ],
        ),
      ),
    ),
  );
}
