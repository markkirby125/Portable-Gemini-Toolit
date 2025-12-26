
import React, { useState } from 'react';
import { ReportType } from './types';
import { designDocContent } from './data/designDoc';
import { gapAnalysisReport } from './data/gapAnalysisReport';
import { crashLogContent } from './data/crashLog';
import { v3ScriptContent } from './data/v3Script';
import { geminiNetScript, geminiEventsScript } from './data/aiScripts';
import { ReportViewer } from './components/ReportViewer';
import { GapAnalysisViewer } from './components/GapAnalysisViewer';

function App() {
  const [activeTab, setActiveTab] = useState<ReportType>(ReportType.GAP_ANALYSIS);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopyStatus('copied');
    setTimeout(() => setCopyStatus('idle'), 2000);
  };

  const handleExport = () => {
    const escapeHtml = (unsafe: string) => {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    };

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'critical': return 'bg-red-900/30 text-red-200 border-red-800';
        case 'missing': return 'bg-orange-900/30 text-orange-200 border-orange-800';
        case 'partial': return 'bg-yellow-900/30 text-yellow-200 border-yellow-800';
        case 'implemented': return 'bg-green-900/30 text-green-200 border-green-800';
        default: return 'bg-gray-800 text-gray-300';
      }
    };

    const gapAnalysisHtml = gapAnalysisReport.map(item => `
        <div class="bg-gray-800 rounded-lg border border-gray-700 shadow-sm overflow-hidden mb-4">
            <div class="p-5 border-b border-gray-700/50 bg-gray-900/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${getStatusColor(item.status)}">
                        ${item.status}
                    </span>
                    <h3 class="font-semibold text-gray-100">${escapeHtml(item.title)}</h3>
                </div>
                <span class="text-xs font-mono text-gray-500">Ref: ${item.id}</span>
            </div>
            <div class="p-5">
                <p class="text-gray-300 leading-relaxed text-sm">
                    ${escapeHtml(item.details)}
                </p>
            </div>
        </div>
    `).join('');

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gemini CLI Audit Export</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
      body { font-family: 'Inter', sans-serif; }
      code, pre { font-family: 'JetBrains Mono', monospace; }
      ::-webkit-scrollbar { width: 8px; height: 8px; }
      ::-webkit-scrollbar-track { background: #111827; }
      ::-webkit-scrollbar-thumb { background: #374151; border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: #4B5563; }
    </style>
</head>
<body class="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
    <header class="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between shrink-0">
        <div class="flex items-center gap-3">
            <div class="h-8 w-8 bg-indigo-500 rounded flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            </div>
            <div>
                <h1 class="text-xl font-bold text-white tracking-tight">Gemini CLI Audit</h1>
                <p class="text-xs text-gray-400">Offline Export</p>
            </div>
        </div>
        <div class="flex gap-2 bg-gray-800 p-1 rounded-lg border border-gray-700">
             <button onclick="switchTab('design')" class="tab-btn px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50" data-tab="design">Design Doc</button>
             <button onclick="switchTab('gap')" class="tab-btn px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 bg-gray-700 text-white shadow-sm ring-1 ring-white/5" data-tab="gap">Compliance</button>
             <button onclick="switchTab('script')" class="tab-btn px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50" data-tab="script">Script Code</button>
             <button onclick="switchTab('ai')" class="tab-btn px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50" data-tab="ai">AI Scripts</button>
             <button onclick="switchTab('logs')" class="tab-btn px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 text-gray-400 hover:text-gray-200 hover:bg-gray-700/50" data-tab="logs">Crash Logs</button>
        </div>
    </header>

    <main class="flex-1 overflow-hidden relative">
        <div class="h-full overflow-y-auto px-6 py-8">
            <div class="max-w-5xl mx-auto h-full">
                
                <div id="design" class="tab-content hidden h-full">
                    <div class="mb-4">
                        <h2 class="text-lg font-semibold text-white">Reference Specification</h2>
                    </div>
                    <div class="max-w-none p-6 bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-y-auto">
                        <pre class="whitespace-pre-wrap font-mono text-sm text-gray-300 leading-relaxed">${escapeHtml(designDocContent)}</pre>
                    </div>
                </div>

                <div id="gap" class="tab-content h-full">
                    <div class="mb-6">
                        <h2 class="text-lg font-semibold text-white">Compliance Report</h2>
                    </div>
                    <div class="space-y-4">
                        ${gapAnalysisHtml}
                    </div>
                </div>

                <div id="script" class="tab-content hidden h-full">
                    <div class="mb-4">
                        <h2 class="text-lg font-semibold text-emerald-400">Proposed Solution</h2>
                    </div>
                    <div class="max-w-none p-6 bg-gray-800 rounded-lg shadow-sm border border-emerald-900/50 overflow-y-auto">
                        <pre class="whitespace-pre-wrap font-mono text-sm text-gray-300 leading-relaxed">${escapeHtml(v3ScriptContent)}</pre>
                    </div>
                </div>

                <div id="ai" class="tab-content hidden h-full">
                     <div class="flex flex-col gap-6">
                        <div>
                            <div class="mb-2"><h2 class="text-lg font-semibold text-purple-400">gemini_net.cjs</h2></div>
                            <div class="max-w-none p-6 bg-gray-800 rounded-lg shadow-sm border border-purple-900/50 overflow-y-auto">
                                <pre class="whitespace-pre-wrap font-mono text-sm text-gray-300 leading-relaxed">${escapeHtml(geminiNetScript)}</pre>
                            </div>
                        </div>
                        <div>
                            <div class="mb-2"><h2 class="text-lg font-semibold text-purple-400">gemini_events.cjs</h2></div>
                             <div class="max-w-none p-6 bg-gray-800 rounded-lg shadow-sm border border-purple-900/50 overflow-y-auto">
                                <pre class="whitespace-pre-wrap font-mono text-sm text-gray-300 leading-relaxed">${escapeHtml(geminiEventsScript)}</pre>
                            </div>
                        </div>
                     </div>
                </div>

                <div id="logs" class="tab-content hidden h-full">
                    <div class="mb-4">
                        <h2 class="text-lg font-semibold text-white">System Crash Logs</h2>
                    </div>
                    <div class="max-w-none p-6 bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-y-auto">
                        <pre class="whitespace-pre-wrap font-mono text-sm text-gray-300 leading-relaxed">${escapeHtml(crashLogContent)}</pre>
                    </div>
                </div>

            </div>
        </div>
    </main>

    <script>
        function switchTab(id) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
            document.getElementById(id).classList.remove('hidden');
            
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('bg-gray-700', 'text-white', 'shadow-sm', 'ring-1', 'ring-white/5');
                btn.classList.add('text-gray-400', 'hover:text-gray-200', 'hover:bg-gray-700/50');
            });
            
            const activeBtn = document.querySelector(\`[data-tab="\${id}"]\`);
            activeBtn.classList.remove('text-gray-400', 'hover:text-gray-200', 'hover:bg-gray-700/50');
            activeBtn.classList.add('bg-gray-700', 'text-white', 'shadow-sm', 'ring-1', 'ring-white/5');
        }
    </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gemini_audit_export_${new Date().toISOString().slice(0,10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-indigo-500 rounded flex items-center justify-center shadow-lg shadow-indigo-500/20">
             <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
             </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Gemini CLI Audit</h1>
            <p className="text-xs text-gray-400">Compare implementation vs. specification</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex gap-2 bg-gray-800 p-1 rounded-lg border border-gray-700">
            <button
              onClick={() => setActiveTab(ReportType.DESIGN_DOC)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === ReportType.DESIGN_DOC
                  ? 'bg-gray-700 text-indigo-400 shadow-sm ring-1 ring-white/5'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              Design Doc
            </button>
            <button
              onClick={() => setActiveTab(ReportType.GAP_ANALYSIS)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === ReportType.GAP_ANALYSIS
                  ? 'bg-gray-700 text-emerald-400 shadow-sm ring-1 ring-white/5'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              Compliance Report
            </button>
             <button
              onClick={() => setActiveTab(ReportType.SCRIPT_SOURCE)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === ReportType.SCRIPT_SOURCE
                  ? 'bg-gray-700 text-emerald-400 shadow-sm ring-1 ring-white/5'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              Script Code
            </button>
            <button
              onClick={() => setActiveTab(ReportType.AI_SCRIPTS)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === ReportType.AI_SCRIPTS
                  ? 'bg-gray-700 text-purple-400 shadow-sm ring-1 ring-white/5'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              AI Scripts (.cjs)
            </button>
            <button
              onClick={() => setActiveTab(ReportType.CRASH_LOGS)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === ReportType.CRASH_LOGS
                  ? 'bg-gray-700 text-indigo-400 shadow-sm ring-1 ring-white/5'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
              }`}
            >
              Crash Logs
            </button>
          </div>

          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-sm font-medium transition-colors shadow-sm ring-1 ring-indigo-500/50"
            title="Export full report to HTML file"
          >
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
             </svg>
             Export
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        <div className="h-full overflow-y-auto px-6 py-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto h-full">
            {activeTab === ReportType.DESIGN_DOC && (
              <div className="h-full flex flex-col">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-white">Reference Specification</h2>
                  <p className="text-sm text-gray-400">Original requirement documentation (v3.3.0)</p>
                </div>
                <ReportViewer content={designDocContent} />
              </div>
            )}
            
            {activeTab === ReportType.GAP_ANALYSIS && (
              <div className="h-full flex flex-col">
                 <div className="mb-6">
                  <h2 className="text-lg font-semibold text-white">Compliance Report (v3.3.1)</h2>
                  <p className="text-sm text-gray-400">Verification of script features against Design Doc v3.3.0</p>
                </div>
                <GapAnalysisViewer report={gapAnalysisReport} />
              </div>
            )}

            {activeTab === ReportType.SCRIPT_SOURCE && (
              <div className="h-full flex flex-col">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-emerald-400">Proposed Solution</h2>
                    <p className="text-sm text-gray-400">Updated batch script implementing all requirements</p>
                  </div>
                  <button
                    onClick={() => handleCopy(v3ScriptContent)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-900/30 hover:bg-emerald-900/50 text-emerald-400 border border-emerald-800 rounded-lg transition-all text-sm font-medium"
                  >
                    {copyStatus === 'copied' ? (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy Code
                      </>
                    )}
                  </button>
                </div>
                <div className="border border-emerald-900/50 rounded-lg overflow-hidden h-full">
                   <ReportViewer content={v3ScriptContent} />
                </div>
              </div>
            )}

             {activeTab === ReportType.AI_SCRIPTS && (
              <div className="h-full flex flex-col gap-6">
                <div>
                   <div className="mb-2">
                    <h2 className="text-lg font-semibold text-purple-400">gemini_net.cjs</h2>
                    <p className="text-sm text-gray-400">Save this file to: <code>\scripts\gemini_net.cjs</code></p>
                  </div>
                  <div className="border border-purple-900/50 rounded-lg overflow-hidden h-64">
                    <ReportViewer content={geminiNetScript} />
                  </div>
                </div>

                <div>
                   <div className="mb-2">
                    <h2 className="text-lg font-semibold text-purple-400">gemini_events.cjs</h2>
                    <p className="text-sm text-gray-400">Save this file to: <code>\scripts\gemini_events.cjs</code></p>
                  </div>
                  <div className="border border-purple-900/50 rounded-lg overflow-hidden h-64">
                    <ReportViewer content={geminiEventsScript} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === ReportType.CRASH_LOGS && (
              <div className="h-full flex flex-col">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-white">System Crash Logs</h2>
                  <p className="text-sm text-gray-400">Raw output from failed startup attempts (v3.3.14)</p>
                </div>
                <ReportViewer content={crashLogContent} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
