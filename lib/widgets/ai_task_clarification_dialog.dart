import 'package:flutter/material.dart';

import '../theme/app_theme.dart';
import '../core/services/task_clarification_service.dart';

class AiTaskClarificationDialog extends StatefulWidget {
  final String taskTitle;
  final String budget;
  final String duration;
  final VoidCallback onCompleted;

  const AiTaskClarificationDialog({
    super.key,
    required this.taskTitle,
    required this.budget,
    required this.duration,
    required this.onCompleted,
  });

  @override
  State<AiTaskClarificationDialog> createState() =>
      _AiTaskClarificationDialogState();
}

class _AiTaskClarificationDialogState extends State<AiTaskClarificationDialog> {
  int _currentStep = 0;
  final Map<int, Set<int>> _selectedAnswers = {};
  final Map<int, TextEditingController> _customControllers = {};
  late final List<Map<String, dynamic>> _questions;

  @override
  void initState() {
    super.initState();
    _questions = questionsForTask(widget.taskTitle);
    for (var index = 0; index < _questions.length; index++) {
      _selectedAnswers[index] = <int>{};
      _customControllers[index] = TextEditingController();
    }
  }

  bool get _canContinue {
    final selected = _selectedAnswers[_currentStep]!;
    return selected.isNotEmpty &&
        (!selected.contains(3) ||
            _customControllers[_currentStep]!.text.trim().isNotEmpty);
  }

  bool _isFinalSummary = false;

  void _toggleOption(int optionId) {
    setState(() {
      final currentSet = _selectedAnswers[_currentStep] ?? <int>{};
      if (currentSet.contains(optionId)) {
        currentSet.remove(optionId);
      } else {
        currentSet.add(optionId);
      }
      _selectedAnswers[_currentStep] = currentSet;
    });
  }

  @override
  void dispose() {
    for (var controller in _customControllers.values) {
      controller.dispose();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final currentQ = _questions[_currentStep];
    final options = currentQ['options'] as List<AiQuestionOption>;
    final selectedSet = _selectedAnswers[_currentStep] ?? <int>{};

    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
      insetPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
      child: Container(
        padding: const EdgeInsets.all(18),
        constraints: const BoxConstraints(maxWidth: 380),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Header
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [AppTheme.primary, Color(0xFF712AE2)],
                    ),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: const Icon(
                    Icons.auto_awesome,
                    color: Colors.amberAccent,
                    size: 18,
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Work.ai AI Архитектор',
                        style: TextStyle(
                          fontFamily: 'Manrope',
                          fontSize: 14,
                          fontWeight: FontWeight.w800,
                          color: AppTheme.textPrimary,
                        ),
                      ),
                      Text(
                        'Тапсырманы нақтылау сұхбаты',
                        style: TextStyle(
                          fontFamily: 'Manrope',
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: const Color(0xFF712AE2),
                        ),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  onPressed: () => Navigator.of(context).pop(),
                  icon: const Icon(Icons.close, size: 20, color: Colors.grey),
                  padding: EdgeInsets.zero,
                  constraints: const BoxConstraints(),
                ),
              ],
            ),
            const SizedBox(height: 14),

