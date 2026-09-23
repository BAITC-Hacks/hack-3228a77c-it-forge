import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Bell,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  Heart,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle,
  Truck,
  Hourglass,
  TrendingUp,
  MapPin,
  Building,
  Check,
  RotateCcw,
  Smartphone,
  CheckCircle2,
  Eye,
  Clock,
  Briefcase,
  Layers,
  Terminal,
  FileUp,
  Fingerprint,
  QrCode,
  ShieldCheck,
  Star,
  ChevronRight,
  HelpCircle,
  Lock,
  Phone,
  Mail,
  Zap,
  Globe
} from 'lucide-react';

export type ScreenType =
  | 'feed'
  | 'detail'
  | 'apply'
  | 'auth'
  | 'student_profile'
  | 'employer_profile'
  | 'tasks'
  | 'responses'
  | 'chat';

interface MobileSimulatorProps {
  currentScreen: ScreenType;
  onScreenChange: (screen: ScreenType) => void;
}

export const MobileSimulator: React.FC<MobileSimulatorProps> = ({
  currentScreen,
  onScreenChange,
}) => {
  // Feed state
  const [searchQuery, setSearchQuery] = useState('Логистика және AI');
  const [selectedFilter, setSelectedFilter] = useState('AI & ML');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['almaty-logistics']);

  // Detail state
  const [isFavorite, setIsFavorite] = useState(false);

  // History & Navigation
  const [history, setHistory] = useState<ScreenType[]>(['feed']);
  const [activeProfileTab, setActiveProfileTab] = useState<'student' | 'employer'>('student');

  const navigateTo = (screen: ScreenType) => {
    setHistory((prev) => [...prev, screen]);
    onScreenChange(screen);
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // remove current
      const prevScreen = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      onScreenChange(prevScreen);
    } else {
      onScreenChange('feed');
    }
  };

  // Chat state
  const [selectedChatId, setSelectedChatId] = useState<string | null>('aibek');
  const [chatInputText, setChatInputText] = useState('');
  const [chatMessages, setChatMessages] = useState<{ id: string; sender: 'me' | 'them' | 'ai'; text: string; time: string }[]>([
    {
      id: '1',
      sender: 'them',
      text: 'Сәлеметсіз бе, Нұрислам! Біз сіздің 42 жүк көлігі кейсіне ұсынған шешіміңіз бен VRP тәсіліңізді қарап шықтық. Өте жоғары деңгей!',
      time: '14:15'
    },
    {
      id: '2',
      sender: 'them',
      text: 'Бүгін сағат 16:00-де Google Meet арқылы техникалық сұхбатқа қосыла аласыз ба?',
      time: '14:20'
    },
    {
      id: '3',
      sender: 'me',
      text: 'Сәлеметсіз бе, Айгүл ханым! Рақмет, иә, сағат 16:00 маған өте қолайлы. Бағыттау алгоритмінің алдын ала демо-нұсқасын да көрсетіп бере аламын.',
      time: '14:22'
    },
    {
      id: '4',
      sender: 'them',
      text: 'Керемет! Сілтеме: meet.google.com/wrk-logistics-ai. Сағат 16:00-де күтеміз!',
      time: '14:25'
    }
  ]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || chatInputText;
    if (!text.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      sender: 'me' as const,
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setChatInputText('');

    // Simulate smart quick reply
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'them' as const,
          text: 'Жақсы, қабылданды! Тікелей қосылымды растаймыз.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  // Tasks & Responses state
  const [tasksTab, setTasksTab] = useState<'active' | 'completed' | 'all'>('active');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [taskCommitUrl, setTaskCommitUrl] = useState('github.com/nurislam/logistics-vrp-solver');

  // Employer state
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  // Apply Form state
  const [coverLetter, setCoverLetter] = useState(
    'Біздің командамыз қалалық логистика бағытын оңтайландыру бойынша тәжірибеге ие. Біз VRP (Vehicle Routing Problem) алгоритмдерін қолданып, 3 апта ішінде сынақ нұсқасын дайындай аламыз...'
  );
  const [selectedDuration, setSelectedDuration] = useState('3-4 апта');
  const [githubLink, setGithubLink] = useState('github.com/datacrafters/logistics-solver');
  const [phone, setPhone] = useState('+7 (777) 123-45-67');
  const [email, setEmail] = useState('team@datacrafters.kz');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Auth screen state
  const [authRole, setAuthRole] = useState<'talent' | 'business'>('talent');
  const [authTab, setAuthTab] = useState<'phone' | 'email'>('phone');
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [language, setLanguage] = useState<'kz' | 'ru' | 'en'>('kz');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((item) => item !== id));
      showToast('Таңдаулылардан алынды');
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      showToast('Таңдаулыларға қосылды');
    }
  };

  const polishLetterWithAi = () => {
    setCoverLetter(
      'Құрметті Aibek Logistics командасы! Біз қалалық тасымал тиімділігін арттыратын VRP алгоритмдерімен жұмыс істеп жатқан ҚБТУ зерттеу тобымыз. Кептеліс деректері мен жүк салмағын есептейтін динамикалық шешімді 3 апта ішінде сынаққа ұсына аламыз. Әріптестікке дайынбыз!'
    );
    showToast('AI ілеспе хатты кәсіби стильде өңдеді ✨');
  };

  const handleSubmitApply = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Screen Selector Tab bar for testing */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-800/90 rounded-2xl border border-slate-700/80 mb-3 shadow-md max-w-2xl">
        <button
          onClick={() => navigateTo('feed')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            currentScreen === 'feed'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          1. Іздеу
        </button>
        <button
          onClick={() => navigateTo('detail')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            currentScreen === 'detail'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          2. Жоба (Detail)
        </button>
        <button
          onClick={() => navigateTo('apply')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            currentScreen === 'apply'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          3. Үн қату
        </button>
        <button
          onClick={() => navigateTo('responses')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            currentScreen === 'responses'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          4. Жауаптар (Отклики)
        </button>
        <button
          onClick={() => navigateTo('tasks')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            currentScreen === 'tasks'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          5. Тапсырмалар
        </button>
        <button
          onClick={() => navigateTo('chat')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            currentScreen === 'chat'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          6. Чат
        </button>
        <button
          onClick={() => navigateTo('student_profile')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            currentScreen === 'student_profile'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          7. Студент профилі
        </button>
        <button
          onClick={() => navigateTo('employer_profile')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            currentScreen === 'employer_profile'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          8. Кәсіпкер беті
        </button>
        <button
          onClick={() => navigateTo('auth')}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            currentScreen === 'auth'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          9. Кіру (Auth)
        </button>
      </div>

      {/* Mobile Device Frame */}
      <div className="relative w-[380px] h-[780px] bg-slate-950 rounded-[48px] p-3.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)] border-[4px] border-slate-800 flex flex-col overflow-hidden">
        {/* Dynamic Island / Camera Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-50 flex items-center justify-between px-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
          <div className="w-2 h-2 rounded-full bg-blue-950/60" />
        </div>

        {/* Screen Body */}
        <div className="relative w-full h-full bg-[#faf8ff] text-[#131b2e] rounded-[36px] overflow-hidden flex flex-col text-sm font-sans select-none">
          {/* Toast message in phone */}
          {toastMessage && (
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-[#283044] text-white text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="font-medium">{toastMessage}</span>
            </div>
          )}

          {/* ========================================================= */}
          {/* SCREEN 1: FEED / DISCOVERY */}
          {/* ========================================================= */}
          {currentScreen === 'feed' && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="pt-8 px-4 pb-2 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#0037b0] flex items-center justify-center text-white font-bold text-sm">
                    W
                  </div>
                  <div>
                    <div className="font-bold text-base tracking-tight text-[#0037b0]">
                      Work<span className="text-[#712ae2]">.ai</span>
                    </div>
                    <button className="flex items-center gap-0.5 text-[11px] text-slate-500 font-medium">
                      <span>Алматы</span>
                      <span className="text-slate-400">▾</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700">
                    <Search className="w-4 h-4" />
                  </button>
                  <div className="relative">
                    <button className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700">
                      <Bell className="w-4 h-4" />
                    </button>
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white" />
                  </div>
                  <button
                    onClick={() => onScreenChange('auth')}
                    className="w-7 h-7 rounded-full bg-[#0037b0] flex items-center justify-center text-white ml-1"
                  >
                    <User className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Feed Content */}
              <div className="flex-1 overflow-y-auto px-3.5 pt-3 pb-20 space-y-3">
                {/* Search & Filter Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center bg-[#f2f3ff] rounded-xl px-3 py-2">
                    <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Лауазым, дағды..."
                      className="w-full bg-transparent text-xs text-[#131b2e] focus:outline-none placeholder:text-slate-400"
                    />
                  </div>
                  <button className="relative w-9 h-9 rounded-xl bg-[#0037b0] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#712ae2] text-[9px] font-bold flex items-center justify-center text-white">
                      2
                    </span>
                  </button>
                </div>

                {/* Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  {['Барлығы', 'AI & ML', 'Логистика', 'IT & Әзірлеу', 'Қашықтан'].map((chip) => {
                    const isSelected = selectedFilter === chip;
                    return (
                      <button
                        key={chip}
                        onClick={() => setSelectedFilter(chip)}
                        className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
                          isSelected
                            ? 'bg-[#0037b0] text-white shadow-sm'
                            : 'bg-[#f2f3ff] text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {chip === 'AI & ML' && <Sparkles className="w-3 h-3 text-purple-200" />}
                        <span>{chip}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Smart Work.ai Banner */}
                <div className="rounded-2xl bg-gradient-to-r from-[#1d4ed8] via-[#8a4cfc] to-[#712ae2] p-3.5 text-white shadow-md">
                  <div className="flex items-center justify-between text-[10px] text-blue-100">
                    <span className="inline-flex items-center gap-1 bg-white/15 px-2 py-0.5 rounded-full font-semibold">
                      <Zap className="w-2.5 h-2.5 text-amber-300" /> Work.ai AI Іріктеу
                    </span>
                    <span className="text-white/80">142 жаңа тапсырма</span>
                  </div>
                  <h3 className="font-bold text-sm leading-snug mt-1.5">
                    Студенттер мен мамандар үшін нақты бизнес мәселелері мен жобалар
                  </h3>
                  <p className="text-[11px] text-blue-100/90 mt-1 leading-tight">
                    Дайындығыңызды AI тесттерімен тексеріп, компаниялардан тікелей грант ұтып алыңыз.
                  </p>
                </div>

                {/* Counter */}
                <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-0.5">
                  <span>Табылғаны: 84 вакансия мен тапсырма</span>
                  <button className="text-[#0037b0] font-semibold flex items-center gap-0.5">
                    <span>Күні бойынша</span>
                    <span>▾</span>
                  </button>
                </div>

                {/* Card 1: Logistics Challenge */}
                <div
                  onClick={() => onScreenChange('detail')}
                  className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 hover:border-blue-200 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#004f35] text-white flex items-center gap-0.5">
                        <Zap className="w-2.5 h-2.5 text-amber-300" /> Шұғыл челлендж
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#eaedff] text-[#0037b0]">
                        Гранттық жоба
                      </span>
                    </div>
                    <button
                      onClick={(e) => toggleBookmark('almaty-logistics', e)}
                      className="text-slate-400 hover:text-blue-600 p-0.5"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          bookmarkedIds.includes('almaty-logistics')
                            ? 'text-[#0037b0] fill-[#0037b0]'
                            : ''
                        }`}
                      />
                    </button>
                  </div>

                  <h4 className="font-bold text-sm text-[#131b2e] mt-2 leading-snug">
                    Алматы көлік логистикасының динамикалық бағыттарын оңтайландыру
                  </h4>

                  <div className="flex items-center gap-1 text-xs text-slate-600 mt-1 font-medium">
                    <span>Aibek Construction & Logistics</span>
                    <CheckCircle className="w-3.5 h-3.5 text-[#0037b0] fill-blue-100" />
                  </div>

                  <div className="mt-1.5 flex items-baseline gap-1">
                    <span className="font-bold text-sm text-[#0037b0]">650 000 – 1 200 000 ₸</span>
                    <span className="text-[11px] text-slate-500">жоба гранты</span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>Алматы · Қашықтан / Гибрид</span>
                  </div>

                  {/* AI Match gauge */}
                  <div className="mt-2.5 bg-[#f2f3ff] rounded-xl p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#0037b0] text-white flex items-center justify-center font-bold text-[10px]">
                        91%
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-[#131b2e]">
                          AI Дайындық индексі: 91/100
                        </div>
                        <div className="text-[10px] text-[#004f35] font-semibold">
                          Жоғары басымдық · Профильге сәйкес
                        </div>
                      </div>
                    </div>
                    <Sparkles className="w-4 h-4 text-[#712ae2]" />
                  </div>

                  <p className="text-[11px] text-slate-600 mt-2 line-clamp-2">
                    Таулы аймақтардағы жеткізу кешігулерін азайту үшін OR-Tools және Python негізінде телеметрия шешімін жасау.
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {['Python', 'OR-Tools', 'Логистика', 'GPS Data'].map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-[#eaedff] text-[10px] text-slate-700 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2.5 pt-2 border-t border-slate-100">
                    <span>Бүгін, 14:20</span>
                    <span className="text-[#712ae2] font-semibold">4 команда жауап берді</span>
                  </div>

                  <div className="grid grid-cols-5 gap-2 mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onScreenChange('apply');
                      }}
                      className="col-span-4 py-2 bg-[#0037b0] hover:bg-blue-800 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Үн қату (Откликнуться)</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast('Чат терезесі ашылуда...');
                      }}
                      className="col-span-1 py-2 bg-[#e2e7ff] text-[#0037b0] rounded-xl flex items-center justify-center hover:bg-blue-200"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Card 2: NLP Kazakh Speech */}
                <div
                  onClick={() => onScreenChange('detail')}
                  className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 hover:border-blue-200 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#eaddff] text-[#25005a]">
                        ҒЗИ & Бизнес
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#eaedff] text-slate-600">
                        Тікелей жұмыс беруші
                      </span>
                    </div>
                    <button
                      onClick={(e) => toggleBookmark('zantech-nlp', e)}
                      className="text-slate-400 hover:text-blue-600"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          bookmarkedIds.includes('zantech-nlp')
                            ? 'text-[#0037b0] fill-[#0037b0]'
                            : ''
                        }`}
                      />
                    </button>
                  </div>

                  <h4 className="font-bold text-sm text-[#131b2e] mt-2 leading-snug">
                    Құқықтық құжаттар үшін қазақ тіліндегі нақты уақыттағы транскрипция моделі
                  </h4>

                  <div className="flex items-center gap-1 text-xs text-slate-600 mt-1 font-medium">
                    <span>ZanTech AI Solutions</span>
                    <CheckCircle className="w-3.5 h-3.5 text-[#0037b0]" />
                  </div>

                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-bold text-sm text-[#0037b0]">800 000 – 1 500 000 ₸</span>
                    <span className="text-[11px] text-slate-500">айына</span>
                  </div>

                  {/* AI Match indicator */}
                  <div className="mt-2 bg-[#f2f3ff] rounded-xl p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#712ae2] text-white flex items-center justify-center font-bold text-[10px]">
                        94%
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-[#131b2e]">AI Дайындық: 94/100</div>
                        <div className="text-[10px] text-slate-500">Дауыс өңдеу бойынша тамаша үйлесім</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {['NLP', 'Whisper', 'PyTorch', 'Kazakh Speech'].map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-[#eaedff] text-[10px] text-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-5 gap-2 mt-2.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onScreenChange('apply');
                      }}
                      className="col-span-4 py-2 bg-[#0037b0] text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Үн қату (Откликнуться)</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast('Чат ашылуда...');
                      }}
                      className="col-span-1 py-2 bg-[#e2e7ff] text-[#0037b0] rounded-xl flex items-center justify-center"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Encouraging Smart Prompt Box */}
                <div className="rounded-2xl bg-[#e2e7ff] p-3 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#8a4cfc] text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs text-[#131b2e] truncate">
                      Өз дағдыларыңызға сәйкес тапқыңыз келе ме?
                    </h5>
                    <p className="text-[10.5px] text-slate-600 leading-tight">
                      Work.ai түйіндемеңізді сканерлеп, 90%+ сәйкес келетін тапсырмаларды ұсынады.
                    </p>
                  </div>
                  <button
                    onClick={() => onScreenChange('auth')}
                    className="px-2.5 py-1 bg-[#0037b0] text-white text-[11px] font-semibold rounded-lg shrink-0"
                  >
                    Талдау
                  </button>
                </div>
              </div>

              {/* Bottom Navigation Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-around px-2 z-30">
                <button
                  onClick={() => navigateTo('feed')}
                  className="flex flex-col items-center justify-center text-[#0037b0] font-bold text-[10px]"
                >
                  <Search className="w-5 h-5 mb-0.5" />
                  <span>Іздеу</span>
                </button>
                <button
                  onClick={() => navigateTo('responses')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px] relative"
                >
                  <Briefcase className="w-5 h-5 mb-0.5" />
                  <span>Жауаптар</span>
                  <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-blue-600" />
                </button>
                <button
                  onClick={() => navigateTo('tasks')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <Layers className="w-5 h-5 mb-0.5" />
                  <span>Тапсырмалар</span>
                </button>
                <button
                  onClick={() => navigateTo('chat')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px] relative"
                >
                  <MessageSquare className="w-5 h-5 mb-0.5" />
                  <span>Чат</span>
                  <span className="absolute top-0 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
                </button>
                <button
                  onClick={() => navigateTo(activeProfileTab === 'student' ? 'student_profile' : 'employer_profile')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <User className="w-5 h-5 mb-0.5" />
                  <span>Профиль</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SCREEN 2: VACANCY DETAIL */}
          {/* ========================================================= */}
          {currentScreen === 'detail' && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="pt-8 px-3 pb-2.5 bg-white/90 backdrop-blur-md border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <button
                    onClick={() => onScreenChange('feed')}
                    className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 shrink-0"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="w-6 h-6 rounded-md bg-[#0037b0] flex items-center justify-center text-white font-bold text-xs shrink-0">
                    W
                  </div>
                  <h3 className="font-bold text-sm text-[#131b2e] truncate">Vacancy Detail</h3>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => showToast('Сілтеме көшірілді!')}
                    className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <div className="w-7 h-7 rounded-full bg-[#0037b0] flex items-center justify-center text-white text-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-3.5 py-3 pb-24 space-y-3">
                {/* Top Info Card */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Бүгін, 10:45
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" /> 418 қаралым
                    </span>
                  </div>

                  <h2 className="font-bold text-base text-[#131b2e] mt-1.5 leading-snug">
                    Алматы көлік логистикасының динамикалық бағыттарын оңтайландыру
                  </h2>

                  <div className="mt-1.5 flex items-baseline gap-1.5">
                    <span className="font-bold text-lg text-[#131b2e]">650 000 – 1 200 000 ₸</span>
                    <span className="text-xs text-slate-500">қолына / келісім бойынша</span>
                  </div>

                  {/* Company Box */}
                  <div className="mt-3 p-2.5 rounded-xl bg-[#f2f3ff] flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#e2e7ff] text-[#0037b0] font-bold text-base flex items-center justify-center shrink-0">
                        A
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-xs text-[#131b2e] truncate">
                            Aibek Construction & Logistics
                          </span>
                          <CheckCircle className="w-3.5 h-3.5 text-[#0037b0] shrink-0" />
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold mt-0.5">
                          <span>4.8</span>
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span className="text-slate-400 font-normal">· 24 пікір</span>
                        </div>
                      </div>
                    </div>
                    <button className="px-2.5 py-1 bg-[#e2e7ff] text-[#0037b0] rounded-lg text-xs font-semibold shrink-0">
                      Компания
                    </button>
                  </div>

                  {/* Meta Details */}
                  <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-start gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                      <span>
                        Тәжірибе: <strong className="text-slate-900 font-semibold">1–3 жыл</strong> немесе студенттер командасы
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Building className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                      <span>Жобалық жұмыс, икемді кесте, қашықтан</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                      <span>Алматы, Достық даңғылы, 180</span>
                    </div>
                  </div>

                  {/* Quick Action */}
                  <div className="grid grid-cols-5 gap-2 mt-3.5">
                    <button
                      onClick={() => onScreenChange('apply')}
                      className="col-span-4 py-2.5 bg-[#0037b0] hover:bg-blue-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Үн қату (Жауап жіберу)</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsFavorite(!isFavorite);
                        showToast(!isFavorite ? 'Таңдаулыларға сақталды' : 'Таңдаулылардан алынды');
                      }}
                      className={`col-span-1 py-2.5 rounded-xl flex items-center justify-center transition-all ${
                        isFavorite ? 'bg-red-100 text-red-600' : 'bg-[#f2f3ff] text-slate-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-600' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* AI Verified Score Banner */}
                <div className="rounded-2xl p-3 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 border border-blue-100 shadow-sm">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#8a4cfc] text-white flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#131b2e]">AI Тексеруден өткен жоба</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#712ae2] text-white font-bold text-[10px]">
                          91/100
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-tight">
                        Мәселенің нақтылығы, берілетін деректер және бағалау критерийлері толық расталған.
                      </p>
                      <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-[#0037b0] h-full w-[91%] rounded-full" />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                        <span>Сенімділік индексі: Жоғары</span>
                        <span>Төлем кепілдендірілген</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 1: Business Context */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-1.5 text-[#0037b0] font-bold text-sm mb-2">
                    <Truck className="w-4 h-4" />
                    <span className="text-[#131b2e]">1. Бизнес мәселесі және контекст</span>
                  </div>

                  {/* Visual card */}
                  <div className="w-full h-32 rounded-xl bg-slate-900 overflow-hidden relative mb-2.5 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/80 via-slate-900/60 to-purple-950/80" />
                    <div className="relative z-10 flex flex-col items-center text-center p-3">
                      <Truck className="w-8 h-8 text-blue-400 mb-1" />
                      <span className="text-white text-xs font-bold">42 Жүк көлігі флоты</span>
                      <span className="text-[10px] text-blue-200">Алматы қаласы және облысы</span>
                    </div>
                    <div className="absolute bottom-1.5 left-2 px-2 py-0.5 rounded bg-black/60 text-[10px] text-emerald-300 font-mono">
                      Кептеліс: 07:30 – 10:30
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    Алматыдағы <strong className="text-[#0037b0]">42 жүк көлігіміз</strong> күн сайын таңертең кептелісте <strong className="text-red-600">3 сағатқа дейін</strong> тұрып қалады. Жеткізу бағыттары қолмен бекітілетіндіктен, жанармай шығыны <strong className="text-red-600">28%-ға өсті</strong>.
                  </p>

                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="bg-[#f2f3ff] rounded-xl p-2 text-center">
                      <Truck className="w-4 h-4 text-[#0037b0] mx-auto mb-0.5" />
                      <div className="font-bold text-sm text-[#131b2e]">42</div>
                      <div className="text-[10px] text-slate-500">Жүк көлігі</div>
                    </div>
                    <div className="bg-[#f2f3ff] rounded-xl p-2 text-center">
                      <Hourglass className="w-4 h-4 text-red-600 mx-auto mb-0.5" />
                      <div className="font-bold text-sm text-[#131b2e]">~3 сағ</div>
                      <div className="text-[10px] text-slate-500">Кідіріс</div>
                    </div>
                    <div className="bg-[#f2f3ff] rounded-xl p-2 text-center">
                      <TrendingUp className="w-4 h-4 text-[#712ae2] mx-auto mb-0.5" />
                      <div className="font-bold text-sm text-[#131b2e]">+28%</div>
                      <div className="text-[10px] text-slate-500">Жанармай</div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Deliverables */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-1.5 text-[#0037b0] font-bold text-sm mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-[#131b2e]">2. Командадан күтілетін нәтиже</span>
                  </div>

                  <div className="space-y-2">
                    {[
                      {
                        num: '1',
                        title: 'Бағыттау алгоритмі',
                        desc: 'Python / OR-Tools негізінде уақыт терезелерін (time-windows) ескеретін модуль.',
                      },
                      {
                        num: '2',
                        title: 'Диспетчерге арналған интерфейс',
                        desc: 'Маршрут визуализациясы бар демо веб/мобильді интерфейс.',
                      },
                      {
                        num: '3',
                        title: 'Тестілеу және талдау',
                        desc: '180 күндік шынайы GPS логтары бар тесттік деректермен салыстыру.',
                      },
                    ].map((item) => (
                      <div key={item.num} className="p-2.5 rounded-xl bg-[#f2f3ff] flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-blue-100 text-[#0037b0] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {item.num}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-[#131b2e]">{item.title}</div>
                          <div className="text-[11px] text-slate-600 mt-0.5 leading-snug">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3: Dataset Resources */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-1.5 text-[#0037b0] font-bold text-sm mb-2">
                    <Terminal className="w-4 h-4" />
                    <span className="text-[#131b2e]">3. Ұсынылатын деректер мен ресурстар</span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#004f35] shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-semibold">1.2M жолдан</strong> тұратын анонимдендірілген GPS сапар деректері.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#004f35] shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-semibold">42 жүк көлігінің</strong> толық сипаттамасы мен жанармай картасы.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#004f35] shrink-0 mt-0.5" />
                      <span>
                        <strong className="font-semibold">Yandex/2GIS бағыт API</strong> корпоративтік кілті мен геодеректер.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section 4: Skills */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-1.5 text-[#0037b0] font-bold text-sm mb-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[#131b2e]">4. Негізгі талаптар мен дағдылар</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Жобаға жеке маман немесе 2-4 адамнан құралған студенттік командалар қатыса алады.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Python', 'Data Analysis', 'OR-Tools', 'Telemetry', 'Git', 'REST API', 'GeoPandas'].map((skill) => (
                      <span
                        key={skill}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          skill === 'OR-Tools'
                            ? 'bg-[#eaddff] text-[#25005a]'
                            : 'bg-[#e2e7ff] text-[#0037b0]'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span className="text-[#131b2e] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#0037b0]" /> Орналасқан жері
                    </span>
                    <span className="text-slate-400 font-normal">Алматы</span>
                  </div>
                  <div className="h-24 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-slate-500">
                    <MapPin className="w-6 h-6 text-[#0037b0] mb-1" />
                    <span className="text-xs font-bold text-[#131b2e]">Достық даңғылы, 180</span>
                    <span className="text-[10px] text-slate-400">Бизнес орталық</span>
                  </div>
                </div>
              </div>

              {/* Fixed Bottom CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-bold text-sm text-[#131b2e] truncate">650 000 – 1 200 000 ₸</div>
                  <div className="text-[10.5px] text-slate-500 truncate">Aibek Construction & Logistics</div>
                </div>
                <button
                  onClick={() => onScreenChange('apply')}
                  className="px-5 py-2.5 bg-[#0037b0] hover:bg-blue-800 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-md active:scale-95 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Үн қату</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SCREEN 3: FILTER SETUP / APPLICATION FORM */}
          {/* ========================================================= */}
          {currentScreen === 'apply' && (
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="pt-8 px-3 pb-2.5 bg-white/90 backdrop-blur-md border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                  <button
                    onClick={() => onScreenChange('detail')}
                    className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 shrink-0"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="w-6 h-6 rounded-md bg-[#0037b0] flex items-center justify-center text-white font-bold text-xs shrink-0">
                    W
                  </div>
                  <h3 className="font-bold text-sm text-[#131b2e] truncate">Filter Setup</h3>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => showToast('Сілтеме көшірілді')}
                    className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <div className="w-7 h-7 rounded-full bg-[#0037b0] flex items-center justify-center text-white text-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto px-3.5 py-3 pb-10 space-y-3">
                {/* Top Banner & AI Score */}
                <div className="bg-[#e2e7ff] rounded-xl px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#004f35] animate-pulse" />
                    <span className="font-bold text-xs text-[#004f35]">Жаңа тапсырмаға қатысу</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#712ae2] font-bold text-xs">
                    <Zap className="w-3.5 h-3.5" />
                    <span>AI Match: 94%</span>
                  </div>
                </div>

                {/* Job Summary Card */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-[#0037b0]">
                        ЧЕЛЛЕНДЖ & ЖОБА
                      </span>
                      <h4 className="font-bold text-sm text-[#131b2e] mt-0.5 leading-snug">
                        Алматы көлік логистикасының динамикалық бағыттарын оңтайландыру
                      </h4>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#0037b0] shrink-0 ml-2">
                      <Truck className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-sm text-[#004f35]">650 000 – 1 200 000 ₸</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-xs text-slate-600 font-medium">Aibek Construction & Logistics</span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[10px] text-slate-600 flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5" /> Алматы, Қазақстан
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[10px] text-slate-600 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> Мерзімі: 1 ай
                    </span>
                  </div>
                </div>

                {/* Step 1: Resume / Team Profile */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-[#131b2e]">
                      1. Түйіндемені немесе Команданы таңдаңыз
                    </span>
                    <span className="text-[11px] font-bold text-[#0037b0]">Міндетті</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2.5">
                    Тапсырыс беруші сіздің портфолиоңызды осы профиль арқылы тексереді.
                  </p>

                  <div className="p-2.5 rounded-xl bg-[#f2f3ff] flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-[#1d4ed8] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        DC
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-xs text-[#131b2e]">Data Crafters</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <div className="text-[10.5px] text-slate-500 truncate">
                          ҚБТУ 3-курс командасы · ML & DS
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => showToast('Профиль өзгерту')}
                      className="text-[#0037b0] font-bold text-xs px-2 py-1 hover:bg-blue-100 rounded"
                    >
                      Өзгерту
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 mt-2 overflow-x-auto py-0.5">
                    <span className="px-2 py-0.5 rounded-full bg-[#eaddff] text-[#25005a] text-[10px] font-bold flex items-center gap-1 shrink-0">
                      <Check className="w-2.5 h-2.5" /> 4 қатысушы
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-slate-600 text-[10px] shrink-0">
                      Python / PyTorch
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-slate-600 text-[10px] shrink-0">
                      GIS логистикасы
                    </span>
                  </div>
                </div>

                {/* Step 2: Cover Letter with AI Polish */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-[#131b2e]">
                      2. Ілеспе хат (Сопроводительное письмо)
                    </span>
                    <button
                      onClick={polishLetterWithAi}
                      className="flex items-center gap-1 text-[11px] font-bold text-[#004f35] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 hover:bg-emerald-100"
                    >
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>AI көмекшісі</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2">
                    Неге бұл тапсырма қызық? Мәселені қалай шешуді жоспарлайсыз?
                  </p>

                  <textarea
                    rows={4}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="w-full bg-[#f2f3ff] rounded-xl p-2.5 text-xs text-[#131b2e] focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none leading-relaxed"
                    placeholder="Өз шешіміңізді жазыңыз..."
                  />

                  <div className="flex items-center justify-between mt-2">
                    <button
                      onClick={polishLetterWithAi}
                      className="px-2.5 py-1 rounded-full bg-[#e2e7ff] text-[#712ae2] text-[11px] font-bold flex items-center gap-1 hover:bg-purple-100 transition-colors"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Кәсіби стильде өңдеу</span>
                    </button>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {coverLetter.length} таңба
                    </span>
                  </div>
                </div>

                {/* Step 3: Duration & GitHub */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
                  <span className="font-bold text-xs text-[#131b2e] block mb-1">
                    3. Шешім жоспары мен мерзімі
                  </span>
                  <p className="text-[11px] text-slate-500 mb-2.5">
                    Өнімді тапсырудың нақты мерзімін және дайын нақты код базасы немесе демо сілтемесін көрсетіңіз.
                  </p>

                  <span className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Ұсынылатын мерзім
                  </span>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {['1-2 апта', '3-4 апта', '1.5+ ай'].map((dur) => (
                      <button
                        key={dur}
                        onClick={() => setSelectedDuration(dur)}
                        className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                          selectedDuration === dur
                            ? 'bg-[#0037b0] text-white shadow-sm'
                            : 'bg-[#eaedff] text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span>Прототип немесе GitHub сілтемесі</span>
                    <span className="text-[10px] text-slate-400 font-normal">міндетті емес</span>
                  </div>
                  <div className="flex items-center bg-[#f2f3ff] rounded-xl px-2.5 py-2">
                    <Terminal className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                    <input
                      type="text"
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                      className="w-full bg-transparent text-xs font-mono text-[#131b2e] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Step 4: Contact Info */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-[#131b2e]">4. Байланыс ақпараты</span>
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <p className="text-[11px] text-slate-500 mb-2.5">
                    Жұмыс беруші жеке хабарлама немесе сұхбатқа шақыру үшін пайдаланады.
                  </p>

                  <div className="space-y-2">
                    <div>
                      <span className="text-[10.5px] text-slate-500 block mb-1">Телефон нөмірі</span>
                      <div className="flex items-center bg-[#f2f3ff] rounded-xl px-2.5 py-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-transparent text-xs font-semibold text-[#131b2e] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10.5px] text-slate-500 block mb-1">Email</span>
                      <div className="flex items-center bg-[#f2f3ff] rounded-xl px-2.5 py-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent text-xs font-semibold text-[#131b2e] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Big Submit Button */}
                <button
                  onClick={handleSubmitApply}
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#1d4ed8] hover:bg-blue-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>Үн қатуды жіберу (Отправить отклик)</span>
                </button>

                {/* Trust disclaimer */}
                <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-start gap-2 text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-[#0037b0] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-[#131b2e]">Қауіпсіздік және кепілдік</div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      Жұмыс беруші сіздің өтінішіңізді 24 сағат ішінде қарайды. Статусты «Жауаптар» бөлімінен көре аласыз.
                    </p>
                  </div>
                </div>
              </div>

              {/* Success Modal */}
              {showSuccessModal && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl p-4 w-full text-center shadow-2xl animate-in zoom-in-95">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">Жауап сәтті жіберілді!</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Aibek Logistics компаниясына ұсынысыңыз жеткізілді. 24 сағат ішінде жауап беріледі.
                    </p>
                    <button
                      onClick={() => {
                        setShowSuccessModal(false);
                        onScreenChange('feed');
                      }}
                      className="w-full mt-3 py-2 bg-[#0037b0] text-white text-xs font-bold rounded-xl"
                    >
                      Жақсы
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* SCREEN 4: AUTH & ONBOARDING */}
          {/* ========================================================= */}
          {currentScreen === 'auth' && (
            <div className="flex flex-col h-full">
              {/* Header with Back button */}
              <div className="pt-8 px-3 pb-2 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 text-xs font-semibold active:scale-95 transition-all"
                  title="Артқа қайту"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#0037b0]" />
                  <span>Артқа</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-[#0037b0] flex items-center justify-center text-white font-bold text-xs">
                    W
                  </div>
                  <span className="font-bold text-sm text-[#131b2e]">Work.ai</span>
                </div>

                {/* Lang toggle */}
                <div className="flex items-center p-0.5 rounded-full bg-[#e2e7ff] text-[10px] font-bold">
                  {(['kz', 'ru', 'en'] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLanguage(l)}
                      className={`px-1.5 py-0.5 rounded-full transition-all uppercase ${
                        language === l ? 'bg-[#0037b0] text-white shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto px-3.5 py-2 pb-8 space-y-3">
                {/* Hero */}
                <div className="text-center pt-1">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e2e7ff] text-[#712ae2] text-[10px] font-bold mb-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>WORK.AI COPILOT V2.4</span>
                  </div>
                  <h2 className="font-bold text-lg text-[#131b2e] leading-snug">
                    Болашақ жұмыс кеңістігі
                  </h2>
                  <p className="text-[11px] text-slate-500 max-w-xs mx-auto mt-0.5">
                    Қазақстандағы бизнес мәселелерін шешуге арналған жасанды интеллект платформасы
                  </p>
                </div>

                {/* Role Switcher */}
                <div className="p-1 rounded-xl bg-[#f2f3ff] flex gap-1">
                  <button
                    onClick={() => setAuthRole('talent')}
                    className={`flex-1 py-2 px-2 rounded-lg flex flex-col items-center justify-center transition-all ${
                      authRole === 'talent'
                        ? 'bg-white shadow-xs text-[#131b2e]'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-xs font-bold text-[#0037b0]">
                      <User className="w-3.5 h-3.5" />
                      <span>Талант & Студент</span>
                    </div>
                    <span className="text-[9.5px] text-slate-400">Челлендждер & Практика</span>
                  </button>

                  <button
                    onClick={() => setAuthRole('business')}
                    className={`flex-1 py-2 px-2 rounded-lg flex flex-col items-center justify-center transition-all ${
                      authRole === 'business'
                        ? 'bg-white shadow-xs text-[#131b2e]'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-xs font-bold text-[#712ae2]">
                      <Building className="w-3.5 h-3.5" />
                      <span>Бизнес & Жұмыс беруші</span>
                    </div>
                    <span className="text-[9.5px] text-slate-400">Кейс тапсыру & Хайринг</span>
                  </button>
                </div>

                {/* Perk card */}
                <div className="p-2.5 rounded-xl bg-[#e2e7ff] flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-[#712ae2] text-white flex items-center justify-center shrink-0">
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-[#131b2e] truncate">
                        {authRole === 'talent'
                          ? 'AI Smart Match 98.4% дәлдікпен'
                          : 'AI Кейс құрастырушысы'}
                      </div>
                      <div className="text-[10px] text-slate-600 truncate">
                        {authRole === 'talent'
                          ? 'Дағдыларыңыз бен портфолиоңызды бағалау'
                          : '5000+ дайын үздік студенттерге кейс беру'}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>

                {/* 10-sec Instant AI CV Onboarding */}
                <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-lg bg-[#8a4cfc] text-white flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-xs text-[#131b2e]">10 секундта AI Тіркелу</span>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#85f8c4] text-[#002114]">
                      NEW
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Резюмеңізді жүктеп, сауалнамасыз кіріңіз
                  </p>
                  <button
                    onClick={() => showToast('CV файл жүктеу таңдалды... AI оқуда')}
                    className="w-full mt-2 py-2 rounded-xl bg-[#eaedff] text-[#0037b0] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-blue-100 transition-colors"
                  >
                    <FileUp className="w-4 h-4" />
                    <span>Резюме (.PDF, .DOCX) жүктеу</span>
                  </button>
                </div>

                {/* Main Auth Form Card */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
                  {/* Phone vs Email */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-0.5 rounded-lg bg-[#eaedff] flex text-xs font-semibold">
                      <button
                        onClick={() => setAuthTab('phone')}
                        className={`px-3 py-1 rounded-md transition-all ${
                          authTab === 'phone' ? 'bg-white text-[#0037b0] shadow-xs' : 'text-slate-500'
                        }`}
                      >
                        Телефон
                      </button>
                      <button
                        onClick={() => setAuthTab('email')}
                        className={`px-3 py-1 rounded-md transition-all ${
                          authTab === 'email' ? 'bg-white text-[#0037b0] shadow-xs' : 'text-slate-500'
                        }`}
                      >
                        Email
                      </button>
                    </div>

                    <button
                      onClick={() => setIsOtpMode(!isOtpMode)}
                      className="text-[#712ae2] text-[11px] font-semibold hover:underline"
                    >
                      {isOtpMode ? 'Құпия сөзбен кіру' : 'SMS кодпен кіру'}
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-[10.5px] text-slate-500 block mb-0.5">
                        {authTab === 'phone' ? 'Телефон нөмірі' : 'Электрондық пошта'}
                      </span>
                      <div className="flex items-center bg-[#f2f3ff] rounded-xl px-2.5 py-2">
                        {authTab === 'phone' ? (
                          <Phone className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                        ) : (
                          <Mail className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                        )}
                        <input
                          type="text"
                          defaultValue={authTab === 'phone' ? '+7 (700) 123-45-67' : 'talent@work.ai'}
                          className="w-full bg-transparent text-xs font-semibold text-[#131b2e] focus:outline-none"
                        />
                      </div>
                    </div>

                    {!isOtpMode ? (
                      <div>
                        <div className="flex items-center justify-between text-[10.5px] mb-0.5">
                          <span className="text-slate-500">Құпия сөз</span>
                          <button
                            onClick={() => showToast('Қалпына келтіру сілтемесі жіберілді')}
                            className="text-[#0037b0] font-semibold"
                          >
                            Ұмыттыңыз ба?
                          </button>
                        </div>
                        <div className="flex items-center bg-[#f2f3ff] rounded-xl px-2.5 py-2">
                          <Lock className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
                          <input
                            type="password"
                            defaultValue="••••••••"
                            className="w-full bg-transparent text-xs text-[#131b2e] focus:outline-none"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span className="text-[10.5px] text-slate-500 block mb-1">
                          SMS-пен келген 4 таңбалы код
                        </span>
                        <div className="flex gap-2 justify-between">
                          {['3', '8', '1', '9'].map((digit, i) => (
                            <input
                              key={i}
                              type="text"
                              maxLength={1}
                              defaultValue={digit}
                              className="w-12 h-10 text-center font-bold text-base bg-[#f2f3ff] rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 pt-1">
                      <input type="checkbox" defaultChecked id="remember" className="rounded text-[#0037b0]" />
                      <label htmlFor="remember" className="text-[11px] text-slate-600">
                        Мені жүйеде есте сақтау (30 күн)
                      </label>
                    </div>

                    <button
                      onClick={() => {
                        showToast('Жүйеге сәтті кірдіңіз!');
                        onScreenChange('feed');
                      }}
                      className="w-full mt-1 py-2.5 bg-gradient-to-r from-[#0037b0] to-[#712ae2] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                    >
                      <span>{isOtpMode ? 'Кодты растау' : 'Жүйеге кіру'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => showToast('Face ID тексерілді ✅')}
                      className="w-full py-2 bg-[#e2e7ff] text-[#131b2e] rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-200 transition-colors"
                    >
                      <Fingerprint className="w-4 h-4 text-[#712ae2]" />
                      <span>Face ID / Touch ID арқылы кіру</span>
                    </button>
                  </div>

                  <div className="relative my-3 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-100" />
                    </div>
                    <span className="relative bg-white px-2 text-[10px] text-slate-400">
                      немесе әлеуметтік желілермен
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => showToast('Digital ID QR сканері...')}
                      className="py-2 rounded-xl bg-[#f2f3ff] flex flex-col items-center justify-center hover:bg-slate-200 text-xs font-semibold text-[#0037b0]"
                    >
                      <QrCode className="w-4 h-4 mb-0.5" />
                      <span className="text-[10px]">Digital ID</span>
                    </button>
                    <button
                      onClick={() => showToast('Google SSO арқылы кіру')}
                      className="py-2 rounded-xl bg-[#f2f3ff] flex flex-col items-center justify-center hover:bg-slate-200 text-xs font-semibold text-slate-700"
                    >
                      <span className="font-bold text-xs mb-0.5">G</span>
                      <span className="text-[10px]">Google</span>
                    </button>
                    <button
                      onClick={() => showToast('Apple ID арқылы кіру')}
                      className="py-2 rounded-xl bg-[#f2f3ff] flex flex-col items-center justify-center hover:bg-slate-200 text-xs font-semibold text-slate-700"
                    >
                      <span className="font-bold text-xs mb-0.5"></span>
                      <span className="text-[10px]">Apple</span>
                    </button>
                  </div>
                </div>

                {/* Footer security */}
                <div className="text-center text-[10.5px] text-slate-400 space-y-1">
                  <div className="flex items-center justify-center gap-1 text-[#004f35]">
                    <Lock className="w-3 h-3" />
                    <span>256-bit шифрлау · ҚР заңына сай</span>
                  </div>
                  <div>
                    Work.ai-да аккаунтыңыз жоқ па?{' '}
                    <button
                      onClick={() => showToast('Тіркелу формасына өту')}
                      className="text-[#0037b0] font-bold hover:underline"
                    >
                      Тіркелу
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SCREEN 5: STUDENT PROFILE (Студенттің жеке беті) */}
          {/* ========================================================= */}
          {currentScreen === 'student_profile' && (
            <div className="flex flex-col h-full bg-[#faf8ff]">
              {/* Header with BACK button */}
              <div className="pt-8 px-3.5 pb-2.5 bg-white/90 backdrop-blur-md border-b border-slate-100 flex items-center justify-between z-10 shrink-0">
                <button
                  onClick={handleBack}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 text-xs font-semibold active:scale-95 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#0037b0]" />
                  <span>Артқа</span>
                </button>
                <h3 className="font-bold text-sm text-[#131b2e]">Студент профилі</h3>
                <button
                  onClick={() => showToast('Профиль бөлісілді 🔗')}
                  className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 pb-20">
                {/* Profile Card */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full pointer-events-none" />
                  
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                        НТ
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" title="Онлайн" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-base text-[#131b2e] truncate">
                          Нұрислам Тастанбек
                        </h4>
                        <CheckCircle2 className="w-4 h-4 text-[#0037b0] shrink-0" />
                      </div>
                      <p className="text-xs text-[#0037b0] font-semibold">
                        Data Science & AI Engineer
                      </p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Building className="w-3 h-3 text-slate-400" />
                        <span>ҚБТУ · 4-курс студенті</span>
                      </p>
                    </div>
                  </div>

                  {/* Switch to Employer Mode Button */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-[11px] text-slate-500">
                      Рөл: <span className="font-bold text-[#0037b0]">Студент / Орындаушы</span>
                    </div>
                    <button
                      onClick={() => {
                        setActiveProfileTab('employer');
                        navigateTo('employer_profile');
                        showToast('Кәсіпкер кабинетіне көштіңіз 🏢');
                      }}
                      className="px-2.5 py-1 bg-[#eaedff] hover:bg-blue-100 text-[#0037b0] text-[11px] font-bold rounded-lg transition-all flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Кәсіпкер кабинетіне өту</span>
                    </button>
                  </div>
                </div>

                {/* AI Score Banner */}
                <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 p-3.5 text-white shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-blue-200 text-xs font-semibold">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Work.ai Index: 96 / 100</span>
                      </div>
                      <h5 className="font-extrabold text-sm text-white mt-0.5">
                        ҚР бойынша ТОП 2% AI маманы
                      </h5>
                      <p className="text-[10.5px] text-blue-200 mt-1">
                        Жоғары сәйкестік: Логистика, VRP, NLP, CV жобалары
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex flex-col items-center justify-center font-black text-amber-300 border border-white/20">
                      <span className="text-sm">96%</span>
                      <span className="text-[8px] text-white">MATCH</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white rounded-xl p-2.5 border border-slate-100 text-center shadow-xs">
                    <div className="text-base font-extrabold text-[#0037b0]">12</div>
                    <div className="text-[10px] text-slate-500 font-medium">Орындалған кейс</div>
                  </div>
                  <div className="bg-white rounded-xl p-2.5 border border-slate-100 text-center shadow-xs">
                    <div className="text-base font-extrabold text-[#712ae2]">2.4M ₸</div>
                    <div className="text-[10px] text-slate-500 font-medium">Табыс / Жүлде</div>
                  </div>
                  <div className="bg-white rounded-xl p-2.5 border border-slate-100 text-center shadow-xs">
                    <div className="text-base font-extrabold text-emerald-600">3</div>
                    <div className="text-[10px] text-slate-500 font-medium">Хакатон жеңісі</div>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
                  <h5 className="font-bold text-xs text-[#131b2e] mb-2 flex items-center justify-between">
                    <span>Негізгі стек және дағдылар</span>
                    <span className="text-[10px] text-slate-400 font-normal">8 расталған</span>
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Python',
                      'PyTorch',
                      'OR-Tools (VRP)',
                      'FastAPI',
                      'Flutter & Dart',
                      'GeoPandas',
                      'YOLOv8',
                      'PostgreSQL'
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-[#f2f3ff] text-[#0037b0] rounded-lg text-[11px] font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Team Card */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        Команда
                      </div>
                      <h5 className="font-bold text-xs text-[#131b2e]">
                        Data Crafters (4 студент)
                      </h5>
                      <p className="text-[11px] text-slate-500">
                        Рөлі: Команда капитаны & Lead ML
                      </p>
                    </div>
                    <button
                      onClick={() => showToast('Команда құрамы ашылды')}
                      className="px-2.5 py-1 bg-[#eaedff] text-[#0037b0] text-[11px] font-semibold rounded-lg"
                    >
                      Қарау
                    </button>
                  </div>
                </div>

                {/* Verified Resume */}
                <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">
                      PDF
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#131b2e]">
                        CV_Nurislam_Tastanbek_2026.pdf
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span>AI верификациядан өткен</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast('Резюме жүктелуде...')}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-around px-2 z-30">
                <button
                  onClick={() => navigateTo('feed')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <Search className="w-5 h-5 mb-0.5" />
                  <span>Іздеу</span>
                </button>
                <button
                  onClick={() => navigateTo('responses')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <Briefcase className="w-5 h-5 mb-0.5" />
                  <span>Жауаптар</span>
                </button>
                <button
                  onClick={() => navigateTo('tasks')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <Layers className="w-5 h-5 mb-0.5" />
                  <span>Тапсырмалар</span>
                </button>
                <button
                  onClick={() => navigateTo('chat')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <MessageSquare className="w-5 h-5 mb-0.5" />
                  <span>Чат</span>
                </button>
                <button
                  onClick={() => navigateTo('student_profile')}
                  className="flex flex-col items-center justify-center text-[#0037b0] font-bold text-[10px]"
                >
                  <User className="w-5 h-5 mb-0.5" />
                  <span>Профиль</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SCREEN 6: EMPLOYER / BUSINESS PROFILE (Кәсіпкердің жеке беті) */}
          {/* ========================================================= */}
          {currentScreen === 'employer_profile' && (
            <div className="flex flex-col h-full bg-[#faf8ff]">
              {/* Header with BACK button */}
              <div className="pt-8 px-3.5 pb-2.5 bg-white/90 backdrop-blur-md border-b border-slate-100 flex items-center justify-between z-10 shrink-0">
                <button
                  onClick={handleBack}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 text-xs font-semibold active:scale-95 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#0037b0]" />
                  <span>Артқа</span>
                </button>
                <h3 className="font-bold text-sm text-[#131b2e]">Кәсіпкер кабинеті</h3>
                <button
                  onClick={() => showToast('Кәсіпкерлік баптаулар ашылды')}
                  className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 pb-20">
                {/* Business Info Card */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-13 h-13 rounded-2xl bg-[#0037b0] flex items-center justify-center text-white font-extrabold text-xl shadow-md p-2">
                      <Truck className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-base text-[#131b2e] truncate">
                          Aibek Logistics & Supply
                        </h4>
                      </div>
                      <p className="text-xs text-slate-600">
                        Айбек Сейітов · Бас директор
                      </p>
                      <div className="flex items-center gap-1 text-[10.5px] text-emerald-600 font-semibold mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Тексерілген серіктес (БСН 190440012)</span>
                      </div>
                    </div>
                  </div>

                  {/* Switch to Student Mode Button */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Рөл: <span className="font-bold text-[#712ae2]">Жұмыс беруші / Бизнес</span>
                    </span>
                    <button
                      onClick={() => {
                        setActiveProfileTab('student');
                        navigateTo('student_profile');
                        showToast('Студент профиліне көштіңіз 🎓');
                      }}
                      className="px-2.5 py-1 bg-[#f2f3ff] hover:bg-blue-100 text-[#0037b0] text-[11px] font-bold rounded-lg transition-all flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Студент режіміне өту</span>
                    </button>
                  </div>
                </div>

                {/* Escrow Balance Card */}
                <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 p-4 text-white shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300">Қорғалған Эскроу Балансы</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      Қауіпсіз төлем
                    </span>
                  </div>
                  <div className="text-2xl font-black text-white mt-1">
                    3 400 000 ₸
                  </div>
                  <p className="text-[10.5px] text-slate-400 mt-1">
                    Студент тапсырманы сәтті өткізгенде автоматты түрде аударылады.
                  </p>
                </div>

                {/* Add New Task Button */}
                <button
                  onClick={() => {
                    setShowNewTaskModal(true);
                    showToast('Жаңа тапсырма құру терезесі');
                  }}
                  className="w-full py-3 bg-[#0037b0] hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>+ Жаңа бизнес-тапсырма жариялау</span>
                </button>

                {/* Active Challenges Posted by Employer */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-xs text-[#131b2e]">
                      Жарияланған белсенді тапсырмалар (2)
                    </h5>
                    <span className="text-[10.5px] text-[#0037b0] font-semibold">Барлығы</span>
                  </div>

                  {/* Challenge 1 */}
                  <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          Белсенді
                        </span>
                        <span className="text-xs font-bold text-[#0037b0]">850 000 ₸</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Дедлайн: 29 қыркүйек</span>
                    </div>

                    <h6 className="font-bold text-xs text-[#131b2e] mt-1.5 leading-snug">
                      42 жүк көлігінің бағытын AI (VRP) арқылы оңтайландыру
                    </h6>

                    <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-slate-600">
                        <User className="w-3.5 h-3.5 text-[#0037b0]" />
                        <span><strong>24</strong> өтініш түсті</span>
                      </div>
                      <button
                        onClick={() => navigateTo('responses')}
                        className="text-[#0037b0] font-bold text-[11px] hover:underline"
                      >
                        Үміткерлерді көру →
                      </button>
                    </div>
                  </div>

                  {/* Challenge 2 */}
                  <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                          Қаралуда
                        </span>
                        <span className="text-xs font-bold text-[#0037b0]">1 200 000 ₸</span>
                      </div>
                      <span className="text-[10px] text-slate-400">11 өтініш</span>
                    </div>

                    <h6 className="font-bold text-xs text-[#131b2e] mt-1.5 leading-snug">
                      С қоймасындағы тауар есебін компьютерлік көру (CV) арқылы автоматтандыру
                    </h6>

                    <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500">Шешімдер іріктелуде</span>
                      <button
                        onClick={() => showToast('AI скрининг есебі дайындалуда')}
                        className="text-[#0037b0] font-bold text-[11px] hover:underline"
                      >
                        AI Скрининг →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-around px-2 z-30">
                <button
                  onClick={() => navigateTo('feed')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <Search className="w-5 h-5 mb-0.5" />
                  <span>Іздеу</span>
                </button>
                <button
                  onClick={() => navigateTo('responses')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <Briefcase className="w-5 h-5 mb-0.5" />
                  <span>Жауаптар</span>
                </button>
                <button
                  onClick={() => navigateTo('tasks')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <Layers className="w-5 h-5 mb-0.5" />
                  <span>Тапсырмалар</span>
                </button>
                <button
                  onClick={() => navigateTo('chat')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <MessageSquare className="w-5 h-5 mb-0.5" />
                  <span>Чат</span>
                </button>
                <button
                  onClick={() => navigateTo('employer_profile')}
                  className="flex flex-col items-center justify-center text-[#0037b0] font-bold text-[10px]"
                >
                  <User className="w-5 h-5 mb-0.5" />
                  <span>Профиль</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SCREEN 7: TASKS / CHALLENGES SCREEN (Тапсырмалар беті) */}
          {/* ========================================================= */}
          {currentScreen === 'tasks' && (
            <div className="flex flex-col h-full bg-[#faf8ff]">
              {/* Header with BACK button */}
              <div className="pt-8 px-3.5 pb-2.5 bg-white/90 backdrop-blur-md border-b border-slate-100 flex items-center justify-between z-10 shrink-0">
                <button
                  onClick={handleBack}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 text-xs font-semibold active:scale-95 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#0037b0]" />
                  <span>Артқа</span>
                </button>
                <h3 className="font-bold text-sm text-[#131b2e]">Менің тапсырмаларым</h3>
                <span className="w-7" />
              </div>

              {/* Tasks Tabs */}
              <div className="px-3.5 pt-2.5 pb-1 bg-white border-b border-slate-100 flex gap-2">
                {[
                  { id: 'active', label: 'Белсенді (2)' },
                  { id: 'completed', label: 'Аяқталған (1)' },
                  { id: 'all', label: 'Барлығы (3)' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setTasksTab(tab.id as any)}
                    className={`pb-2 px-2 text-xs font-bold transition-all border-b-2 ${
                      tasksTab === tab.id
                        ? 'border-[#0037b0] text-[#0037b0]'
                        : 'border-transparent text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Scrollable Tasks Body */}
              <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 pb-20">
                {(tasksTab === 'active' || tasksTab === 'all') && (
                  <>
                    {/* Active Task 1: 42 Trucks */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-blue-200/80">
                      <div className="flex items-start justify-between">
                        <span className="px-2 py-0.5 rounded-md bg-blue-100 text-[#0037b0] text-[10px] font-bold">
                          Жол ортасында (In Progress)
                        </span>
                        <span className="text-xs font-black text-[#0037b0]">850 000 ₸</span>
                      </div>

                      <h5 className="font-bold text-sm text-[#131b2e] mt-2 leading-snug">
                        42 жүк көлігінің логистикасын AI арқылы оңтайландыру
                      </h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Тапсырыс беруші: Aibek Logistics & Supply
                      </p>

                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="flex justify-between text-[11px] font-semibold mb-1">
                          <span className="text-slate-600">Прогресс: 65%</span>
                          <span className="text-amber-600 font-bold">Дедлайн: 6 күн қалды</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#0037b0] rounded-full w-[65%]" />
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-2">
                        <button
                          onClick={() => {
                            setShowSubmitModal(true);
                            showToast('Шешім тапсыру терезесі');
                          }}
                          className="flex-1 py-2 bg-[#0037b0] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Шешімді жіберу (Нәтиже)</span>
                        </button>
                        <button
                          onClick={() => navigateTo('chat')}
                          className="p-2 bg-[#f2f3ff] text-[#0037b0] rounded-xl hover:bg-blue-100 transition-colors"
                          title="Чатқа өту"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Active Task 2: ZanTech */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                      <div className="flex items-start justify-between">
                        <span className="px-2 py-0.5 rounded-md bg-purple-100 text-[#712ae2] text-[10px] font-bold">
                          Зерттеу кезеңі (25%)
                        </span>
                        <span className="text-xs font-black text-[#0037b0]">1 200 000 ₸</span>
                      </div>

                      <h5 className="font-bold text-sm text-[#131b2e] mt-2 leading-snug">
                        ZanTech: ҚР заңнамасын талдайтын RAG-ассистент
                      </h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Тапсырыс беруші: ZanTech AI Solutions
                      </p>

                      <div className="mt-3">
                        <div className="flex justify-between text-[11px] font-semibold mb-1">
                          <span className="text-slate-600">Датасет жинақталды</span>
                          <span className="text-slate-500">18 күн қалды</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#712ae2] rounded-full w-[25%]" />
                        </div>
                      </div>

                      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-2">
                        <button
                          onClick={() => showToast('GitHub коммит тексерілді: rag_pipeline_v1')}
                          className="flex-1 py-2 bg-[#f2f3ff] text-[#0037b0] font-semibold text-xs rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Кодты жаңарту</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {(tasksTab === 'completed' || tasksTab === 'all') && (
                  /* Completed Task: AgroData */
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-200">
                    <div className="flex items-start justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Сәтті аяқталды · Жеңімпаз 🏆</span>
                      </span>
                      <span className="text-xs font-black text-emerald-600">+650 000 ₸</span>
                    </div>

                    <h5 className="font-bold text-sm text-[#131b2e] mt-2 leading-snug">
                      AgroData: Егістік ылғалын спутниктік талдау моделі
                    </h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Төлем толық жүргізілді · Пікір: 5.0 ⭐⭐⭐⭐⭐
                    </p>

                    <div className="mt-2.5 p-2 bg-[#f2f3ff] rounded-xl text-[11px] text-slate-700 italic">
                      "Нұрисламның командасы тапсырманы мерзімінен 4 күн бұрын өте сапалы өткізді!"
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Nav */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-around px-2 z-30">
                <button
                  onClick={() => navigateTo('feed')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <Search className="w-5 h-5 mb-0.5" />
                  <span>Іздеу</span>
                </button>
                <button
                  onClick={() => navigateTo('responses')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <Briefcase className="w-5 h-5 mb-0.5" />
                  <span>Жауаптар</span>
                </button>
                <button
                  onClick={() => navigateTo('tasks')}
                  className="flex flex-col items-center justify-center text-[#0037b0] font-bold text-[10px]"
                >
                  <Layers className="w-5 h-5 mb-0.5" />
                  <span>Тапсырмалар</span>
                </button>
                <button
                  onClick={() => navigateTo('chat')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <MessageSquare className="w-5 h-5 mb-0.5" />
                  <span>Чат</span>
                </button>
                <button
                  onClick={() => navigateTo(activeProfileTab === 'student' ? 'student_profile' : 'employer_profile')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <User className="w-5 h-5 mb-0.5" />
                  <span>Профиль</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SCREEN 8: RESPONSES / APPLICATIONS (Жауаптар беті - Отклики) */}
          {/* ========================================================= */}
          {currentScreen === 'responses' && (
            <div className="flex flex-col h-full bg-[#faf8ff]">
              {/* Header with BACK button */}
              <div className="pt-8 px-3.5 pb-2.5 bg-white/90 backdrop-blur-md border-b border-slate-100 flex items-center justify-between z-10 shrink-0">
                <button
                  onClick={handleBack}
                  className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 text-xs font-semibold active:scale-95 transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#0037b0]" />
                  <span>Артқа</span>
                </button>
                <h3 className="font-bold text-sm text-[#131b2e]">Жауаптар мен Үн қатулар</h3>
                <span className="w-7" />
              </div>

              {/* Stats Bar */}
              <div className="px-3.5 py-2.5 bg-[#eaedff] flex items-center justify-around text-center text-xs">
                <div>
                  <span className="font-bold text-[#0037b0] block text-sm">6</span>
                  <span className="text-[10px] text-slate-600">Барлық үн қату</span>
                </div>
                <div className="w-[1px] h-6 bg-slate-200" />
                <div>
                  <span className="font-bold text-emerald-600 block text-sm">2</span>
                  <span className="text-[10px] text-slate-600">Сұхбатқа шақыру</span>
                </div>
                <div className="w-[1px] h-6 bg-slate-200" />
                <div>
                  <span className="font-bold text-[#712ae2] block text-sm">3</span>
                  <span className="text-[10px] text-slate-600">AI Қаралуда</span>
                </div>
              </div>

              {/* Applications List */}
              <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-3 pb-20">
                {/* Response 1: Interview Invited */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-200">
                  <div className="flex items-start justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>Сұхбатқа шақырылды</span>
                    </span>
                    <span className="text-[10px] text-slate-400">Бүгін, 14:20</span>
                  </div>

                  <h5 className="font-bold text-sm text-[#131b2e] mt-1.5">
                    Aibek Logistics & Supply
                  </h5>
                  <p className="text-xs text-slate-600 font-medium">
                    42 жүк көлігінің логистикасын AI арқылы оңтайландыру
                  </p>

                  <div className="mt-2.5 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                    <div className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Google Meet: Бүгін, сағат 16:00</span>
                    </div>
                    <p className="text-[10.5px] text-emerald-700 mt-0.5">
                      HR менеджері Айгүл сізді сұхбатқа шақырды.
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => navigateTo('chat')}
                      className="flex-1 py-2 bg-[#0037b0] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Чатты ашу</span>
                    </button>
                    <button
                      onClick={() => showToast('Meet сілтемесі көшірілді: meet.google.com/wrk-logistics-ai')}
                      className="py-2 px-3 bg-[#f2f3ff] text-[#0037b0] font-semibold text-xs rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      Сілтеме
                    </button>
                  </div>
                </div>

                {/* Response 2: AI Screening Passed */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                  <div className="flex items-start justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#0037b0] text-[10px] font-bold">
                      AI Скринингтен өтті (94%)
                    </span>
                    <span className="text-[10px] text-slate-400">Кеше</span>
                  </div>

                  <h5 className="font-bold text-sm text-[#131b2e] mt-1.5">
                    ZanTech AI Solutions
                  </h5>
                  <p className="text-xs text-slate-600 font-medium">
                    Құқықтық құжаттарды нақты уақытта транскрипциялау
                  </p>

                  <div className="mt-2 text-[11px] text-slate-500">
                    Сіздің резюмеңіз бен NLP портфолиоңыз техникалық жетекшіге қарауға жіберілді.
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2.5 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-700">800 000 – 1 500 000 ₸</span>
                    <button
                      onClick={() => navigateTo('chat')}
                      className="text-[#0037b0] text-xs font-bold hover:underline"
                    >
                      Чатта хат жазу →
                    </button>
                  </div>
                </div>

                {/* Response 3: In Review */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                  <div className="flex items-start justify-between">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                      Қаралуда
                    </span>
                    <span className="text-[10px] text-slate-400">2 күн бұрын</span>
                  </div>

                  <h5 className="font-bold text-sm text-[#131b2e] mt-1.5">
                    Kaspi Fintech Labs
                  </h5>
                  <p className="text-xs text-slate-600 font-medium">
                    Транзакциялар аномалиясын анықтау алгоритмі
                  </p>

                  <p className="mt-2 text-[11px] text-slate-500">
                    Үн қату жұмыс берушіге жеткізілді. Жауап күтілуде.
                  </p>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-around px-2 z-30">
                <button
                  onClick={() => navigateTo('feed')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <Search className="w-5 h-5 mb-0.5" />
                  <span>Іздеу</span>
                </button>
                <button
                  onClick={() => navigateTo('responses')}
                  className="flex flex-col items-center justify-center text-[#0037b0] font-bold text-[10px]"
                >
                  <Briefcase className="w-5 h-5 mb-0.5" />
                  <span>Жауаптар</span>
                </button>
                <button
                  onClick={() => navigateTo('tasks')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <Layers className="w-5 h-5 mb-0.5" />
                  <span>Тапсырмалар</span>
                </button>
                <button
                  onClick={() => navigateTo('chat')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <MessageSquare className="w-5 h-5 mb-0.5" />
                  <span>Чат</span>
                </button>
                <button
                  onClick={() => navigateTo(activeProfileTab === 'student' ? 'student_profile' : 'employer_profile')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <User className="w-5 h-5 mb-0.5" />
                  <span>Профиль</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SCREEN 9: CHAT SCREEN (Чат беті) */}
          {/* ========================================================= */}
          {currentScreen === 'chat' && (
            <div className="flex flex-col h-full bg-[#faf8ff]">
              {/* Header with BACK button */}
              <div className="pt-8 px-3 pb-2.5 bg-white/95 backdrop-blur-md border-b border-slate-100 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  <button
                    onClick={handleBack}
                    className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 text-xs font-semibold active:scale-95 transition-all shrink-0"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#0037b0]" />
                    <span>Артқа</span>
                  </button>

                  <div className="relative shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[#0037b0] text-white flex items-center justify-center font-bold text-xs">
                      AL
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-[#131b2e] truncate">
                      Aibek Logistics (HR Айгүл)
                    </h4>
                    <p className="text-[10px] text-emerald-600 font-medium leading-none">
                      онлайн · 42 жүк көлігі кейсі
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => showToast('Google Meet қоңырауы: meet.google.com/wrk-logistics-ai')}
                    className="w-7 h-7 rounded-full bg-[#f2f3ff] text-[#0037b0] flex items-center justify-center hover:bg-blue-100"
                    title="Видеоқоңырау"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Chat Partners Quick Selector */}
              <div className="px-3 py-1.5 bg-white border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-[11px]">
                <button
                  onClick={() => setSelectedChatId('aibek')}
                  className="px-2.5 py-1 rounded-lg bg-[#0037b0] text-white font-semibold shrink-0"
                >
                  Aibek Logistics
                </button>
                <button
                  onClick={() => {
                    setSelectedChatId('zantech');
                    showToast('ZanTech чаты таңдалды');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#f2f3ff] text-slate-700 hover:bg-slate-200 font-medium shrink-0"
                >
                  ZanTech Lead
                </button>
                <button
                  onClick={() => {
                    setSelectedChatId('mentor');
                    showToast('Work.ai Ментор ашылды');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#f2f3ff] text-slate-700 hover:bg-slate-200 font-medium shrink-0 flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  <span>AI Ментор</span>
                </button>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                <div className="text-center my-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-200/70 text-[10px] text-slate-600 font-medium">
                    Бүгін
                  </span>
                </div>

                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'me' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'me'
                          ? 'bg-[#0037b0] text-white rounded-br-xs shadow-xs'
                          : 'bg-white text-[#131b2e] rounded-bl-xs shadow-xs border border-slate-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9.5px] text-slate-400 mt-0.5 px-1 font-mono">
                      {msg.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Smart Quick Reply Chips */}
              <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto">
                <span className="text-[10px] text-slate-400 font-semibold shrink-0">Жылдам:</span>
                <button
                  onClick={() => handleSendMessage('Иә, сағат 16:00-де сұхбатқа толықтай дайынмын!')}
                  className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[10.5px] text-slate-700 hover:bg-blue-50 hover:border-blue-200 shrink-0"
                >
                  Сағат 16:00-ге дайынмын ✅
                </button>
                <button
                  onClick={() => handleSendMessage('VRP алгоритмінің демонстрациясын көрсете аламын ба?')}
                  className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[10.5px] text-slate-700 hover:bg-blue-50 hover:border-blue-200 shrink-0"
                >
                  Демоны көрсетемін 💻
                </button>
                <button
                  onClick={() => handleSendMessage('Түсіндім, үлкен рақмет!')}
                  className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[10.5px] text-slate-700 hover:bg-blue-50 hover:border-blue-200 shrink-0"
                >
                  Рақмет! 🙏
                </button>
              </div>

              {/* Chat Input Bar */}
              <div className="p-2.5 bg-white border-t border-slate-200/80 flex items-center gap-2 pb-16">
                <input
                  type="text"
                  placeholder="Хабарлама жазыңыз..."
                  value={chatInputText}
                  onChange={(e) => setChatInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  className="flex-1 bg-[#f2f3ff] rounded-xl px-3 py-2 text-xs text-[#131b2e] placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="w-8 h-8 rounded-xl bg-[#0037b0] text-white flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bottom Nav in Chat */}
              <div className="absolute bottom-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-md border-t border-slate-200/80 flex items-center justify-around px-2 z-30">
                <button
                  onClick={() => navigateTo('feed')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <Search className="w-4 h-4 mb-0.5" />
                  <span>Іздеу</span>
                </button>
                <button
                  onClick={() => navigateTo('responses')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <Briefcase className="w-4 h-4 mb-0.5" />
                  <span>Жауаптар</span>
                </button>
                <button
                  onClick={() => navigateTo('tasks')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <Layers className="w-4 h-4 mb-0.5" />
                  <span>Тапсырмалар</span>
                </button>
                <button
                  onClick={() => navigateTo('chat')}
                  className="flex flex-col items-center justify-center text-[#0037b0] font-bold text-[10px]"
                >
                  <MessageSquare className="w-4 h-4 mb-0.5" />
                  <span>Чат</span>
                </button>
                <button
                  onClick={() => navigateTo(activeProfileTab === 'student' ? 'student_profile' : 'employer_profile')}
                  className="flex flex-col items-center justify-center text-slate-500 font-medium text-[10px]"
                >
                  <User className="w-4 h-4 mb-0.5" />
                  <span>Профиль</span>
                </button>
              </div>
            </div>
          )}

          {/* Modal 1: Submit Solution */}
          {showSubmitModal && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-4 w-full shadow-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#131b2e]">Шешімді тапсыру</h4>
                  <button
                    onClick={() => setShowSubmitModal(false)}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  42 жүк көлігі мәселесі бойынша дайындалған GitHub репозиторийі немесе демо сілтемесін жіберіңіз.
                </p>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 block mb-1">GitHub репозиторийі / Docker</label>
                  <input
                    type="text"
                    value={taskCommitUrl}
                    onChange={(e) => setTaskCommitUrl(e.target.value)}
                    className="w-full bg-[#f2f3ff] rounded-xl px-3 py-2 text-xs font-mono text-[#0037b0] focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowSubmitModal(false)}
                    className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs"
                  >
                    Бас тарту
                  </button>
                  <button
                    onClick={() => {
                      setShowSubmitModal(false);
                      showToast('Шешім қабылданды! AI валидациясы басталды 🚀');
                    }}
                    className="flex-1 py-2 rounded-xl bg-[#0037b0] text-white font-bold text-xs"
                  >
                    Жіберу
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal 2: Post New Task (Employer) */}
          {showNewTaskModal && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-4 w-full shadow-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-[#131b2e]">Жаңа бизнес-тапсырма</h4>
                  <button
                    onClick={() => setShowNewTaskModal(false)}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    ✕
                  </button>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-700 block mb-1">Тапсырма атауы</label>
                  <input
                    type="text"
                    placeholder="Мысалы: Сауда нүктелерінің өсімін болжау"
                    className="w-full bg-[#f2f3ff] rounded-xl px-3 py-2 text-xs text-[#131b2e] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-700 block mb-1">Сыйақы қоры (₸)</label>
                    <input
                      type="text"
                      defaultValue="750 000"
                      className="w-full bg-[#f2f3ff] rounded-xl px-3 py-2 text-xs font-bold text-[#0037b0] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-700 block mb-1">Мерзімі</label>
                    <input
                      type="text"
                      defaultValue="3 апта"
                      className="w-full bg-[#f2f3ff] rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowNewTaskModal(false);
                    showToast('Жаңа тапсырма жарияланды және эскроу бекітілді! 🏢');
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#0037b0] text-white font-bold text-xs shadow-md"
                >
                  Жариялау (AI Скрининг қосу)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
