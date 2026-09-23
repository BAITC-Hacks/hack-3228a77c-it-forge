import '../l10n/app_language.dart';
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import 'new_task_screen.dart';

class EmployerProfileScreen extends StatelessWidget {
  const EmployerProfileScreen({super.key});

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
          'Кәсіпкер кабинеті (Бизнес)',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: AppTheme.onSurface,
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.tune, color: AppTheme.onSurfaceVariant),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Company Profile Card
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
                        width: 56,
                        height: 56,
                        decoration: BoxDecoration(
                          color: AppTheme.primary,
                          borderRadius: BorderRadius.circular(16),
                        ),
                        child: Icon(
                          Icons.local_shipping,
                          color: Colors.white,
                          size: 30,
                        ),
                      ),
                      SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            AppText(
                              'Aibek Logistics & Supply',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            SizedBox(height: 2),
                            AppText(
                              'Айбек Сейітов · Бас директор',
                              style: TextStyle(
                                fontSize: 12,
                                color: AppTheme.onSurfaceVariant,
                              ),
                            ),
                            SizedBox(height: 2),
                            Row(
                              children: [
                                Icon(
                                  Icons.security,
                                  size: 14,
                                  color: Color(0xFF059669),
                                ),
                                SizedBox(width: 4),
                                Flexible(
                                  child: AppText(
                                    'Тексерілген компания (БСН 190440012)',
                                    style: TextStyle(
                                      fontSize: 11,
                                      color: Color(0xFF059669),
                                    ),
                                  ),
                                ),
                              ],
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
                        'Рөл: Жұмыс беруші',
                        style: TextStyle(
                          fontSize: 12,
                          color: AppTheme.onSurfaceVariant,
                        ),
                      ),
                      TextButton.icon(
                        onPressed: () =>
                            Navigator.pushNamed(context, '/student'),
                        icon: Icon(Icons.school, size: 16),
                        label: AppText(
                          'Студент режиміне өту',
                          style: TextStyle(fontSize: 12),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            SizedBox(height: 14),

            // Escrow Balance Box
            Container(
              padding: EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Color(0xFF0F172A), Color(0xFF1E293B)],
                ),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  AppText(
                    'Қорғалған Смарт-Эскроу Балансы',
                    style: TextStyle(color: Colors.white70, fontSize: 12),
                  ),
                  SizedBox(height: 6),
                  AppText(
                    '3 400 000 ₸',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 4),
                  AppText(
                    'Студенттер тапсырманы орындап өткізгенде ғана төленеді.',
                    style: TextStyle(color: Colors.white60, fontSize: 11),
                  ),
                ],
              ),
            ),
            SizedBox(height: 14),

            // Post New Task Button
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton.icon(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => NewTaskScreen()),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.primary,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(14),
                  ),
                ),
                icon: Icon(Icons.add_task),
                label: AppText(
                  '+ Жаңа тапсырма жариялау',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
              ),
            ),
            SizedBox(height: 20),

            // Active Challenges Posted
            AppText(
              'Жарияланған белсенді тапсырмалар (2)',
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.bold,
                color: AppTheme.onSurface,
              ),
            ),
            SizedBox(height: 10),

            _buildChallengeCard(
              title: '42 жүк көлігінің бағытын AI арқылы оңтайландыру',
              budget: '850 000 ₸',
              responses: '24 үн қату',
              status: 'Белсенді',
              statusColor: Color(0xFF10B981),
            ),
            SizedBox(height: 10),
            _buildChallengeCard(
              title: 'С қоймасындағы тауар есебін CV арқылы автоматтандыру',
              budget: '1 200 000 ₸',
              responses: '11 үн қату',
              status: 'Қаралуда',
              statusColor: Color(0xFFF59E0B),
            ),
          ],
        ),
      ),
    );
  }

  static Widget _buildChallengeCard({
    required String title,
    required String budget,
    required String responses,
    required String status,
    required Color statusColor,
  }) {
    return Container(
      padding: EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: statusColor.withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: AppText(
                  status,
                  style: TextStyle(
                    color: statusColor,
                    fontSize: 11,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              AppText(
                budget,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.primary,
                ),
              ),
            ],
          ),
          SizedBox(height: 8),
          AppText(
            title,
            style: TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              AppText(
                responses,
                style: TextStyle(
                  fontSize: 11.5,
                  color: AppTheme.onSurfaceVariant,
                ),
              ),
              AppText(
                'Кандидаттарды қарау →',
                style: TextStyle(
                  fontSize: 11.5,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.primary,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
