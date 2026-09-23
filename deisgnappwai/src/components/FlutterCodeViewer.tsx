import React, { useState } from 'react';
import { FLUTTER_PROJECT_FILES, FlutterFile } from '../flutter_code_data';
import { Copy, Check, Download, Folder, FileCode, Search, Terminal, Sparkles, Layers, BookOpen } from 'lucide-react';

interface FlutterCodeViewerProps {
  onSelectScreenInSimulator?: (screenId: 'feed' | 'detail' | 'apply' | 'auth') => void;
}

export const FlutterCodeViewer: React.FC<FlutterCodeViewerProps> = ({ onSelectScreenInSimulator }) => {
  const [selectedFile, setSelectedFile] = useState<FlutterFile>(FLUTTER_PROJECT_FILES[1]); // main.dart default
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyAll = () => {
    const combined = FLUTTER_PROJECT_FILES.map(
      (f) => `// ==========================================\n// FILE: ${f.path}\n// ${f.description}\n// ==========================================\n\n${f.code}\n\n`
    ).join('\n');
    navigator.clipboard.writeText(combined);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2200);
  };

  const filteredFiles = FLUTTER_PROJECT_FILES.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Header Bar */}
      <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800/80 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold font-mono text-sm">
            FL
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>Flutter (Dart) жобасының толық коды</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Dart 3.x • Material 3
                </span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Дизайндағы барлық 4 экран, виджеттер және AppTheme конфигурациясы
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all active:scale-95"
            title="Барлық .dart файлдарды біріктіріп көшіріп алу"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Layers className="w-3.5 h-3.5 text-blue-400" />}
            <span>{copiedAll ? 'Барлығы көшірілді!' : 'Барлық файлдарды көшіру'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Көшірілді!' : 'Осы файлды көшіру'}</span>
          </button>
        </div>
      </div>

      {/* Main Split: File Explorer & Code Body */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
        {/* Left Sidebar: File Tree */}
        <div className="w-64 bg-slate-950/60 border-r border-slate-800/80 flex flex-col shrink-0">
          <div className="p-2.5 border-b border-slate-800/80">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Файлдарды іздеу..."
                className="w-full bg-slate-900 text-slate-200 text-xs rounded-lg pl-8 pr-2.5 py-1.5 border border-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Folder className="w-3.5 h-3.5 text-blue-400" />
              <span>work_ai / lib</span>
            </div>

            {filteredFiles.map((file) => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => {
                    setSelectedFile(file);
                    if (onSelectScreenInSimulator) {
                      if (file.name.includes('home_feed')) onSelectScreenInSimulator('feed');
                      else if (file.name.includes('vacancy_detail')) onSelectScreenInSimulator('detail');
                      else if (file.name.includes('application_form')) onSelectScreenInSimulator('apply');
                      else if (file.name.includes('auth')) onSelectScreenInSimulator('auth');
                    }
                  }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-start gap-2 transition-all ${
                    isSelected
                      ? 'bg-blue-600/20 text-blue-300 font-semibold border border-blue-500/30'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <FileCode className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-slate-200 font-mono text-[11.5px]">{file.name}</div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">{file.path}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Terminal Guide */}
          <div className="p-3 bg-slate-900/90 border-t border-slate-800 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 font-semibold text-slate-300 mb-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Жобаны іске қосу:</span>
            </div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800 font-mono text-[10px] text-emerald-300 space-y-0.5 select-all">
              <div>flutter create work_ai</div>
              <div>cd work_ai</div>
              <div>flutter pub get</div>
              <div>flutter run</div>
            </div>
          </div>
        </div>

        {/* Right Code Display */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
          {/* File Header Bar */}
          <div className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2 truncate">
              <span className="font-mono text-slate-300 font-semibold">{selectedFile.path}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 text-[11px] truncate">{selectedFile.description}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono shrink-0">
              {selectedFile.code.split('\n').length} жол
            </span>
          </div>

          {/* Code Body with line numbers */}
          <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed selection:bg-blue-600/40 selection:text-white">
            <pre className="text-slate-200">
              <code>{selectedFile.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
