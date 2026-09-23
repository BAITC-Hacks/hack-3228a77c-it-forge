import 'package:flutter/material.dart';

import '../../app/theme/app_colors.dart';
import '../../shared/models/challenge.dart';
import '../../shared/widgets/app_widgets.dart';

class ChallengeDetailScreen extends StatefulWidget {
  const ChallengeDetailScreen({
    super.key,
    required this.challenge,
    required this.onApply,
  });
  final Challenge challenge;
  final VoidCallback onApply;
  @override
  State<ChallengeDetailScreen> createState() => _ChallengeDetailScreenState();
}

class _ChallengeDetailScreenState extends State<ChallengeDetailScreen> {
  var favorite = false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: const BackButton(),
        title: const BrandMark(compact: true),
        actions: [
          IconButton(
            onPressed: () => showAppToast(context, 'Сілтеме көшірілді'),
            icon: const Icon(Icons.share_outlined),
          ),
        ],
      ),
      body: Stack(
        children: [
          ListView(
            padding: const EdgeInsets.fromLTRB(16, 8, 16, 92),
            children: [
              _hero(),
              const SizedBox(height: 12),
              _score(),
              const SizedBox(height: 12),
              _context(),
              const SizedBox(height: 12),
              _deliverables(),
              const SizedBox(height: 12),
              _data(),
              const SizedBox(height: 12),
              _skills(),
              const SizedBox(height: 12),
              _place(),
            ],
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: SafeArea(
              top: false,
              child: Container(
                padding: const EdgeInsets.all(10),
                decoration: const BoxDecoration(
                  color: Colors.white,
                  border: Border(top: BorderSide(color: AppColors.outline)),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Text(
                        widget.challenge.reward,
                        style: const TextStyle(fontWeight: FontWeight.w800),
                      ),
                    ),
                    FilledButton.icon(
                      onPressed: widget.onApply,
                      icon: const Icon(Icons.send, size: 16),
                      label: const Text('Үн қату'),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _hero() => AppCard(
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Бүгін, 10:45 · 418 қаралым',
          style: TextStyle(fontSize: 10, color: AppColors.muted),
        ),
        const SizedBox(height: 9),
        Text(
          widget.challenge.title,
          style: Theme.of(context).textTheme.titleLarge,
        ),
        const SizedBox(height: 7),
        Text(
          widget.challenge.reward,
          style: const TextStyle(fontSize: 19, fontWeight: FontWeight.w800),
        ),
        const SizedBox(height: 11),
        ListTile(
          contentPadding: EdgeInsets.zero,
          leading: const CircleAvatar(
            backgroundColor: AppColors.softBlueStrong,
            child: Text(
              'A',
              style: TextStyle(
                color: AppColors.primary,
                fontWeight: FontWeight.w800,
              ),
            ),
          ),
          title: Text(
            widget.challenge.company,
            style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w800),
          ),
          subtitle: const Text(
            '★ 4.8 · 24 пікір',
            style: TextStyle(fontSize: 10, color: AppColors.amber),
          ),
          trailing: TextButton(onPressed: () {}, child: const Text('Компания')),
        ),
        const Text(
          'Тәжірибе: 1–3 жыл немесе студенттер командасы\nЖобалық жұмыс, икемді кесте, қашықтан\nАлматы, Достық даңғылы, 180',
          style: TextStyle(fontSize: 11, height: 1.5, color: AppColors.muted),
        ),
        const SizedBox(height: 9),
        Row(
          children: [
            Expanded(
              child: FilledButton.icon(
                onPressed: widget.onApply,
                icon: const Icon(Icons.send, size: 16),
                label: const Text('Үн қату'),
              ),
            ),
            const SizedBox(width: 8),
            IconButton(
              onPressed: () => setState(() => favorite = !favorite),
              style: IconButton.styleFrom(
                backgroundColor: AppColors.soft,
                foregroundColor: favorite ? AppColors.danger : AppColors.muted,
              ),
              icon: Icon(favorite ? Icons.favorite : Icons.favorite_border),
            ),
          ],
        ),
      ],
    ),
  );
  Widget _score() => AppCard(
    color: const Color(0xFFF8FAFF),
    border: const Color(0xFFDDE7FF),
    child: Row(
      children: [
        const CircleAvatar(
          backgroundColor: AppColors.violetBright,
          child: Icon(Icons.auto_awesome, color: Colors.white),
        ),
        const SizedBox(width: 9),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'AI тексеруден өткен жоба',
                    style: TextStyle(fontWeight: FontWeight.w800, fontSize: 12),
                  ),
                  StatusPill(
                    label: '${widget.challenge.match}/100',
                    color: AppColors.violet,
                  ),
                ],
              ),
              const Text(
                'Мәселенің нақтылығы, деректер және критерийлер расталған.',
                style: TextStyle(fontSize: 10, color: AppColors.muted),
              ),
              const SizedBox(height: 6),
              TweenAnimationBuilder<double>(
                tween: Tween(begin: 0, end: widget.challenge.match / 100),
                duration: const Duration(milliseconds: 850),
                builder: (context, value, child) => LinearProgressIndicator(
                  value: value,
                  minHeight: 6,
                  borderRadius: BorderRadius.circular(3),
                ),
              ),
            ],
          ),
        ),
      ],
    ),
  );
  Widget _context() => _section(
    '1. Бизнес мәселесі және контекст',
    Icons.local_shipping_outlined,
    [
      Container(
        height: 120,
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFF172554), Color(0xFF312E81)],
          ),
          borderRadius: BorderRadius.circular(12),
        ),
        child: const Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.local_shipping, color: Color(0xFF93C5FD), size: 35),
              Text(
                '42 жүк көлігі флоты',
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w800,
                ),
              ),
              Text(
                'Алматы қаласы және облысы',
                style: TextStyle(color: Color(0xFFBFDBFE), fontSize: 10),
              ),
            ],
          ),
        ),
      ),
      const SizedBox(height: 9),
      const Text(
        'Алматыдағы 42 жүк көлігі кептелісте үш сағатқа дейін тұрып қалады. Бағыттар қолмен бекітіледі, сондықтан жанармай шығыны 28%-ға өсті.',
        style: TextStyle(fontSize: 12, height: 1.4),
      ),
      const SizedBox(height: 9),
      const Row(
        children: [
          Expanded(child: _Metric('42', 'Жүк көлігі')),
          SizedBox(width: 7),
          Expanded(child: _Metric('~3 сағ', 'Кідіріс')),
          SizedBox(width: 7),
          Expanded(child: _Metric('+28%', 'Жанармай')),
        ],
      ),
    ],
  );
  Widget _deliverables() => _section(
    '2. Командадан күтілетін нәтиже',
    Icons.assignment_turned_in_outlined,
    const [
      _Info(
        '1',
        'Бағыттау алгоритмі',
        'Python / OR-Tools және уақыт терезелері бар модуль.',
      ),
      _Info(
        '2',
        'Диспетчер интерфейсі',
        'Маршрут визуализациясы бар веб немесе мобильді демо.',
      ),
      _Info(
        '3',
        'Тестілеу және талдау',
        '180 күндік GPS журналдары негізіндегі салыстыру.',
      ),
    ],
  );
  Widget _data() => _section(
    '3. Ұсынылатын деректер мен ресурстар',
    Icons.storage_outlined,
    const [
      _Bullet('1.2M жолдан тұратын анонимдендірілген GPS сапар деректері.'),
      _Bullet('42 жүк көлігінің сипаттамасы және жанармай картасы.'),
      _Bullet('Yandex/2GIS бағыт API және геодеректерге қолжетімділік.'),
    ],
  );
  Widget
  _skills() => _section('4. Негізгі талаптар мен дағдылар', Icons.auto_awesome, [
    const Text(
      'Жеке маман немесе 2–4 адамнан құралған студенттік команда қатыса алады.',
      style: TextStyle(fontSize: 11, color: AppColors.muted),
    ),
    const SizedBox(height: 7),
    Wrap(
      spacing: 5,
      runSpacing: 5,
      children:
          [
                'Python',
                'Data Analysis',
                'OR-Tools',
                'Telemetry',
                'Git',
                'REST API',
              ]
              .map(
                (item) => Chip(
                  label: Text(item),
                  backgroundColor: AppColors.softBlue,
                  side: BorderSide.none,
                  visualDensity: VisualDensity.compact,
                  labelStyle: const TextStyle(
                    fontSize: 10,
                    color: AppColors.primary,
                  ),
                ),
              )
              .toList(),
    ),
  ]);
  Widget _place() => _section('Орналасқан жері', Icons.map_outlined, [
    Container(
      height: 90,
      decoration: BoxDecoration(
        color: AppColors.soft,
        borderRadius: BorderRadius.circular(12),
      ),
      child: const Center(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.location_on, color: AppColors.primary),
            Text(
              'Достық даңғылы, 180',
              style: TextStyle(fontWeight: FontWeight.w800),
            ),
            Text(
              'Бизнес орталық',
              style: TextStyle(fontSize: 10, color: AppColors.muted),
            ),
          ],
        ),
      ),
    ),
  ]);
  Widget _section(String title, IconData icon, List<Widget> children) =>
      AppCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: AppColors.primary, size: 18),
                const SizedBox(width: 7),
                Text(
                  title,
                  style: const TextStyle(
                    fontWeight: FontWeight.w800,
                    fontSize: 13,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 9),
            ...children,
          ],
        ),
      );
}

