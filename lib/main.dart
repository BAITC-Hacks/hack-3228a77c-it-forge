import 'package:flutter/widgets.dart';

import 'app/work_ai_app.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const WorkAiApp());
}

class Brand extends StatelessWidget {
  const Brand({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(children: [
      Container(width: 30, height: 30, alignment: Alignment.center, decoration: BoxDecoration(color: blue, borderRadius: BorderRadius.circular(8)), child: const Text('W', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold))),
      const SizedBox(width: 8),
      const Text('Work', style: TextStyle(color: blue, fontSize: 20, fontWeight: FontWeight.bold)),
      const Text('.ai', style: TextStyle(color: purple, fontSize: 20, fontWeight: FontWeight.bold)),
    ]);
  }
}

InputDecoration appInput(String hint, IconData icon) => InputDecoration(hintText: hint, prefixIcon: Icon(icon), filled: true, fillColor: wash, border: OutlineInputBorder(borderRadius: BorderRadius.circular(13), borderSide: BorderSide.none));

class FeedScreen extends StatefulWidget {
  const FeedScreen({super.key});

  @override
  State<FeedScreen> createState() => _FeedScreenState();
}

class _FeedScreenState extends State<FeedScreen> {
  final search = TextEditingController(text: 'Логистика және AI');
  final filters = ['Барлығы', 'AI & ML', 'Логистика', 'IT & Әзірлеу', 'Қашықтан'];
  String filter = 'AI & ML';
  final saved = <String>{'logistics'};

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: const Brand(),
        actions: [IconButton(onPressed: () {}, icon: const Icon(Icons.notifications_none)), const Padding(padding: EdgeInsets.only(right: 14), child: CircleAvatar(backgroundColor: blue, child: Icon(Icons.person, color: Colors.white)))],
      ),
      body: ListView(
        padding: const EdgeInsets.all(14),
        children: [
          Row(children: [Expanded(child: TextField(controller: search, decoration: appInput('Лауазым, дағды немесе компания', Icons.search))), const SizedBox(width: 8), IconButton.filled(onPressed: () {}, style: IconButton.styleFrom(backgroundColor: blue), icon: const Icon(Icons.tune, color: Colors.white))]),
          const SizedBox(height: 12),
          SizedBox(height: 38, child: ListView.separated(scrollDirection: Axis.horizontal, itemCount: filters.length, separatorBuilder: (_, index) => const SizedBox(width: 7), itemBuilder: (_, index) => ChoiceChip(label: Text(filters[index]), selected: filter == filters[index], onSelected: (_) => setState(() => filter = filters[index]), selectedColor: blue, labelStyle: TextStyle(color: filter == filters[index] ? Colors.white : ink), showCheckmark: false))),
          const SizedBox(height: 14),
          const BannerCard(),
          const SizedBox(height: 18),
          const Text('Табылғаны: 84 вакансия мен тапсырма', style: TextStyle(color: Colors.black54, fontWeight: FontWeight.w600)),
          const SizedBox(height: 10),
          jobCard('logistics', 'Алматы көлік логистикасының динамикалық бағыттарын оңтайландыру', 'Aibek Construction & Logistics', '650 000 – 1 200 000 ₸', 91),
          jobCard('nlp', 'Қазақ тіліндегі нақты уақыттағы транскрипция моделі', 'ZanTech AI Solutions', '800 000 – 1 500 000 ₸', 94),
          const PromptCard(),
        ],
      ),
    );
  }

  Widget jobCard(String id, String title, String company, String salary, int score) {
    final isSaved = saved.contains(id);
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(15),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [Text(id == 'logistics' ? 'Шұғыл челлендж' : 'ҒЗИ & Бизнес', style: const TextStyle(color: blue, fontWeight: FontWeight.bold)), IconButton(onPressed: () => setState(() => isSaved ? saved.remove(id) : saved.add(id)), icon: Icon(isSaved ? Icons.bookmark : Icons.bookmark_border, color: blue))]),
          InkWell(onTap: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const DetailScreen())), child: Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: ink))),
          const SizedBox(height: 5),
          Row(children: [Text(company, style: const TextStyle(color: Colors.black54)), const SizedBox(width: 4), const Icon(Icons.verified, size: 16, color: blue)]),
          const SizedBox(height: 7),
          Text(salary, style: const TextStyle(color: blue, fontSize: 17, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          Container(padding: const EdgeInsets.all(10), decoration: BoxDecoration(color: wash, borderRadius: BorderRadius.circular(12)), child: Row(children: [CircleAvatar(backgroundColor: score > 92 ? purple : blue, radius: 17, child: Text('$score%', style: const TextStyle(color: Colors.white, fontSize: 11))), const SizedBox(width: 9), Expanded(child: Text('AI Дайындық индексі: $score/100\nЖоғары басымдық · Профильге сәйкес', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600))), const Icon(Icons.auto_awesome, color: purple)])),
          const SizedBox(height: 9),
          const Text('Python және AI негізінде нақты бизнес шешімін жасау.', style: TextStyle(color: Colors.black54, fontSize: 12.5)),
          const SizedBox(height: 8),
          Row(children: [Expanded(child: FilledButton.icon(onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const ApplyScreen())), icon: const Icon(Icons.send, size: 16), label: const Text('Үн қату'))), const SizedBox(width: 8), IconButton.filled(onPressed: () {}, style: IconButton.styleFrom(backgroundColor: const Color(0xFFE2E7FF), foregroundColor: blue), icon: const Icon(Icons.chat_bubble_outline))]),
        ]),
      ),
    );
  }
}

