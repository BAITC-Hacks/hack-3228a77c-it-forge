import '../models/challenge.dart';

const challenges = <Challenge>[
  Challenge(
    id: 'logistics',
    title: 'Алматыдағы 42 жүк көлігінің бағытын AI арқылы оңтайландыру',
    company: 'Aibek Logistics & Supply',
    reward: '650 000 – 1 200 000 ₸',
    category: 'Жедел челлендж',
    match: 91,
    summary:
        'Кептеліс пен уақыт терезелерін ескере отырып, жеткізу бағыттарын жоспарлайтын шешім жасаңыз.',
    tags: ['Python', 'OR-Tools', 'Логистика', 'GPS Data'],
  ),
  Challenge(
    id: 'speech',
    title: 'Қазақ тіліндегі заң құжаттарын транскрипциялау моделі',
    company: 'ZanTech AI Solutions',
    reward: '800 000 – 1 500 000 ₸',
    category: 'AI & Бизнес',
    match: 94,
    summary:
        'Whisper және PyTorch негізінде арнайы терминдерді дәл танитын сөйлеу моделін оқытыңыз.',
    tags: ['NLP', 'Whisper', 'PyTorch', 'Kazakh Speech'],
    responses: 7,
  ),
  Challenge(
    id: 'retail',
    title: 'Retail желісі үшін клиенттердің кетуін болжау',
    company: 'Magnum Analytics',
    reward: '500 000 – 900 000 ₸',
    category: 'Data Science',
    match: 88,
    summary:
        'Транзакциялық деректерден клиенттің қайта келу ықтималдығын бағалау.',
    tags: ['SQL', 'Tableau', 'Churn'],
    responses: 12,
  ),
];
