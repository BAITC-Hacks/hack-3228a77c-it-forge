import 'package:flutter/material.dart';

import '../../app/theme/app_colors.dart';

class AppCard extends StatelessWidget {
  const AppCard({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(16),
    this.color,
    this.border,
  });
  final Widget child;
  final EdgeInsets padding;
  final Color? color;
  final Color? border;
  @override
  Widget build(BuildContext context) => Container(
    padding: padding,
    decoration: BoxDecoration(
      color: color ?? AppColors.surface,
      borderRadius: BorderRadius.circular(18),
      border: Border.all(color: border ?? AppColors.outline),
      boxShadow: const [
        BoxShadow(
          color: Color(0x0A131B2E),
          blurRadius: 10,
          offset: Offset(0, 3),
        ),
      ],
    ),
    child: child,
  );
}

class BrandMark extends StatelessWidget {
  const BrandMark({super.key, this.compact = false});
  final bool compact;
  @override
  Widget build(BuildContext context) => Row(
    mainAxisSize: MainAxisSize.min,
    children: [
      Container(
        width: compact ? 28 : 34,
        height: compact ? 28 : 34,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: AppColors.primary,
          borderRadius: BorderRadius.circular(compact ? 8 : 10),
        ),
        child: Text(
          'W',
          style: TextStyle(
            color: Colors.white,
            fontSize: compact ? 14 : 17,
            fontWeight: FontWeight.w900,
          ),
        ),
      ),
      const SizedBox(width: 8),
      RichText(
        text: const TextSpan(
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
          children: [
            TextSpan(
              text: 'Work',
              style: TextStyle(color: AppColors.primary),
            ),
            TextSpan(
              text: '.ai',
              style: TextStyle(color: AppColors.violet),
            ),
          ],
        ),
      ),
    ],
  );
}

class ScoreRing extends StatelessWidget {
  const ScoreRing({super.key, required this.score, this.size = 48});
  final int score;
  final double size;
  @override
  Widget build(BuildContext context) => SizedBox(
    width: size,
    height: size,
    child: TweenAnimationBuilder<double>(
      tween: Tween(begin: 0, end: score / 100),
      duration: const Duration(milliseconds: 900),
      curve: Curves.easeOutCubic,
      builder: (context, value, _) => Stack(
        alignment: Alignment.center,
        children: [
          CircularProgressIndicator(
            value: value,
            strokeWidth: size * .12,
            color: score >= 70 ? AppColors.primary : AppColors.violet,
            backgroundColor: AppColors.softBlueStrong,
          ),
          Text(
            '${(value * 100).round()}',
            style: TextStyle(
              fontSize: size * .24,
              fontWeight: FontWeight.w800,
              color: AppColors.ink,
            ),
          ),
        ],
      ),
    ),
  );
}

class StatusPill extends StatelessWidget {
  const StatusPill({
    super.key,
    required this.label,
    this.color = AppColors.primary,
  });
  final String label;
  final Color color;
  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
    decoration: BoxDecoration(
      color: color.withValues(alpha: .11),
      borderRadius: BorderRadius.circular(7),
    ),
    child: Text(
      label,
      style: TextStyle(color: color, fontWeight: FontWeight.w800, fontSize: 10),
    ),
  );
}

class EmptyState extends StatelessWidget {
  const EmptyState({
    super.key,
    required this.icon,
    required this.title,
    required this.detail,
  });
  final IconData icon;
  final String title;
  final String detail;
  @override
  Widget build(BuildContext context) => Center(
    child: Padding(
      padding: const EdgeInsets.all(32),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          CircleAvatar(
            radius: 32,
            backgroundColor: AppColors.softBlue,
            child: Icon(icon, size: 30, color: AppColors.primary),
          ),
          const SizedBox(height: 14),
          Text(title, style: Theme.of(context).textTheme.titleMedium),
          const SizedBox(height: 6),
          Text(
            detail,
            textAlign: TextAlign.center,
            style: Theme.of(context).textTheme.bodySmall,
          ),
        ],
      ),
    ),
  );
}

void showAppToast(BuildContext context, String message) {
  ScaffoldMessenger.of(context)
    ..clearSnackBars()
    ..showSnackBar(
      SnackBar(
        content: Text(message),
        behavior: SnackBarBehavior.floating,
        backgroundColor: const Color(0xFF283044),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        duration: const Duration(seconds: 2),
      ),
    );
}
