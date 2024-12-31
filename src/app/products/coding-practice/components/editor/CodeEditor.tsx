'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Editor, { useMonaco } from '@monaco-editor/react';
import { Play, RefreshCw, Save, Settings, AlertCircle, CheckCircle, Code2, FileCode, Lightbulb, TestTube2, Send } from 'lucide-react';
import { codeValidationService } from '../../services/codeValidationService';
import { getLanguageConfig, getSnippets, getTemplateForProblemType } from '../../services/languageService';

interface CodeEditorProps {
  code: string;
  language: string;
  problemType?: string;
  onChange: (value: string) => void;
  onRun: () => void;
  onTest: () => void;
  onSubmit: () => void;
}

const languages = [
  { id: 'python', name: 'Python', icon: '🐍' },
  { id: 'javascript', name: 'JavaScript', icon: '📜' },
  { id: 'typescript', name: 'TypeScript', icon: '💪' },
  { id: 'java', name: 'Java', icon: '☕' },
  { id: 'cpp', name: 'C++', icon: '⚡' },
];

export function CodeEditor({
  code,
  language,
  problemType = 'default',
  onChange,
  onRun,
  onTest,
  onSubmit,
}: CodeEditorProps) {
  const monaco = useMonaco();
  const [theme, setTheme] = React.useState('vs-dark');
  const [fontSize, setFontSize] = React.useState(14);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isSnippetsOpen, setIsSnippetsOpen] = React.useState(false);
  const [validationResult, setValidationResult] = React.useState<{
    isValid: boolean;
    errors: { line: number; message: string; severity: 'error' | 'warning' }[];
  }>({ isValid: true, errors: [] });
  const [selectedLanguage, setSelectedLanguage] = React.useState(language);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = React.useState(false);

  const editorRef = React.useRef(null);
  const languageConfig = getLanguageConfig(language);
  const snippets = getSnippets(language);

  // Configure Monaco editor with language-specific features
  React.useEffect(() => {
    if (monaco) {
      // Register language snippets
      const snippetCompletions = Object.entries(snippets).map(([key, snippet]) => ({
        label: snippet.prefix,
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: snippet.description,
        insertText: snippet.body.join('\n'),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: undefined
      }));

      // Register language-specific completions
      monaco.languages.registerCompletionItemProvider(language, {
        provideCompletionItems: (model, position) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn
          };

          return {
            suggestions: snippetCompletions.map(item => ({
              ...item,
              range
            }))
          };
        }
      });

      // Add custom themes
      monaco.editor.defineTheme('monokai', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '88846f', fontStyle: 'italic' },
          { token: 'keyword', foreground: 'f92672' },
          { token: 'string', foreground: 'e6db74' },
          { token: 'number', foreground: 'ae81ff' }
        ],
        colors: {
          'editor.background': '#272822',
          'editor.foreground': '#f8f8f2',
          'editorLineNumber.foreground': '#90908a',
          'editor.selectionBackground': '#49483e',
          'editor.lineHighlightBackground': '#3e3d32'
        }
      });
    }
  }, [monaco, language, snippets]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Space, () => {
      editor.trigger('', 'editor.action.triggerSuggest', {});
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      onSubmit();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRun();
    });
  };

  const validateCode = React.useCallback((newCode: string) => {
    const result = codeValidationService.validateCode(newCode, language);
    setValidationResult(result);

    if (editorRef.current && monaco) {
      const errorDecorations = result.errors.map(error => ({
        range: new monaco.Range(error.line, 1, error.line, 1),
        options: {
          isWholeLine: true,
          className: error.severity === 'error' ? 'errorDecoration' : 'warningDecoration',
          glyphMarginClassName: error.severity === 'error' ? 'errorGlyph' : 'warningGlyph',
          hoverMessage: { value: error.message }
        }
      }));

      editorRef.current.deltaDecorations([], errorDecorations);
    }
  }, [language, monaco]);

  const handleCodeChange = (newCode: string | undefined) => {
    const updatedCode = newCode || '';
    onChange(updatedCode);
    validateCode(updatedCode);
  };

  const insertTemplate = (type: string) => {
    const template = getTemplateForProblemType(language, type);
    onChange(template);
    validateCode(template);
  };

  const insertSnippet = (snippet: { body: string[] }) => {
    if (editorRef.current) {
      const position = editorRef.current.getPosition();
      const snippetText = snippet.body.join('\n');
      editorRef.current.executeEdits('', [{
        range: {
          startLineNumber: position.lineNumber,
          startColumn: position.column,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        },
        text: snippetText
      }]);
    }
  };

  const handleLanguageChange = (langId: string) => {
    setSelectedLanguage(langId);
    setIsLanguageMenuOpen(false);
  };

  const editorOptions = {
    fontSize,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    lineNumbers: 'on',
    roundedSelection: false,
    occurrencesHighlight: false,
    cursorStyle: 'line',
    automaticLayout: true,
    tabSize: 2,
    formatOnType: true,
    formatOnPaste: true,
    glyphMargin: true,
    lineDecorationsWidth: 5,
    suggestOnTriggerCharacters: true,
    quickSuggestions: true,
    snippetSuggestions: 'top',
    wordBasedSuggestions: true,
    parameterHints: { enabled: true },
    codeLens: true,
    lightbulb: { enabled: true },
    bracketPairColorization: { enabled: true },
    autoClosingBrackets: 'always',
    matchBrackets: 'always',
    autoIndent: 'full',
    formatOnSave: true
  };

  return (
    <div className="h-full flex flex-col">
      {/* Editor Header */}
      <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-white/80 text-sm transition-colors"
            >
              <Code2 className="w-4 h-4" />
              <span>{languages.find(l => l.id === selectedLanguage)?.name || 'Select Language'}</span>
              <span>{languages.find(l => l.id === selectedLanguage)?.icon}</span>
            </button>

            {/* Language Dropdown */}
            {isLanguageMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-white/10 rounded-lg shadow-lg overflow-hidden z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => handleLanguageChange(lang.id)}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-white/5 transition-colors ${
                      selectedLanguage === lang.id ? 'bg-white/10 text-white' : 'text-white/80'
                    }`}
                  >
                    <span>{lang.icon}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-1.5 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
              title="Editor Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsSnippetsOpen(!isSnippetsOpen)}
              className="p-1.5 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
              title="Code Snippets"
            >
              <Code2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertTemplate(problemType)}
              className="p-1.5 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
              title="Insert Template"
            >
              <FileCode className="w-4 h-4" />
            </button>
          </div>

          {/* Validation Status */}
          <div className="flex items-center gap-2">
            {validationResult.isValid ? (
              <div className="flex items-center gap-1 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Valid Code</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">
                  {validationResult.errors.length} {validationResult.errors.length === 1 ? 'issue' : 'issues'} found
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRun}
            disabled={!validationResult.isValid}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#fcba28] text-black font-medium hover:bg-[#fcba28]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" />
            Run
          </button>
          <button
            onClick={onTest}
            disabled={!validationResult.isValid}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <TestTube2 className="w-4 h-4" />
            Test
          </button>
          <button
            onClick={onSubmit}
            disabled={!validationResult.isValid}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            Submit
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {isSettingsOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border-b border-white/10 p-4 space-y-4"
        >
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">Theme</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white"
              >
                <option value="vs-dark">Dark</option>
                <option value="light">Light</option>
                <option value="monokai">Monokai</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-1">Font Size</label>
              <select
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white"
              >
                {[12, 14, 16, 18, 20].map((size) => (
                  <option key={size} value={size}>
                    {size}px
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Snippets Panel */}
      {isSnippetsOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border-b border-white/10 p-4"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Object.entries(snippets).map(([key, snippet]) => (
              <button
                key={key}
                onClick={() => insertSnippet(snippet)}
                className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{snippet.description}</span>
                  <Lightbulb className="w-4 h-4 text-[#fcba28] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <code className="text-xs text-white/60">{snippet.prefix}</code>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Editor */}
      <div className="flex-1 min-h-0 relative">
        <Editor
          height="100%"
          language={selectedLanguage.toLowerCase()}
          value={code}
          theme={theme}
          onChange={handleCodeChange}
          onMount={handleEditorDidMount}
          options={editorOptions}
        />

        {/* Error List */}
        {validationResult.errors.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 max-h-32 overflow-y-auto">
            <div className="p-2 space-y-1">
              {validationResult.errors.map((error, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 text-sm p-1 rounded ${
                    error.severity === 'error' ? 'text-red-400' : 'text-yellow-400'
                  }`}
                >
                  <AlertCircle className="w-4 h-4 mt-0.5" />
                  <div>
                    <span className="font-medium">Line {error.line}:</span> {error.message}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .errorDecoration {
          background-color: rgba(255, 0, 0, 0.1);
        }
        .warningDecoration {
          background-color: rgba(255, 255, 0, 0.1);
        }
        .errorGlyph {
          background-color: #ff0000;
          width: 4px !important;
          margin-left: 3px;
        }
        .warningGlyph {
          background-color: #ffff00;
          width: 4px !important;
          margin-left: 3px;
        }
      `}</style>
    </div>
  );
}
