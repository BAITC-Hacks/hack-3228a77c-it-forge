class Challenge {
  const Challenge({
    required this.id,
    required this.title,
    required this.company,
    required this.reward,
    required this.category,
    required this.match,
    required this.summary,
    required this.tags,
    this.responses = 4,
    this.isPublished = true,
  });
  final String id;
  final String title;
  final String company;
  final String reward;
  final String category;
  final int match;
  final String summary;
  final List<String> tags;
  final int responses;
  final bool isPublished;
  Challenge copyWith({int? match, bool? isPublished}) => Challenge(
    id: id,
    title: title,
    company: company,
    reward: reward,
    category: category,
    match: match ?? this.match,
    summary: summary,
    tags: tags,
    responses: responses,
    isPublished: isPublished ?? this.isPublished,
  );
}

class AiDraft {
  const AiDraft({
    required this.title,
    required this.summary,
    required this.questions,
    required this.suggestions,
    required this.score,
  });
  final String title;
  final String summary;
  final List<String> questions;
  final List<String> suggestions;
  final int score;
}
