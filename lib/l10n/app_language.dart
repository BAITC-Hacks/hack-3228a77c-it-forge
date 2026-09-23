import 'package:flutter/material.dart';
import 'translations.dart';

class AppLanguage extends ValueNotifier<Locale> {
  AppLanguage._() : super(const Locale('kk'));
  static final instance = AppLanguage._();
  static const supported = [Locale('kk'), Locale('ru'), Locale('en')];

  String get code => switch (value.languageCode) {
    'ru' => 'RU',
    'en' => 'EN',
    _ => 'KZ',
  };

  void select(String code) {
    value = Locale(switch (code.toLowerCase()) {
      'ru' => 'ru',
      'en' => 'en',
      _ => 'kk',
    });
  }
}

class LanguageScope extends InheritedNotifier<AppLanguage> {
  LanguageScope({super.key, required super.child})
    : super(notifier: AppLanguage.instance);

  static void watch(BuildContext context) {
    context.dependOnInheritedWidgetOfExactType<LanguageScope>();
  }
}

final _placeholder = RegExp(r'\$\{[^}]+\}|\$[a-zA-Z_]\w*');
final _templates = translations.entries
    .where((entry) => entry.key.contains(r'$'))
    .map((entry) {
      final parts = <String>[];
      var end = 0;
      for (final match in _placeholder.allMatches(entry.key)) {
        parts.add(RegExp.escape(entry.key.substring(end, match.start)));
        parts.add('(.+?)');
        end = match.end;
      }
      parts.add(RegExp.escape(entry.key.substring(end)));
      return (
        pattern: RegExp('^${parts.join()}\$', dotAll: true),
        values: entry.value,
      );
    })
    .toList();

/// Translates application copy. Unknown text is kept verbatim.
/// Never send user-entered text to a translation service.
String tr(String source, {Locale? locale}) {
  final code = (locale ?? AppLanguage.instance.value).languageCode;
  if (code == 'kk') return sourceTranslations[source] ?? source;
  final index = code == 'ru' ? 0 : 1;
  final exact = translations[source];
  if (exact != null) return exact[index];
  for (final template in _templates) {
    final match = template.pattern.firstMatch(source);
    if (match == null) continue;
    return template.values[index].replaceAllMapped(
      RegExp(r'\{(\d+)\}'),
      (placeholder) => match.group(int.parse(placeholder[1]!) + 1)!,
    );
  }
  return source;
}

/// Localizes display copy without changing stored identifiers or user input.
class AppText extends StatelessWidget {
  const AppText(
    this.data, {
    super.key,
    this.style,
    this.textAlign,
    this.maxLines,
    this.overflow,
    this.softWrap,
    this.translate = true,
  });
  final String data;
  final TextStyle? style;
  final TextAlign? textAlign;
  final int? maxLines;
  final TextOverflow? overflow;
  final bool? softWrap;
  final bool translate;

  @override
  Widget build(BuildContext context) => ValueListenableBuilder<Locale>(
    valueListenable: AppLanguage.instance,
    builder: (_, locale, child) => Text(
      translate ? tr(data, locale: locale) : data,
      style: style,
      textAlign: textAlign,
      maxLines: maxLines,
      overflow: overflow,
      softWrap: softWrap,
    ),
  );
}