            if (!_isFinalSummary) ...[
              // Task Title Context & Step Count
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 8,
                ),
                decoration: BoxDecoration(
                  color: AppTheme.surfaceContainerLow,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'ТАПСЫРМА:',
                            style: TextStyle(
                              fontSize: 9,
                              fontWeight: FontWeight.bold,
                              color: Colors.grey,
                            ),
                          ),
                          Text(
                            widget.taskTitle,
                            style: const TextStyle(
                              fontSize: 11.5,
                              fontWeight: FontWeight.bold,
                              color: AppTheme.primary,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ],
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 8,
                        vertical: 3,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.blue.shade100,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(
                        '${_currentStep + 1} / ${_questions.length} сұрақ',
                        style: const TextStyle(
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                          color: AppTheme.primary,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 10),

              // Progress Bar
              ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: LinearProgressIndicator(
                  value: (_currentStep + 1) / _questions.length,
                  backgroundColor: Colors.grey.shade200,
                  valueColor: const AlwaysStoppedAnimation<Color>(
                    AppTheme.primary,
                  ),
                  minHeight: 4,
                ),
              ),
              const SizedBox(height: 12),

              // Question Box
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppTheme.surfaceContainerLow,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.blue.shade100),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        const Icon(
                          Icons.auto_awesome,
                          size: 12,
                          color: Color(0xFF712AE2),
                        ),
                        const SizedBox(width: 4),
                        Expanded(
                          child: Text(
                            currentQ['context'] as String,
                            style: const TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF712AE2),
                            ),
                          ),
                        ),
                        const SizedBox(width: 4),
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 6,
                            vertical: 2,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.purple.shade50,
                            borderRadius: BorderRadius.circular(8),
                          ),
                          child: const Text(
                            'Көптік таңдау ✓',
                            style: TextStyle(
                              fontSize: 9,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF712AE2),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      currentQ['question'] as String,
                      style: TextStyle(
                        fontFamily: 'Manrope',
                        fontSize: 12.5,
                        fontWeight: FontWeight.w800,
                        color: AppTheme.textPrimary,
                        height: 1.3,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '💡 Бірнеше вариантты қатар белгілеуге болады',
                      style: TextStyle(
                        fontSize: 10,
                        color: Colors.grey.shade600,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 10),

              // 4 Options: 1, 2, 3 + 4th Custom Option (Multi-Select Enabled)
              Flexible(
                child: SingleChildScrollView(
                  key: ValueKey(_currentStep),
                  child: Column(
                    children: options.map((option) {
                      final isSelected = selectedSet.contains(option.id);
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 8),
                        child: InkWell(
                          onTap: () => _toggleOption(option.id),
                          borderRadius: BorderRadius.circular(14),
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 180),
                            padding: const EdgeInsets.all(10),
                            decoration: BoxDecoration(
                              color: isSelected
                                  ? const Color(0xFFEAEDFF)
                                  : Colors.white,
                              borderRadius: BorderRadius.circular(14),
                              border: Border.all(
                                color: isSelected
                                    ? AppTheme.primary
                                    : Colors.grey.shade300,
                                width: isSelected ? 1.5 : 1,
                              ),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    Icon(
                                      isSelected
                                          ? Icons.check_box
                                          : Icons.check_box_outline_blank,
                                      size: 18,
                                      color: isSelected
                                          ? AppTheme.primary
                                          : Colors.grey,
                                    ),
                                    const SizedBox(width: 8),
                                    Expanded(
                                      child: Text(
                                        option.isCustom
                                            ? '4-нұсқа: Өз ойымды жазамын'
                                            : '${option.id + 1}-нұсқа',
                                        style: TextStyle(
                                          fontSize: 11,
                                          fontWeight: FontWeight.bold,
                                          color: isSelected
                                              ? AppTheme.primary
                                              : AppTheme.textPrimary,
                                        ),
                                      ),
                                    ),
                                    Container(
                                      padding: const EdgeInsets.symmetric(
                                        horizontal: 6,
                                        vertical: 2,
                                      ),
                                      decoration: BoxDecoration(
                                        color: isSelected
                                            ? Colors.blue.shade200
                                            : Colors.grey.shade100,
                                        borderRadius: BorderRadius.circular(6),
                                      ),
                                      child: Text(
                                        option.badge,
                                        style: TextStyle(
                                          fontSize: 9,
                                          fontWeight: FontWeight.bold,
                                          color: isSelected
                                              ? AppTheme.primary
                                              : Colors.grey.shade700,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 4),
                                if (!option.isCustom)
                                  Padding(
                                    padding: const EdgeInsets.only(left: 24),
                                    child: Text(
                                      option.label,
                                      style: TextStyle(
                                        fontSize: 11,
                                        color: Colors.grey.shade800,
                                        height: 1.25,
                                      ),
                                    ),
                                  ),
                                if (option.isCustom && isSelected)
                                  Padding(
                                    padding: const EdgeInsets.only(
                                      top: 8,
                                      left: 6,
                                      right: 6,
                                    ),
                                    child: TextField(
                                      controller:
                                          _customControllers[_currentStep],
                                      onChanged: (_) => setState(() {}),
                                      maxLines: 2,
                                      style: const TextStyle(fontSize: 11),
                                      decoration: InputDecoration(
                                        hintText:
                                            'Тапсырмаңызға сәйкес өз нұсқаңызды жазыңыз...',
                                        hintStyle: const TextStyle(
                                          fontSize: 10.5,
                                        ),
                                        contentPadding: const EdgeInsets.all(8),
                                        filled: true,
                                        fillColor: Colors.white,
                                        border: OutlineInputBorder(
                                          borderRadius: BorderRadius.circular(
                                            8,
                                          ),
                                          borderSide: const BorderSide(
                                            color: AppTheme.primary,
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                              ],
                            ),
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ),
              ),
              const SizedBox(height: 8),

              // Action Buttons: Previous & Next / Finish
              Row(
                children: [
                  if (_currentStep > 0) ...[
                    OutlinedButton(
                      onPressed: () => setState(() => _currentStep--),
                      style: OutlinedButton.styleFrom(
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        padding: const EdgeInsets.symmetric(
                          horizontal: 14,
                          vertical: 10,
                        ),
                      ),
                      child: const Text(
                        '← Артқа',
                        style: TextStyle(fontSize: 11),
                      ),
                    ),
                    const SizedBox(width: 8),
                  ],
                  Expanded(
                    child: ElevatedButton(
                      onPressed: !_canContinue
                          ? null
                          : () {
                              FocusScope.of(context).unfocus();
                              if (_currentStep < _questions.length - 1) {
                                setState(() => _currentStep++);
                              } else {
                                setState(() => _isFinalSummary = true);
                              }
                            },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppTheme.primary,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(vertical: 12),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                      child: Text(
                        _currentStep < _questions.length - 1
                            ? 'Келесі сұрақ →'
                            : 'AI ТЗ-ны бекітіп, жариялау 🚀',
                        style: const TextStyle(
                          fontSize: 11.5,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ] else ...[
              // Summary Screen
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.green.shade50,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: Colors.green.shade200),
                ),
                child: const Row(
                  children: [
                    Icon(Icons.check_circle, color: Colors.green, size: 22),
                    SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        'Техникалық тапсырма (ТЗ) толық бекітілді!',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: Colors.green,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),
              Flexible(
                child: SingleChildScrollView(
                  child: Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.surfaceContainerLow,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: Colors.grey.shade200),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.taskTitle,
                          style: const TextStyle(
                            fontSize: 12.5,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          'Бюджет: ${widget.budget.isEmpty ? 'Келісім бойынша' : '${widget.budget} ₸'}  ·  Мерзімі: ${widget.duration.isEmpty ? 'Келісім бойынша' : widget.duration}',
                          style: const TextStyle(
                            fontSize: 11,
                            color: AppTheme.primary,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const Divider(height: 16),
                        for (
                          var index = 0;
                          index < _questions.length;
                          index++
                        ) ...[
                          Text(
                            _questions[index]['context'] as String,
                            style: const TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          for (final option
                              in _questions[index]['options']
                                  as List<AiQuestionOption>)
                            if (_selectedAnswers[index]!.contains(option.id))
                              Padding(
                                padding: const EdgeInsets.only(top: 4),
                                child: Text(
                                  '• ${option.isCustom ? _customControllers[index]!.text.trim() : option.label}',
                                  style: const TextStyle(fontSize: 10.5),
                                ),
                              ),
                          const SizedBox(height: 8),
                        ],
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 14),
              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).pop();
                  widget.onCompleted();
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.primary,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: const Text(
                  'Тапсырмалар лентасынан көру',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
