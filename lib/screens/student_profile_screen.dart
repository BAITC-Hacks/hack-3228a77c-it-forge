import '../l10n/app_language.dart';
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class StudentProfileScreen extends StatelessWidget {
  const StudentProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    LanguageScope.watch(context);
    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back_ios_new,
            size: 18,
            color: AppTheme.primary,
          ),
          onPressed: () => Navigator.of(context).maybePop(),
          tooltip: tr('Артқа қайту'),
        ),
        title: AppText(
          'Студент профилі',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: AppTheme.onSurface,
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.share_outlined, color: AppTheme.onSurfaceVariant),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(content: AppText('Профиль сілтемесі көшірілді 🔗')),
              );
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Profile Main Card
            Container(
              padding: EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.04),
                    blurRadius: 10,
                    offset: Offset(0, 4),
                  ),
                ],
              ),
              child: Column(
                children: [
                  Row(
                    children: [
                      Container(
                        width: 60,
                        height: 60,
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            colors: [AppTheme.primary, AppTheme.secondary],
                          ),
                          borderRadius: BorderRadius.circular(18),
                        ),
                        child: Center(
                          child: AppText(
                            'НТ',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w900,
                              fontSize: 22,
                            ),
                          ),
                        ),
                      ),
                      SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Flexible(
                                  child: AppText(
                                    'Нұрислам Тастанбек',
                                    style: TextStyle(
                                      fontSize: 17,
                                      fontWeight: FontWeight.bold,
                                      color: AppTheme.onSurface,
                                    ),
                                  ),
                                ),
                                SizedBox(width: 4),
                                Icon(
                                  Icons.verified,
                                  size: 18,
                                  color: AppTheme.primary,
                                ),
                              ],
                            ),
                            SizedBox(height: 3),
                            AppText(
                              'Data Science & AI Engineer',
                              style: TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.w600,
                                color: AppTheme.primary,
                              ),
                            ),
                            SizedBox(height: 2),
                            AppText(
                              'ҚБТУ · 4-курс студенті',
                              style: TextStyle(
                                fontSize: 12,
                                color: AppTheme.onSurfaceVariant,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  Divider(height: 24),
                  Wrap(
                    crossAxisAlignment: WrapCrossAlignment.center,
                    children: [
                      AppText(
                        'Рөл: Студент / Зерттеуші',
                        style: TextStyle(
                          fontSize: 12,
                          color: AppTheme.onSurfaceVariant,
                        ),
                      ),
                      TextButton.icon(
                        onPressed: () =>
                            Navigator.pushNamed(context, '/employer'),
                        icon: Icon(Icons.swap_horiz, size: 16),
                        label: AppText(
                          'Кәсіпкер кабинетіне өту',
                          style: TextStyle(fontSize: 12),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            SizedBox(height: 14),

            // AI Match Score Banner
            Container(
              padding: EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Color(0xFF0F172A), Color(0xFF1E1B4B)],
                ),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        AppText(
                          'Work.ai Index: 96 / 100',
                          style: TextStyle(
                            color: Color(0xFFFDE047),
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                          ),
                        ),
                        SizedBox(height: 4),
                        AppText(
                          'ҚР бойынша ТОП 2% AI маманы',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 15,
                          ),
                        ),
                        SizedBox(height: 4),
                        AppText(
                          'Логистика, VRP және CV алгоритмдері бойынша жоғары деңгей',
                          style: TextStyle(color: Colors.white70, fontSize: 11),
                        ),
                      ],
                    ),
                  ),
                  Container(
                    width: 52,
                    height: 52,
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: Colors.white24),
                    ),
                    child: Center(
                      child: AppText(
                        '96%',
                        style: TextStyle(
                          color: Color(0xFFFDE047),
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 14),

            // Metrics Grid
            Row(
              children: [
                _buildStatBox('12', 'Шешілген кейс', AppTheme.primary),
                SizedBox(width: 8),
                _buildStatBox('2.4M ₸', 'Табыс / Қор', AppTheme.secondary),
                SizedBox(width: 8),
                _buildStatBox('3', 'Хакатон жеңісі', Color(0xFF059669)),
              ],
            ),
            SizedBox(height: 16),

            // Skills Section
            AppText(
              'Дағдылар мен Stack',
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.bold,
                color: AppTheme.onSurface,
              ),
            ),
            SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                Chip(label: AppText('Python (Advanced)')),
                Chip(label: AppText('PyTorch / ML')),
                Chip(label: AppText('OR-Tools / VRP')),
                Chip(label: AppText('FastAPI')),
                Chip(label: AppText('Flutter & Dart')),
                Chip(label: AppText('GeoPandas')),
                Chip(label: AppText('YOLOv8')),
              ],
            ),
            SizedBox(height: 16),

            // Verified Resume Card
            Container(
              padding: EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Color(0xFFE2E8F0)),
              ),
              child: Row(
                children: [
                  Container(
                    padding: EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: Color(0xFFDCFCE7),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Icon(Icons.picture_as_pdf, color: Color(0xFF16A34A)),
                  ),
                  SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        AppText(
                          'CV_Nurislam_Tastanbek.pdf',
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 2),
                        AppText(
                          'AI верификациядан өткен · 2026',
                          style: TextStyle(
                            fontSize: 11,
                            color: Color(0xFF16A34A),
                          ),
                        ),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: Icon(Icons.visibility_outlined, size: 20),
                    onPressed: () {},
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  static Widget _buildStatBox(String val, String label, Color color) {
    return Expanded(
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Color(0xFFE2E8F0)),
        ),
        child: Column(
          children: [
            AppText(
              val,
              style: TextStyle(
                fontSize: 17,
                fontWeight: FontWeight.bold,
                color: color,
              ),
            ),
            SizedBox(height: 2),
            AppText(
              label,
              style: TextStyle(fontSize: 10, color: AppTheme.onSurfaceVariant),
            ),
          ],
        ),
      ),
    );
  }
}
