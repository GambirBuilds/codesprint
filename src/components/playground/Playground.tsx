import React, { useState, useEffect, useRef } from 'react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Play,
  RotateCcw,
  Copy,
  Check,
  Download,
  Code2,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface Template {
  id: string;
  title: string;
  html: string;
  css: string;
  description: string;
}

const templates: Template[] = [
  {
    id: 'hero-banner',
    title: 'Modern Hero Banner',
    description: 'Clean responsive hero section with flexbox alignment and fluid typography',
    html: `<header class="hero">
  <span class="badge">Day 6 · Flexbox</span>
  <h1>Master Modern Web Development</h1>
  <p>Learn HTML5 semantics and modern CSS3 layout engines with real hands-on practice.</p>
  <div class="actions">
    <button class="btn btn-primary">Start Learning</button>
    <button class="btn btn-secondary">View Roadmap</button>
  </div>
</header>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #080C12;
  color: #F5F7FA;
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 1.5rem;
}
.hero {
  max-width: 600px;
  text-align: center;
  background: #151F2C;
  border: 1px solid #223044;
  border-radius: 16px;
  padding: 2.5rem 2rem;
}
.badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  color: #35F2C0;
  background: rgba(53, 242, 192, 0.1);
  border: 1px solid rgba(53, 242, 192, 0.3);
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  margin-bottom: 1rem;
}
h1 {
  font-size: 1.85rem;
  line-height: 1.25;
  margin-bottom: 0.75rem;
}
p {
  color: #A3ADBA;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
.btn {
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 180ms ease;
}
.btn-primary {
  background: #35F2C0;
  color: #080C12;
  border: none;
}
.btn-primary:hover { background: #2dd4a8; }
.btn-secondary {
  background: transparent;
  color: #F5F7FA;
  border: 1px solid #223044;
}
.btn-secondary:hover { background: #223044; }`,
  },
  {
    id: 'bento-grid',
    title: 'CSS Grid Bento Cards',
    description: 'Auto-fit responsive multi-column card layout',
    html: `<div class="grid-container">
  <div class="card card-wide">
    <h3>01. Semantic Architecture</h3>
    <p>Build accessible foundations with landmark elements and ARIA roles.</p>
  </div>
  <div class="card">
    <h3>02. Box Model</h3>
    <p>Predict layout geometry with border-box.</p>
  </div>
  <div class="card">
    <h3>03. Responsive Fluidity</h3>
    <p>Adapt to every screen without layout shift.</p>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, sans-serif;
  background: #080C12;
  color: #F5F7FA;
  padding: 2rem;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
  max-width: 800px;
  margin: 0 auto;
}
.card {
  background: #151F2C;
  border: 1px solid #223044;
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 180ms ease, border-color 180ms ease;
}
.card:hover {
  transform: translateY(-4px);
  border-color: #35F2C0;
}
.card h3 {
  color: #78A9FF;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
.card p {
  color: #CBD5E1;
  font-size: 0.85rem;
  line-height: 1.5;
}
@media (min-width: 640px) {
  .card-wide { grid-column: span 2; }
}`,
  },
];

