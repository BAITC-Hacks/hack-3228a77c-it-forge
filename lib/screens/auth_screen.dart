import '../l10n/app_language.dart';
import 'package:flutter/material.dart';
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
  String get _selectedLang => AppLanguage.instance.code;

  final TextEditingController _credentialController = TextEditingController(
    text: '+7 (700) 123-45-67',
  );
  final TextEditingController _passwordController = TextEditingController(
    text: 'secret123',
  );

  @override
  void dispose() {
    _credentialController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    LanguageScope.watch(context);
    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Row(
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
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                ),
              ),
            ),
            SizedBox(width: 8),
            AppText(
              'Work.ai',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: AppTheme.onSurface,
              ),
            ),
          ],
        ),
        actions: [_buildLanguageSelector(), SizedBox(width: 12)],
      ),
      body: ListView(
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        children: [
          _buildHeroHeader(),
          SizedBox(height: 12),
          _buildLanguagePillRow(),
          SizedBox(height: 16),
          _buildRoleSelector(),
          SizedBox(height: 10),
          _buildPerkBanner(),
          SizedBox(height: 14),
          _buildInstantCvUploadCard(),
          SizedBox(height: 14),
          _buildMainAuthCard(),
          SizedBox(height: 14),
          _buildComplianceFooter(),
          SizedBox(height: 32),
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
      padding: EdgeInsets.all(2),
      child: Row(
        children: ['KZ', 'RU', 'EN'].map((lang) {
          final isSelected = _selectedLang == lang;
          return GestureDetector(
            onTap: () => AppLanguage.instance.select(lang),
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              decoration: BoxDecoration(
                color: isSelected ? AppTheme.primary : Colors.transparent,
                borderRadius: BorderRadius.circular(16),
              ),
              child: AppText(
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
          padding: EdgeInsets.symmetric(horizontal: 10, vertical: 4),
          decoration: BoxDecoration(
            color: AppTheme.surfaceContainerHigh,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.auto_awesome, size: 14, color: AppTheme.secondary),
              SizedBox(width: 4),
              AppText(
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
        SizedBox(height: 8),
        AppText(
          'Болашақ жұмыс кеңістігі',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: AppTheme.onSurface,
          ),
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 4),
        AppText(
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
        SizedBox(width: 8),
        _buildLangButton('🇷🇺 РУС', 'RU'),
        SizedBox(width: 8),
        _buildLangButton('🇬🇧 ENG', 'EN'),
      ],
    );
  }

  Widget _buildLangButton(String title, String code) {
    final isSelected = _selectedLang == code;
    return GestureDetector(
      onTap: () => AppLanguage.instance.select(code),
      child: Container(
        padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? AppTheme.primary : AppTheme.surfaceContainer,
          borderRadius: BorderRadius.circular(18),
        ),
        child: AppText(
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
      padding: EdgeInsets.all(4),
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
        padding: EdgeInsets.symmetric(vertical: 10, horizontal: 8),
        decoration: BoxDecoration(
          color: isSelected ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(10),
          boxShadow: isSelected
              ? [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.04),
                    blurRadius: 4,
                  ),
                ]
              : null,
        ),
        child: Column(
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(icon, size: 16, color: color),
                SizedBox(width: 4),
                Flexible(
                  child: AppText(
                    title,
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                      color: AppTheme.onSurface,
                    ),
                  ),
                ),
              ],
            ),
            SizedBox(height: 2),
            AppText(
              subtitle,
              style: TextStyle(
                fontSize: 10.5,
                color: AppTheme.onSurfaceVariant,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPerkBanner() {
    final isTalent = _selectedRoleIndex == 0;
    return Container(
      padding: EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerHigh,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 16,
            backgroundColor: AppTheme.secondary,
            child: Icon(Icons.bolt, color: Colors.white, size: 18),
          ),
          SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AppText(
                  isTalent
                      ? 'AI Smart Match 98.4% дәлдікпен'
                      : 'AI арқылы кейстерді генерациялау',
                  style: TextStyle(fontSize: 12.5, fontWeight: FontWeight.bold),
                ),
                AppText(
                  isTalent
                      ? 'Дағдыларыңыз бен портфолиоңызды автоматты бағалау'
                      : '5000+ дайын үздік студенттерге тапсырма ұсыну',
                  style: TextStyle(
                    fontSize: 11,
                    color: AppTheme.onSurfaceVariant,
                  ),
                ),
              ],
            ),
          ),
          Icon(Icons.chevron_right, size: 18, color: AppTheme.outline),
        ],
      ),
    );
  }

  Widget _buildInstantCvUploadCard() {
    return Container(
      padding: EdgeInsets.all(14),
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
                child: Row(
                  children: [
                    Container(
                      padding: EdgeInsets.all(6),
                      decoration: BoxDecoration(
                        color: AppTheme.secondaryContainer,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Icon(
                        Icons.auto_fix_high,
                        color: Colors.white,
                        size: 16,
                      ),
                    ),
                    SizedBox(width: 8),
                    Flexible(
                      child: AppText(
                        '10 секундта AI Тіркелу',
                        style: TextStyle(
                          fontSize: 13.5,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Container(
                padding: EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: AppTheme.tertiaryFixed,
                  borderRadius: BorderRadius.circular(4),
                ),
                child: AppText(
                  'NEW',
                  style: TextStyle(
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF002114),
                  ),
                ),
              ),
            ],
          ),
          SizedBox(height: 4),
          AppText(
            'Резюмеңізді жүктеп, сауалнамасыз кіріңіз',
            style: TextStyle(fontSize: 11.5, color: AppTheme.onSurfaceVariant),
          ),
          SizedBox(height: 10),
          InkWell(
            onTap: () {},
            borderRadius: BorderRadius.circular(8),
            child: Container(
              padding: EdgeInsets.symmetric(vertical: 10),
              decoration: BoxDecoration(
                color: AppTheme.surfaceContainer,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.upload_file, color: AppTheme.primary, size: 18),
                  SizedBox(width: 6),
                  Flexible(
                    child: AppText(
                      'Резюме (.PDF, .DOCX) жүктеу немесе суретін жіберу',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: AppTheme.primary,
                      ),
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
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.surfaceContainerLowest,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Wrap(
            spacing: 8,
            crossAxisAlignment: WrapCrossAlignment.center,
            children: [
              Container(
                decoration: BoxDecoration(
                  color: AppTheme.surfaceContainer,
                  borderRadius: BorderRadius.circular(8),
                ),
                padding: EdgeInsets.all(2),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    _buildAuthModeTab(
                      'Телефон',
                      _isPhoneMode,
                      () => setState(() => _isPhoneMode = true),
                    ),
                    _buildAuthModeTab(
                      'Email',
                      !_isPhoneMode,
                      () => setState(() => _isPhoneMode = false),
                    ),
                  ],
                ),
              ),
              TextButton.icon(
                onPressed: () {},
                icon: Icon(Icons.sms_outlined, size: 14),
                label: AppText(
                  'SMS кодпен кіру',
                  style: TextStyle(fontSize: 11.5),
                ),
                style: TextButton.styleFrom(
                  foregroundColor: AppTheme.secondary,
                ),
              ),
            ],
          ),
          SizedBox(height: 12),
          AppText(
            _isPhoneMode ? 'Телефон нөмірі' : 'Электрондық пошта',
            style: TextStyle(fontSize: 12, color: AppTheme.onSurfaceVariant),
          ),
          SizedBox(height: 4),
          TextField(
            controller: _credentialController,
            style: TextStyle(fontSize: 13.5, fontWeight: FontWeight.w600),
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
          SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              AppText(
                'Құпия сөз',
                style: TextStyle(
                  fontSize: 12,
                  color: AppTheme.onSurfaceVariant,
                ),
              ),
              AppText(
                'Ұмыттыңыз ба?',
                style: TextStyle(
                  fontSize: 11.5,
                  fontWeight: FontWeight.bold,
                  color: AppTheme.primary,
                ),
              ),
            ],
          ),
          SizedBox(height: 4),
          TextField(
            controller: _passwordController,
            obscureText: _isPasswordHidden,
            style: TextStyle(fontSize: 13.5),
            decoration: InputDecoration(
              filled: true,
              fillColor: AppTheme.surfaceContainerLow,
              prefixIcon: Icon(Icons.lock_outline, size: 18),
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
          SizedBox(height: 8),
          Row(
            children: [
              Checkbox(
                value: _rememberMe,
                onChanged: (val) => setState(() => _rememberMe = val ?? true),
                activeColor: AppTheme.primary,
              ),
              AppText(
                'Мені жүйеде есте сақтау (30 күн)',
                style: TextStyle(fontSize: 12),
              ),
            ],
          ),
          SizedBox(height: 8),
          SizedBox(
            width: double.infinity,
            height: 48,
            child: ElevatedButton.icon(
              onPressed: () {
                Navigator.pushNamed(
                  context,
                  _selectedRoleIndex == 0 ? '/student' : '/employer',
                );
              },
              icon: AppText(
                'Жүйеге кіру',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              label: Icon(Icons.arrow_forward, size: 16),
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.secondary,
              ),
            ),
          ),
          SizedBox(height: 10),
          SizedBox(
            width: double.infinity,
            height: 44,
            child: OutlinedButton.icon(
              onPressed: () {},
              icon: Icon(Icons.fingerprint, color: AppTheme.secondary),
              label: AppText(
                'Face ID / Touch ID арқылы кіру',
                style: TextStyle(
                  fontSize: 12.5,
                  fontWeight: FontWeight.w600,
                  color: AppTheme.onSurface,
                ),
              ),
              style: OutlinedButton.styleFrom(
                backgroundColor: AppTheme.surfaceContainerHigh,
                side: BorderSide.none,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
            ),
          ),
          SizedBox(height: 14),
          Row(
            children: [
              Expanded(child: Divider()),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 8),
                child: AppText(
                  'немесе әлеуметтік желілермен',
                  style: TextStyle(fontSize: 11, color: AppTheme.outline),
                ),
              ),
              Expanded(child: Divider()),
            ],
          ),
          SizedBox(height: 12),
          Row(
            children: [
              _buildSsoButton(Icons.qr_code_scanner, 'Digital ID'),
              SizedBox(width: 8),
              _buildSsoButton(Icons.g_mobiledata, 'Google'),
              SizedBox(width: 8),
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
        padding: EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: isSelected ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(6),
        ),
        child: AppText(
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
            AppText(
              label,
              style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.bold),
            ),
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
          children: [
            Icon(Icons.lock_outline, size: 14, color: AppTheme.tertiary),
            SizedBox(width: 4),
            Flexible(
              child: AppText(
                'Жеке мәліметтер мен құпиялылық параметрлері',
                style: TextStyle(
                  fontSize: 11,
                  color: AppTheme.onSurfaceVariant,
                ),
              ),
            ),
          ],
        ),
        SizedBox(height: 10),
        Wrap(
          alignment: WrapAlignment.center,
          children: [
            AppText(
              'Work.ai-да аккаунтыңыз жоқ па? ',
              style: TextStyle(
                fontSize: 12.5,
                color: AppTheme.onSurfaceVariant,
              ),
            ),
            AppText(
              'Тіркелу',
              style: TextStyle(
                fontSize: 12.5,
                fontWeight: FontWeight.bold,
                color: AppTheme.primary,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
