import React, { useState } from 'react';
import {
  X,
  Github,
  Download,
  Copy,
  Check,
  Terminal,
  FolderTree,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

interface MigrationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MigrationGuideModal({ isOpen, onClose }: MigrationGuideModalProps) {
  const [activeTab, setActiveTab] = useState<'github' | 'zip' | 'manual'>('github');
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyCommand = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs">
      <div
        id="migration-guide-modal"
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-zinc-900 text-white rounded-lg">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-900">
                Migration Guide: Google AI Studio to VS Code
              </h2>
              <p className="text-xs text-zinc-500">
                Choose your preferred method to export and run this project locally
              </p>
            </div>
          </div>
          <button
            id="close-migration-modal-btn"
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Method Selector Tabs */}
        <div className="px-6 pt-3 bg-white border-b border-zinc-100 flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('github')}
            className={`pb-3 px-3 text-xs font-medium border-b-2 inline-flex items-center gap-1.5 transition-colors ${
              activeTab === 'github'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-700'
            }`}
          >
            <Github className="w-3.5 h-3.5" />
            <span>Method 1: GitHub Repo (Best)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('zip')}
            className={`pb-3 px-3 text-xs font-medium border-b-2 inline-flex items-center gap-1.5 transition-colors ${
              activeTab === 'zip'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-700'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Method 2: Manual ZIP Export</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('manual')}
            className={`pb-3 px-3 text-xs font-medium border-b-2 inline-flex items-center gap-1.5 transition-colors ${
              activeTab === 'manual'
                ? 'border-zinc-900 text-zinc-900'
                : 'border-transparent text-zinc-500 hover:text-zinc-700'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>Method 3: Manual Copy-Paste</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-zinc-700">
          {activeTab === 'github' && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900 leading-relaxed">
                <strong>Why GitHub:</strong> Directly connects to your repository for continuous version control, automatic commits, and seamless collaboration.
              </div>

              <ol className="space-y-4 list-decimal list-inside text-xs leading-relaxed">
                <li className="font-semibold text-zinc-900">
                  <span>Export to GitHub from Google AI Studio</span>
                  <div className="font-normal text-zinc-600 mt-1 pl-4 space-y-1">
                    <p>1. In Google AI Studio, click the <strong>Settings</strong> icon (or three-dot project menu in the top right).</p>
                    <p>2. Select <strong>Export to GitHub</strong> (or <strong>Connect GitHub</strong>).</p>
                    <p>3. Authorize your GitHub account and choose to create a new repository (e.g. <code>text-composables-list</code>).</p>
                  </div>
                </li>

                <li className="font-semibold text-zinc-900">
                  <span>Clone the Repository to your Local Machine</span>
                  <div className="font-normal text-zinc-600 mt-1 pl-4 space-y-2">
                    <p>Open your local terminal or command prompt, then run:</p>
                    <div className="relative group bg-zinc-900 text-zinc-100 p-2.5 rounded-lg font-mono text-xs flex items-center justify-between">
                      <code>git clone https://github.com/YOUR_USERNAME/text-composables-list.git</code>
                      <button
                        type="button"
                        onClick={() =>
                          copyCommand(
                            'git clone https://github.com/YOUR_USERNAME/text-composables-list.git',
                            'git-clone'
                          )
                        }
                        className="text-zinc-400 hover:text-white p-1"
                      >
                        {copiedIndex === 'git-clone' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </li>

                <li className="font-semibold text-zinc-900">
                  <span>Open in VS Code and Install Dependencies</span>
                  <div className="font-normal text-zinc-600 mt-1 pl-4 space-y-2">
                    <div className="relative group bg-zinc-900 text-zinc-100 p-2.5 rounded-lg font-mono text-xs flex items-center justify-between">
                      <code>cd text-composables-list && code .</code>
                      <button
                        type="button"
                        onClick={() => copyCommand('cd text-composables-list && code .', 'code-open')}
                        className="text-zinc-400 hover:text-white p-1"
                      >
                        {copiedIndex === 'code-open' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </li>

                <li className="font-semibold text-zinc-900">
                  <span>Run Development Server</span>
                  <div className="font-normal text-zinc-600 mt-1 pl-4 space-y-2">
                    <div className="relative group bg-zinc-900 text-zinc-100 p-2.5 rounded-lg font-mono text-xs flex items-center justify-between">
                      <code>npm install && npm run dev</code>
                      <button
                        type="button"
                        onClick={() => copyCommand('npm install && npm run dev', 'npm-dev')}
                        className="text-zinc-400 hover:text-white p-1"
                      >
                        {copiedIndex === 'npm-dev' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <p>Open <code>http://localhost:3000</code> in your browser to view your live app.</p>
                  </div>
                </li>
              </ol>
            </div>
          )}

          {activeTab === 'zip' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed">
                <strong>Why ZIP Export:</strong> Fastest offline method with zero git configuration or GitHub account required.
              </div>

              <ol className="space-y-4 list-decimal list-inside text-xs leading-relaxed">
                <li className="font-semibold text-zinc-900">
                  <span>Download the ZIP File</span>
                  <div className="font-normal text-zinc-600 mt-1 pl-4 space-y-1">
                    <p>1. In Google AI Studio, locate the <strong>Settings</strong> or three-dot menu.</p>
                    <p>2. Click <strong>Export project as ZIP</strong> (or <strong>Download ZIP</strong>).</p>
                    <p>3. Save the <code>.zip</code> file to your computer.</p>
                  </div>
                </li>

                <li className="font-semibold text-zinc-900">
                  <span>Extract the Archive</span>
                  <div className="font-normal text-zinc-600 mt-1 pl-4">
                    <p>Right-click the downloaded zip file and extract it into your projects directory.</p>
                  </div>
                </li>

                <li className="font-semibold text-zinc-900">
                  <span>Open the Folder in VS Code</span>
                  <div className="font-normal text-zinc-600 mt-1 pl-4 space-y-1">
                    <p>Launch Visual Studio Code, go to <strong>File &gt; Open Folder...</strong>, and select the extracted directory.</p>
                  </div>
                </li>

                <li className="font-semibold text-zinc-900">
                  <span>Install and Start</span>
                  <div className="font-normal text-zinc-600 mt-1 pl-4 space-y-2">
                    <p>Press <kbd className="bg-zinc-100 px-1 py-0.5 border rounded">Ctrl + `</kbd> (or <kbd className="bg-zinc-100 px-1 py-0.5 border rounded">Cmd + `</kbd> on macOS) to open the terminal in VS Code, then run:</p>
                    <div className="relative group bg-zinc-900 text-zinc-100 p-2.5 rounded-lg font-mono text-xs flex items-center justify-between">
                      <code>npm install && npm run dev</code>
                      <button
                        type="button"
                        onClick={() => copyCommand('npm install && npm run dev', 'zip-npm')}
                        className="text-zinc-400 hover:text-white p-1"
                      >
                        {copiedIndex === 'zip-npm' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          )}

          {activeTab === 'manual' && (
            <div className="space-y-4">
              <div className="p-3 bg-zinc-100 border border-zinc-200 rounded-lg text-xs text-zinc-800 leading-relaxed">
                <strong>Manual Copy-Paste:</strong> If you are creating a project from scratch in VS Code, here is the exact file blueprint you need to copy.
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-zinc-900">Essential Files Checklist:</h4>
                <div className="bg-zinc-900 text-zinc-200 p-3 rounded-lg font-mono text-xs leading-relaxed space-y-1">
                  <div>📁 <strong>my-app/</strong></div>
                  <div className="pl-4">├── 📄 package.json <span className="text-zinc-500">(contains dependencies & scripts)</span></div>
                  <div className="pl-4">├── 📄 index.html <span className="text-zinc-500">(entry HTML with #root)</span></div>
                  <div className="pl-4">├── 📄 vite.config.ts <span className="text-zinc-500">(Vite + Tailwind config)</span></div>
                  <div className="pl-4">├── 📄 tsconfig.json <span className="text-zinc-500">(TypeScript rules)</span></div>
                  <div className="pl-4">└── 📁 <strong>src/</strong></div>
                  <div className="pl-8">├── 📄 main.tsx <span className="text-zinc-500">(React mount entry)</span></div>
                  <div className="pl-8">├── 📄 index.css <span className="text-zinc-500">(@import "tailwindcss";)</span></div>
                  <div className="pl-8">├── 📄 types.ts <span className="text-zinc-500">(interfaces)</span></div>
                  <div className="pl-8">├── 📄 data.ts <span className="text-zinc-500">(sample data)</span></div>
                  <div className="pl-8">├── 📄 App.tsx <span className="text-zinc-500">(main component)</span></div>
                  <div className="pl-8">└── 📁 <strong>components/</strong></div>
                  <div className="pl-12">├── 📄 TextComposables.tsx</div>
                  <div className="pl-12">├── 📄 ScrollableList.tsx</div>
                  <div className="pl-12">├── 📄 AddComposable.tsx</div>
                  <div className="pl-12">└── 📄 MigrationGuideModal.tsx</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-semibold text-zinc-900">Quick Start via Terminal:</h4>
                <div className="relative group bg-zinc-900 text-zinc-100 p-2.5 rounded-lg font-mono text-xs flex items-center justify-between">
                  <code>npm create vite@latest my-app -- --template react-ts</code>
                  <button
                    type="button"
                    onClick={() =>
                      copyCommand('npm create vite@latest my-app -- --template react-ts', 'create-vite')
                    }
                    className="text-zinc-400 hover:text-white p-1"
                  >
                    {copiedIndex === 'create-vite' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-zinc-500">
                  Then paste the <code>src</code> files and run <code>npm install && npm run dev</code>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-zinc-50 border-t border-zinc-200 flex items-center justify-between">
          <span className="text-xs text-zinc-500">
            Node.js 18+ and npm are required on your computer
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
