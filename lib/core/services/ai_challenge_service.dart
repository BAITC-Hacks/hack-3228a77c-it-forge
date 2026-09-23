import '../../shared/models/challenge.dart';

/// Deterministic demo fallback: it never adds facts beyond supplied input.
class AiChallengeService {
  Future<AiDraft> analyse(String problem, Map<String, String> answers) async {
    await Future<void>.delayed(const Duration(milliseconds: 750));
    final hasContext = problem.trim().length > 35;
    final completed = answers.values
        .where((value) => value.trim().isNotEmpty)
        .length;
    final score = ((hasContext ? 32 : 12) + completed * 14).clamp(0, 91);
    return AiDraft(
      title: 'AI-мен құрылымдалған челлендж',
      summary: problem.trim().isEmpty
          ? 'Бизнес мәселесін сипаттаңыз.'
          : problem.trim(),
      score: score,
      questions: const [
        'Кім бұл шешімді күнделікті қолданады?',
        'Қандай деректер немесе материалдар беріледі?',
        'Сәтті нәтиже қалай өлшенеді?',
        'Бюджет, мерзім және техникалық шектеулер қандай?',
      ],
      suggestions: const [
        'Нақты бастапқы көрсеткішті қосыңыз.',
        'Берілетін деректердің форматын сипаттаңыз.',
        'Қабылдау критерийлерін тізімдеңіз.',
      ],
    );
  }
}
