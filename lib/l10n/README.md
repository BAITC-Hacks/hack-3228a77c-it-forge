# Application languages

The application supports Kazakh (`kk` / KZ), Russian (`ru` / RU), and English
(`en` / EN). `AppLanguage.instance` holds the selection for the current session.
The profile/sign-in page's original KZ / RU / EN selectors update this shared
state. Flutter's standard controls use the same locale. Other app bars keep their
original layout without additional language controls.

Display application text with `AppText`. Use `tr()` for input hints, validators,
tooltips, and text inserted by the application into editable fields. Screens with
these non-widget strings subscribe through `LanguageScope.watch(context)`.

Do not translate identifiers used by filters or business rules. User-entered
task descriptions, custom answers and chat messages must remain unchanged; use
`AppText(..., translate: false)` for them.

`catalog.json` maps existing source copy to `[Russian, English]`. English source
labels that also need a Kazakh version are covered by `catalog_kk.json`. Dynamic
source templates keep their Dart-style placeholders in the key and use `{0}`,
`{1}`, etc. in translations. Captured values are preserved verbatim.

After editing the catalogs, regenerate the checked-in Dart map:

```powershell
python -X utf8 tool/generate_localizations.py
dart format lib/l10n/translations.dart
flutter test
```

Translations are bundled and do not require network access. Topic detection for
the local task clarification flow accepts keywords in all three languages.
