export interface FlutterFile {
  path: string;
  name: string;
  category: 'core' | 'screens' | 'widgets' | 'models' | 'config';
  description: string;
  code: string;
}

export const FLUTTER_PROJECT_FILES: FlutterFile[] = [
  {
    path: 'pubspec.yaml',
    name: 'pubspec.yaml',
    category: 'config',
    description: 'Flutter жобасының тәуелділіктері мен шрифтері (Google Fonts, Cupertino Icons, Lucide)',
    code: `name: work_ai
description: "Work.ai - Қазақстандағы бизнес мәселелерін шешуге арналған жасанды интеллект платформасы"
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.2.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  google_fonts: ^6.2.1
  flutter_svg: ^2.0.10+1
  lucide_icons: ^0.257.0
  intl: ^0.19.0
  provider: ^6.1.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.2

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/icons/
`
  },
  {
    path: 'lib/main.dart',
    name: 'main.dart',
    category: 'core',
    description: 'Қосымшаның негізгі кіру нүктесі, тақырыбы (ThemeData) және навигация маршруттары',
    code: `import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'theme/app_theme.dart';
import 'screens/home_feed_screen.dart';
import 'screens/vacancy_detail_screen.dart';
import 'screens/application_form_screen.dart';
import 'screens/auth_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
    ),
  );
  runApp(const WorkAiApp());
}

class WorkAiApp extends StatelessWidget {
  const WorkAiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Work.ai',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      initialRoute: '/',
      routes: {
        '/': (context) => const MainNavigationShell(),
        '/detail': (context) => const VacancyDetailScreen(),
        '/apply': (context) => const ApplicationFormScreen(),
        '/auth': (context) => const AuthScreen(),
      },
    );
  }
}

class MainNavigationShell extends StatefulWidget {
  const MainNavigationShell({super.key});

  @override
  State<MainNavigationShell> createState() => _MainNavigationShellState();
}

class _MainNavigationShellState extends State<MainNavigationShell> {
  int _currentIndex = 0;

  final List<Widget> _screens = const [
    HomeFeedScreen(),
    Center(child: Text('Жауаптар (Отклики)', style: TextStyle(fontWeight: FontWeight.w600))),
    Center(child: Text('Менің тапсырмаларым', style: TextStyle(fontWeight: FontWeight.w600))),
    Center(child: Text('Чаттар', style: TextStyle(fontWeight: FontWeight.w600))),
    AuthScreen(), // Профиль және кіру экраны
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.95),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.04),
              blurRadius: 10,
              offset: const Offset(0, -3),
            ),
          ],
        ),
        child: SafeArea(
          child: SizedBox(
            height: 64,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildNavItem(0, Icons.travel_explore, 'Іздеу'),
                _buildNavItem(1, Icons.mark_email_read_outlined, 'Жауаптар'),
                _buildNavItem(2, Icons.assignment_outlined, 'Тапсырма...'),
                _buildNavItem(3, Icons.forum_outlined, 'Чат'),
                _buildNavItem(4, Icons.account_circle_outlined, 'Профиль'),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem(int index, IconData icon, String label) {
    final isSelected = _currentIndex == index;
    final color = isSelected ? AppTheme.primary : AppTheme.onSurfaceVariant;

    return InkWell(
      onTap: () => setState(() => _currentIndex = index),
      borderRadius: BorderRadius.circular(12),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, color: color, size: 24),
            const SizedBox(height: 2),
            Text(
              label,
              style: TextStyle(
                fontSize: 11,
                fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
                color: color,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`
  },
  {
    path: 'lib/theme/app_theme.dart',
    name: 'app_theme.dart',
    category: 'core',
    description: 'Work.ai түстер палитрасы, қаріптер (Google Fonts Plus Jakarta Sans & Inter) мен стильдер',
    code: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Brand Colors
  static const Color primary = Color(0xFF0037B0);
  static const Color primaryContainer = Color(0xFF1D4ED8);
  static const Color secondary = Color(0xFF712AE2);
  static const Color secondaryContainer = Color(0xFF8A4CFC);
  static const Color tertiary = Color(0xFF004F35);
  static const Color tertiaryFixed = Color(0xFF85F8C4);
  
  // Surfaces & Backgrounds
  static const Color background = Color(0xFFFAF8FF);
  static const Color surface = Color(0xFFFAF8FF);
  static const Color surfaceContainerLowest = Color(0xFFFFFFFF);
  static const Color surfaceContainerLow = Color(0xFFF2F3FF);
  static const Color surfaceContainer = Color(0xFFEAEDFF);
  static const Color surfaceContainerHigh = Color(0xFFE2E7FF);
  static const Color surfaceContainerHighest = Color(0xFFDAE2FD);
  
  // Content Colors
  static const Color onSurface = Color(0xFF131B2E);
  static const Color onSurfaceVariant = Color(0xFF434655);
  static const Color outline = Color(0xFF747686);
  static const Color error = Color(0xFFBA1A1A);
  static const Color goldStar = Color(0xFFD97706);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: surface,
      colorScheme: const ColorScheme.light(
        primary: primary,
        secondary: secondary,
        tertiary: tertiary,
        surface: surface,
        onSurface: onSurface,
        error: error,
      ),
      textTheme: GoogleFonts.interTextTheme().copyWith(
        displayLarge: GoogleFonts.plusJakartaSans(
          fontSize: 34,
          fontWeight: FontWeight.w700,
          color: onSurface,
          letterSpacing: -0.8,
        ),
        headlineMedium: GoogleFonts.plusJakartaSans(
          fontSize: 22,
          fontWeight: FontWeight.w700,
          color: onSurface,
          letterSpacing: -0.4,
        ),
        headlineSmall: GoogleFonts.plusJakartaSans(
          fontSize: 18,
          fontWeight: FontWeight.w700,
          color: onSurface,
        ),
        titleMedium: GoogleFonts.inter(
          fontSize: 15,
          fontWeight: FontWeight.w600,
          color: onSurface,
        ),
        bodyMedium: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          color: onSurface,
          height: 1.45,
        ),
        bodySmall: GoogleFonts.inter(
          fontSize: 12.5,
          fontWeight: FontWeight.w400,
          color: onSurfaceVariant,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: Colors.white,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: GoogleFonts.inter(
            fontSize: 14,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),
      cardTheme: CardTheme(
        color: surfaceContainerLowest,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
      ),
    );
  }
}
`
  },
  {
    path: 'lib/models/job_challenge.dart',
    name: 'job_challenge.dart',
    category: 'models',
    description: 'Жобалар, вакансиялар және AI матч көрсеткіштерінің деректер моделі',
    code: `class JobChallenge {
  final String id;
  final String title;
  final String companyName;
  final bool isVerifiedCompany;
  final String salaryRange;
  final String grantType;
  final String location;
  final int aiMatchScore;
  final String matchDescription;
  final String description;
  final List<String> tags;
  final String postedTime;
  final String responsesCount;
  final List<String> badges;
  final String companyRating;
  final int reviewCount;
  final String fullProblemContext;
  final List<String> deliverables;
  final List<String> datasetFeatures;

  const JobChallenge({
    required this.id,
    required this.title,
    required this.companyName,
    this.isVerifiedCompany = true,
    required this.salaryRange,
    required this.grantType,
    required this.location,
    required this.aiMatchScore,
    required this.matchDescription,
    required this.description,
    required this.tags,
    required this.postedTime,
    required this.responsesCount,
    this.badges = const [],
    this.companyRating = '4.8',
    this.reviewCount = 24,
    this.fullProblemContext = '',
    this.deliverables = const [],
    this.datasetFeatures = const [],
  });

  static List<JobChallenge> get sampleChallenges => [
    const JobChallenge(
      id: 'almaty-logistics',
      title: 'Алматы көлік логистикасының динамикалық бағыттарын оңтайландыру',
      companyName: 'Aibek Construction & Logistics',
      isVerifiedCompany: true,
      salaryRange: '650 000 – 1 200 000 ₸',
      grantType: 'жоба гранты',
      location: 'Алматы · Қашықтан / Гибрид',
      aiMatchScore: 91,
      matchDescription: 'Жоғары басымдық · Профильге сәйкес',
      description: 'Таулы аймақтардағы жеткізу кешігулерін азайту үшін OR-Tools және Python негізінде телеметрия шешімін жасау.',
      tags: ['Python', 'OR-Tools', 'Логистика', 'GPS Data'],
      postedTime: 'Бүгін, 14:20',
      responsesCount: '4 команда жауап берді',
      badges: ['Шұғыл челлендж', 'Гранттық жоба'],
      companyRating: '4.8',
      reviewCount: 24,
      fullProblemContext: 'Алматыдағы 42 жүк көлігіміз күн сайын таңертең кептелісте 3 сағатқа дейін тұрып қалады. Жеткізу бағыттары қолмен бекітілетіндіктен, жанармай шығыны 28%-ға өсті.',
      deliverables: [
        'Бағыттау алгоритмі: Python / OR-Tools негізінде уақыт терезелерін (time-windows) ескеретін бағыттау модулі.',
        'Диспетчерге арналған веб-интерфейс: Маршрут визуализациясы және бақылау құралы.',
        'Тестілеу және талдау: 180 күндік шынайы GPS логтарымен сынақ нәтижелері.',
      ],
      datasetFeatures: [
        '1.2M жолдан тұратын анонимдендірілген GPS сапар деректері (Parquet / CSV).',
        '42 жүк көлігінің толық техникалық сипаттамасы мен тұтыну картасы.',
        'Yandex/2GIS бағыт API корпоративтік кілті мен геодеректер қолжетімділігі.',
      ],
    ),
    const JobChallenge(
      id: 'zantech-nlp',
      title: 'Құқықтық құжаттар үшін қазақ тіліндегі нақты уақыттағы транскрипция моделі',
      companyName: 'ZanTech AI Solutions',
      isVerifiedCompany: true,
      salaryRange: '800 000 – 1 500 000 ₸',
      grantType: 'айына',
      location: 'Астана / Алматы · Толық күн',
      aiMatchScore: 94,
      matchDescription: 'Дауыс өңдеу бойынша тамаша үйлесім',
      description: 'Қазақ тіліндегі арнайы заң терминдерін нақты танитын Whisper & PyTorch негізіндегі модельді оқыту және оңтайландыру.',
      tags: ['NLP', 'Whisper', 'PyTorch', 'Kazakh Speech'],
      postedTime: 'Кеше',
      responsesCount: '7 ұсыныс түсті',
      badges: ['ҒЗИ & Бизнес', 'Тікелей жұмыс беруші'],
    ),
    const JobChallenge(
      id: 'magnum-churn',
      title: 'Бөлшек сауда желісіне арналған Smart Клиенттерді болжау моделі',
      companyName: 'Magnum Analytics',
      isVerifiedCompany: true,
      salaryRange: '500 000 – 900 000 ₸',
      grantType: 'қолға (net)',
      location: 'Алматы · Кеңседе (Розыбакиев көш.)',
      aiMatchScore: 88,
      matchDescription: 'Деректер талдауы бойынша сәйкес',
      description: 'Тұтынушылардың қайтып келу жиілігін бағалау, адалдық жүйесінің транзакциялық деректерін талдау және витриналарды оңтайландыру.',
      tags: ['Data Science', 'SQL', 'Tableau', 'Churn Modeling'],
      postedTime: '3 сағат бұрын',
      responsesCount: '12 жауап қаралуда',
      badges: ['Бөлшек сауда', 'Тәжірибе: 1-3 жыл'],
    ),
  ];
}
`
  },
  {
    path: 'lib/screens/home_feed_screen.dart',
    name: 'home_feed_screen.dart',
    category: 'screens',
    description: '1-экран: Іздеу, сүзгілер, AI таңдау баннері және жобалар лентасы',
    code: `import 'package:flutter/material.dart';
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
  final TextEditingController _searchController =
      TextEditingController(text: 'Логистика және AI');
  int _selectedFilterIndex = 1;
  final Set<String> _bookmarkedIds = {};

  final List<String> _filterChips = [
    'Барлығы',
    'AI & ML',
    'Логистика',
    'IT & Әзірлеу',
    'Қашықтан',
  ];

  @override
  Widget build(BuildContext context) {
    final challenges = JobChallenge.sampleChallenges;

    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: _buildAppBar(),
      body: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        children: [
          _buildSearchBar(),
          const SizedBox(height: 12),
          _buildFilterChips(),
          const SizedBox(height: 16),
          _buildAiSmartBanner(),
          const SizedBox(height: 16),
          _buildResultsCounter(challenges.length),
          const SizedBox(height: 12),
          ...challenges.map((challenge) => _buildChallengeCard(challenge)),
          const SizedBox(height: 12),
          _buildAiResumeScannerPrompt(),
          const SizedBox(height: 32),
        ],
      ),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      backgroundColor: AppTheme.surface.withOpacity(0.9),
      elevation: 0,
      scrolledUnderElevation: 1,
      titleSpacing: 16,
      title: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(6),
            decoration: BoxDecoration(
              color: AppTheme.primary,
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Text(
              'W',
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w900,
                fontSize: 16,
              ),
            ),
          ),
          const SizedBox(width: 8),
          RichText(
            text: const TextSpan(
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                fontFamily: 'Plus Jakarta Sans',
              ),
              children: [
                TextSpan(text: 'Work', style: TextStyle(color: AppTheme.primary)),
                TextSpan(text: '.ai', style: TextStyle(color: AppTheme.secondary)),
              ],
            ),
          ),
          const SizedBox(width: 12),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: AppTheme.surfaceContainerLow,
              borderRadius: BorderRadius.circular(16),
            ),
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
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
      actions: [
        IconButton(
          icon: const Icon(Icons.search, color: AppTheme.onSurface),
          onPressed: () {},
        ),
        Stack(
          alignment: Alignment.center,
          children: [
            IconButton(
              icon: const Icon(Icons.notifications_none, color: AppTheme.onSurface),
              onPressed: () {},
            ),
            Positioned(
              top: 12,
              right: 12,
              child: Container(
                width: 8,
                height: 8,
                decoration: const BoxDecoration(
                  color: AppTheme.error,
                  shape: BoxShape.circle,
                ),
              ),
            ),
          ],
        ),
        Padding(
          padding: const EdgeInsets.only(right: 16, left: 4),
          child: CircleAvatar(
            radius: 16,
            backgroundColor: AppTheme.primary,
            child: const Icon(Icons.person, color: Colors.white, size: 18),
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
            padding: const EdgeInsets.symmetric(horizontal: 12),
            child: Row(
              children: [
                const Icon(Icons.search, color: AppTheme.outline, size: 20),
                const SizedBox(width: 8),
                Expanded(
                  child: TextField(
                    controller: _searchController,
                    decoration: const InputDecoration(
                      hintText: 'Лауазым, дағды немесе компания',
                      border: InputBorder.none,
                      isDense: true,
                    ),
                    style: const TextStyle(fontSize: 14),
                  ),
                ),
                GestureDetector(
                  onTap: () => _searchController.clear(),
                  child: const Icon(Icons.close, color: AppTheme.outline, size: 18),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(width: 8),
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
              const Icon(Icons.tune, color: Colors.white, size: 20),
              Positioned(
                top: 6,
                right: 6,
                child: Container(
                  padding: const EdgeInsets.all(3),
                  decoration: const BoxDecoration(
                    color: AppTheme.secondary,
                    shape: BoxShape.circle,
                  ),
                  child: const Text(
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
        separatorBuilder: (_, __) => const SizedBox(width: 8),
        itemBuilder: (context, index) {
          final isSelected = _selectedFilterIndex == index;
          return ChoiceChip(
            label: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                if (index == 1) ...[
                  const Icon(Icons.auto_awesome, size: 14, color: Colors.white),
                  const SizedBox(width: 4),
                ],
                Text(_filterChips[index]),
              ],
            ),
            selected: isSelected,
            onSelected: (_) => setState(() => _selectedFilterIndex = index),
            selectedColor: index == 1 ? AppTheme.primary : AppTheme.secondaryContainer,
            backgroundColor: AppTheme.surfaceContainerLow,
            labelStyle: TextStyle(
              color: isSelected
                  ? Colors.white
                  : AppTheme.onSurfaceVariant,
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
        gradient: const LinearGradient(
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
            color: AppTheme.primary.withOpacity(0.2),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Row(
                  children: [
                    Icon(Icons.bolt, color: Colors.white, size: 14),
                    SizedBox(width: 4),
                    Text(
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
              const Text(
                '142 жаңа тапсырма',
                style: TextStyle(color: Colors.white70, fontSize: 11),
              ),
            ],
          ),
          const SizedBox(height: 10),
          const Text(
            'Студенттер мен мамандар үшін нақты бизнес мәселелері мен жобалар',
            style: TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
              fontSize: 16,
              height: 1.3,
            ),
          ),
          const SizedBox(height: 6),
          const Text(
            'Дайындығыңызды AI тесттерімен тексеріп, компаниялардан тікелей грант немесе офер ұтып алыңыз.',
            style: TextStyle(color: Colors.white70, fontSize: 12.5),
          ),
        ],
      ),
    );
  }

  Widget _buildResultsCounter(int count) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.between,
      children: [
        Text(
          'Табылғаны: 84 вакансия мен тапсырма',
          style: TextStyle(
            fontSize: 12.5,
            fontWeight: FontWeight.w600,
            color: AppTheme.onSurfaceVariant,
          ),
        ),
        Row(
          children: const [
            Text(
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
      margin: const EdgeInsets.only(bottom: 14),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.03),
            blurRadius: 8,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: [
              Wrap(
                spacing: 6,
                children: challenge.badges.map((b) {
                  final isFire = b.contains('Шұғыл');
                  return Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: isFire ? AppTheme.tertiary : AppTheme.surfaceContainer,
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
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
          const SizedBox(height: 10),
          GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const VacancyDetailScreen(),
                ),
              );
            },
            child: Text(
              challenge.title,
              style: const TextStyle(
                fontSize: 16.5,
                fontWeight: FontWeight.bold,
                color: AppTheme.onSurface,
                height: 1.3,
              ),
            ),
          ),
          const SizedBox(height: 4),
          Row(
            children: [
              Text(
                challenge.companyName,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w500,
                  color: AppTheme.onSurfaceVariant,
                ),
              ),
              const SizedBox(width: 4),
              const Icon(Icons.verified, size: 16, color: AppTheme.primary),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: [
              Text(
                challenge.salaryRange,
                style: const TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.primary,
                ),
              ),
              const SizedBox(width: 6),
              Text(
                challenge.grantType,
                style: const TextStyle(
                  fontSize: 12,
                  color: AppTheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
          const SizedBox(height: 6),
          Row(
            children: [
              const Icon(Icons.location_on_outlined, size: 15, color: AppTheme.outline),
              const SizedBox(width: 4),
              Text(
                challenge.location,
                style: const TextStyle(
                  fontSize: 12.5,
                  color: AppTheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          // AI Match Bar
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: AppTheme.surfaceContainerLow,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 16,
                  backgroundColor: AppTheme.primary,
                  child: Text(
                    '\${challenge.aiMatchScore}%',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'AI Дайындық индексі: \${challenge.aiMatchScore}/100',
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: AppTheme.onSurface,
                        ),
                      ),
                      Text(
                        challenge.matchDescription,
                        style: const TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: AppTheme.tertiary,
                        ),
                      ),
                    ],
                  ),
                ),
                const Icon(Icons.auto_awesome, size: 18, color: AppTheme.secondary),
              ],
            ),
          ),
          const SizedBox(height: 8),
          Text(
            challenge.description,
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
            style: const TextStyle(
              fontSize: 13,
              color: AppTheme.onSurfaceVariant,
            ),
          ),
          const SizedBox(height: 10),
          Wrap(
            spacing: 6,
            runSpacing: 6,
            children: challenge.tags.map((tag) {
              return Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppTheme.surfaceContainer,
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  tag,
                  style: const TextStyle(
                    fontSize: 11.5,
                    fontWeight: FontWeight.w500,
                    color: AppTheme.onSurface,
                  ),
                ),
              );
            }).toList(),
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: [
              Row(
                children: [
                  const Icon(Icons.schedule, size: 14, color: AppTheme.outline),
                  const SizedBox(width: 4),
                  Text(
                    challenge.postedTime,
                    style: const TextStyle(fontSize: 11.5, color: AppTheme.outline),
                  ),
                ],
              ),
              Text(
                challenge.responsesCount,
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.secondary,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(
                flex: 4,
                child: ElevatedButton.icon(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const ApplicationFormScreen(),
                      ),
                    );
                  },
                  icon: const Icon(Icons.send, size: 16),
                  label: const Text('Үн қату (Откликнуться)'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.primary,
                    padding: const EdgeInsets.symmetric(vertical: 12),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                flex: 1,
                child: Container(
                  height: 44,
                  decoration: BoxDecoration(
                    color: AppTheme.surfaceContainerHigh,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: IconButton(
                    icon: const Icon(Icons.chat_bubble_outline,
                        color: AppTheme.primary, size: 20),
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
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerHigh,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 20,
            backgroundColor: AppTheme.secondaryContainer,
            child: const Icon(Icons.smart_toy, color: Colors.white, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text(
                  'Өз дағдыларыңызға сәйкес тапқыңыз келе ме?',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.onSurface,
                  ),
                ),
                SizedBox(height: 2),
                Text(
                  'Work.ai түйіндемеңізді сканерлеп, 90%+ сәйкес келетін тапсырмаларды ұсынады.',
                  style: TextStyle(fontSize: 12, color: AppTheme.onSurfaceVariant),
                ),
              ],
            ),
          ),
          const SizedBox(width: 8),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.primary,
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            ),
            child: const Text('Талдау', style: TextStyle(fontSize: 12)),
          ),
        ],
      ),
    );
  }
}
`
  },
  {
    path: 'lib/screens/vacancy_detail_screen.dart',
    name: 'vacancy_detail_screen.dart',
    category: 'screens',
    description: '2-экран: Жоба сипаттамасы, AI индексі, бизнес контексті, талаптар және орналасу картасы',
    code: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import 'application_form_screen.dart';

class VacancyDetailScreen extends StatefulWidget {
  const VacancyDetailScreen({super.key});

  @override
  State<VacancyDetailScreen> createState() => _VacancyDetailScreenState();
}

class _VacancyDetailScreenState extends State<VacancyDetailScreen> {
  bool _isFavorite = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(
        backgroundColor: AppTheme.surface.withOpacity(0.9),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.onSurface),
          onPressed: () => Navigator.pop(context),
        ),
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: AppTheme.primary,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text(
                'W',
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w900,
                  fontSize: 14,
                ),
              ),
            ),
            const SizedBox(width: 8),
            const Text(
              'Vacancy Detail',
              style: TextStyle(
                fontSize: 17,
                fontWeight: FontWeight.bold,
                color: AppTheme.onSurface,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.share_outlined, color: AppTheme.onSurface),
            onPressed: () {},
          ),
          Padding(
            padding: const EdgeInsets.only(right: 16),
            child: CircleAvatar(
              radius: 16,
              backgroundColor: AppTheme.primary,
              child: const Icon(Icons.person, color: Colors.white, size: 18),
            ),
          ),
        ],
      ),
      body: Stack(
        children: [
          ListView(
            padding: const EdgeInsets.only(bottom: 100),
            children: [
              _buildTopMetaCard(),
              const SizedBox(height: 12),
              _buildAiVerifiedBanner(),
              const SizedBox(height: 12),
              _buildBusinessContextSection(),
              const SizedBox(height: 12),
              _buildDeliverablesSection(),
              const SizedBox(height: 12),
              _buildDatasetResourcesSection(),
              const SizedBox(height: 12),
              _buildSkillsSection(),
              const SizedBox(height: 12),
              _buildLocationSection(),
              const SizedBox(height: 24),
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
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: const [
              Row(
                children: [
                  Icon(Icons.schedule, size: 14, color: AppTheme.onSurfaceVariant),
                  SizedBox(width: 4),
                  Text('Бүгін, 10:45',
                      style: TextStyle(fontSize: 12, color: AppTheme.onSurfaceVariant)),
                ],
              ),
              Row(
                children: [
                  Icon(Icons.visibility_outlined, size: 14, color: AppTheme.onSurfaceVariant),
                  SizedBox(width: 4),
                  Text('418 қаралым',
                      style: TextStyle(fontSize: 12, color: AppTheme.onSurfaceVariant)),
                ],
              ),
            ],
          ),
          const SizedBox(height: 10),
          const Text(
            'Алматы көлік логистикасының динамикалық бағыттарын оңтайландыру',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: AppTheme.onSurface,
              height: 1.25,
            ),
          ),
          const SizedBox(height: 8),
          Row(
            crossAxisAlignment: CrossAxisAlignment.baseline,
            textBaseline: TextBaseline.alphabetic,
            children: const [
              Text(
                '650 000 – 1 200 000 ₸',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.onSurface,
                ),
              ),
              SizedBox(width: 6),
              Text(
                'қолына / келісім бойынша',
                style: TextStyle(fontSize: 13, color: AppTheme.onSurfaceVariant),
              ),
            ],
          ),
          const SizedBox(height: 14),
          // Company Box
          Container(
            padding: const EdgeInsets.all(10),
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
                  child: const Center(
                    child: Text(
                      'A',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: AppTheme.primary,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: const [
                          Flexible(
                            child: Text(
                              'Aibek Construction & Logistics',
                              style: TextStyle(
                                fontSize: 13.5,
                                fontWeight: FontWeight.bold,
                                color: AppTheme.onSurface,
                              ),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          SizedBox(width: 4),
                          Icon(Icons.verified, size: 16, color: AppTheme.primary),
                        ],
                      ),
                      const SizedBox(height: 2),
                      Row(
                        children: const [
                          Icon(Icons.star, size: 14, color: AppTheme.goldStar),
                          SizedBox(width: 2),
                          Text('4.8',
                              style: TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.bold,
                                  color: AppTheme.goldStar)),
                          SizedBox(width: 4),
                          Text('· 24 пікір',
                              style: TextStyle(
                                  fontSize: 12, color: AppTheme.onSurfaceVariant)),
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
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  ),
                  child: const Text('Компания',
                      style: TextStyle(
                          color: AppTheme.primary,
                          fontSize: 12,
                          fontWeight: FontWeight.w600)),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          _buildMetaRow(Icons.work_history_outlined, 'Тәжірибе: 1–3 жыл немесе студенттер командасы'),
          _buildMetaRow(Icons.home_work_outlined, 'Жобалық жұмыс, икемді кесте, қашықтан'),
          _buildMetaRow(Icons.pin_drop_outlined, 'Алматы, Достық даңғылы, 180'),
          const SizedBox(height: 14),
          Row(
            children: [
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const ApplicationFormScreen(),
                      ),
                    );
                  },
                  icon: const Icon(Icons.send, size: 18),
                  label: const Text('Үн қату (Жауап жіберу)'),
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 14),
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: _isFavorite
                      ? const Color(0xFFFFDAD6)
                      : AppTheme.surfaceContainerLow,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: IconButton(
                  icon: Icon(
                    _isFavorite ? Icons.favorite : Icons.favorite_border,
                    color: _isFavorite ? AppTheme.error : AppTheme.onSurfaceVariant,
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
      padding: const EdgeInsets.symmetric(vertical: 3),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 17, color: AppTheme.onSurfaceVariant),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              text,
              style: const TextStyle(fontSize: 13, color: AppTheme.onSurfaceVariant),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAiVerifiedBanner() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLow,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppTheme.primary.withOpacity(0.15)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          CircleAvatar(
            radius: 18,
            backgroundColor: AppTheme.secondaryContainer,
            child: const Icon(Icons.auto_awesome, color: Colors.white, size: 18),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.between,
                  children: [
                    const Text(
                      'AI Тексеруден өткен жоба',
                      style: TextStyle(
                        fontSize: 13.5,
                        fontWeight: FontWeight.bold,
                        color: AppTheme.onSurface,
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(
                        color: AppTheme.secondary,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: const Text(
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
                const SizedBox(height: 4),
                const Text(
                  'Мәселенің нақтылығы, берілетін деректер және бағалау критерийлері толық расталған.',
                  style: TextStyle(fontSize: 12, color: AppTheme.onSurfaceVariant),
                ),
                const SizedBox(height: 8),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: LinearProgressIndicator(
                    value: 0.91,
                    backgroundColor: AppTheme.surfaceContainer,
                    color: AppTheme.primary,
                    minHeight: 5,
                  ),
                ),
                const SizedBox(height: 6),
                Row(
                  mainAxisAlignment: MainAxisAlignment.between,
                  children: const [
                    Text('Сенімділік индексі: Жоғары',
                        style: TextStyle(fontSize: 10.5, color: AppTheme.onSurfaceVariant)),
                    Text('Төлем кепілдендірілген',
                        style: TextStyle(fontSize: 10.5, color: AppTheme.onSurfaceVariant)),
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
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: const [
              Icon(Icons.troubleshoot, color: AppTheme.primary, size: 20),
              SizedBox(width: 8),
              Text(
                '1. Бизнес мәселесі және контекст',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ],
          ),
          const SizedBox(height: 12),
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
                  child: Icon(Icons.local_shipping, size: 64, color: AppTheme.primary.withOpacity(0.3)),
                ),
                Positioned(
                  bottom: 8,
                  left: 8,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.black.withOpacity(0.7),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: const Text(
                      'Кептеліс сынағы: Таңғы 07:30 – 10:30',
                      style: TextStyle(color: Colors.white, fontSize: 11),
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          const Text(
            'Алматыдағы 42 жүк көлігіміз күн сайын таңертең кептелісте 3 сағатқа дейін тұрып қалады. Жеткізу бағыттары қолмен бекітілетіндіктен, жанармай шығыны 28%-ға өсті.',
            style: TextStyle(fontSize: 13.5, height: 1.45, color: AppTheme.onSurface),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              _buildMetricCard(Icons.local_shipping, '42', 'Жүк көлігі', AppTheme.primary),
              const SizedBox(width: 8),
              _buildMetricCard(Icons.hourglass_bottom, '~3 сағ', 'Кідіріс', AppTheme.error),
              const SizedBox(width: 8),
              _buildMetricCard(Icons.trending_up, '+28%', 'Жанармай', AppTheme.secondary),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildMetricCard(IconData icon, String value, String label, Color color) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          color: AppTheme.surfaceContainerLow,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Column(
          children: [
            Icon(icon, size: 18, color: color),
            const SizedBox(height: 4),
            Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
            Text(label, style: const TextStyle(fontSize: 11, color: AppTheme.onSurfaceVariant)),
          ],
        ),
      ),
    );
  }

  Widget _buildDeliverablesSection() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: const [
              Icon(Icons.assignment_turned_in, color: AppTheme.primary, size: 20),
              SizedBox(width: 8),
              Text(
                '2. Командадан күтілетін нәтиже',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ],
          ),
          const SizedBox(height: 12),
          _buildDeliverableItem(1, 'Бағыттау алгоритмі',
              'Python / OR-Tools негізінде уақыт терезелерін (time-windows) ескеретін бағыттау модулі.'),
          _buildDeliverableItem(2, 'Диспетчерге арналған интерфейс',
              'Диспетчерлерге арналған қарапайым веб/мобильді демо-интерфейс (маршрут визуализациясы).'),
          _buildDeliverableItem(3, 'Тестілеу және талдау',
              '180 күндік шынайы GPS логтары бар тесттік деректер жинағымен сынақ және тиімділік есебі.'),
        ],
      ),
    );
  }

  Widget _buildDeliverableItem(int index, String title, String desc) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Container(
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: AppTheme.surfaceContainerLow,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CircleAvatar(
              radius: 12,
              backgroundColor: AppTheme.primary.withOpacity(0.15),
              child: Text('$index',
                  style: const TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: AppTheme.primary)),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title,
                      style: const TextStyle(
                          fontSize: 13.5, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 2),
                  Text(desc,
                      style: const TextStyle(
                          fontSize: 12, color: AppTheme.onSurfaceVariant)),
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
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: const [
              Icon(Icons.database, color: AppTheme.primary, size: 20),
              SizedBox(width: 8),
              Text(
                '3. Ұсынылатын деректер мен ресурстар',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ],
          ),
          const SizedBox(height: 12),
          _buildCheckBullet('1.2M жолдан тұратын анонимдендірілген GPS сапар деректері.'),
          _buildCheckBullet('42 жүк көлігінің толық техникалық сипаттамасы мен жанармай тұтыну картасы.'),
          _buildCheckBullet('Yandex/2GIS бағыт API корпоративтік кілті мен геодеректер қолжетімділігі.'),
        ],
      ),
    );
  }

  Widget _buildCheckBullet(String text) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Icon(Icons.check_circle, size: 18, color: AppTheme.tertiary),
          const SizedBox(width: 8),
          Expanded(
            child: Text(text,
                style: const TextStyle(
                    fontSize: 13, color: AppTheme.onSurface, height: 1.35)),
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
      'GeoPandas'
    ];

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: const [
              Icon(Icons.psychology, color: AppTheme.primary, size: 20),
              SizedBox(width: 8),
              Text(
                '4. Негізгі талаптар мен дағдылар',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ],
          ),
          const SizedBox(height: 6),
          const Text(
            'Жобаға жеке маман немесе 2-4 адамнан құралған студенттік/инженерлік командалар қатыса алады.',
            style: TextStyle(fontSize: 12.5, color: AppTheme.onSurfaceVariant),
          ),
          const SizedBox(height: 10),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: skills.map((skill) {
              final isSpecial = skill == 'OR-Tools';
              return Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(
                  color: isSpecial ? const Color(0xFFEADDFF) : AppTheme.surfaceContainerHigh,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  skill,
                  style: TextStyle(
                    fontSize: 12.5,
                    fontWeight: FontWeight.w600,
                    color: isSpecial ? const Color(0xFF25005A) : AppTheme.primary,
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
      margin: const EdgeInsets.symmetric(horizontal: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: const [
              Row(
                children: [
                  Icon(Icons.map_outlined, color: AppTheme.primary, size: 20),
                  SizedBox(width: 8),
                  Text('Орналасқан жері',
                      style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                ],
              ),
              Text('Алматы',
                  style: TextStyle(fontSize: 12, color: AppTheme.onSurfaceVariant)),
            ],
          ),
          const SizedBox(height: 10),
          Container(
            height: 120,
            decoration: BoxDecoration(
              color: AppTheme.surfaceContainerHigh,
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.location_on, size: 36, color: AppTheme.primary),
                  Text('Достық даңғылы, 180',
                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
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
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 10,
              offset: const Offset(0, -3),
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
                  children: const [
                    Text(
                      '650 000 – 1 200 000 ₸',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: AppTheme.onSurface,
                      ),
                    ),
                    Text(
                      'Aibek Construction & Logistics',
                      style: TextStyle(fontSize: 11.5, color: AppTheme.onSurfaceVariant),
                    ),
                  ],
                ),
              ),
              ElevatedButton.icon(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const ApplicationFormScreen(),
                    ),
                  );
                },
                icon: const Icon(Icons.send, size: 16),
                label: const Text('Үн қату'),
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`
  },
  {
    path: 'lib/screens/application_form_screen.dart',
    name: 'application_form_screen.dart',
    category: 'screens',
    description: '3-экран: Үн қату формасы (Filter Setup), AI хат көмекшісі, мерзім және байланыс',
    code: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class ApplicationFormScreen extends StatefulWidget {
  const ApplicationFormScreen({super.key});

  @override
  State<ApplicationFormScreen> createState() => _ApplicationFormScreenState();
}

class _ApplicationFormScreenState extends State<ApplicationFormScreen> {
  final TextEditingController _coverLetterController = TextEditingController(
    text:
        'Біздің командамыз қалалық логистика бағытын оңтайландыру бойынша тәжірибеге ие. Біз VRP (Vehicle Routing Problem) алгоритмдерін қолданып, 3 апта ішінде сынақ нұсқасын дайындай аламыз...',
  );
  final TextEditingController _githubController = TextEditingController(
    text: 'github.com/datacrafters/logistics-solver',
  );
  final TextEditingController _phoneController = TextEditingController(
    text: '+7 (777) 123-45-67',
  );
  final TextEditingController _emailController = TextEditingController(
    text: 'team@datacrafters.kz',
  );

  int _selectedDurationIndex = 1;
  final List<String> _durationOptions = ['1-2 апта', '3-4 апта', '1.5+ ай'];
  bool _isSubmitting = false;

  void _polishCoverLetterWithAi() {
    setState(() {
      _coverLetterController.text =
          'Құрметті Aibek Logistics командасы! Біз қалалық тасымал тиімділігін арттыратын VRP алгоритмдерімен жұмыс істеп жатқан ҚБТУ зерттеу тобымыз. Кептеліс деректері мен жүк салмағын есептейтін динамикалық шешімді 3 апта ішінде сынаққа ұсына аламыз. Әріптестікке дайынбыз!';
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('AI ілеспе хатты кәсіби стильде өңдеді!'),
        backgroundColor: AppTheme.secondary,
        duration: Duration(seconds: 2),
      ),
    );
  }

  void _submitApplication() async {
    setState(() => _isSubmitting = true);
    await Future.delayed(const Duration(milliseconds: 1200));
    if (!mounted) return;
    setState(() => _isSubmitting = false);

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Row(
          children: const [
            Icon(Icons.check_circle, color: AppTheme.tertiary, size: 28),
            SizedBox(width: 8),
            Text('Жауап жіберілді!'),
          ],
        ),
        content: const Text(
          'Сіздің үн қатуыңыз Aibek Logistics компаниясына сәтті жеткізілді. Жауап 24 сағат ішінде «Жауаптар» бөлімінде көрсетіледі.',
        ),
        actions: [
          ElevatedButton(
            onPressed: () {
              Navigator.pop(ctx);
              Navigator.pop(context);
            },
            child: const Text('Жақсы'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(
        backgroundColor: AppTheme.surface,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.onSurface),
          onPressed: () => Navigator.pop(context),
        ),
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: AppTheme.primary,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text('W',
                  style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 14)),
            ),
            const SizedBox(width: 8),
            const Text(
              'Filter Setup',
              style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.onSurface),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.share_outlined, color: AppTheme.onSurface),
            onPressed: () {},
          ),
          Padding(
            padding: const EdgeInsets.only(right: 16),
            child: CircleAvatar(
              radius: 16,
              backgroundColor: AppTheme.primary,
              child: const Icon(Icons.person, color: Colors.white, size: 18),
            ),
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildTopPillHeader(),
          const SizedBox(height: 12),
          _buildJobSummaryCard(),
          const SizedBox(height: 16),
          _buildStep1ResumeSelector(),
          const SizedBox(height: 14),
          _buildStep2CoverLetter(),
          const SizedBox(height: 14),
          _buildStep3PlanAndDeadline(),
          const SizedBox(height: 14),
          _buildStep4ContactInfo(),
          const SizedBox(height: 18),
          _buildSubmitButton(),
          const SizedBox(height: 12),
          _buildSecurityDisclaimer(),
          const SizedBox(height: 32),
        ],
      ),
    );
  }

  Widget _buildTopPillHeader() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerHigh,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.between,
        children: [
          Row(
            children: [
              Container(
                width: 8,
                height: 8,
                decoration: const BoxDecoration(
                  color: AppTheme.tertiary,
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: 8),
              const Text(
                'Жаңа тапсырмаға қатысу',
                style: TextStyle(
                  fontSize: 12.5,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.tertiary,
                ),
              ),
            ],
          ),
          Row(
            children: const [
              Icon(Icons.bolt, size: 16, color: AppTheme.secondary),
              SizedBox(width: 4),
              Text(
                'AI Match: 94%',
                style: TextStyle(
                  fontSize: 12.5,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.secondary,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildJobSummaryCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.03),
            blurRadius: 6,
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.between,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    Text(
                      'ЧЕЛЛЕНДЖ & ЖОБА',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                        color: AppTheme.primary,
                        letterSpacing: 0.5,
                      ),
                    ),
                    SizedBox(height: 4),
                    Text(
                      'Алматы көлік логистикасының динамикалық бағыттарын...',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: AppTheme.onSurface,
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: AppTheme.surfaceContainerLow,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.local_shipping_outlined,
                    color: AppTheme.primary, size: 22),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: const [
              Text(
                '650 000 – 1 200 000 ₸',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.tertiary,
                ),
              ),
              SizedBox(width: 6),
              Text('•', style: TextStyle(color: AppTheme.outline)),
              SizedBox(width: 6),
              Flexible(
                child: Text(
                  'Aibek Construction & Logistics',
                  style: TextStyle(
                    fontSize: 13,
                    color: AppTheme.onSurfaceVariant,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              _buildPillBadge(Icons.location_on_outlined, 'Алматы, Қазақстан'),
              const SizedBox(width: 8),
              _buildPillBadge(Icons.timer_outlined, 'Мерзімі: 1 ай'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPillBadge(IconData icon, String text) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLow,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14, color: AppTheme.outline),
          const SizedBox(width: 4),
          Text(text,
              style: const TextStyle(
                  fontSize: 11.5, color: AppTheme.onSurfaceVariant)),
        ],
      ),
    );
  }

  Widget _buildStep1ResumeSelector() {
    return _buildCardWrapper(
      title: '1. Түйіндемені немесе Команда профилін таңдаңыз',
      trailing: const Text('Міндетті',
          style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.bold,
              color: AppTheme.primary)),
      subtitle:
          'Тапсырыс беруші сіздің және командаңыздың портфолиосын осы профиль арқылы тексереді.',
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: AppTheme.surfaceContainerLow,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Row(
              children: [
                Container(
                  width: 42,
                  height: 42,
                  decoration: BoxDecoration(
                    color: AppTheme.primaryContainer,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Icon(Icons.groups, color: Colors.white, size: 22),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text(
                        'Data Crafters',
                        style: TextStyle(
                            fontSize: 13.5, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        'ҚБТУ 3-курс командасы · ML & Data...',
                        style: TextStyle(
                            fontSize: 11.5, color: AppTheme.onSurfaceVariant),
                      ),
                    ],
                  ),
                ),
                TextButton(
                  onPressed: () {},
                  child: const Text('Өзгерту',
                      style: TextStyle(
                          fontSize: 12.5, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ),
          const SizedBox(height: 8),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: const [
                _MiniTag('4 қатысушы', isPrimary: true),
                SizedBox(width: 6),
                _MiniTag('Python / PyTorch'),
                SizedBox(width: 6),
                _MiniTag('GIS логистикасы'),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStep2CoverLetter() {
    return _buildCardWrapper(
      title: '2. Ілеспе хат (Сопроводительное письмо)',
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: const [
          Icon(Icons.auto_awesome, size: 14, color: AppTheme.tertiary),
          SizedBox(width: 2),
          Text('AI көмекшісі',
              style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.tertiary)),
        ],
      ),
      subtitle:
          'Неге бұл тапсырма сізге немесе командаңызға қызық? Мәселені қалай шешуді жоспарлайсыз?',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          TextField(
            controller: _coverLetterController,
            maxLines: 4,
            style: const TextStyle(fontSize: 13.5, height: 1.4),
            decoration: InputDecoration(
              filled: true,
              fillColor: AppTheme.surfaceContainerLow,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: BorderSide.none,
              ),
              hintText: 'Өз шешіміңізді және көзқарасыңызды жазыңыз...',
            ),
            onChanged: (_) => setState(() {}),
          ),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: [
              OutlinedButton.icon(
                onPressed: _polishCoverLetterWithAi,
                icon: const Icon(Icons.auto_fix_high, size: 15),
                label: const Text('Кәсіби стильде өңдеу'),
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppTheme.secondary,
                  backgroundColor: AppTheme.surfaceContainerHigh,
                  side: BorderSide.none,
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  textStyle: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                ),
              ),
              Text(
                '\${_coverLetterController.text.length} таңба',
                style: const TextStyle(fontSize: 11, color: AppTheme.outline),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStep3PlanAndDeadline() {
    return _buildCardWrapper(
      title: '3. Шешім жоспары мен мерзімі',
      subtitle:
          'Өнімді тапсырудың нақты мерзімін және дайын нақты код базасы немесе демо сілтемесін көрсетіңіз.',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Ұсынылатын мерзім',
              style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.w600)),
          const SizedBox(height: 6),
          Row(
            children: List.generate(
              _durationOptions.length,
              (index) {
                final isSelected = _selectedDurationIndex == index;
                return Expanded(
                  child: Padding(
                    padding: EdgeInsets.only(
                        right: index < _durationOptions.length - 1 ? 6 : 0),
                    child: InkWell(
                      onTap: () => setState(() => _selectedDurationIndex = index),
                      child: Container(
                        padding: const EdgeInsets.symmetric(vertical: 10),
                        decoration: BoxDecoration(
                          color: isSelected
                              ? AppTheme.primary
                              : AppTheme.surfaceContainer,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        alignment: Alignment.center,
                        child: Text(
                          _durationOptions[index],
                          style: TextStyle(
                            fontSize: 12.5,
                            fontWeight: FontWeight.w600,
                            color: isSelected ? Colors.white : AppTheme.onSurface,
                          ),
                        ),
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: const [
              Text('Прототип немесе GitHub сілтемесі',
                  style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.w600)),
              Text('міндетті емес',
                  style: TextStyle(fontSize: 11, color: AppTheme.outline)),
            ],
          ),
          const SizedBox(height: 6),
          TextField(
            controller: _githubController,
            style: const TextStyle(fontSize: 13, fontFamily: 'Fira Code'),
            decoration: InputDecoration(
              filled: true,
              fillColor: AppTheme.surfaceContainerLow,
              prefixIcon: const Icon(Icons.terminal, size: 18),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide.none,
              ),
              isDense: true,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStep4ContactInfo() {
    return _buildCardWrapper(
      title: '4. Байланыс ақпараты',
      trailing: const Icon(Icons.lock_outline, size: 18, color: AppTheme.outline),
      subtitle:
          'Жұмыс беруші жеке хабарлама немесе сұхбатқа шақыру үшін пайдаланады.',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Телефон нөмірі',
              style: TextStyle(fontSize: 11.5, color: AppTheme.onSurfaceVariant)),
          const SizedBox(height: 4),
          TextField(
            controller: _phoneController,
            style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.w600),
            decoration: InputDecoration(
              filled: true,
              fillColor: AppTheme.surfaceContainerLow,
              prefixIcon: const Icon(Icons.phone_outlined, size: 18),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide.none,
              ),
              isDense: true,
            ),
          ),
          const SizedBox(height: 10),
          const Text('Электрондық пошта (Email)',
              style: TextStyle(fontSize: 11.5, color: AppTheme.onSurfaceVariant)),
          const SizedBox(height: 4),
          TextField(
            controller: _emailController,
            style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.w600),
            decoration: InputDecoration(
              filled: true,
              fillColor: AppTheme.surfaceContainerLow,
              prefixIcon: const Icon(Icons.mail_outline, size: 18),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide.none,
              ),
              isDense: true,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSubmitButton() {
    return SizedBox(
      height: 50,
      child: ElevatedButton.icon(
        onPressed: _isSubmitting ? null : _submitApplication,
        icon: _isSubmitting
            ? const SizedBox(
                width: 18,
                height: 18,
                child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
              )
            : const Icon(Icons.send, size: 18),
        label: Text(
          _isSubmitting
              ? 'Жіберілуде...'
              : 'Үн қатуды жіберу (Отправить отклик)',
          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
        ),
        style: ElevatedButton.styleFrom(
          backgroundColor: AppTheme.primaryContainer,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        ),
      ),
    );
  }

  Widget _buildSecurityDisclaimer() {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLow,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: const [
          Icon(Icons.verified_user_outlined, size: 20, color: AppTheme.primary),
          SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Қауіпсіздік және кепілдік',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 2),
                Text(
                  'Жұмыс беруші сіздің өтінішіңізді 24 сағат ішінде қарайды. Статусты «Жауаптар» бөлімінен көре аласыз.',
                  style: TextStyle(fontSize: 11.5, color: AppTheme.onSurfaceVariant),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCardWrapper({
    required String title,
    Widget? trailing,
    required String subtitle,
    required Widget child,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: [
              Expanded(
                child: Text(
                  title,
                  style: const TextStyle(
                      fontSize: 14.5, fontWeight: FontWeight.bold),
                ),
              ),
              if (trailing != null) trailing,
            ],
          ),
          const SizedBox(height: 4),
          Text(
            subtitle,
            style: const TextStyle(
                fontSize: 12, color: AppTheme.onSurfaceVariant, height: 1.3),
          ),
          const SizedBox(height: 12),
          child,
        ],
      ),
    );
  }
}

class _MiniTag extends StatelessWidget {
  final String text;
  final bool isPrimary;
  const _MiniTag(this.text, {this.isPrimary = false});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: isPrimary ? const Color(0xFFEADDFF) : AppTheme.surfaceContainer,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          color: isPrimary ? const Color(0xFF25005A) : AppTheme.onSurfaceVariant,
        ),
      ),
    );
  }
}
`
  },
  {
    path: 'lib/screens/auth_screen.dart',
    name: 'auth_screen.dart',
    category: 'screens',
    description: '4-экран: Кіру, рөлді таңдау (Студент / Бизнес), 10 сек AI CV онбординг және биометрия',
    code: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class AuthScreen extends StatefulWidget {
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  int _selectedRoleIndex = 0; // 0: Talent & Student, 1: Business
  bool _isPhoneMode = true;
  bool _isPasswordHidden = true;
  bool _rememberMe = true;
  String _selectedLang = 'KZ';

  final TextEditingController _credentialController =
      TextEditingController(text: '+7 (700) 123-45-67');
  final TextEditingController _passwordController =
      TextEditingController(text: 'secret123');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: AppTheme.primary,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text('W',
                  style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 14)),
            ),
            const SizedBox(width: 8),
            const Text(
              'Work.ai',
              style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.onSurface),
            ),
          ],
        ),
        actions: [
          _buildLanguageSelector(),
          const SizedBox(width: 12),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        children: [
          _buildHeroHeader(),
          const SizedBox(height: 12),
          _buildLanguagePillRow(),
          const SizedBox(height: 16),
          _buildRoleSelector(),
          const SizedBox(height: 10),
          _buildPerkBanner(),
          const SizedBox(height: 14),
          _buildInstantCvUploadCard(),
          const SizedBox(height: 14),
          _buildMainAuthCard(),
          const SizedBox(height: 14),
          _buildComplianceFooter(),
          const SizedBox(height: 32),
        ],
      ),
    );
  }

  Widget _buildLanguageSelector() {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerHigh,
        borderRadius: BorderRadius.circular(20),
      ),
      padding: const EdgeInsets.all(2),
      child: Row(
        children: ['KZ', 'RU', 'EN'].map((lang) {
          final isSelected = _selectedLang == lang;
          return GestureDetector(
            onTap: () => setState(() => _selectedLang = lang),
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              decoration: BoxDecoration(
                color: isSelected ? AppTheme.primary : Colors.transparent,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Text(
                lang,
                style: TextStyle(
                  fontSize: 11.5,
                  fontWeight: FontWeight.bold,
                  color: isSelected ? Colors.white : AppTheme.onSurfaceVariant,
                ),
              ),
            ),
          );
        }).toList(),
      ),
    );
  }

  Widget _buildHeroHeader() {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
          decoration: BoxDecoration(
            color: AppTheme.surfaceContainerHigh,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: const [
              Icon(Icons.auto_awesome, size: 14, color: AppTheme.secondary),
              SizedBox(width: 4),
              Text(
                'WORK.AI COPILOT V2.4',
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.secondary,
                  letterSpacing: 0.5,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 8),
        const Text(
          'Болашақ жұмыс кеңістігі',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: AppTheme.onSurface,
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 4),
        const Text(
          'Қазақстандағы бизнес мәселелерін шешуге арналған жасанды интеллект платформасы',
          style: TextStyle(fontSize: 12.5, color: AppTheme.onSurfaceVariant),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildLanguagePillRow() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        _buildLangButton('🇰🇿 ҚАЗ', 'KZ'),
        const SizedBox(width: 8),
        _buildLangButton('🇷🇺 РУС', 'RU'),
        const SizedBox(width: 8),
        _buildLangButton('🇬🇧 ENG', 'EN'),
      ],
    );
  }

  Widget _buildLangButton(String title, String code) {
    final isSelected = _selectedLang == code;
    return GestureDetector(
      onTap: () => setState(() => _selectedLang = code),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? AppTheme.primary : AppTheme.surfaceContainer,
          borderRadius: BorderRadius.circular(18),
        ),
        child: Text(
          title,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: isSelected ? Colors.white : AppTheme.onSurfaceVariant,
          ),
        ),
      ),
    );
  }

  Widget _buildRoleSelector() {
    return Container(
      padding: const EdgeInsets.all(4),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLow,
        borderRadius: BorderRadius.circular(14),
      ),
      child: Row(
        children: [
          Expanded(
            child: _buildRoleTab(
              index: 0,
              icon: Icons.school_outlined,
              title: 'Талант & Студент',
              subtitle: 'Челлендждер & Тағылымдама',
              color: AppTheme.primary,
            ),
          ),
          Expanded(
            child: _buildRoleTab(
              index: 1,
              icon: Icons.domain_outlined,
              title: 'Бизнес & Жұмыс беруші',
              subtitle: 'Кейс тапсыру & Хайринг',
              color: AppTheme.secondary,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRoleTab({
    required int index,
    required IconData icon,
    required String title,
    required String subtitle,
    required Color color,
  }) {
    final isSelected = _selectedRoleIndex == index;
    return GestureDetector(
      onTap: () => setState(() => _selectedRoleIndex = index),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 8),
        decoration: BoxDecoration(
          color: isSelected ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(10),
          boxShadow: isSelected
              ? [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.04),
                    blurRadius: 4,
                  )
                ]
              : null,
        ),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(icon, size: 16, color: color),
                const SizedBox(width: 4),
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.onSurface,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 2),
            Text(
              subtitle,
              style: const TextStyle(fontSize: 10.5, color: AppTheme.onSurfaceVariant),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPerkBanner() {
    final isTalent = _selectedRoleIndex == 0;
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerHigh,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 16,
            backgroundColor: AppTheme.secondary,
            child: const Icon(Icons.bolt, color: Colors.white, size: 18),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  isTalent
                      ? 'AI Smart Match 98.4% дәлдікпен'
                      : 'AI арқылы кейстерді генерациялау',
                  style: const TextStyle(
                      fontSize: 12.5, fontWeight: FontWeight.bold),
                ),
                Text(
                  isTalent
                      ? 'Дағдыларыңыз бен портфолиоңызды автоматты бағалау'
                      : '5000+ дайын үздік студенттерге тапсырма ұсыну',
                  style: const TextStyle(
                      fontSize: 11, color: AppTheme.onSurfaceVariant),
                ),
              ],
            ),
          ),
          const Icon(Icons.chevron_right, size: 18, color: AppTheme.outline),
        ],
      ),
    );
  }

  Widget _buildInstantCvUploadCard() {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(6),
                    decoration: BoxDecoration(
                      color: AppTheme.secondaryContainer,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Icon(Icons.auto_fix_high,
                        color: Colors.white, size: 16),
                  ),
                  const SizedBox(width: 8),
                  const Text('10 секундта AI Тіркелу',
                      style: TextStyle(
                          fontSize: 13.5, fontWeight: FontWeight.bold)),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: AppTheme.tertiaryFixed,
                  borderRadius: BorderRadius.circular(4),
                ),
                child: const Text('NEW',
                    style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF002114))),
              ),
            ],
          ),
          const SizedBox(height: 4),
          const Text('Резюмеңізді жүктеп, сауалнамасыз кіріңіз',
              style: TextStyle(fontSize: 11.5, color: AppTheme.onSurfaceVariant)),
          const SizedBox(height: 10),
          InkWell(
            onTap: () {},
            borderRadius: BorderRadius.circular(8),
            child: Container(
              padding: const EdgeInsets.symmetric(vertical: 10),
              decoration: BoxDecoration(
                color: AppTheme.surfaceContainer,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: const [
                  Icon(Icons.upload_file, color: AppTheme.primary, size: 18),
                  SizedBox(width: 6),
                  Text(
                    'Резюме (.PDF, .DOCX) жүктеу немесе суретін жіберу',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: AppTheme.primary,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMainAuthCard() {
    return Container(
      padding: const EdgeInsets.all(16),
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
              Container(
                decoration: BoxDecoration(
                  color: AppTheme.surfaceContainer,
                  borderRadius: BorderRadius.circular(8),
                ),
                padding: const EdgeInsets.all(2),
                child: Row(
                  children: [
                    _buildAuthModeTab('Телефон', _isPhoneMode,
                        () => setState(() => _isPhoneMode = true)),
                    _buildAuthModeTab('Email', !_isPhoneMode,
                        () => setState(() => _isPhoneMode = false)),
                  ],
                ),
              ),
              TextButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.sms_outlined, size: 14),
                label: const Text('SMS кодпен кіру',
                    style: TextStyle(fontSize: 11.5)),
                style: TextButton.styleFrom(foregroundColor: AppTheme.secondary),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(_isPhoneMode ? 'Телефон нөмірі' : 'Электрондық пошта',
              style: const TextStyle(
                  fontSize: 12, color: AppTheme.onSurfaceVariant)),
          const SizedBox(height: 4),
          TextField(
            controller: _credentialController,
            style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.w600),
            decoration: InputDecoration(
              filled: true,
              fillColor: AppTheme.surfaceContainerLow,
              prefixIcon: Icon(
                _isPhoneMode ? Icons.phone_android : Icons.email_outlined,
                size: 18,
              ),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide.none,
              ),
              isDense: true,
            ),
          ),
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: const [
              Text('Құпия сөз',
                  style:
                      TextStyle(fontSize: 12, color: AppTheme.onSurfaceVariant)),
              Text('Ұмыттыңыз ба?',
                  style: TextStyle(
                      fontSize: 11.5,
                      fontWeight: FontWeight.bold,
                      color: AppTheme.primary)),
            ],
          ),
          const SizedBox(height: 4),
          TextField(
            controller: _passwordController,
            obscureText: _isPasswordHidden,
            style: const TextStyle(fontSize: 13.5),
            decoration: InputDecoration(
              filled: true,
              fillColor: AppTheme.surfaceContainerLow,
              prefixIcon: const Icon(Icons.lock_outline, size: 18),
              suffixIcon: IconButton(
                icon: Icon(
                  _isPasswordHidden ? Icons.visibility : Icons.visibility_off,
                  size: 18,
                ),
                onPressed: () =>
                    setState(() => _isPasswordHidden = !_isPasswordHidden),
              ),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide.none,
              ),
              isDense: true,
            ),
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Checkbox(
                value: _rememberMe,
                onChanged: (val) => setState(() => _rememberMe = val ?? true),
                activeColor: AppTheme.primary,
              ),
              const Text(
                'Мені жүйеде есте сақтау (30 күн)',
                style: TextStyle(fontSize: 12),
              ),
            ],
          ),
          const SizedBox(height: 8),
          SizedBox(
            width: double.infinity,
            height: 48,
            child: ElevatedButton.icon(
              onPressed: () {
                Navigator.pushReplacementNamed(context, '/');
              },
              icon: const Text('Жүйеге кіру',
                  style: TextStyle(fontWeight: FontWeight.bold)),
              label: const Icon(Icons.arrow_forward, size: 16),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.secondary,
              ),
            ),
          ),
          const SizedBox(height: 10),
          SizedBox(
            width: double.infinity,
            height: 44,
            child: OutlinedButton.icon(
              onPressed: () {},
              icon: const Icon(Icons.fingerprint, color: AppTheme.secondary),
              label: const Text('Face ID / Touch ID арқылы кіру',
                  style: TextStyle(
                      fontSize: 12.5,
                      fontWeight: FontWeight.w600,
                      color: AppTheme.onSurface)),
              style: OutlinedButton.styleFrom(
                backgroundColor: AppTheme.surfaceContainerHigh,
                side: BorderSide.none,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
            ),
          ),
          const SizedBox(height: 14),
          Row(
            children: const [
              Expanded(child: Divider()),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 8),
                child: Text('немесе әлеуметтік желілермен',
                    style: TextStyle(fontSize: 11, color: AppTheme.outline)),
              ),
              Expanded(child: Divider()),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              _buildSsoButton(Icons.qr_code_scanner, 'Digital ID'),
              const SizedBox(width: 8),
              _buildSsoButton(Icons.g_mobiledata, 'Google'),
              const SizedBox(width: 8),
              _buildSsoButton(Icons.apple, 'Apple'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildAuthModeTab(String label, bool isSelected, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(6),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.bold,
            color: isSelected ? AppTheme.primary : AppTheme.onSurfaceVariant,
          ),
        ),
      ),
    );
  }

  Widget _buildSsoButton(IconData icon, String label) {
    return Expanded(
      child: Container(
        height: 48,
        decoration: BoxDecoration(
          color: AppTheme.surfaceContainerLow,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 20, color: AppTheme.onSurface),
            Text(label,
                style: const TextStyle(
                    fontSize: 10.5, fontWeight: FontWeight.bold)),
          ],
        ),
      ),
    );
  }

  Widget _buildComplianceFooter() {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Icon(Icons.lock_outline, size: 14, color: AppTheme.tertiary),
            SizedBox(width: 4),
            Text(
              '256-bit шифрлау · ҚР "Дербес деректерді қорғау" заңына сай',
              style: TextStyle(fontSize: 11, color: AppTheme.onSurfaceVariant),
            ),
          ],
        ),
        const SizedBox(height: 10),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Text('Work.ai-да аккаунтыңыз жоқ па? ',
                style: TextStyle(fontSize: 12.5, color: AppTheme.onSurfaceVariant)),
            Text('Тіркелу',
                style: TextStyle(
                    fontSize: 12.5,
                    fontWeight: FontWeight.bold,
                    color: AppTheme.primary)),
          ],
        ),
      ],
    );
  }
}
`
  },
  {
    path: 'lib/screens/student_profile_screen.dart',
    name: 'student_profile_screen.dart',
    category: 'screens',
    description: 'Студенттің жеке профилі: Артқа қайту батырмасы, AI рейтингі (96%), дағдылары, портфолио, түйіндеме және команда',
    code: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class StudentProfileScreen extends StatelessWidget {
  const StudentProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, size: 18, color: AppTheme.primary),
          onPressed: () => Navigator.of(context).maybePop(),
          tooltip: 'Артқа қайту',
        ),
        title: const Text(
          'Студент профилі',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppTheme.onSurface),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.share_outlined, color: AppTheme.onSurfaceVariant),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Профиль сілтемесі көшірілді 🔗')),
              );
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Profile Main Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.04),
                    blurRadius: 10,
                    offset: const Offset(0, 4),
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
                          gradient: const LinearGradient(
                            colors: [AppTheme.primary, AppTheme.secondary],
                          ),
                          borderRadius: BorderRadius.circular(18),
                        ),
                        child: const Center(
                          child: Text(
                            'НТ',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w900,
                              fontSize: 22,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: const [
                            Row(
                              children: [
                                Text(
                                  'Нұрислам Тастанбек',
                                  style: TextStyle(
                                    fontSize: 17,
                                    fontWeight: FontWeight.bold,
                                    color: AppTheme.onSurface,
                                  ),
                                ),
                                SizedBox(width: 4),
                                Icon(Icons.verified, size: 18, color: AppTheme.primary),
                              ],
                            ),
                            SizedBox(height: 3),
                            Text(
                              'Data Science & AI Engineer',
                              style: TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.w600,
                                color: AppTheme.primary,
                              ),
                            ),
                            SizedBox(height: 2),
                            Text(
                              'ҚБТУ · 4-курс студенті',
                              style: TextStyle(fontSize: 12, color: AppTheme.onSurfaceVariant),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const Divider(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Рөл: Студент / Зерттеуші',
                        style: TextStyle(fontSize: 12, color: AppTheme.onSurfaceVariant),
                      ),
                      TextButton.icon(
                        onPressed: () => Navigator.pushNamed(context, '/employer'),
                        icon: const Icon(Icons.swap_horiz, size: 16),
                        label: const Text('Кәсіпкер кабинетіне өту', style: TextStyle(fontSize: 12)),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 14),

            // AI Match Score Banner
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF0F172A), Color(0xFF1E1B4B)],
                ),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text(
                          'Work.ai Index: 96 / 100',
                          style: TextStyle(
                            color: Color(0xFFFDE047),
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                          ),
                        ),
                        SizedBox(height: 4),
                        Text(
                          'ҚР бойынша ТОП 2% AI маманы',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 15,
                          ),
                        ),
                        SizedBox(height: 4),
                        Text(
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
                      color: Colors.white.withOpacity(0.12),
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: Colors.white24),
                    ),
                    child: const Center(
                      child: Text(
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
            const SizedBox(height: 14),

            // Metrics Grid
            Row(
              children: [
                _buildStatBox('12', 'Шешілген кейс', AppTheme.primary),
                const SizedBox(width: 8),
                _buildStatBox('2.4M ₸', 'Табыс / Қор', AppTheme.secondary),
                const SizedBox(width: 8),
                _buildStatBox('3', 'Хакатон жеңісі', const Color(0xFF059669)),
              ],
            ),
            const SizedBox(height: 16),

            // Skills Section
            const Text(
              'Дағдылар мен Stack',
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppTheme.onSurface),
            ),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              children: const [
                Chip(label: Text('Python (Advanced)')),
                Chip(label: Text('PyTorch / ML')),
                Chip(label: Text('OR-Tools / VRP')),
                Chip(label: Text('FastAPI')),
                Chip(label: Text('Flutter & Dart')),
                Chip(label: Text('GeoPandas')),
                Chip(label: Text('YOLOv8')),
              ],
            ),
            const SizedBox(height: 16),

            // Verified Resume Card
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFFE2E8F0)),
              ),
              child: Row(
                children: [
                  Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: const Color(0xFFDCFCE7),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Icon(Icons.picture_as_pdf, color: Color(0xFF16A34A)),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text(
                          'CV_Nurislam_Tastanbek.pdf',
                          style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold),
                        ),
                        SizedBox(height: 2),
                        Text(
                          'AI верификациядан өткен · 2026',
                          style: TextStyle(fontSize: 11, color: Color(0xFF16A34A)),
                        ),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.visibility_outlined, size: 20),
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
        padding: const EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0xFFE2E8F0)),
        ),
        child: Column(
          children: [
            Text(val, style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold, color: color)),
            const SizedBox(height: 2),
            Text(label, style: const TextStyle(fontSize: 10, color: AppTheme.onSurfaceVariant)),
          ],
        ),
      ),
    );
  }
}
`
  },
  {
    path: 'lib/screens/employer_profile_screen.dart',
    name: 'employer_profile_screen.dart',
    category: 'screens',
    description: 'Кәсіпкердің / Жұмыс берушінің жеке кабинеті: Артқа қайту батырмасы, Эскроу баланс, жарияланған кейстер, жаңа тапсырма құру',
    code: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class EmployerProfileScreen extends StatelessWidget {
  const EmployerProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, size: 18, color: AppTheme.primary),
          onPressed: () => Navigator.of(context).maybePop(),
          tooltip: 'Артқа қайту',
        ),
        title: const Text(
          'Кәсіпкер кабинеті (Бизнес)',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppTheme.onSurface),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.tune, color: AppTheme.onSurfaceVariant),
            onPressed: () {},
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Company Profile Card
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.04),
                    blurRadius: 10,
                    offset: const Offset(0, 4),
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
                        child: const Icon(Icons.local_shipping, color: Colors.white, size: 30),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: const [
                            Text(
                              'Aibek Logistics & Supply',
                              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                            SizedBox(height: 2),
                            Text(
                              'Айбек Сейітов · Бас директор',
                              style: TextStyle(fontSize: 12, color: AppTheme.onSurfaceVariant),
                            ),
                            SizedBox(height: 2),
                            Row(
                              children: [
                                Icon(Icons.security, size: 14, color: Color(0xFF059669)),
                                SizedBox(width: 4),
                                Text(
                                  'Тексерілген компания (БСН 190440012)',
                                  style: TextStyle(fontSize: 11, color: Color(0xFF059669)),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const Divider(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Рөл: Жұмыс беруші',
                        style: TextStyle(fontSize: 12, color: AppTheme.onSurfaceVariant),
                      ),
                      TextButton.icon(
                        onPressed: () => Navigator.pushNamed(context, '/student'),
                        icon: const Icon(Icons.school, size: 16),
                        label: const Text('Студент режиміне өту', style: TextStyle(fontSize: 12)),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 14),

            // Escrow Balance Box
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  colors: [Color(0xFF0F172A), Color(0xFF1E293B)],
                ),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
                    'Қорғалған Смарт-Эскроу Балансы',
                    style: TextStyle(color: Colors.white70, fontSize: 12),
                  ),
                  SizedBox(height: 6),
                  Text(
                    '3 400 000 ₸',
                    style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 4),
                  Text(
                    'Студенттер тапсырманы орындап өткізгенде ғана төленеді.',
                    style: TextStyle(color: Colors.white60, fontSize: 11),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 14),

            // Post New Task Button
            SizedBox(
              width: double.infinity,
              height: 48,
              child: ElevatedButton.icon(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Жаңа бизнес-тапсырма құру модалі ашылды')),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.primary,
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                ),
                icon: const Icon(Icons.add_task),
                label: const Text('+ Жаңа тапсырма жариялау', style: TextStyle(fontWeight: FontWeight.bold)),
              ),
            ),
            const SizedBox(height: 20),

            // Active Challenges Posted
            const Text(
              'Жарияланған белсенді тапсырмалар (2)',
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppTheme.onSurface),
            ),
            const SizedBox(height: 10),

            _buildChallengeCard(
              title: '42 жүк көлігінің бағытын AI арқылы оңтайландыру',
              budget: '850 000 ₸',
              responses: '24 үн қату',
              status: 'Белсенді',
              statusColor: const Color(0xFF10B981),
            ),
            const SizedBox(height: 10),
            _buildChallengeCard(
              title: 'С қоймасындағы тауар есебін CV арқылы автоматтандыру',
              budget: '1 200 000 ₸',
              responses: '11 үн қату',
              status: 'Қаралуда',
              statusColor: const Color(0xFFF59E0B),
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
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: statusColor.withOpacity(0.12),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  status,
                  style: TextStyle(color: statusColor, fontSize: 11, fontWeight: FontWeight.bold),
                ),
              ),
              Text(
                budget,
                style: const TextStyle(fontWeight: FontWeight.bold, color: AppTheme.primary),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(title, style: const TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(responses, style: const TextStyle(fontSize: 11.5, color: AppTheme.onSurfaceVariant)),
              const Text(
                'Кандидаттарды қарау →',
                style: TextStyle(fontSize: 11.5, fontWeight: FontWeight.bold, color: AppTheme.primary),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
`
  },
  {
    path: 'lib/screens/tasks_screen.dart',
    name: 'tasks_screen.dart',
    category: 'screens',
    description: 'Тапсырмалар (Челлендждер) беті: Артқа қайту батырмасы, активті және аяқталған тапсырмалар, дедлайн, прогресс және нәтиже тапсыру',
    code: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class TasksScreen extends StatefulWidget {
  const TasksScreen({super.key});

  @override
  State<TasksScreen> createState() => _TasksScreenState();
}

class _TasksScreenState extends State<TasksScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, size: 18, color: AppTheme.primary),
          onPressed: () => Navigator.of(context).maybePop(),
          tooltip: 'Артқа қайту',
        ),
        title: const Text(
          'Менің тапсырмаларым',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppTheme.onSurface),
        ),
        bottom: TabBar(
          controller: _tabController,
          labelColor: AppTheme.primary,
          unselectedLabelColor: AppTheme.onSurfaceVariant,
          indicatorColor: AppTheme.primary,
          tabs: const [
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
            padding: const EdgeInsets.all(16),
            children: [
              _buildTaskCard(
                title: '42 жүк көлігінің логистикасын AI арқылы оңтайландыру',
                company: 'Aibek Logistics & Supply',
                reward: '850 000 ₸',
                deadline: '6 күн қалды',
                progress: 0.65,
                progressLabel: '65% орындалды',
              ),
              const SizedBox(height: 12),
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
            padding: const EdgeInsets.all(16),
            children: [
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: const Color(0xFF86EFAC)),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Жеңімпаз 🏆 · Толық төленді',
                          style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF16A34A)),
                        ),
                        Text(
                          '+650 000 ₸',
                          style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Color(0xFF16A34A)),
                        ),
                      ],
                    ),
                    SizedBox(height: 8),
                    Text(
                      'AgroData: Егістік ылғалын спутниктік талдау моделі',
                      style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                    ),
                    SizedBox(height: 4),
                    Text(
                      'Тапсырыс беруші бағасы: 5.0 ⭐⭐⭐⭐⭐',
                      style: TextStyle(fontSize: 12, color: AppTheme.onSurfaceVariant),
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
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.03),
            blurRadius: 10,
            offset: const Offset(0, 3),
          ),
        ],
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                company,
                style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppTheme.onSurfaceVariant),
              ),
              Text(
                reward,
                style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppTheme.primary),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            title,
            style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: AppTheme.onSurface),
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(progressLabel, style: const TextStyle(fontSize: 11.5, fontWeight: FontWeight.w500)),
              Text(deadline, style: const TextStyle(fontSize: 11.5, fontWeight: FontWeight.bold, color: Color(0xFFD97706))),
            ],
          ),
          const SizedBox(height: 6),
          ClipRRect(
            borderRadius: BorderRadius.circular(4),
            child: LinearProgressIndicator(
              value: progress,
              backgroundColor: const Color(0xFFF1F5F9),
              color: AppTheme.primary,
              minHeight: 6,
            ),
          ),
          const SizedBox(height: 14),
          Row(
            children: [
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Шешімді тапсыру терезесі ашылды 🚀')),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.primary,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                  icon: const Icon(Icons.send, size: 16),
                  label: const Text('Шешімді тапсыру', style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
`
  },
  {
    path: 'lib/screens/responses_screen.dart',
    name: 'responses_screen.dart',
    category: 'screens',
    description: 'Жауаптар мен үн қатулар (Отклики): Артқа қайту батырмасы, сұхбатқа шақырулар, AI скрининг, чатқа өту',
    code: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class ResponsesScreen extends StatelessWidget {
  const ResponsesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, size: 18, color: AppTheme.primary),
          onPressed: () => Navigator.of(context).maybePop(),
          tooltip: 'Артқа қайту',
        ),
        title: const Text(
          'Жауаптар мен Үн қатулар',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: AppTheme.onSurface),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Application 1: Interview
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: const Color(0xFF86EFAC)),
              boxShadow: [
                BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 10),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: const Color(0xFFDCFCE7),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Text(
                        '🟢 Сұхбатқа шақырылды',
                        style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF15803D)),
                      ),
                    ),
                    const Text('Бүгін, 14:20', style: TextStyle(fontSize: 11, color: AppTheme.onSurfaceVariant)),
                  ],
                ),
                const SizedBox(height: 10),
                const Text(
                  'Aibek Logistics & Supply',
                  style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 3),
                const Text(
                  '42 жүк көлігінің логистикасын AI арқылы оңтайландыру',
                  style: TextStyle(fontSize: 12.5, color: AppTheme.onSurfaceVariant),
                ),
                const SizedBox(height: 10),
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF0FDF4),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Text(
                    'HR Айгүл: "Бүгін сағат 16:00-де Google Meet арқылы сұхбатқа шақырамыз."',
                    style: TextStyle(fontSize: 11.5, color: Color(0xFF166534)),
                  ),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton.icon(
                        onPressed: () => Navigator.pushNamed(context, '/chat'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppTheme.primary,
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        ),
                        icon: const Icon(Icons.chat_bubble_outline, size: 16),
                        label: const Text('Чатты ашу', style: TextStyle(fontSize: 12)),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),

          // Application 2: Screening passed
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: const Color(0xFFE2E8F0)),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: const Color(0xFFDBEAFE),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Text(
                        '🔵 AI Скринингтен өтті (94%)',
                        style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF1D4ED8)),
                      ),
                    ),
                    const Text('Кеше', style: TextStyle(fontSize: 11, color: AppTheme.onSurfaceVariant)),
                  ],
                ),
                const SizedBox(height: 10),
                const Text(
                  'ZanTech AI Solutions',
                  style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 3),
                const Text(
                  'Құқықтық құжаттарды нақты уақытта транскрипциялау',
                  style: TextStyle(fontSize: 12.5, color: AppTheme.onSurfaceVariant),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
`
  },
  {
    path: 'lib/screens/chat_screen.dart',
    name: 'chat_screen.dart',
    category: 'screens',
    description: 'Чат және хабарламалар алмасу беті: Артқа қайту батырмасы, сұхбаттасушы ақпараты, жылдам AI жауаптары және Google Meet қоңырау',
    code: `import 'package:flutter/material.dart';
import '../theme/app_theme.dart';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _controller = TextEditingController();
  final List<Map<String, dynamic>> _messages = [
    {
      'sender': 'them',
      'text': 'Сәлеметсіз бе, Нұрислам! Біз сіздің 42 жүк көлігі кейсіне ұсынған шешіміңізді қарап шықтық. Өте жоғары деңгей!',
      'time': '14:15',
    },
    {
      'sender': 'them',
      'text': 'Бүгін сағат 16:00-де Google Meet арқылы техникалық сұхбатқа қосыла аласыз ба?',
      'time': '14:20',
    },
    {
      'sender': 'me',
      'text': 'Сәлеметсіз бе, Айгүл ханым! Иә, сағат 16:00 өте қолайлы. Алдын ала бағыттау демосын көрсетуге дайынмын.',
      'time': '14:22',
    },
    {
      'sender': 'them',
      'text': 'Керемет! Сілтеме: meet.google.com/wrk-logistics-ai. Күтеміз!',
      'time': '14:25',
    },
  ];

  void _sendMessage([String? quickText]) {
    final text = quickText ?? _controller.text;
    if (text.trim().isEmpty) return;

    setState(() {
      _messages.add({
        'sender': 'me',
        'text': text.trim(),
        'time': 'Қазір',
      });
      if (quickText == null) _controller.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, size: 18, color: AppTheme.primary),
          onPressed: () => Navigator.of(context).maybePop(),
          tooltip: 'Артқа қайту',
        ),
        title: Row(
          children: [
            const CircleAvatar(
              backgroundColor: AppTheme.primary,
              radius: 16,
              child: Text('AL', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.bold)),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text(
                  'Aibek Logistics (HR Айгүл)',
                  style: TextStyle(fontSize: 13.5, fontWeight: FontWeight.bold, color: AppTheme.onSurface),
                ),
                Text(
                  'онлайн · 42 жүк көлігі кейсі',
                  style: TextStyle(fontSize: 10.5, color: Color(0xFF10B981)),
                ),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.videocam_outlined, color: AppTheme.primary),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Meet сілтемесі: meet.google.com/wrk-logistics-ai')),
              );
            },
          ),
        ],
      ),
      body: Column(
        children: [
          // Messages list
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(14),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                final isMe = msg['sender'] == 'me';

                return Align(
                  alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 10),
                    constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.75),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: isMe ? AppTheme.primary : Colors.white,
                      borderRadius: BorderRadius.circular(16).copyWith(
                        bottomRight: isMe ? const Radius.circular(2) : null,
                        bottomLeft: !isMe ? const Radius.circular(2) : null,
                      ),
                      boxShadow: [
                        BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 4),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                          msg['text'],
                          style: TextStyle(
                            fontSize: 13,
                            color: isMe ? Colors.white : AppTheme.onSurface,
                          ),
                        ),
                        const SizedBox(height: 3),
                        Text(
                          msg['time'],
                          style: TextStyle(
                            fontSize: 9.5,
                            color: isMe ? Colors.white70 : AppTheme.onSurfaceVariant,
                          ),
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),

          // Quick action chips
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            child: Row(
              children: [
                ActionChip(
                  label: const Text('Сағат 16:00-ге дайынмын ✅', style: TextStyle(fontSize: 11)),
                  onPressed: () => _sendMessage('Иә, сағат 16:00-де сұхбатқа дайынмын!'),
                ),
                const SizedBox(width: 6),
                ActionChip(
                  label: const Text('Демоны көрсетемін 💻', style: TextStyle(fontSize: 11)),
                  onPressed: () => _sendMessage('VRP алгоритмінің демонстрациясын көрсете аламын.'),
                ),
              ],
            ),
          ),

          // Input field
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: const BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: Color(0xFFE2E8F0))),
            ),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: InputDecoration(
                      hintText: 'Хабарлама жазыңыз...',
                      hintStyle: const TextStyle(fontSize: 12.5),
                      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                      filled: true,
                      fillColor: AppTheme.surfaceContainerLow,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                IconButton(
                  onPressed: () => _sendMessage(),
                  icon: const Icon(Icons.send, color: AppTheme.primary),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
`
  }
];
