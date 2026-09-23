import '../l10n/app_language.dart';
import 'package:flutter/material.dart';
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
      'text':
          'Сәлеметсіз бе, Нұрислам! Біз сіздің 42 жүк көлігі кейсіне ұсынған шешіміңізді қарап шықтық. Өте жоғары деңгей!',
      'time': '14:15',
    },
    {
      'sender': 'them',
      'text':
          'Бүгін сағат 16:00-де Google Meet арқылы техникалық сұхбатқа қосыла аласыз ба?',
      'time': '14:20',
    },
    {
      'sender': 'me',
      'text':
          'Сәлеметсіз бе, Айгүл ханым! Иә, сағат 16:00 өте қолайлы. Алдын ала бағыттау демосын көрсетуге дайынмын.',
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
        'text': quickText == null ? text.trim() : tr(text.trim()),
        'translate': false,
        'time': 'Қазір',
      });
      if (quickText == null) _controller.clear();
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    LanguageScope.watch(context);
    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back_ios_new,
            size: 18,
            color: AppTheme.primary,
          ),
          onPressed: () => Navigator.of(context).maybePop(),
          tooltip: tr('Артқа қайту'),
        ),
        title: Row(
          children: [
            CircleAvatar(
              backgroundColor: AppTheme.primary,
              radius: 16,
              child: AppText(
                'AL',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  AppText(
                    'Aibek Logistics (HR Айгүл)',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: 13.5,
                      fontWeight: FontWeight.bold,
                      color: AppTheme.onSurface,
                    ),
                  ),
                  AppText(
                    'онлайн · 42 жүк көлігі кейсі',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(fontSize: 10.5, color: Color(0xFF10B981)),
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.videocam_outlined, color: AppTheme.primary),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: AppText(
                    'Meet сілтемесі: meet.google.com/wrk-logistics-ai',
                  ),
                ),
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
              padding: EdgeInsets.all(14),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                final isMe = msg['sender'] == 'me';

                return Align(
                  alignment: isMe
                      ? Alignment.centerRight
                      : Alignment.centerLeft,
                  child: Container(
                    margin: EdgeInsets.only(bottom: 10),
                    constraints: BoxConstraints(
                      maxWidth: MediaQuery.of(context).size.width * 0.75,
                    ),
                    padding: EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: isMe ? AppTheme.primary : Colors.white,
                      borderRadius: BorderRadius.circular(16).copyWith(
                        bottomRight: isMe ? Radius.circular(2) : null,
                        bottomLeft: !isMe ? Radius.circular(2) : null,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withValues(alpha: 0.02),
                          blurRadius: 4,
                        ),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        AppText(
                          msg['text'],
                          translate: msg['translate'] != false,
                          style: TextStyle(
                            fontSize: 13,
                            color: isMe ? Colors.white : AppTheme.onSurface,
                          ),
                        ),
                        SizedBox(height: 3),
                        AppText(
                          msg['time'],
                          style: TextStyle(
                            fontSize: 9.5,
                            color: isMe
                                ? Colors.white70
                                : AppTheme.onSurfaceVariant,
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
            padding: EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            child: Row(
              children: [
                ActionChip(
                  label: AppText(
                    'Сағат 16:00-ге дайынмын ✅',
                    style: TextStyle(fontSize: 11),
                  ),
                  onPressed: () =>
                      _sendMessage('Иә, сағат 16:00-де сұхбатқа дайынмын!'),
                ),
                SizedBox(width: 6),
                ActionChip(
                  label: AppText(
                    'Демоны көрсетемін 💻',
                    style: TextStyle(fontSize: 11),
                  ),
                  onPressed: () => _sendMessage(
                    'VRP алгоритмінің демонстрациясын көрсете аламын.',
                  ),
                ),
              ],
            ),
          ),

          // Input field
          Container(
            padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: Color(0xFFE2E8F0))),
            ),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: InputDecoration(
                      hintText: tr('Хабарлама жазыңыз...'),
                      hintStyle: TextStyle(fontSize: 12.5),
                      contentPadding: EdgeInsets.symmetric(
                        horizontal: 14,
                        vertical: 10,
                      ),
                      filled: true,
                      fillColor: AppTheme.surfaceContainerLow,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                ),
                SizedBox(width: 8),
                IconButton(
                  onPressed: () => _sendMessage(),
                  icon: Icon(Icons.send, color: AppTheme.primary),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