class _Metric extends StatelessWidget {
  const _Metric(this.value, this.label);
  final String value, label;
  @override
  Widget build(BuildContext context) => Container(
    padding: const EdgeInsets.symmetric(vertical: 8),
    decoration: BoxDecoration(
      color: AppColors.soft,
      borderRadius: BorderRadius.circular(10),
    ),
    child: Column(
      children: [
        Text(value, style: const TextStyle(fontWeight: FontWeight.w800)),
        Text(
          label,
          style: const TextStyle(fontSize: 9, color: AppColors.muted),
        ),
      ],
    ),
  );
}

class _Info extends StatelessWidget {
  const _Info(this.no, this.title, this.detail);
  final String no, title, detail;
  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.only(bottom: 6),
    child: Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        CircleAvatar(
          radius: 10,
          backgroundColor: AppColors.softBlueStrong,
          child: Text(
            no,
            style: const TextStyle(fontSize: 10, color: AppColors.primary),
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w800,
                ),
              ),
              Text(
                detail,
                style: const TextStyle(fontSize: 10, color: AppColors.muted),
              ),
            ],
          ),
        ),
      ],
    ),
  );
}

class _Bullet extends StatelessWidget {
  const _Bullet(this.text);
  final String text;
  @override
  Widget build(BuildContext context) => Padding(
    padding: const EdgeInsets.symmetric(vertical: 3),
    child: Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Icon(Icons.check_circle, size: 16, color: AppColors.green),
        const SizedBox(width: 7),
        Expanded(child: Text(text, style: const TextStyle(fontSize: 11))),
      ],
    ),
  );
}