export const Playground: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('hero-banner');
  const [htmlCode, setHtmlCode] = useState<string>(templates[0].html);
  const [cssCode, setCssCode] = useState<string>(templates[0].css);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const updatePreview = () => {
    if (!iframeRef.current) return;
    const combinedDoc = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          ${cssCode}
        </style>
      </head>
      <body>
        ${htmlCode}
      </body>
      </html>
    `;
    iframeRef.current.srcdoc = combinedDoc;
  };

  useEffect(() => {
    updatePreview();
  }, [htmlCode, cssCode]);

  const handleTemplateSelect = (tmplId: string) => {
    const tmpl = templates.find((t) => t.id === tmplId);
    if (!tmpl) return;
    setSelectedTemplate(tmplId);
    setHtmlCode(tmpl.html);
    setCssCode(tmpl.css);
  };

  const handleReset = () => {
    const tmpl = templates.find((t) => t.id === selectedTemplate);
    if (tmpl) {
      setHtmlCode(tmpl.html);
      setCssCode(tmpl.css);
    }
  };

  const handleCopy = () => {
    const fullCode = `<!-- HTML -->\n${htmlCode}\n\n/* CSS */\n${cssCode}`;
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob(
      [
        `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${cssCode}</style></head><body>${htmlCode}</body></html>`,
      ],
      { type: 'text/html' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'codesprint-experiment.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const viewportWidthClass = {
    desktop: 'w-full',
    tablet: 'max-w-[768px]',
    mobile: 'max-w-[375px]',
  }[viewportMode];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fadeIn">
      {/* Top Header & Preset Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#223044] pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <Code2 className="w-6 h-6 text-[#35F2C0]" />
            <span>Interactive Code Playground</span>
          </h1>
          <p className="text-xs text-[#A3ADBA]">
            Real-time live HTML and CSS sandbox rendered inside an isolated secure frame
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Template presets */}
          <select
            value={selectedTemplate}
            onChange={(e) => handleTemplateSelect(e.target.value)}
            className="px-3 py-1.5 bg-[#151F2C] border border-[#223044] rounded-lg text-xs text-[#F5F7FA] outline-none"
          >
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                Template: {t.title}
              </option>
            ))}
          </select>

          {/* Viewport switchers */}
          <div className="flex items-center gap-1 p-1 bg-[#101722] border border-[#223044] rounded-lg text-xs">
            <button
              onClick={() => setViewportMode('desktop')}
              title="Desktop 100%"
              className={`p-1.5 rounded transition-colors ${
                viewportMode === 'desktop'
                  ? 'bg-[#151F2C] text-[#35F2C0]'
                  : 'text-[#A3ADBA] hover:text-[#F5F7FA]'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewportMode('tablet')}
              title="Tablet 768px"
              className={`p-1.5 rounded transition-colors ${
                viewportMode === 'tablet'
                  ? 'bg-[#151F2C] text-[#35F2C0]'
                  : 'text-[#A3ADBA] hover:text-[#F5F7FA]'
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              title="Mobile 375px"
              className={`p-1.5 rounded transition-colors ${
                viewportMode === 'mobile'
                  ? 'bg-[#151F2C] text-[#35F2C0]'
                  : 'text-[#A3ADBA] hover:text-[#F5F7FA]'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          {/* Reset button */}
          <button
            onClick={handleReset}
            title="Reset code to original starter"
            className="p-2 bg-[#151F2C] hover:bg-[#1A2737] text-[#A3ADBA] hover:text-[#F5F7FA] border border-[#223044] rounded-lg text-xs transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#151F2C] hover:bg-[#1A2737] text-[#A3ADBA] hover:text-[#F5F7FA] border border-[#223044] rounded-lg text-xs transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-[#35F2C0]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Download button */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#35F2C0] hover:bg-[#2dd4a8] text-[#080C12] rounded-lg text-xs font-bold transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export HTML</span>
          </button>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch min-h-[560px]">
        {/* Left: Code Editors */}
        <div className="flex flex-col gap-4">
          {/* HTML Editor */}
          <div className="flex-1 bg-[#101722] border border-[#223044] rounded-xl overflow-hidden flex flex-col">
            <div className="px-4 py-2 bg-[#151F2C] border-b border-[#223044] flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-[#35F2C0]">HTML5 Markup</span>
              <span className="text-[11px] text-[#A3ADBA]">Live input</span>
            </div>
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              spellCheck={false}
              className="flex-1 w-full p-4 bg-[#080C12] text-[#F5F7FA] font-mono text-xs sm:text-sm leading-relaxed outline-none resize-none border-none"
              placeholder="<!-- Write HTML here -->"
            />
          </div>

          {/* CSS Editor */}
          <div className="flex-1 bg-[#101722] border border-[#223044] rounded-xl overflow-hidden flex flex-col">
            <div className="px-4 py-2 bg-[#151F2C] border-b border-[#223044] flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-[#78A9FF]">CSS3 Stylesheet</span>
              <span className="text-[11px] text-[#A3ADBA]">Live input</span>
            </div>
            <textarea
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
              spellCheck={false}
              className="flex-1 w-full p-4 bg-[#080C12] text-[#F5F7FA] font-mono text-xs sm:text-sm leading-relaxed outline-none resize-none border-none"
              placeholder="/* Write CSS here */"
            />
          </div>
        </div>

        {/* Right: Live Sandboxed Preview */}
        <div className="bg-[#101722] border border-[#223044] rounded-xl overflow-hidden flex flex-col">
          <div className="px-4 py-2 bg-[#151F2C] border-b border-[#223044] flex items-center justify-between text-xs">
            <span className="font-mono font-bold text-[#F5F7FA] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#35F2C0]" /> Live Viewport ({viewportMode})
            </span>
            <span className="text-[11px] font-mono text-[#A3ADBA]">Isolated Sandbox IFrame</span>
          </div>

          <div className="flex-1 p-4 bg-[#080C12]/80 flex items-center justify-center overflow-auto">
            <div
              className={`h-full min-h-[480px] bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${viewportWidthClass}`}
            >
              <iframe
                ref={iframeRef}
                title="CodeSprint Live Sandbox Preview"
                sandbox="allow-scripts"
                className="w-full h-full min-h-[480px] border-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
