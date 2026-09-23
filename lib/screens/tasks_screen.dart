import '../l10n/app_language.dart';
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class TasksScreen extends StatefulWidget {
  const TasksScreen({super.key});

  @override
  State<TasksScreen> createState() => _TasksScreenState();
}

class _TasksScreenState extends State<TasksScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

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
          'Менің тапсырмаларым',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: AppTheme.onSurface,
          ),
        ),
        bottom: TabBar(
          controller: _tabController,
          labelColor: AppTheme.primary,
          unselectedLabelColor: AppTheme.onSurfaceVariant,
          indicatorColor: AppTheme.primary,
          tabs: [
            Tab(text: 'Белсенді (2)'),
            Tab(text: 'Аяқталған (1)'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          // Active Tasks
          ListView(
            padding: EdgeInsets.all(16),
            children: [
              _buildTaskCard(
                title: '42 жүк көлігінің логистикасын AI арқылы оңтайландыру',
                company: 'Aibek Logistics & Supply',
                reward: '850 000 ₸',
                deadline: '6 күн қалды',
                progress: 0.65,
                progressLabel: '65% орындалды',
              ),
              SizedBox(height: 12),
              _buildTaskCard(
                title: 'ZanTech: ҚР заңнамасын талдайтын RAG-ассистент',
                company: 'ZanTech AI Solutions',
                reward: '1 200 000 ₸',
                deadline: '18 күн қалды',
                progress: 0.25,
                progressLabel: '25% (Датасет жинау)',
              ),
            ],
          ),

          // Completed Tasks
          ListView(
            padding: EdgeInsets.all(16),
            children: [
              Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Color(0xFF86EFAC)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        AppText(
                          'Жеңімпаз 🏆 · Толық төленді',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF16A34A),
                          ),
                        ),
                        AppText(
                          '+650 000 ₸',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF16A34A),
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 8),
                    AppText(
                      'AgroData: Егістік ылғалын спутниктік талдау моделі',
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    SizedBox(height: 4),
                    AppText(
                      'Тапсырыс беруші бағасы: 5.0 ⭐⭐⭐⭐⭐',
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
        ],
      ),
    );
  }

  Widget _buildTaskCard({
    required String title,
    required String company,
    required String reward,
    required String deadline,
    required double progress,
    required String progressLabel,
  }) {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.03),
            blurRadius: 10,
            offset: Offset(0, 3),
          ),
        ],
        border: Border.all(color: Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              AppText(
                company,
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.onSurfaceVariant,
                ),
              ),
              AppText(
                reward,
                style: TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.primary,
                ),
              ),
            ],
          ),
          SizedBox(height: 8),
          AppText(
            title,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: AppTheme.onSurface,
            ),
          ),
          SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              AppText(
                progressLabel,
                style: TextStyle(fontSize: 11.5, fontWeight: FontWeight.w500),
              ),
              AppText(
                deadline,
                style: TextStyle(
                  fontSize: 11.5,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFFD97706),
                ),
              ),
            ],
          ),
          SizedBox(height: 6),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: progress,
              backgroundColor: Color(0xFFF1F5F9),
              color: AppTheme.primary,
              minHeight: 6,
            ),
          ),
          SizedBox(height: 14),
          Row(
            children: [
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: AppText('Шешімді тапсыру терезесі ашылды 🚀'),
                      ),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.primary,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  icon: Icon(Icons.send, size: 16),
                  label: AppText(
                    'Шешімді тапсыру',
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
