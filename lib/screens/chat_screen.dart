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
      _messages.add({'sender': 'me', 'text': text.trim(), 'time': 'Қазір'});
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
    return Scaffold(
      backgroundColor: AppTheme.surface,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back_ios_new,
            size: 18,
            color: AppTheme.primary,
          ),
          onPressed: () => Navigator.of(context).maybePop(),
          tooltip: 'Артқа қайту',
        ),
        title: Row(
          children: [
            const CircleAvatar(
              backgroundColor: AppTheme.primary,
              radius: 16,
              child: Text(
                'AL',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
                    'Aibek Logistics (HR Айгүл)',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: TextStyle(
                      fontSize: 13.5,
                      fontWeight: FontWeight.bold,
                      color: AppTheme.onSurface,
                    ),
                  ),
                  Text(
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
            icon: const Icon(Icons.videocam_outlined, color: AppTheme.primary),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text(
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
              padding: const EdgeInsets.all(14),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final msg = _messages[index];
                final isMe = msg['sender'] == 'me';

                return Align(
                  alignment: isMe
                      ? Alignment.centerRight
                      : Alignment.centerLeft,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 10),
                    constraints: BoxConstraints(
                      maxWidth: MediaQuery.of(context).size.width * 0.75,
                    ),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: isMe ? AppTheme.primary : Colors.white,
                      borderRadius: BorderRadius.circular(16).copyWith(
                        bottomRight: isMe ? const Radius.circular(2) : null,
                        bottomLeft: !isMe ? const Radius.circular(2) : null,
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
                        Text(
                          msg['text'],
                          style: TextStyle(
                            fontSize: 13,
                            color: isMe ? Colors.white : AppTheme.onSurface,
                          ),
                        ),
                        const SizedBox(height: 3),
                        Text(
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
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            child: Row(
              children: [
                ActionChip(
                  label: const Text(
                    'Сағат 16:00-ге дайынмын ✅',
                    style: TextStyle(fontSize: 11),
                  ),
                  onPressed: () =>
                      _sendMessage('Иә, сағат 16:00-де сұхбатқа дайынмын!'),
                ),
                const SizedBox(width: 6),
                ActionChip(
                  label: const Text(
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
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: const BoxDecoration(
              color: Colors.white,
              border: Border(top: BorderSide(color: Color(0xFFE2E8F0))),
            ),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: InputDecoration(
                      hintText: 'Хабарлама жазыңыз...',
                      hintStyle: const TextStyle(fontSize: 12.5),
                      contentPadding: const EdgeInsets.symmetric(
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
                const SizedBox(width: 8),
                IconButton(
                  onPressed: () => _sendMessage(),
                  icon: const Icon(Icons.send, color: AppTheme.primary),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
