import 'package:flutter/material.dart';
import '../../app/theme/app_colors.dart';
import '../../shared/models/challenge.dart';
import '../../shared/widgets/app_widgets.dart';

class ApplyScreen extends StatefulWidget {
  const ApplyScreen({
    super.key,
    required this.challenge,
    required this.onSuccess,
  });
  final Challenge challenge;
  final VoidCallback onSuccess;
  @override
  State<ApplyScreen> createState() => _ApplyScreenState();
}

class _ApplyScreenState extends State<ApplyScreen> {
  final letter = TextEditingController(
    text:
        'Біздің командамыз OR-Tools және GPS деректерімен үш аптада прототип ұсына алады.',
  );
  @override
  void dispose() {
    letter.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Үн қату')),
    body: ListView(
      padding: const EdgeInsets.all(16),
      children: [
        AppCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                widget.challenge.title,
                style: const TextStyle(fontWeight: FontWeight.w800),
              ),
              Text(
                '${widget.challenge.reward} · ${widget.challenge.company}',
                style: const TextStyle(fontSize: 11, color: AppColors.muted),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        const AppCard(
          child: ListTile(
            contentPadding: EdgeInsets.zero,
            leading: CircleAvatar(
              backgroundColor: AppColors.primaryBright,
              child: Text('DC', style: TextStyle(color: Colors.white)),
            ),
            title: Text('Data Crafters'),
            subtitle: Text('ҚБТУ · 4 қатысушы · ML & Data Science'),
          ),
        ),
        const SizedBox(height: 12),
        AppCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Ілеспе хат',
                style: TextStyle(fontWeight: FontWeight.w800),
              ),
              TextButton.icon(
                onPressed: () => setState(
                  () => letter.text =
                      'Құрметті Aibek Logistics командасы! Біз кептелісті азайтатын VRP алгоритмін үш аптада ұсынамыз.',
                ),
                icon: const Icon(Icons.auto_awesome, size: 15),
                label: const Text('AI көмекшісі'),
              ),
              TextField(
                controller: letter,
                maxLines: 6,
                decoration: const InputDecoration(
                  hintText: 'Неге бұл тапсырма сізге сай?',
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 12),
        const AppCard(
          child: TextField(
            decoration: InputDecoration(
              labelText: 'GitHub немесе прототип сілтемесі',
              prefixIcon: Icon(Icons.terminal),
            ),
          ),
        ),
        const SizedBox(height: 14),
        FilledButton.icon(
          onPressed: () {
            showAppToast(context, 'Жауап сәтті жіберілді!');
            Navigator.pop(context);
            widget.onSuccess();
          },
          style: FilledButton.styleFrom(minimumSize: const Size.fromHeight(52)),
          icon: const Icon(Icons.send),
          label: const Text('Үн қатуды жіберу'),
        ),
      ],
    ),
  );
}

class ResponsesScreen extends StatelessWidget {
  const ResponsesScreen({super.key});
  @override
  Widget build(BuildContext context) => _Page(
    'Жауаптар мен үн қатулар',
    Column(
      children: [
        const Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _Stat('6', 'Барлық үн қату', AppColors.primary),
            _Stat('2', 'Сұхбатқа шақыру', AppColors.green),
            _Stat('3', 'AI қаралуда', AppColors.violet),
          ],
        ),
        const SizedBox(height: 12),
        _response(
          'Сұхбатқа шақырылды',
          AppColors.green,
          'Aibek Logistics & Supply',
          'Google Meet: Бүгін, сағат 16:00',
        ),
        const SizedBox(height: 9),
        _response(
          'AI скринингтен өтті (94%)',
          AppColors.primary,
          'ZanTech AI Solutions',
          'Резюме техникалық жетекшіге жіберілді.',
        ),
        const SizedBox(height: 9),
        _response(
          'Қаралуда',
          AppColors.muted,
          'Kaspi Fintech Labs',
          'Жауап күтілуде.',
        ),
      ],
    ),
  );
  Widget _response(String status, Color color, String name, String note) =>
      AppCard(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            StatusPill(label: status, color: color),
            const SizedBox(height: 7),
            Text(name, style: const TextStyle(fontWeight: FontWeight.w800)),
            const Text(
              '42 жүк көлігінің логистикасын AI арқылы оңтайландыру',
              style: TextStyle(fontSize: 11, color: AppColors.muted),
            ),
            const SizedBox(height: 8),
            Text(note, style: TextStyle(fontSize: 11, color: color)),
            Align(
              alignment: Alignment.centerRight,
              child: TextButton(
                onPressed: () {},
                child: const Text('Чатты ашу'),
              ),
            ),
          ],
        ),
      );
}

