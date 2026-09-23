import 'package:flutter/material.dart';
import '../../app/theme/app_colors.dart';
import '../../core/services/ai_challenge_service.dart';
import '../../shared/models/challenge.dart';
import '../../shared/widgets/app_widgets.dart';

class ChallengeBuilderScreen extends StatefulWidget {
  const ChallengeBuilderScreen({super.key});
  @override
  State<ChallengeBuilderScreen> createState() => _ChallengeBuilderScreenState();
}

class _ChallengeBuilderScreenState extends State<ChallengeBuilderScreen> {
  final problem = TextEditingController(
    text:
        'Таңертеңгі сағаттарда Алматы бойынша жеткізу маршруттары кептеліске байланысты кешігеді. Диспетчерлер бағыттарды қолмен жоспарлайды.',
  );
  final service = AiChallengeService();
  final answers = <String, TextEditingController>{};
  AiDraft? draft;
  bool loading = false;
  @override
  void dispose() {
    problem.dispose();
    for (final c in answers.values) {
      c.dispose();
    }
    super.dispose();
  }

  Future<void> analyse() async {
    FocusScope.of(context).unfocus();
    setState(() => loading = true);
    final result = await service.analyse(problem.text, {
      for (final e in answers.entries) e.key: e.value.text,
    });
    if (mounted) {
      setState(() {
        draft = result;
        loading = false;
      });
    }
  }

  void publish() {
    final item = draft;
    if (item == null) return;
    Navigator.pop(
      context,
      Challenge(
        id: 'new-logistics',
        title: item.title,
        company: 'Aibek Logistics & Supply',
        reward: '750 000 ₸',
        category: 'Жаңа челлендж',
        match: item.score,
        summary: item.summary,
        tags: const ['AI', 'Логистика', 'Optimization'],
        responses: 0,
      ),
    );
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(
      leading: const BackButton(),
      title: const Text('Жаңа бизнес-тапсырма'),
      actions: [
        TextButton(
          onPressed: draft == null ? null : publish,
          child: const Text('Жариялау'),
        ),
      ],
    ),
    body: ListView(
      padding: const EdgeInsets.all(16),
      children: [
        const Text(
          'Work.ai Challenge Copilot',
          style: TextStyle(
            color: AppColors.violet,
            fontWeight: FontWeight.w800,
            fontSize: 12,
          ),
        ),
        const SizedBox(height: 5),
        Text(
          'Мәселеңізді команда шешетін нақты челленджге айналдырыңыз.',
          style: Theme.of(context).textTheme.headlineSmall,
        ),
        const SizedBox(height: 6),
        const Text(
          'AI тек сіз берген мәліметпен жұмыс істейді. Жариялар алдында мәтінді өңдеп, растауға болады.',
          style: TextStyle(fontSize: 12, color: AppColors.muted),
        ),
        const SizedBox(height: 15),
        _card(
          '1',
          'Шикі бизнес мәселесі',
          TextField(
            controller: problem,
            maxLines: 5,
            textCapitalization: TextCapitalization.sentences,
            decoration: const InputDecoration(
              hintText: 'Қандай мәселені шешкіңіз келеді?',
            ),
          ),
        ),
        const SizedBox(height: 12),
        if (draft != null)
          _questions(draft!)
        else
          const AppCard(
            color: AppColors.soft,
            border: AppColors.soft,
            child: Row(
              children: [
                CircleAvatar(
                  backgroundColor: AppColors.violetBright,
                  child: Icon(Icons.auto_awesome, color: Colors.white),
                ),
                SizedBox(width: 9),
                Expanded(
                  child: Text(
                    'AI мәселені оқып, жетіспейтін ақпарат бойынша нақты сұрақ қояды.',
                    style: TextStyle(fontSize: 11, color: AppColors.muted),
                  ),
                ),
              ],
            ),
          ),
        const SizedBox(height: 12),
        if (draft != null) _result(draft!),
        const SizedBox(height: 14),
        FilledButton.icon(
          onPressed: loading ? null : analyse,
          style: FilledButton.styleFrom(
            minimumSize: const Size.fromHeight(52),
            backgroundColor: AppColors.primaryBright,
          ),
          icon: loading
              ? const SizedBox.square(
                  dimension: 18,
                  child: CircularProgressIndicator(
                    strokeWidth: 2,
                    color: Colors.white,
                  ),
                )
              : const Icon(Icons.auto_awesome),
          label: Text(
            draft == null
                ? 'AI-мен талдау бастау'
                : 'Дайындық деңгейін жаңарту',
          ),
        ),
      ],
    ),
  );
  Widget _card(String n, String title, Widget child) => AppCard(
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            CircleAvatar(
              radius: 12,
              backgroundColor: AppColors.softBlueStrong,
              child: Text(
                n,
                style: const TextStyle(
                  fontSize: 11,
                  color: AppColors.primary,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ),
            const SizedBox(width: 8),
            Text(
              title,
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w800),
            ),
          ],
        ),
        const SizedBox(height: 10),
        child,
      ],
    ),
  );
  Widget _questions(AiDraft value) => _card(
    '2',
    'AI нақтылау сұрақтары',
    Column(
      children: [
        for (final q in value.questions)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: TextField(
              controller: answers.putIfAbsent(q, TextEditingController.new),
              decoration: InputDecoration(
                labelText: q,
                hintText: 'Жауабыңызды жазыңыз',
              ),
            ),
          ),
      ],
    ),
  );
  Widget _result(AiDraft value) => _card(
    '3',
    'Құрылымдалған челлендж',
    Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            ScoreRing(score: value.score, size: 68),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Дайындық: ${value.score}/100',
                    style: const TextStyle(fontWeight: FontWeight.w800),
                  ),
                  const Text(
                    'Жауаптарды толықтырған сайын балл анимациямен өседі.',
                    style: TextStyle(fontSize: 10, color: AppColors.muted),
                  ),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        TextFormField(
          initialValue: value.title,
          decoration: const InputDecoration(labelText: 'Атауы'),
        ),
        const SizedBox(height: 8),
        TextFormField(
          initialValue: value.summary,
          maxLines: 4,
          decoration: const InputDecoration(labelText: 'Мәселе сипаттамасы'),
        ),
        const SizedBox(height: 10),
        const Text(
          'Жақсарту ұсыныстары',
          style: TextStyle(fontWeight: FontWeight.w800, fontSize: 12),
        ),
        for (final s in value.suggestions)
          Padding(
            padding: const EdgeInsets.only(top: 5),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Icon(
                  Icons.tips_and_updates_outlined,
                  size: 16,
                  color: AppColors.violet,
                ),
                const SizedBox(width: 6),
                Expanded(
                  child: Text(
                    s,
                    style: const TextStyle(
                      fontSize: 11,
                      color: AppColors.muted,
                    ),
                  ),
                ),
              ],
            ),
          ),
        const SizedBox(height: 10),
        FilledButton.icon(
          onPressed: publish,
          icon: const Icon(Icons.publish, size: 16),
          label: const Text('Челленджді растау және жариялау'),
        ),
      ],
    ),
  );
}