class BannerCard extends StatelessWidget {
  const BannerCard({super.key});

  @override
  Widget build(BuildContext context) => Container(padding: const EdgeInsets.all(16), decoration: BoxDecoration(gradient: const LinearGradient(colors: [blue, purple]), borderRadius: BorderRadius.circular(18)), child: const Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text('Work.ai AI Іріктеу', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)), SizedBox(height: 10), Text('Студенттер мен мамандар үшін нақты бизнес мәселелері мен жобалар', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold)), SizedBox(height: 5), Text('142 жаңа тапсырма · AI тесттері · тікелей гранттар', style: TextStyle(color: Colors.white70, fontSize: 12))]));
}

class PromptCard extends StatelessWidget {
  const PromptCard({super.key});

  @override
  Widget build(BuildContext context) => Container(padding: const EdgeInsets.all(14), decoration: BoxDecoration(color: const Color(0xFFE2E7FF), borderRadius: BorderRadius.circular(16)), child: const Row(children: [CircleAvatar(backgroundColor: purple, child: Icon(Icons.auto_awesome, color: Colors.white)), SizedBox(width: 10), Expanded(child: Text('Өз дағдыларыңызға сәйкес тапсырма табыңыз\nWork.ai түйіндемеңізді сканерлейді.', style: TextStyle(fontSize: 12, color: ink)))]));
}

class DetailScreen extends StatelessWidget {
  const DetailScreen({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(appBar: AppBar(title: const Brand()), body: ListView(padding: const EdgeInsets.all(14), children: [
        Card(child: Padding(padding: const EdgeInsets.all(16), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [const Text('Бүгін, 10:45 · 418 қаралым', style: TextStyle(color: Colors.grey, fontSize: 12)), const SizedBox(height: 10), const Text('Алматы көлік логистикасының динамикалық бағыттарын оңтайландыру', style: TextStyle(fontSize: 21, fontWeight: FontWeight.bold, color: ink)), const SizedBox(height: 8), const Text('650 000 – 1 200 000 ₸', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)), const SizedBox(height: 12), const Text('Aibek Construction & Logistics · 4.8 ★', style: TextStyle(fontWeight: FontWeight.bold)), const SizedBox(height: 14), FilledButton.icon(onPressed: () => Navigator.push(context, MaterialPageRoute(builder: (_) => const ApplyScreen())), icon: const Icon(Icons.send), label: const Text('Үн қату'))]))),
        section('AI Тексеруден өткен жоба', 'Мәселенің нақтылығы мен бағалау критерийлері толық расталған.', true),
        section('1. Бизнес мәселесі және контекст', '42 жүк көлігі кептелісте 3 сағатқа дейін тұрып қалады. Жанармай шығыны 28%-ға өсті.'),
        section('2. Командадан күтілетін нәтиже', 'Бағыттау алгоритмі\nДиспетчер интерфейсі\nТестілеу және талдау'),
        section('3. Деректер мен ресурстар', '1.2M жол GPS деректері\n42 жүк көлігінің сипаттамасы\nYandex/2GIS API'),
        section('4. Негізгі дағдылар', 'Python · OR-Tools · Telemetry · Git · REST API'),
        section('Орналасқан жері', 'Алматы, Достық даңғылы, 180'),
      ]));

