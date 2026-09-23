import React, { useState } from 'react';
import { MobileSimulator, ScreenType } from './components/MobileSimulator';
import { FlutterCodeViewer } from './components/FlutterCodeViewer';
import {
  Smartphone,
  Code2,
  Columns,
  Sparkles,
  Layers,
  HelpCircle,
  Download,
  Copy,
  Check,
  Terminal,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { FLUTTER_PROJECT_FILES } from './flutter_code_data';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('feed');
  const [viewMode, setViewMode] = useState<'split' | 'phone' | 'code'>('split');
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  const copyBashScript = () => {
    const script = `# 1. Жаңа Flutter жобасын құру:
flutter create work_ai --org com.workai.kz
cd work_ai

# 2. Қажетті пакеттерді қосу:
flutter pub add google_fonts
flutter pub add lucide_icons

# 3. Барлық код файлдарын lib/ ішіне көшіріңіз (Code Explorer-ден)

# 4. Қосымшаны іске қосу:
flutter run
`;
    navigator.clipboard.writeText(script);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <header className="h-16 px-6 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20">
            W
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-1.5">
                <span>Work<span className="text-purple-400">.ai</span></span>
                <span className="text-slate-500 font-normal text-sm">/</span>
                <span className="text-blue-400 font-semibold text-xs bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                  Flutter Dart Architecture
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Мобильді қосымша дизайнының Flutter (Dart 3.x, Material 3) коды мен интерактивті сынақ ортасы
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-800/80 p-1 rounded-xl border border-slate-700/80 flex items-center gap-1">
            <button
              onClick={() => setViewMode('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'split'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Экран мен кодты қатар көру"
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Қос көрініс (Split)</span>
            </button>

            <button
              onClick={() => setViewMode('phone')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'phone'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Тек телефон экранын көру"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Симулятор</span>
            </button>

            <button
              onClick={() => setViewMode('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'code'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Тек Flutter Dart кодын көру"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Dart Коды</span>
            </button>
          </div>

          <button
            onClick={() => setShowGuideModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all active:scale-95"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Іске қосу нұсқаулығы</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden p-4 gap-4">
        {/* Phone Simulator Panel */}
        {(viewMode === 'split' || viewMode === 'phone') && (
          <div
            className={`flex flex-col items-center justify-start overflow-y-auto p-2 ${
              viewMode === 'split' ? 'w-full lg:w-[460px] xl:w-[480px] shrink-0' : 'w-full'
            }`}
          >
            <MobileSimulator
              currentScreen={currentScreen}
              onScreenChange={(scr) => setCurrentScreen(scr)}
            />
          </div>
        )}

        {/* Flutter Dart Code Inspector Panel */}
        {(viewMode === 'split' || viewMode === 'code') && (
          <div className="flex-1 min-w-0 h-[calc(100vh-6rem)]">
            <FlutterCodeViewer
              onSelectScreenInSimulator={(scr) => setCurrentScreen(scr)}
            />
          </div>
        )}
      </main>

      {/* Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                  FL
                </div>
                <h3 className="font-bold text-base text-white">Flutter жобасын құру және іске қосу</h3>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 my-4 text-xs text-slate-300">
              <div>
                <p className="font-semibold text-white mb-1">1-қадам: Терминалда жобаны бастау:</p>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300 relative">
                  <div>flutter create work_ai</div>
                  <div>cd work_ai</div>
                  <button
                    onClick={copyBashScript}
                    className="absolute top-2 right-2 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-sans flex items-center gap-1"
                  >
                    {copiedScript ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedScript ? 'Көшірілді' : 'Көшіру'}</span>
                  </button>
                </div>
              </div>

              <div>
                <p className="font-semibold text-white mb-1">2-қадам: Қажетті пакеттерді қосу:</p>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300">
                  <div>flutter pub add google_fonts</div>
                  <div>flutter pub add lucide_icons</div>
                </div>
              </div>

              <div>
                <p className="font-semibold text-white mb-1">3-қадам: Файлдарды тиісті орындарға қойыңыз:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                  <li><code className="text-blue-300">lib/main.dart</code> – Қосымшаның кіру нүктесі және маршруттар</li>
                  <li><code className="text-blue-300">lib/theme/app_theme.dart</code> – Plus Jakarta Sans, түстер палитрасы</li>
                  <li><code className="text-blue-300">lib/models/job_challenge.dart</code> – Деректер үлгісі</li>
                  <li><code className="text-blue-300">lib/screens/home_feed_screen.dart</code> – 1-экран (Іздеу лентасы)</li>
                  <li><code className="text-blue-300">lib/screens/vacancy_detail_screen.dart</code> – 2-экран (Жоба мәліметі)</li>
                  <li><code className="text-blue-300">lib/screens/application_form_screen.dart</code> – 3-экран (Үн қату формасы)</li>
                  <li><code className="text-blue-300">lib/screens/auth_screen.dart</code> – 4-экран (Кіру / Тіркелу)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-white mb-1">4-қадам: Іске қосу:</p>
                <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-300">
                  flutter run
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all"
              >
                Түсіндім
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
