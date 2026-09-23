import 'package:flutter/material.dart';
import '../theme/app_theme.dart';
import '../models/job_challenge.dart';

class ApplicationFormScreen extends StatefulWidget {
  const ApplicationFormScreen({super.key, this.challenge});
  final JobChallenge? challenge;

  @override
  State<ApplicationFormScreen> createState() => _ApplicationFormScreenState();
}

class _ApplicationFormScreenState extends State<ApplicationFormScreen> {
  JobChallenge get challenge =>
      widget.challenge ?? JobChallenge.sampleChallenges.first;
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
      SnackBar(
        content: Text('AI ілеспе хатты кәсіби стильде өңдеді!'),
        backgroundColor: AppTheme.secondary,
        duration: Duration(seconds: 2),
      ),
    );
  }

  void _submitApplication() async {
    setState(() => _isSubmitting = true);
    await Future.delayed(Duration(milliseconds: 1200));
    if (!mounted) return;
    setState(() => _isSubmitting = false);

    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: Row(
          children: [
            Icon(Icons.check_circle, color: AppTheme.tertiary, size: 28),
            SizedBox(width: 8),
            Text('Жауап жіберілді!'),
          ],
        ),
        content: Text(
          'Сіздің үн қатуыңыз Aibek Logistics компаниясына сәтті жеткізілді. Жауап 24 сағат ішінде «Жауаптар» бөлімінде көрсетіледі.',
        ),
        actions: [
          ElevatedButton(
            onPressed: () {
              Navigator.pop(ctx);
              Navigator.pop(context);
            },
            child: Text('Жақсы'),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _coverLetterController.dispose();
    _githubController.dispose();
    _phoneController.dispose();
    _emailController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(
        backgroundColor: AppTheme.surface,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: AppTheme.onSurface),
          onPressed: () => Navigator.pop(context),
        ),
        title: Row(
          children: [
            Container(
              padding: EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: AppTheme.primary,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                'W',
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
              ),
            ),
            SizedBox(width: 8),
            Text(
              'Filter Setup',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: AppTheme.onSurface,
              ),
            ),
          ],
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
      body: ListView(
        padding: EdgeInsets.all(16),
        children: [
          _buildTopPillHeader(),
          SizedBox(height: 12),
          _buildJobSummaryCard(),
          SizedBox(height: 16),
          _buildStep1ResumeSelector(),
          SizedBox(height: 14),
          _buildStep2CoverLetter(),
          SizedBox(height: 14),
          _buildStep3PlanAndDeadline(),
          SizedBox(height: 14),
          _buildStep4ContactInfo(),
          SizedBox(height: 18),
          _buildSubmitButton(),
          SizedBox(height: 12),
          _buildSecurityDisclaimer(),
          SizedBox(height: 32),
        ],
      ),
    );
  }

  Widget _buildTopPillHeader() {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerHigh,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Wrap(
        spacing: 12,
        runSpacing: 6,
        children: [
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                width: 8,
                height: 8,
                decoration: BoxDecoration(
                  color: AppTheme.tertiary,
                  shape: BoxShape.circle,
                ),
              ),
              SizedBox(width: 8),
              Text(
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
            mainAxisSize: MainAxisSize.min,
            children: [
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
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(color: Colors.black.withValues(alpha: 0.03), blurRadius: 6),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
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
                      challenge.title,
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
                padding: EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: AppTheme.surfaceContainerLow,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(
                  Icons.local_shipping_outlined,
                  color: AppTheme.primary,
                  size: 22,
                ),
              ),
            ],
          ),
          SizedBox(height: 8),
          Row(
            children: [
              Text(
                challenge.salaryRange,
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
                  challenge.companyName,
                  style: TextStyle(
                    fontSize: 13,
                    color: AppTheme.onSurfaceVariant,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 8),
          Wrap(
            runSpacing: 6,
            children: [
              _buildPillBadge(Icons.location_on_outlined, 'Алматы, Қазақстан'),
              SizedBox(width: 8),
              _buildPillBadge(Icons.timer_outlined, 'Мерзімі: 1 ай'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPillBadge(IconData icon, String text) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLow,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14, color: AppTheme.outline),
          SizedBox(width: 4),
          Text(
            text,
            style: TextStyle(fontSize: 11.5, color: AppTheme.onSurfaceVariant),
          ),
        ],
      ),
    );
  }

  Widget _buildStep1ResumeSelector() {
    return _buildCardWrapper(
      title: '1. Түйіндемені немесе Команда профилін таңдаңыз',
      trailing: Text(
        'Міндетті',
        style: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.bold,
          color: AppTheme.primary,
        ),
      ),
      subtitle:
          'Тапсырыс беруші сіздің және командаңыздың портфолиосын осы профиль арқылы тексереді.',
      child: Column(
        children: [
          Container(
            padding: EdgeInsets.all(10),
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
                  child: Icon(Icons.groups, color: Colors.white, size: 22),
                ),
                SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Data Crafters',
                        style: TextStyle(
                          fontSize: 13.5,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        'ҚБТУ 3-курс командасы · ML & Data...',
                        style: TextStyle(
                          fontSize: 11.5,
                          color: AppTheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                ),
                TextButton(
                  onPressed: () {},
                  child: Text(
                    'Өзгерту',
                    style: TextStyle(
                      fontSize: 12.5,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 8),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
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
        children: [
          Icon(Icons.auto_awesome, size: 14, color: AppTheme.tertiary),
          SizedBox(width: 2),
          Text(
            'AI көмекшісі',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.bold,
              color: AppTheme.tertiary,
            ),
          ),
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
            style: TextStyle(fontSize: 13.5, height: 1.4),
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
          SizedBox(height: 8),
          Wrap(
            spacing: 12,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              OutlinedButton.icon(
                onPressed: _polishCoverLetterWithAi,
                icon: Icon(Icons.auto_fix_high, size: 15),
                label: Text('Кәсіби стильде өңдеу'),
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppTheme.secondary,
                  backgroundColor: AppTheme.surfaceContainerHigh,
                  side: BorderSide.none,
                  padding: EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  textStyle: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              Text(
                '${_coverLetterController.text.length} таңба',
                style: TextStyle(fontSize: 11, color: AppTheme.outline),
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
          Text(
            'Ұсынылатын мерзім',
            style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.w600),
          ),
          SizedBox(height: 6),
          Row(
            children: List.generate(_durationOptions.length, (index) {
              final isSelected = _selectedDurationIndex == index;
              return Expanded(
                child: Padding(
                  padding: EdgeInsets.only(
                    right: index < _durationOptions.length - 1 ? 6 : 0,
                  ),
                  child: InkWell(
                    onTap: () => setState(() => _selectedDurationIndex = index),
                    child: Container(
                      padding: EdgeInsets.symmetric(vertical: 10),
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
            }),
          ),
          SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  'Прототип немесе GitHub сілтемесі',
                  style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.w600),
                ),
              ),
              Text(
                'міндетті емес',
                style: TextStyle(fontSize: 11, color: AppTheme.outline),
              ),
            ],
          ),
          SizedBox(height: 6),
          TextField(
            controller: _githubController,
            style: TextStyle(fontSize: 13, fontFamily: 'Fira Code'),
            decoration: InputDecoration(
              filled: true,
              fillColor: AppTheme.surfaceContainerLow,
              prefixIcon: Icon(Icons.terminal, size: 18),
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
      trailing: Icon(Icons.lock_outline, size: 18, color: AppTheme.outline),
      subtitle:
          'Жұмыс беруші жеке хабарлама немесе сұхбатқа шақыру үшін пайдаланады.',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Телефон нөмірі',
            style: TextStyle(fontSize: 11.5, color: AppTheme.onSurfaceVariant),
          ),
          SizedBox(height: 4),
          TextField(
            controller: _phoneController,
            style: TextStyle(fontSize: 13.5, fontWeight: FontWeight.w600),
            decoration: InputDecoration(
              filled: true,
              fillColor: AppTheme.surfaceContainerLow,
              prefixIcon: Icon(Icons.phone_outlined, size: 18),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(8),
                borderSide: BorderSide.none,
              ),
              isDense: true,
            ),
          ),
          SizedBox(height: 10),
          Text(
            'Электрондық пошта (Email)',
            style: TextStyle(fontSize: 11.5, color: AppTheme.onSurfaceVariant),
          ),
          SizedBox(height: 4),
          TextField(
            controller: _emailController,
            style: TextStyle(fontSize: 13.5, fontWeight: FontWeight.w600),
            decoration: InputDecoration(
              filled: true,
              fillColor: AppTheme.surfaceContainerLow,
              prefixIcon: Icon(Icons.mail_outline, size: 18),
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
            ? SizedBox(
                width: 18,
                height: 18,
                child: CircularProgressIndicator(
                  color: Colors.white,
                  strokeWidth: 2,
                ),
              )
            : Icon(Icons.send, size: 18),
        label: Text(
          _isSubmitting
              ? 'Жіберілуде...'
              : 'Үн қатуды жіберу (Отправить отклик)',
          style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
        ),
        style: ElevatedButton.styleFrom(
          backgroundColor: AppTheme.primaryContainer,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      ),
    );
  }

  Widget _buildSecurityDisclaimer() {
    return Container(
      padding: EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLow,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
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
                  style: TextStyle(
                    fontSize: 11.5,
                    color: AppTheme.onSurfaceVariant,
                  ),
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
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(fontSize: 14.5, fontWeight: FontWeight.bold),
                ),
              ),
              ?trailing,
            ],
          ),
          SizedBox(height: 4),
          Text(
            subtitle,
            style: TextStyle(
              fontSize: 12,
              color: AppTheme.onSurfaceVariant,
              height: 1.3,
            ),
          ),
          SizedBox(height: 12),
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
      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: isPrimary ? Color(0xFFEADDFF) : AppTheme.surfaceContainer,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.w600,
          color: isPrimary ? Color(0xFF25005A) : AppTheme.onSurfaceVariant,
        ),
      ),
    );
  }
}