class TasksScreen extends StatelessWidget {
  const TasksScreen({super.key});
  @override
  Widget build(BuildContext context) => _Page(
    'Менің тапсырмаларым',
    AppCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const StatusPill(label: 'Жол ортасында'),
          const SizedBox(height: 9),
          const Text(
            '42 жүк көлігінің логистикасын AI арқылы оңтайландыру',
            style: TextStyle(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 9),
          const LinearProgressIndicator(
            value: .65,
            minHeight: 7,
            borderRadius: BorderRadius.all(Radius.circular(5)),
          ),
          const SizedBox(height: 5),
          const Text(
            'Прогресс: 65% · Дедлайн: 6 күн қалды',
            style: TextStyle(fontSize: 11, color: AppColors.muted),
          ),
          Align(
            alignment: Alignment.centerRight,
            child: TextButton.icon(
              onPressed: () =>
                  showAppToast(context, 'Шешімді тапсыру терезесі ашылды'),
              icon: const Icon(Icons.send, size: 15),
              label: const Text('Шешімді жіберу'),
            ),
          ),
        ],
      ),
    ),
  );
}

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});
  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final input = TextEditingController();
  final messages = <String>[
    'Сәлеметсіз бе! Ұсынған VRP шешіміңізді қарап шықтық.',
    'Бүгін сағат 16:00-де Google Meet арқылы сұхбатқа қосыла аласыз ба?',
  ];
  void send() {
    if (input.text.trim().isEmpty) return;
    setState(() {
      messages.add(input.text.trim());
      input.clear();
    });
  }

  @override
  void dispose() {
    input.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('Aibek Logistics (HR Айгүл)')),
    body: Column(
      children: [
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.all(14),
            itemCount: messages.length,
            itemBuilder: (context, index) {
              final mine = index > 1;
              return Align(
                alignment: mine ? Alignment.centerRight : Alignment.centerLeft,
                child: Container(
                  margin: const EdgeInsets.only(bottom: 9),
                  padding: const EdgeInsets.all(11),
                  decoration: BoxDecoration(
                    color: mine ? AppColors.primary : Colors.white,
                    borderRadius: BorderRadius.circular(15),
                    border: mine ? null : Border.all(color: AppColors.outline),
                  ),
                  child: Text(
                    messages[index],
                    style: TextStyle(
                      fontSize: 12,
                      color: mine ? Colors.white : AppColors.ink,
                    ),
                  ),
                ),
              );
            },
          ),
        ),
        Padding(
          padding: const EdgeInsets.all(10),
          child: Row(
            children: [
              Expanded(
                child: TextField(
                  controller: input,
                  onSubmitted: (_) => send(),
                  decoration: const InputDecoration(
                    hintText: 'Хабарлама жазыңыз...',
                  ),
                ),
              ),
              const SizedBox(width: 7),
              IconButton(
                onPressed: send,
                style: IconButton.styleFrom(
                  backgroundColor: AppColors.primary,
                  foregroundColor: Colors.white,
                ),
                icon: const Icon(Icons.send),
              ),
            ],
          ),
        ),
      ],
    ),
  );
}

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({
    super.key,
    required this.isBusiness,
    required this.onChangeMode,
    required this.onCreateChallenge,
  });
  final bool isBusiness;
  final ValueChanged<bool> onChangeMode;
  final VoidCallback onCreateChallenge;
  @override
  Widget build(BuildContext context) => _Page(
    isBusiness ? 'Кәсіпкер кабинеті' : 'Студент профилі',
    Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        AppCard(
          child: Column(
            children: [
              ListTile(
                contentPadding: EdgeInsets.zero,
                leading: CircleAvatar(
                  radius: 26,
                  backgroundColor: isBusiness
                      ? AppColors.primary
                      : AppColors.violetBright,
                  child: Icon(
                    isBusiness ? Icons.local_shipping : Icons.person,
                    color: Colors.white,
                  ),
                ),
                title: Text(
                  isBusiness
                      ? 'Aibek Logistics & Supply'
                      : 'Нұрислам Тастанбек',
                  style: const TextStyle(fontWeight: FontWeight.w800),
                ),
                subtitle: Text(
                  isBusiness
                      ? 'Айбек Сейітов · Бас директор'
                      : 'Data Science & AI Engineer',
                ),
              ),
              TextButton.icon(
                onPressed: () => onChangeMode(!isBusiness),
                icon: const Icon(Icons.swap_horiz, size: 15),
                label: Text(isBusiness ? 'Студент режимі' : 'Кәсіпкер режимі'),
              ),
            ],
          ),
        ),
        const SizedBox(height: 11),
        if (isBusiness) _business() else _student(),
      ],
    ),
  );
  Widget _business() => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFF111827), Color(0xFF312E81)],
          ),
          borderRadius: BorderRadius.circular(18),
        ),
        child: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Қорғалған эскроу балансы',
              style: TextStyle(color: Color(0xFFD1D5DB), fontSize: 11),
            ),
            Text(
              '3 400 000 ₸',
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w900,
                fontSize: 25,
              ),
            ),
            Text(
              'Төлем студент тапсырманы сәтті өткізгенде аударылады.',
              style: TextStyle(color: Color(0xFF9CA3AF), fontSize: 10),
            ),
          ],
        ),
      ),
      const SizedBox(height: 11),
      FilledButton.icon(
        onPressed: onCreateChallenge,
        style: FilledButton.styleFrom(minimumSize: const Size.fromHeight(50)),
        icon: const Icon(Icons.auto_awesome),
        label: const Text('+ Жаңа бизнес-тапсырма жариялау'),
      ),
    ],
  );
  Widget _student() => Column(
    children: [
      Container(
        padding: const EdgeInsets.all(15),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFF172554), Color(0xFF312E81)],
          ),
          borderRadius: BorderRadius.circular(18),
        ),
        child: const Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    '✦ Work.ai Index: 96 / 100',
                    style: TextStyle(
                      color: Color(0xFFBFDBFE),
                      fontSize: 11,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  Text(
                    'ҚР бойынша ТОП 2% AI маманы',
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                  Text(
                    'Логистика, VRP, NLP, CV жобалары',
                    style: TextStyle(color: Color(0xFFBFDBFE), fontSize: 10),
                  ),
                ],
              ),
            ),
            ScoreRing(score: 96, size: 52),
          ],
        ),
      ),
      const SizedBox(height: 11),
      const Row(
        children: [
          Expanded(child: _Stat('12', 'Орындалған кейс', AppColors.primary)),
          Expanded(child: _Stat('2.4M ₸', 'Табыс / жыл', AppColors.violet)),
          Expanded(child: _Stat('3', 'Хакатон жеңісі', AppColors.green)),
        ],
      ),
    ],
  );
}

class _Page extends StatelessWidget {
  const _Page(this.title, this.child);
  final String title;
  final Widget child;
  @override
  Widget build(BuildContext context) => SafeArea(
    child: Column(
      children: [
        const Padding(
          padding: EdgeInsets.fromLTRB(16, 10, 16, 6),
          child: Align(
            alignment: Alignment.centerLeft,
            child: BrandMark(compact: true),
          ),
        ),
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 0, 16, 10),
          child: Align(
            alignment: Alignment.centerLeft,
            child: Text(title, style: Theme.of(context).textTheme.titleLarge),
          ),
        ),
        Expanded(
          child: ListView(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 25),
            children: [child],
          ),
        ),
      ],
    ),
  );
}

class _Stat extends StatelessWidget {
  const _Stat(this.value, this.label, this.color);
  final String value, label;
  final Color color;
  @override
  Widget build(BuildContext context) => Column(
    children: [
      Text(
        value,
        style: TextStyle(
          color: color,
          fontWeight: FontWeight.w900,
          fontSize: 16,
        ),
      ),
      Text(
        label,
        textAlign: TextAlign.center,
        style: const TextStyle(fontSize: 9, color: AppColors.muted),
      ),
    ],
  );
}
