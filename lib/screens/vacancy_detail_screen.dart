import '../l10n/app_language.dart';
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import 'application_form_screen.dart';
import '../models/job_challenge.dart';

class VacancyDetailScreen extends StatefulWidget {
  const VacancyDetailScreen({super.key, this.challenge});
  final JobChallenge? challenge;

  @override
  State<VacancyDetailScreen> createState() => _VacancyDetailScreenState();
}

class _VacancyDetailScreenState extends State<VacancyDetailScreen> {
  JobChallenge get challenge =>
      widget.challenge ?? JobChallenge.sampleChallenges.first;
  bool _isFavorite = false;

  @override
  Widget build(BuildContext context) {
    LanguageScope.watch(context);
    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(
        backgroundColor: AppTheme.surface.withValues(alpha: 0.9),
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: AppTheme.onSurface),
          onPressed: () => Navigator.pop(context),
        ),
        title: FittedBox(
          fit: BoxFit.scaleDown,
          child: Row(
            children: [
              Container(
                padding: EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: AppTheme.primary,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: AppText(
                  'W',
                  style: TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w900,
                    fontSize: 14,
                  ),
                ),
              ),
              SizedBox(width: 8),
              AppText(
                'Vacancy Detail',
                style: TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.onSurface,
                ),
              ),
            ],
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.share_outlined, color: AppTheme.onSurface),
            onPressed: () {},
          ),
          Padding(
            padding: EdgeInsets.only(right: 16),
            child: CircleAvatar(
              radius: 16,
              backgroundColor: AppTheme.primary,
              child: Icon(Icons.person, color: Colors.white, size: 18),
            ),
          ),
        ],
      ),
      body: Stack(
        children: [
          ListView(
            padding: EdgeInsets.only(bottom: 100),
            children: [
              _buildTopMetaCard(),
              SizedBox(height: 12),
              _buildAiVerifiedBanner(),
              SizedBox(height: 12),
              if (challenge.id == 'almaty-logistics') ...[
                _buildBusinessContextSection(),
                SizedBox(height: 12),
                _buildDeliverablesSection(),
                SizedBox(height: 12),
                _buildDatasetResourcesSection(),
                SizedBox(height: 12),
                _buildSkillsSection(),
                SizedBox(height: 12),
                _buildLocationSection(),
              ] else
                Padding(
                  padding: EdgeInsets.all(16),
                  child: Card(
                    child: Padding(
                      padding: EdgeInsets.all(20),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          AppText(
                            'Бизнес мәселесі және контекст',
                            style: Theme.of(context).textTheme.headlineSmall,
                          ),
                          SizedBox(height: 12),
                          AppText(
                            challenge.fullProblemContext.isEmpty
                                ? challenge.description
                                : challenge.fullProblemContext,
                          ),
                          SizedBox(height: 16),
                          Wrap(
                            spacing: 6,
                            runSpacing: 6,
                            children: challenge.tags
                                .map((tag) => Chip(label: AppText(tag)))
                                .toList(),
                          ),
                          SizedBox(height: 16),
                          AppText(challenge.location),
                        ],
                      ),
                    ),
                  ),
                ),
              SizedBox(height: 24),
            ],
          ),
          _buildFixedBottomBar(),
        ],
      ),
    );
  }

  Widget _buildTopMetaCard() {
    return Container(
      color: AppTheme.surfaceContainerLowest,
      padding: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Icon(
                    Icons.schedule,
                    size: 14,
                    color: AppTheme.onSurfaceVariant,
                  ),
                  SizedBox(width: 4),
                  AppText(
                    'Бүгін, 10:45',
                    style: TextStyle(
                      fontSize: 12,
                      color: AppTheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
              Row(
                children: [
                  Icon(
                    Icons.visibility_outlined,
                    size: 14,
                    color: AppTheme.onSurfaceVariant,
                  ),
                  SizedBox(width: 4),
                  AppText(
                    '418 қаралым',
                    style: TextStyle(
                      fontSize: 12,
                      color: AppTheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
            ],
          ),
          SizedBox(height: 10),
          AppText(
            challenge.title,
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: AppTheme.onSurface,
              height: 1.25,
            ),
          ),
          SizedBox(height: 8),
          Wrap(
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              AppText(
                challenge.salaryRange,
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.onSurface,
                ),
              ),
              SizedBox(width: 6),
              AppText(
                'қолына / келісім бойынша',
                style: TextStyle(
                  fontSize: 13,
                  color: AppTheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
          SizedBox(height: 14),
          // Company Box
          Container(
            padding: EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: AppTheme.surfaceContainerLow,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Row(
              children: [
                Container(
                  width: 42,
                  height: 42,
                  decoration: BoxDecoration(
                    color: AppTheme.surfaceContainerHigh,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Center(
                    child: AppText(
                      'A',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: AppTheme.primary,
                      ),
                    ),
                  ),
                ),
                SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Flexible(
                            child: AppText(
                              challenge.companyName,
                              style: TextStyle(
                                fontSize: 13.5,
                                fontWeight: FontWeight.bold,
                                color: AppTheme.onSurface,
                              ),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          SizedBox(width: 4),
                          Icon(
                            Icons.verified,
                            size: 16,
                            color: AppTheme.primary,
                          ),
                        ],
                      ),
                      SizedBox(height: 2),
                      Row(
                        children: [
                          Icon(Icons.star, size: 14, color: AppTheme.goldStar),
                          SizedBox(width: 2),
                          AppText(
                            '4.8',
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              color: AppTheme.goldStar,
                            ),
                          ),
                          SizedBox(width: 4),
                          AppText(
                            '· 24 пікір',
                            style: TextStyle(
                              fontSize: 12,
                              color: AppTheme.onSurfaceVariant,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                OutlinedButton(
                  onPressed: () {},
                  style: OutlinedButton.styleFrom(
                    backgroundColor: AppTheme.surfaceContainerHigh,
                    side: BorderSide.none,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    padding: EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  ),
                  child: AppText(
                    'Компания',
                    style: TextStyle(
                      color: AppTheme.primary,
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 12),
          _buildMetaRow(
            Icons.work_history_outlined,
            'Тәжірибе: 1–3 жыл немесе студенттер командасы',
          ),
          _buildMetaRow(
            Icons.home_work_outlined,
            'Жобалық жұмыс, икемді кесте, қашықтан',
          ),
          _buildMetaRow(Icons.pin_drop_outlined, 'Алматы, Достық даңғылы, 180'),
          SizedBox(height: 14),
          Row(
            children: [
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) =>
                            ApplicationFormScreen(challenge: challenge),
                      ),
                    );
                  },
                  icon: Icon(Icons.send, size: 18),
                  label: AppText('Үн қату (Жауап жіберу)'),
                  style: ElevatedButton.styleFrom(
                    padding: EdgeInsets.symmetric(vertical: 14),
                  ),
                ),
              ),
              SizedBox(width: 8),
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: _isFavorite
                      ? Color(0xFFFFDAD6)
                      : AppTheme.surfaceContainerLow,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: IconButton(
                  icon: Icon(
                    _isFavorite ? Icons.favorite : Icons.favorite_border,
                    color: _isFavorite
                        ? AppTheme.error
                        : AppTheme.onSurfaceVariant,
                  ),
                  onPressed: () => setState(() => _isFavorite = !_isFavorite),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMetaRow(IconData icon, String text) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 3),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 17, color: AppTheme.onSurfaceVariant),
          SizedBox(width: 8),
          Expanded(
            child: AppText(
              text,
              style: TextStyle(fontSize: 13, color: AppTheme.onSurfaceVariant),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAiVerifiedBanner() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16),
      padding: EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLow,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.primary.withValues(alpha: 0.15)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CircleAvatar(
            radius: 18,
            backgroundColor: AppTheme.secondaryContainer,
            child: Icon(Icons.auto_awesome, color: Colors.white, size: 18),
          ),
          SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: AppText(
                        'AI Тексеруден өткен жоба',
                        style: TextStyle(
                          fontSize: 13.5,
                          fontWeight: FontWeight.bold,
                          color: AppTheme.onSurface,
                        ),
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(
                        color: AppTheme.secondary,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: AppText(
                        '91/100',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 4),
                AppText(
                  'Мәселенің нақтылығы, берілетін деректер және бағалау критерийлері толық расталған.',
                  style: TextStyle(
                    fontSize: 12,
                    color: AppTheme.onSurfaceVariant,
                  ),
                ),
                SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: 0.91,
                    backgroundColor: AppTheme.surfaceContainer,
                    color: AppTheme.primary,
                    minHeight: 5,
                  ),
                ),
                SizedBox(height: 6),
                Wrap(
                  spacing: 12,
                  children: [
                    AppText(
                      'Сенімділік индексі: Жоғары',
                      style: TextStyle(
                        fontSize: 10.5,
                        color: AppTheme.onSurfaceVariant,
                      ),
                    ),
                    AppText(
                      'Төлем кепілдендірілген',
                      style: TextStyle(
                        fontSize: 10.5,
                        color: AppTheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBusinessContextSection() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16),
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.troubleshoot, color: AppTheme.primary, size: 20),
              SizedBox(width: 8),
              Expanded(
                child: AppText(
                  '1. Бизнес мәселесі және контекст',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
          SizedBox(height: 12),
          Container(
            height: 140,
            decoration: BoxDecoration(
              color: AppTheme.surfaceContainerHigh,
              borderRadius: BorderRadius.circular(12),
            ),
            child: Stack(
              fit: StackFit.expand,
              children: [
                Center(
                  child: Icon(
                    Icons.local_shipping,
                    size: 64,
                    color: AppTheme.primary.withValues(alpha: 0.3),
                  ),
                ),
                Positioned(
                  bottom: 8,
                  left: 8,
                  child: Container(
                    padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.black.withValues(alpha: 0.7),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: AppText(
                      'Кептеліс сынағы: Таңғы 07:30 – 10:30',
                      style: TextStyle(color: Colors.white, fontSize: 11),
                    ),
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 12),
          AppText(
            'Алматыдағы 42 жүк көлігіміз күн сайын таңертең кептелісте 3 сағатқа дейін тұрып қалады. Жеткізу бағыттары қолмен бекітілетіндіктен, жанармай шығыны 28%-ға өсті.',
            style: TextStyle(
              fontSize: 13.5,
              height: 1.45,
              color: AppTheme.onSurface,
            ),
          ),
          SizedBox(height: 12),
          Row(
            children: [
              _buildMetricCard(
                Icons.local_shipping,
                '42',
                'Жүк көлігі',
                AppTheme.primary,
              ),
              SizedBox(width: 8),
              _buildMetricCard(
                Icons.hourglass_bottom,
                '~3 сағ',
                'Кідіріс',
                AppTheme.error,
              ),
              SizedBox(width: 8),
              _buildMetricCard(
                Icons.trending_up,
                '+28%',
                'Жанармай',
                AppTheme.secondary,
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMetricCard(
    IconData icon,
    String value,
    String label,
    Color color,
  ) {
    return Expanded(
      child: Container(
        padding: EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          color: AppTheme.surfaceContainerLow,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Column(
          children: [
            Icon(icon, size: 18, color: color),
            SizedBox(height: 4),
            AppText(
              value,
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            AppText(
              label,
              style: TextStyle(fontSize: 11, color: AppTheme.onSurfaceVariant),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDeliverablesSection() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16),
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                Icons.assignment_turned_in,
                color: AppTheme.primary,
                size: 20,
              ),
              SizedBox(width: 8),
              Expanded(
                child: AppText(
                  '2. Командадан күтілетін нәтиже',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ),
          SizedBox(height: 12),
          _buildDeliverableItem(
            1,
            'Бағыттау алгоритмі',
            'Python / OR-Tools негізінде уақыт терезелерін (time-windows) ескеретін бағыттау модулі.',
          ),
          _buildDeliverableItem(
            2,
            'Диспетчерге арналған интерфейс',
            'Диспетчерлерге арналған қарапайым веб/мобильді демо-интерфейс (маршрут визуализациясы).',
          ),
          _buildDeliverableItem(
            3,
            'Тестілеу және талдау',
            '180 күндік шынайы GPS логтары бар тесттік деректер жинағымен сынақ және тиімділік есебі.',
          ),
        ],
      ),
    );
  }

  Widget _buildDeliverableItem(int index, String title, String desc) {
    return Padding(
      padding: EdgeInsets.only(bottom: 8),
      child: Container(
        padding: EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: AppTheme.surfaceContainerLow,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CircleAvatar(
              radius: 12,
              backgroundColor: AppTheme.primary.withValues(alpha: 0.15),
              child: AppText(
                '$index',
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.primary,
                ),
              ),
            ),
            SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  AppText(
                    title,
                    style: TextStyle(
                      fontSize: 13.5,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 2),
                  AppText(
                    desc,
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
      ),
    );
  }

  Widget _buildDatasetResourcesSection() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16),
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.storage, color: AppTheme.primary, size: 20),
              SizedBox(width: 8),
              AppText(
                '3. Ұсынылатын деректер мен ресурстар',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ],
          ),
          SizedBox(height: 12),
          _buildCheckBullet(
            '1.2M жолдан тұратын анонимдендірілген GPS сапар деректері.',
          ),
          _buildCheckBullet(
            '42 жүк көлігінің толық техникалық сипаттамасы мен жанармай тұтыну картасы.',
          ),
          _buildCheckBullet(
            'Yandex/2GIS бағыт API корпоративтік кілті мен геодеректер қолжетімділігі.',
          ),
        ],
      ),
    );
  }

  Widget _buildCheckBullet(String text) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(Icons.check_circle, size: 18, color: AppTheme.tertiary),
          SizedBox(width: 8),
          Expanded(
            child: AppText(
              text,
              style: TextStyle(
                fontSize: 13,
                color: AppTheme.onSurface,
                height: 1.35,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSkillsSection() {
    final skills = [
      'Python',
      'Data Analysis',
      'OR-Tools',
      'Telemetry',
      'Git',
      'REST API',
      'GeoPandas',
    ];

    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16),
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.psychology, color: AppTheme.primary, size: 20),
              SizedBox(width: 8),
              AppText(
                '4. Негізгі талаптар мен дағдылар',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ],
          ),
          SizedBox(height: 6),
          AppText(
            'Жобаға жеке маман немесе 2-4 адамнан құралған студенттік/инженерлік командалар қатыса алады.',
            style: TextStyle(fontSize: 12.5, color: AppTheme.onSurfaceVariant),
          ),
          SizedBox(height: 10),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: skills.map((skill) {
              final isSpecial = skill == 'OR-Tools';
              return Container(
                padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: isSpecial
                      ? Color(0xFFEADDFF)
                      : AppTheme.surfaceContainerHigh,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: AppText(
                  skill,
                  style: TextStyle(
                    fontSize: 12.5,
                    fontWeight: FontWeight.w600,
                    color: isSpecial ? Color(0xFF25005A) : AppTheme.primary,
                  ),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildLocationSection() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16),
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Icon(Icons.map_outlined, color: AppTheme.primary, size: 20),
                  SizedBox(width: 8),
                  AppText(
                    'Орналасқан жері',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
              AppText(
                'Алматы',
                style: TextStyle(
                  fontSize: 12,
                  color: AppTheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
          SizedBox(height: 10),
          Container(
            height: 120,
            decoration: BoxDecoration(
              color: AppTheme.surfaceContainerHigh,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.location_on, size: 36, color: AppTheme.primary),
                  AppText(
                    'Достық даңғылы, 180',
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFixedBottomBar() {
    return Align(
      alignment: Alignment.bottomCenter,
      child: Container(
        padding: EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.08),
              blurRadius: 10,
              offset: Offset(0, -3),
            ),
          ],
        ),
        child: SafeArea(
          top: false,
          child: Row(
            children: [
              Expanded(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    AppText(
                      challenge.salaryRange,
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: AppTheme.onSurface,
                      ),
                    ),
                    AppText(
                      challenge.companyName,
                      style: TextStyle(
                        fontSize: 11.5,
                        color: AppTheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ),
              ),
              ElevatedButton.icon(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) =>
                          ApplicationFormScreen(challenge: challenge),
                    ),
                  );
                },
                icon: Icon(Icons.send, size: 16),
                label: AppText('Үн қату'),
                style: ElevatedButton.styleFrom(
                  padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
