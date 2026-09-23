import 'package:flutter/material.dart';

import 'app_colors.dart';

abstract final class AppTheme {
  static ThemeData get light => ThemeData(
    useMaterial3: true,
    scaffoldBackgroundColor: AppColors.background,
    colorScheme: const ColorScheme.light(
      primary: AppColors.primary,
      secondary: AppColors.violet,
      surface: AppColors.surface,
      error: AppColors.danger,
      onSurface: AppColors.ink,
    ),
    fontFamily: 'Arial',
    textTheme: const TextTheme(
      headlineSmall: TextStyle(
        fontSize: 22,
        height: 1.18,
        fontWeight: FontWeight.w800,
        color: AppColors.ink,
      ),
      titleLarge: TextStyle(
        fontSize: 18,
        height: 1.2,
        fontWeight: FontWeight.w800,
        color: AppColors.ink,
      ),
      titleMedium: TextStyle(
        fontSize: 15,
        height: 1.25,
        fontWeight: FontWeight.w700,
        color: AppColors.ink,
      ),
      bodyMedium: TextStyle(fontSize: 14, height: 1.42, color: AppColors.ink),
      bodySmall: TextStyle(fontSize: 12, height: 1.35, color: AppColors.muted),
    ),
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: AppColors.soft,
      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 13),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: BorderSide.none,
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: BorderSide.none,
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: const BorderSide(color: AppColors.primary, width: 1.5),
      ),
    ),
  );
}