  Widget section(String title, String text, [bool progress = false]) => Card(margin: const EdgeInsets.only(bottom: 12), child: Padding(padding: const EdgeInsets.all(16), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(title, style: const TextStyle(color: blue, fontWeight: FontWeight.bold, fontSize: 15)), const SizedBox(height: 8), Text(text, style: const TextStyle(height: 1.4)), if (progress) ...[const SizedBox(height: 10), const LinearProgressIndicator(value: .91, color: blue)]])));
}

class ApplyScreen extends StatefulWidget {
  const ApplyScreen({super.key});

  @override
  State<ApplyScreen> createState() => _ApplyState();
}

class _ApplyState extends State<ApplyScreen> {
  final letter = TextEditingController(text: 'Біздің командамыз VRP алгоритмдерін қолданып, 3 апта ішінде сынақ нұсқасын дайындай алады.');
  bool busy = false;

  @override
  Widget build(BuildContext context) => Scaffold(appBar: AppBar(title: const Text('Үн қату')), body: ListView(padding: const EdgeInsets.all(14), children: [
        form('Жоба', const Text('AI Match: 94%\nАлматы көлік логистикасы\n650 000 – 1 200 000 ₸')),
        form('1. Команда', const Text('Data Crafters\nҚБТУ 3-курс командасы', style: TextStyle(fontWeight: FontWeight.bold))),
        form('2. Ілеспе хат', TextField(controller: letter, maxLines: 5, decoration: appInput('Өз шешіміңізді жазыңыз...', Icons.edit_outlined))),
        form('3. Мерзім және GitHub', Column(children: [const Text('1-2 апта     3-4 апта     1.5+ ай'), const SizedBox(height: 10), TextField(decoration: appInput('github.com/...', Icons.terminal))])),
        form('4. Байланыс', Column(children: [TextField(decoration: appInput('+7 (777) 123-45-67', Icons.phone)), const SizedBox(height: 10), TextField(decoration: appInput('team@datacrafters.kz', Icons.mail))])),
        FilledButton.icon(onPressed: busy ? null : submit, icon: busy ? const CircularProgressIndicator(color: Colors.white) : const Icon(Icons.send), label: Text(busy ? 'Жіберілуде...' : 'Үн қатуды жіберу')),
      ]));

  Widget form(String title, Widget child) => Card(margin: const EdgeInsets.only(bottom: 12), child: Padding(padding: const EdgeInsets.all(15), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 15)), const SizedBox(height: 10), child])));

  void submit() async { setState(() => busy = true); await Future<void>.delayed(const Duration(milliseconds: 700)); if (!mounted) return; setState(() => busy = false); showDialog(context: context, builder: (_) => AlertDialog(title: const Text('Жауап сәтті жіберілді!'), content: const Text('Ұсынысыңыз компанияға жеткізілді.'), actions: [TextButton(onPressed: () { Navigator.pop(context); Navigator.pop(context); }, child: const Text('Жақсы'))])); }
}

class AuthScreen extends StatelessWidget {
  const AuthScreen({super.key});

  @override
  Widget build(BuildContext context) => Scaffold(appBar: AppBar(title: const Brand()), body: ListView(padding: const EdgeInsets.all(16), children: [const SizedBox(height: 18), const Text('Болашақ жұмыс кеңістігі', textAlign: TextAlign.center, style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold, color: ink)), const SizedBox(height: 8), const Text('Қазақстандағы бизнес мәселелерін шешуге арналған AI платформасы', textAlign: TextAlign.center), const SizedBox(height: 20), const Card(child: Padding(padding: EdgeInsets.all(16), child: Text('10 секундта AI Тіркелу\n\nРезюме жүктеп, сауалнамасыз кіріңіз', style: TextStyle(fontWeight: FontWeight.bold)))), const SizedBox(height: 14), Card(child: Padding(padding: const EdgeInsets.all(16), child: Column(children: [TextField(decoration: appInput('Телефон нөмірі немесе email', Icons.person)), const SizedBox(height: 10), TextField(obscureText: true, decoration: appInput('Құпия сөз', Icons.lock)), const SizedBox(height: 14), FilledButton.icon(onPressed: () {}, icon: const Icon(Icons.arrow_forward), label: const Text('Жүйеге кіру'), style: FilledButton.styleFrom(minimumSize: const Size.fromHeight(48))), const SizedBox(height: 10), OutlinedButton.icon(onPressed: () {}, icon: const Icon(Icons.fingerprint), label: const Text('Face ID / Touch ID арқылы кіру'))]))), const SizedBox(height: 18), const Text('256-bit шифрлау · ҚР заңына сай', textAlign: TextAlign.center)]));
}
