import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../widgets/ai_task_clarification_dialog.dart';

class NewTaskScreen extends StatefulWidget {
  const NewTaskScreen({super.key});

  @override
  State<NewTaskScreen> createState() => _NewTaskScreenState();
}

class _NewTaskScreenState extends State<NewTaskScreen> {
  final _form = GlobalKey<FormState>();
  final _description = TextEditingController();
  final _budget = TextEditingController();
  final _duration = TextEditingController();

  @override
  void dispose() {
    _description.dispose();
    _budget.dispose();
    _duration.dispose();
    super.dispose();
  }

  void _clarify() {
    if (!_form.currentState!.validate()) return;
    FocusScope.of(context).unfocus();
    showDialog<void>(
      context: context,
      builder: (_) => AiTaskClarificationDialog(
        taskTitle: _description.text.trim(),
        budget: _budget.text.trim(),
        duration: _duration.text.trim(),
        onCompleted: () => Navigator.pushReplacementNamed(context, '/tasks'),
      ),
    );
  }

  InputDecoration _input(String hint, {String? suffix}) => InputDecoration(
    hintText: hint,
    hintStyle: const TextStyle(
      fontSize: 13,
      height: 1.6,
      color: Color(0xFF8A91A8),
    ),
    suffixText: suffix,
    filled: true,
    fillColor: AppTheme.surfaceContainerLow,
    contentPadding: const EdgeInsets.all(16),
    errorMaxLines: 2,
    counterStyle: const TextStyle(fontSize: 10, color: AppTheme.outline),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(14),
      borderSide: BorderSide.none,
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(14),
      borderSide: const BorderSide(color: Color(0xFFE8EAF4)),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(14),
      borderSide: const BorderSide(color: AppTheme.primary, width: 1.5),
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(14),
      borderSide: const BorderSide(color: AppTheme.error),
    ),
    focusedErrorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(14),
      borderSide: const BorderSide(color: AppTheme.error, width: 1.5),
    ),
  );

  Widget _card({required Widget child}) => Container(
    padding: const EdgeInsets.all(18),
    decoration: BoxDecoration(
      color: Colors.white,
      borderRadius: BorderRadius.circular(20),
      border: Border.all(color: const Color(0xFFEBEDF5)),
      boxShadow: const [
        BoxShadow(
          color: Color(0x04131B2E),
          blurRadius: 16,
          offset: Offset(0, 4),
        ),
      ],
    ),
    child: child,
  );

  Widget _heading(IconData icon, String title, {String? note}) => Row(
    children: [
      Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: AppTheme.surfaceContainerLow,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Icon(icon, color: AppTheme.primary, size: 18),
      ),
      const SizedBox(width: 10),
      Expanded(
        child: Text(
          title,
          style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w700),
        ),
      ),
      if (note != null)
        Text(
          note,
          style: const TextStyle(fontSize: 10, color: AppTheme.outline),
        ),
    ],
  );

  Widget _step(String number, String label, {bool active = false}) => Expanded(
    child: Column(
      children: [
        Container(
          width: 28,
          height: 28,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: active ? AppTheme.primary : AppTheme.surfaceContainer,
            shape: BoxShape.circle,
          ),
          child: Text(
            number,
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w700,
              color: active ? Colors.white : AppTheme.outline,
            ),
          ),
        ),
        const SizedBox(height: 6),
        Text(
          label,
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 10,
            fontWeight: active ? FontWeight.w700 : FontWeight.w500,
            color: active ? AppTheme.primary : AppTheme.outline,
          ),
        ),
      ],
    ),
  );

  Widget _budgetField() => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      const Text(
        'Бюджет',
        style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600),
      ),
      const SizedBox(height: 8),
      TextFormField(
        controller: _budget,
        keyboardType: TextInputType.number,
        style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
        decoration: _input('Мысалы: 500 000', suffix: '₸'),
        validator: (value) {
          final text = (value ?? '').replaceAll(RegExp(r'\s'), '');
          if (text.isEmpty) return null;
          final amount = int.tryParse(text);
          return amount == null || amount <= 0
              ? 'Оң бүтін сан енгізіңіз.'
              : null;
        },
      ),
    ],
  );

  Widget _durationField() => Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      const Text(
        'Орындау мерзімі',
        style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600),
      ),
      const SizedBox(height: 8),
      TextFormField(
        controller: _duration,
        maxLength: 100,
        style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600),
        decoration: _input('Мысалы: 1 ай').copyWith(counterText: ''),
      ),
    ],
  );

  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(
      backgroundColor: Colors.white,
      surfaceTintColor: Colors.transparent,
      scrolledUnderElevation: 0,
      leading: const BackButton(color: AppTheme.primary),
      titleSpacing: 0,
      title: const Text(
        'Жаңа тапсырма',
        style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700),
      ),
      actions: [
        Container(
          margin: const EdgeInsets.only(right: 16),
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
          decoration: BoxDecoration(
            color: AppTheme.surfaceContainerLow,
            borderRadius: BorderRadius.circular(20),
          ),
          child: const Text(
            '1 / 3 қадам',
            style: TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w600,
              color: AppTheme.primary,
            ),
          ),
        ),
      ],
    ),
    body: Form(
      key: _form,
      child: ListView(
        keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
        padding: const EdgeInsets.fromLTRB(16, 20, 16, 24),
        children: [
          Row(
            children: [
              _step('01', 'Сипаттама', active: true),
              const SizedBox(
                width: 20,
                child: Divider(color: AppTheme.surfaceContainerHigh),
              ),
              _step('02', 'AI сұрақтары'),
              const SizedBox(
                width: 20,
                child: Divider(color: AppTheme.surfaceContainerHigh),
              ),
              _step('03', 'Қорытынды'),
            ],
          ),
          const SizedBox(height: 22),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  AppTheme.primary,
                  Color(0xFF5146DD),
                  AppTheme.secondary,
                ],
              ),
              borderRadius: BorderRadius.circular(22),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Row(
                  children: [
                    Icon(
                      Icons.auto_awesome,
                      size: 16,
                      color: Color(0xFFDED7FF),
                    ),
                    SizedBox(width: 7),
                    Text(
                      'WORK.AI КӨМЕКШІСІ',
                      style: TextStyle(
                        fontSize: 10,
                        letterSpacing: 1,
                        fontWeight: FontWeight.w700,
                        color: Color(0xFFDED7FF),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                const Text(
                  'Идеяңыздан\nнақты тапсырмаға',
                  style: TextStyle(
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: 25,
                    height: 1.2,
                    fontWeight: FontWeight.w700,
                    color: Colors.white,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  'Не жасағыңыз келетінін жазыңыз. AI көмекшісі қажетті сұрақтарды қойып, талаптарды нақтылауға көмектеседі.',
                  style: TextStyle(
                    fontSize: 12,
                    height: 1.6,
                    color: Colors.white.withValues(alpha: .85),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 18),
          _card(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _heading(Icons.edit_note_rounded, 'Тапсырмаңызды сипаттаңыз'),
                const SizedBox(height: 12),
                const Text(
                  'Қандай шешім керек және оны кім қолданады?',
                  style: TextStyle(
                    fontSize: 12,
                    height: 1.5,
                    color: AppTheme.outline,
                  ),
                ),
                const SizedBox(height: 14),
                TextFormField(
                  key: const ValueKey('task-description'),
                  controller: _description,
                  minLines: 5,
                  maxLines: 10,
                  maxLength: 2000,
                  textCapitalization: TextCapitalization.sentences,
                  style: const TextStyle(fontSize: 13, height: 1.65),
                  decoration: _input(
                    'Мысалы: маған гүл сататын қосымша жасау керек. Клиент гүл шоғын таңдап, жеткізуге тапсырыс бере алсын.',
                  ),
                  validator: (value) => (value ?? '').trim().length < 10
                      ? 'Тапсырманы кемінде 10 таңбамен сипаттаңыз.'
                      : null,
                ),
                const SizedBox(height: 8),
                const Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Icon(
                      Icons.lightbulb_outline_rounded,
                      size: 16,
                      color: AppTheme.secondary,
                    ),
                    SizedBox(width: 7),
                    Expanded(
                      child: Text(
                        'Қарапайым тілмен жаза беріңіз. Техникалық талаптарды келесі қадамда нақтылаймыз.',
                        style: TextStyle(
                          fontSize: 11,
                          height: 1.5,
                          color: AppTheme.onSurfaceVariant,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          const SizedBox(height: 14),
          _card(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _heading(
                  Icons.tune_rounded,
                  'Жоба шарттары',
                  note: 'Міндетті емес',
                ),
                const SizedBox(height: 16),
                LayoutBuilder(
                  builder: (context, constraints) => constraints.maxWidth >= 440
                      ? Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(child: _budgetField()),
                            const SizedBox(width: 14),
                            Expanded(child: _durationField()),
                          ],
                        )
                      : Column(
                          children: [
                            _budgetField(),
                            const SizedBox(height: 16),
                            _durationField(),
                          ],
                        ),
                ),
                const SizedBox(height: 12),
                const Text(
                  'Әлі шешпесеңіз, бос қалдыруға болады.',
                  style: TextStyle(fontSize: 11, color: AppTheme.outline),
                ),
              ],
            ),
          ),
        ],
      ),
    ),
    bottomNavigationBar: Container(
      padding: const EdgeInsets.fromLTRB(16, 12, 16, 10),
      decoration: const BoxDecoration(
        color: Colors.white,
        border: Border(top: BorderSide(color: Color(0xFFEBEDF5))),
      ),
      child: SafeArea(
        top: false,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            SizedBox(
              width: double.infinity,
              child: FilledButton.icon(
                onPressed: _clarify,
                icon: const Icon(Icons.auto_awesome, size: 18),
                label: const Text('AI арқылы нақтылау'),
                style: FilledButton.styleFrom(
                  backgroundColor: AppTheme.primary,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(14),
                  ),
                  textStyle: const TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w700,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'Жариялар алдында бәрін қарап, растайсыз',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 10, color: AppTheme.outline),
            ),
          ],
        ),
      ),
    ),
  );
}
