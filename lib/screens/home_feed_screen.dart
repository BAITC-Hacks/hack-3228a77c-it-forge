import '../l10n/app_language.dart';
import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/job_challenge.dart';
import 'vacancy_detail_screen.dart';
import 'application_form_screen.dart';

class HomeFeedScreen extends StatefulWidget {
  const HomeFeedScreen({super.key});

  @override
  State<HomeFeedScreen> createState() => _HomeFeedScreenState();
}

class _HomeFeedScreenState extends State<HomeFeedScreen> {
  final TextEditingController _searchController = TextEditingController();
  final _searchFocus = FocusNode();
  int _selectedFilterIndex = 1;
  final Set<String> _bookmarkedIds = {'almaty-logistics'};

  @override
  void dispose() {
    _searchController.dispose();
    _searchFocus.dispose();
    super.dispose();
  }

  final List<String> _filterChips = [
    'Барлығы',
    'AI & ML',
    'Логистика',
    'IT & Әзірлеу',
    'Қашықтан',
  ];

  @override
  Widget build(BuildContext context) {
    LanguageScope.watch(context);
    final query = _searchController.text.trim().toLowerCase();
    final challenges = JobChallenge.sampleChallenges.where((item) {
      final searchable =
          '${item.title} ${tr(item.title)} ${item.companyName} ${item.tags.join(' ')} ${item.tags.map(tr).join(' ')}'
              .toLowerCase();
      final matchesCategory = switch (_selectedFilterIndex) {
        2 => item.tags.contains('Логистика'),
        4 => item.location.contains('Қашықтан'),
        _ => true,
      };
      return matchesCategory && (query.isEmpty || searchable.contains(query));
    }).toList();

    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: _buildAppBar(),
      body: ListView(
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        children: [
          _buildSearchBar(),
          SizedBox(height: 12),
          _buildFilterChips(),
          SizedBox(height: 16),
          _buildAiSmartBanner(),
          SizedBox(height: 16),
          _buildResultsCounter(challenges.length),
          SizedBox(height: 12),
          ...challenges.map((challenge) => _buildChallengeCard(challenge)),
          if (challenges.isEmpty)
            Padding(
              padding: EdgeInsets.all(24),
              child: AppText(
                'Сұрауыңызға сәйкес жоба табылмады. Басқа сөзбен іздеп көріңіз.',
              ),
            ),
          SizedBox(height: 12),
          _buildAiResumeScannerPrompt(),
          SizedBox(height: 32),
        ],
      ),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      backgroundColor: AppTheme.surface.withValues(alpha: 0.9),
      elevation: 0,
      scrolledUnderElevation: 1,
      titleSpacing: 16,
      title: FittedBox(
        fit: BoxFit.scaleDown,
        alignment: Alignment.centerLeft,
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
                  fontSize: 16,
                ),
              ),
            ),
            SizedBox(width: 8),
            RichText(
              text: TextSpan(
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  fontFamily: 'Plus Jakarta Sans',
                ),
                children: [
                  TextSpan(
                    text: 'Work',
                    style: TextStyle(color: AppTheme.primary),
                  ),
                  TextSpan(
                    text: '.ai',
                    style: TextStyle(color: AppTheme.secondary),
                  ),
                ],
              ),
            ),
            SizedBox(width: 12),
            Container(
              padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: AppTheme.surfaceContainerLow,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  AppText(
                    'Алматы',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                      color: AppTheme.onSurfaceVariant,
                    ),
                  ),
                  Icon(Icons.expand_more, size: 16, color: AppTheme.primary),
                ],
              ),
            ),
          ],
        ),
      ),
      actions: [
        IconButton(
          icon: Icon(Icons.search, color: AppTheme.onSurface),
          onPressed: () => _searchFocus.requestFocus(),
        ),
        Stack(
          alignment: Alignment.center,
          children: [
            IconButton(
              icon: Icon(Icons.notifications_none, color: AppTheme.onSurface),
              onPressed: () => Navigator.pushNamed(context, '/responses'),
            ),
            Positioned(
              top: 12,
              right: 12,
              child: Container(
                width: 8,
                height: 8,
                decoration: BoxDecoration(
                  color: AppTheme.error,
                  shape: BoxShape.circle,
                ),
              ),
            ),
          ],
        ),
        Padding(
          padding: EdgeInsets.only(right: 16, left: 4),
          child: InkWell(
            onTap: () => Navigator.pushNamed(context, '/auth'),
            child: CircleAvatar(
              radius: 16,
              backgroundColor: AppTheme.primary,
              child: Icon(Icons.person, color: Colors.white, size: 18),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSearchBar() {
    return Row(
      children: [
        Expanded(
          child: Container(
            height: 48,
            decoration: BoxDecoration(
              color: AppTheme.surfaceContainerLow,
              borderRadius: BorderRadius.circular(12),
            ),
            padding: EdgeInsets.symmetric(horizontal: 12),
            child: Row(
              children: [
                Icon(Icons.search, color: AppTheme.outline, size: 20),
                SizedBox(width: 8),
                Expanded(
                  child: TextField(
                    controller: _searchController,
                    focusNode: _searchFocus,
                    onChanged: (_) => setState(() {}),
                    decoration: InputDecoration(
                      hintText: tr('Логистика және AI'),
                      border: InputBorder.none,
                      isDense: true,
                    ),
                    style: TextStyle(fontSize: 14),
                  ),
                ),
                GestureDetector(
                  onTap: () => setState(() => _searchController.clear()),
                  child: Icon(Icons.close, color: AppTheme.outline, size: 18),
                ),
              ],
            ),
          ),
        ),
        SizedBox(width: 8),
        Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            color: AppTheme.primary,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Stack(
            alignment: Alignment.center,
            children: [
              Icon(Icons.tune, color: Colors.white, size: 20),
              Positioned(
                top: 6,
                right: 6,
                child: Container(
                  padding: EdgeInsets.all(3),
                  decoration: BoxDecoration(
                    color: AppTheme.secondary,
                    shape: BoxShape.circle,
                  ),
                  child: AppText(
                    '2',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 10,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildFilterChips() {
    return SizedBox(
      height: 38,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: _filterChips.length,
        separatorBuilder: (_, _) => SizedBox(width: 8),
        itemBuilder: (context, index) {
          final isSelected = _selectedFilterIndex == index;
          return ChoiceChip(
            label: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                if (index == 1) ...[
                  Icon(Icons.auto_awesome, size: 14, color: Colors.white),
                  SizedBox(width: 4),
                ],
                AppText(_filterChips[index]),
              ],
            ),
            selected: isSelected,
            onSelected: (_) => setState(() => _selectedFilterIndex = index),
            selectedColor: index == 1
                ? AppTheme.primary
                : AppTheme.secondaryContainer,
            backgroundColor: AppTheme.surfaceContainerLow,
            labelStyle: TextStyle(
              color: isSelected ? Colors.white : AppTheme.onSurfaceVariant,
              fontWeight: FontWeight.w600,
              fontSize: 12.5,
            ),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
              side: BorderSide.none,
            ),
            showCheckmark: false,
          );
        },
      ),
    );
  }

  Widget _buildAiSmartBanner() {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            AppTheme.primaryContainer,
            AppTheme.secondaryContainer,
            AppTheme.secondary,
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: AppTheme.primary.withValues(alpha: 0.2),
            blurRadius: 10,
            offset: Offset(0, 4),
          ),
        ],
      ),
      padding: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: Colors.white.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    Icon(Icons.bolt, color: Colors.white, size: 14),
                    SizedBox(width: 4),
                    AppText(
                      'Work.ai AI Іріктеу',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
              AppText(
                '142 жаңа тапсырма',
                style: TextStyle(color: Colors.white70, fontSize: 11),
              ),
            ],
          ),
          SizedBox(height: 10),
          AppText(
            'Студенттер мен мамандар үшін нақты бизнес мәселелері мен жобалар',
            style: TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
              fontSize: 16,
              height: 1.3,
            ),
          ),
          SizedBox(height: 6),
          AppText(
            'Дайындығыңызды AI тесттерімен тексеріп, компаниялардан тікелей грант немесе офер ұтып алыңыз.',
            style: TextStyle(color: Colors.white70, fontSize: 12.5),
          ),
        ],
      ),
    );
  }

  Widget _buildResultsCounter(int count) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Expanded(
          child: AppText(
            'Табылғаны: $count вакансия мен тапсырма',
            style: TextStyle(
              fontSize: 12.5,
              fontWeight: FontWeight.w600,
              color: AppTheme.onSurfaceVariant,
            ),
          ),
        ),
        SizedBox(width: 12),
        Row(
          children: [
            AppText(
              'Күні бойынша',
              style: TextStyle(
                fontSize: 12.5,
                fontWeight: FontWeight.w600,
                color: AppTheme.primary,
              ),
            ),
            Icon(Icons.keyboard_arrow_down, size: 16, color: AppTheme.primary),
          ],
        ),
      ],
    );
  }

  Widget _buildChallengeCard(JobChallenge challenge) {
    final isBookmarked = _bookmarkedIds.contains(challenge.id);

    return Container(
      margin: EdgeInsets.only(bottom: 14),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.03),
            blurRadius: 8,
            offset: Offset(0, 2),
          ),
        ],
      ),
      padding: EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Wrap(
                  spacing: 6,
                  children: challenge.badges.map((b) {
                    final isFire = b.contains('Шұғыл');
                    return Container(
                      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: isFire
                            ? AppTheme.tertiary
                            : AppTheme.surfaceContainer,
                        borderRadius: BorderRadius.circular(6),
                      ),
                      child: AppText(
                        b,
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: isFire ? Colors.white : AppTheme.primary,
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ),
              GestureDetector(
                onTap: () {
                  setState(() {
                    if (isBookmarked) {
                      _bookmarkedIds.remove(challenge.id);
                    } else {
                      _bookmarkedIds.add(challenge.id);
                    }
                  });
                },
                child: Icon(
                  isBookmarked ? Icons.bookmark : Icons.bookmark_border,
                  color: isBookmarked ? AppTheme.primary : AppTheme.outline,
                  size: 24,
                ),
              ),
            ],
          ),
          SizedBox(height: 10),
          GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) =>
                      VacancyDetailScreen(challenge: challenge),
                ),
              );
            },
            child: AppText(
              challenge.title,
              style: TextStyle(
                fontSize: 16.5,
                fontWeight: FontWeight.bold,
                color: AppTheme.onSurface,
                height: 1.3,
              ),
            ),
          ),
          SizedBox(height: 4),
          Row(
            children: [
              Flexible(
                child: AppText(
                  challenge.companyName,
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    color: AppTheme.onSurfaceVariant,
                  ),
                ),
              ),
              SizedBox(width: 4),
              Icon(Icons.verified, size: 16, color: AppTheme.primary),
            ],
          ),
          SizedBox(height: 8),
          Wrap(
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              AppText(
                challenge.salaryRange,
                style: TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.primary,
                ),
              ),
              SizedBox(width: 6),
              AppText(
                challenge.grantType,
                style: TextStyle(
                  fontSize: 12,
                  color: AppTheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
          SizedBox(height: 6),
          Row(
            children: [
              Icon(
                Icons.location_on_outlined,
                size: 15,
                color: AppTheme.outline,
              ),
              SizedBox(width: 4),
              Expanded(
                child: AppText(
                  challenge.location,
                  style: TextStyle(
                    fontSize: 12.5,
                    color: AppTheme.onSurfaceVariant,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 10),
          // AI Match Bar
          Container(
            padding: EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: AppTheme.surfaceContainerLow,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 16,
                  backgroundColor: AppTheme.primary,
                  child: AppText(
                    '${challenge.aiMatchScore}%',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      AppText(
                        'AI Дайындық индексі: ${challenge.aiMatchScore}/100',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: AppTheme.onSurface,
                        ),
                      ),
                      AppText(
                        challenge.matchDescription,
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: AppTheme.tertiary,
                        ),
                      ),
                    ],
                  ),
                ),
                Icon(Icons.auto_awesome, size: 18, color: AppTheme.secondary),
              ],
            ),
          ),
          SizedBox(height: 8),
          AppText(
            challenge.description,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(fontSize: 13, color: AppTheme.onSurfaceVariant),
          ),
          SizedBox(height: 10),
          Wrap(
            spacing: 6,
            runSpacing: 6,
            children: challenge.tags.map((tag) {
              return Container(
                padding: EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppTheme.surfaceContainer,
                  borderRadius: BorderRadius.circular(6),
                ),
                child: AppText(
                  tag,
                  style: TextStyle(
                    fontSize: 11.5,
                    fontWeight: FontWeight.w500,
                    color: AppTheme.onSurface,
                  ),
                ),
              );
            }).toList(),
          ),
          SizedBox(height: 12),
          Wrap(
            spacing: 12,
            runSpacing: 4,
            children: [
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.schedule, size: 14, color: AppTheme.outline),
                  SizedBox(width: 4),
                  AppText(
                    challenge.postedTime,
                    style: TextStyle(fontSize: 11.5, color: AppTheme.outline),
                  ),
                ],
              ),
              AppText(
                challenge.responsesCount,
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.secondary,
                ),
              ),
            ],
          ),
          SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                flex: 4,
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
                  icon: Icon(Icons.send, size: 16),
                  label: AppText('Үн қату (Откликнуться)'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.primary,
                    padding: EdgeInsets.symmetric(vertical: 12),
                  ),
                ),
              ),
              SizedBox(width: 8),
              Expanded(
                flex: 1,
                child: Container(
                  height: 44,
                  decoration: BoxDecoration(
                    color: AppTheme.surfaceContainerHigh,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: IconButton(
                    icon: Icon(
                      Icons.chat_bubble_outline,
                      color: AppTheme.primary,
                      size: 20,
                    ),
                    onPressed: () {},
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildAiResumeScannerPrompt() {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerHigh,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 20,
            backgroundColor: AppTheme.secondaryContainer,
            child: Icon(Icons.smart_toy, color: Colors.white, size: 20),
          ),
          SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AppText(
                  'Өз дағдыларыңызға сәйкес тапқыңыз келе ме?',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.onSurface,
                  ),
                ),
                SizedBox(height: 2),
                AppText(
                  'Work.ai түйіндемеңізді сканерлеп, 90%+ сәйкес келетін тапсырмаларды ұсынады.',
                  style: TextStyle(
                    fontSize: 12,
                    color: AppTheme.onSurfaceVariant,
                  ),
                ),
              ],
            ),
          ),
          SizedBox(width: 8),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.primary,
              padding: EdgeInsets.symmetric(horizontal: 14, vertical: 8),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            child: AppText('Талдау', style: TextStyle(fontSize: 12)),
          ),
        ],
      ),
    );
  }
}
