class JobChallenge {
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
      description:
          'Таулы аймақтардағы жеткізу кешігулерін азайту үшін OR-Tools және Python негізінде телеметрия шешімін жасау.',
      tags: ['Python', 'OR-Tools', 'Логистика', 'GPS Data'],
      postedTime: 'Бүгін, 14:20',
      responsesCount: '4 команда жауап берді',
      badges: ['Шұғыл челлендж', 'Гранттық жоба'],
      companyRating: '4.8',
      reviewCount: 24,
      fullProblemContext:
          'Алматыдағы 42 жүк көлігіміз күн сайын таңертең кептелісте 3 сағатқа дейін тұрып қалады. Жеткізу бағыттары қолмен бекітілетіндіктен, жанармай шығыны 28%-ға өсті.',
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
      title:
          'Құқықтық құжаттар үшін қазақ тіліндегі нақты уақыттағы транскрипция моделі',
      companyName: 'ZanTech AI Solutions',
      isVerifiedCompany: true,
      salaryRange: '800 000 – 1 500 000 ₸',
      grantType: 'айына',
      location: 'Астана / Алматы · Толық күн',
      aiMatchScore: 94,
      matchDescription: 'Дауыс өңдеу бойынша тамаша үйлесім',
      description:
          'Қазақ тіліндегі арнайы заң терминдерін нақты танитын Whisper & PyTorch негізіндегі модельді оқыту және оңтайландыру.',
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
      description:
          'Тұтынушылардың қайтып келу жиілігін бағалау, адалдық жүйесінің транзакциялық деректерін талдау және витриналарды оңтайландыру.',
      tags: ['Data Science', 'SQL', 'Tableau', 'Churn Modeling'],
      postedTime: '3 сағат бұрын',
      responsesCount: '12 жауап қаралуда',
      badges: ['Бөлшек сауда', 'Тәжірибе: 1-3 жыл'],
    ),
  ];
}
