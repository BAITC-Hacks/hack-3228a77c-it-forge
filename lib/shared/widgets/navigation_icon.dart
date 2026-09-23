import 'package:flutter/material.dart';

/// Outline icons drawn on a shared grid to match the navigation design.
class AppNavigationIcon extends StatelessWidget {
  const AppNavigationIcon({
    super.key,
    required this.index,
    this.selected = false,
  });

  final int index;
  final bool selected;

  static const activeColor = Color(0xFF003CC5);
  static const inactiveColor = Color(0xFF647A99);

  @override
  Widget build(BuildContext context) => SizedBox(
    width: 40,
    height: 32,
    child: CustomPaint(
      painter: _NavigationIconPainter(
        index,
        selected ? activeColor : inactiveColor,
      ),
    ),
  );
}

class _NavigationIconPainter extends CustomPainter {
  const _NavigationIconPainter(this.index, this.color);

  final int index;
  final Color color;

  @override
  void paint(Canvas canvas, Size size) {
    canvas.save();
    canvas.scale(size.width / 40, size.height / 32);
    final stroke = Paint()
      ..color = color
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2.4
      ..strokeCap = StrokeCap.round
      ..strokeJoin = StrokeJoin.round;
    switch (index) {
      case 0:
        canvas.drawCircle(const Offset(18, 14), 10.5, stroke);
        canvas.drawLine(const Offset(25.5, 21.5), const Offset(31, 27), stroke);
      case 1:
        canvas.drawRRect(
          RRect.fromRectAndRadius(
            const Rect.fromLTWH(7, 7, 26, 19),
            const Radius.circular(2),
          ),
          stroke,
        );
        canvas.drawPath(
          Path()
            ..moveTo(15, 26)
            ..lineTo(15, 5)
            ..quadraticBezierTo(15, 2, 18, 2)
            ..lineTo(22, 2)
            ..quadraticBezierTo(25, 2, 25, 5)
            ..lineTo(25, 26),
          stroke,
        );
        canvas.drawCircle(
          const Offset(37, 6),
          6.5,
          Paint()..color = const Color(0xFF2163FF),
        );
      case 2:
        canvas.drawPath(
          Path()
            ..moveTo(7, 9)
            ..lineTo(20, 2)
            ..lineTo(33, 9)
            ..lineTo(20, 16)
            ..close(),
          stroke,
        );
        for (final y in [15.0, 21.0]) {
          canvas.drawPath(
            Path()
              ..moveTo(7, y)
              ..lineTo(20, y + 7)
              ..lineTo(33, y),
            stroke,
          );
        }
      case 3:
        canvas.drawPath(
          Path()
            ..moveTo(10, 3)
            ..lineTo(30, 3)
            ..quadraticBezierTo(33, 3, 33, 6)
            ..lineTo(33, 21)
            ..quadraticBezierTo(33, 24, 30, 24)
            ..lineTo(14, 24)
            ..lineTo(7, 28)
            ..lineTo(7, 6)
            ..quadraticBezierTo(7, 3, 10, 3)
            ..close(),
          stroke,
        );
        canvas.drawCircle(
          const Offset(20, 6),
          6.5,
          Paint()..color = const Color(0xFF00BB83),
        );
      case 4:
        canvas.drawOval(const Rect.fromLTWH(14.5, 3, 11, 12), stroke);
        canvas.drawPath(
          Path()
            ..moveTo(11, 27)
            ..lineTo(11, 24)
            ..cubicTo(11, 17, 29, 17, 29, 24)
            ..lineTo(29, 27),
          stroke,
        );
    }
    canvas.restore();
  }

  @override
  bool shouldRepaint(_NavigationIconPainter oldDelegate) =>
      oldDelegate.index != index || oldDelegate.color != color;
}
