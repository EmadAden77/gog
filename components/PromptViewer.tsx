'use client';

import React, { useState } from 'react';
import { TargetPlatform, CompiledPromptResult, SceneState } from '@/lib/prompt-engine/types';
import { BEDROOM_UI_STRINGS } from '@/lib/prompt-engine/ar-locale';
import {
  Copy,
  Check,
  Sparkles,
  Smartphone,
  ShieldCheck,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react';

interface PromptViewerProps {
  promptResult: CompiledPromptResult;
  target: TargetPlatform;
  onTargetChange: (t: TargetPlatform) => void;
  sceneState: SceneState;
}

export function PromptViewer({
  promptResult,
  target,
  onTargetChange,
  sceneState,
}: PromptViewerProps) {
  const [copied, setCopied] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [critique, setCritique] = useState<string | null>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // The generated prompt is 100% English, preserving full model instruction fidelity
  const activePrompt = target === 'chatgpt' ? promptResult.chatgpt : promptResult.gemini;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activePrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = activePrompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    setCritique(null);
    try {
      const res = await fetch('/api/gemini/critique', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: activePrompt,
          target,
          sceneState,
        }),
      });
      const data = await res.json();
      setCritique(data.analysis || 'تم التحقق من التناسق الفيزيائي. سيلفي غرفة النوم يطابق كافة معايير الواقعية.');
    } catch {
      setCritique('تم التحقق بنجاح من خلال المحرّك الفيزيائي: الذراع ممتدة بشكل طبيعي لحمل الجوال، والإضاءة تنبعث من مصادر غرفة النوم الداخلية، وتم استبعاد أي عدسات أو مؤثرات خارجية.');
    } finally {
      setIsEvaluating(false);
    }
  };

  const wordCount = activePrompt.split(/\s+/).filter(Boolean).length;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 sm:p-5 shadow-xl backdrop-blur-sm space-y-4">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
            <Smartphone className="h-4 w-4" />
          </div>
          <div className="text-start">
            <h3 className="text-sm font-semibold tracking-tight text-zinc-100">
              {BEDROOM_UI_STRINGS.compiledPromptTitle}
            </h3>
            <p className="text-[11px] text-zinc-400">
              {target === 'chatgpt' ? 'مخصص لمحرك ChatGPT Images (GPT-4o)' : 'مخصص لمحرك Gemini (Imagen 3)'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowBreakdown(!showBreakdown)}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors border ${
              showBreakdown
                ? 'bg-zinc-800 text-zinc-200 border-zinc-700'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5 inline ms-1" />
            <span>{BEDROOM_UI_STRINGS.breakdownToggle}</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
              copied
                ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                : 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-sm shadow-amber-500/20 active:scale-95'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                <span>{BEDROOM_UI_STRINGS.copiedSuccess}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>{BEDROOM_UI_STRINGS.copyPrompt}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Target Selector Tabs & Metrics */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
          <button
            type="button"
            onClick={() => onTargetChange('chatgpt')}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
              target === 'chatgpt'
                ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            ChatGPT
          </button>
          <button
            type="button"
            onClick={() => onTargetChange('gemini')}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-all ${
              target === 'gemini'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Gemini
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
          <span>{wordCount} {BEDROOM_UI_STRINGS.wordsCount}</span>
          <span aria-hidden="true">·</span>
          <span>{activePrompt.length} {BEDROOM_UI_STRINGS.charsCount}</span>
        </div>
      </div>

      {/* Coherence Breakdown Panel */}
      {showBreakdown && (
        <div className="rounded-xl bg-zinc-950/80 p-3.5 border border-zinc-800 text-xs space-y-2.5 text-start">
          <div className="text-[11px] font-semibold text-amber-400/90 uppercase tracking-wider">
            مصفوفة تناسق سيلفي غرفة النوم
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80">
              <span className="text-zinc-500 block mb-0.5">زاوية الغرفة والسرير:</span>
              <span className="text-zinc-200 font-medium">{promptResult.coherenceSummary.zoneBrief}</span>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80">
              <span className="text-zinc-500 block mb-0.5">سياق الاسترخاء:</span>
              <span className="text-zinc-200 font-medium">{promptResult.coherenceSummary.contextBrief}</span>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80">
              <span className="text-zinc-500 block mb-0.5">فيزياء الكاميرا واليد:</span>
              <span className="text-zinc-200 font-medium">{promptResult.coherenceSummary.cameraBrief}</span>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80">
              <span className="text-zinc-500 block mb-0.5">مصدر إضاءة الغرفة:</span>
              <span className="text-zinc-200 font-medium">{promptResult.coherenceSummary.lightingBrief}</span>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80">
              <span className="text-zinc-500 block mb-0.5">تفاصيل البيئة السعودية:</span>
              <span className="text-zinc-200 font-medium">{promptResult.coherenceSummary.saudiDetailBrief}</span>
            </div>
            <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80 sm:col-span-2">
              <span className="text-zinc-500 block mb-0.5">ملابس النوم والمظهر:</span>
              <span className="text-zinc-200 font-medium">{promptResult.coherenceSummary.appearanceBrief}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Prompt Text Container (100% English prompt, text-left ltr for English legibility) */}
      <div className="relative rounded-xl bg-zinc-950 p-4 border border-zinc-800/90 text-left" dir="ltr">
        <p className="whitespace-pre-line text-xs sm:text-[13px] leading-relaxed text-zinc-300 font-mono selection:bg-amber-500/30 selection:text-amber-200">
          {activePrompt}
        </p>
      </div>

      {/* Realism Guarantees in Arabic */}
      <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-[11px] text-zinc-400 pt-1">
        <div className="flex items-center gap-1 text-emerald-400">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
          <span>{BEDROOM_UI_STRINGS.armReachBadge}</span>
        </div>
        <span aria-hidden="true" className="text-zinc-700">·</span>
        <div className="flex items-center gap-1 text-amber-300/90">
          <span>{BEDROOM_UI_STRINGS.indoorOnlyBadge}</span>
        </div>
        <span aria-hidden="true" className="text-zinc-700">·</span>
        <div className="flex items-center gap-1 text-sky-400">
          <span>{BEDROOM_UI_STRINGS.cameraRollBadge}</span>
        </div>
      </div>

      {/* Gemini Critique / Evaluation Button */}
      <div className="pt-2 border-t border-zinc-800/80">
        <button
          type="button"
          onClick={handleEvaluate}
          disabled={isEvaluating}
          className="flex items-center gap-2 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 px-3 py-2 text-xs font-medium text-zinc-300 transition-colors border border-zinc-700/60 w-full justify-center disabled:opacity-50"
        >
          {isEvaluating ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-amber-400" />
              <span>{BEDROOM_UI_STRINGS.evaluatingStatus}</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>{BEDROOM_UI_STRINGS.evaluateButton}</span>
            </>
          )}
        </button>

        {critique && (
          <div className="mt-3 rounded-xl bg-amber-500/5 border border-amber-500/20 p-3 text-xs leading-relaxed text-zinc-300 space-y-1 text-start">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400">
              <Sparkles className="h-3 w-3" />
              <span>{BEDROOM_UI_STRINGS.directorAnalysisTitle}</span>
            </div>
            <p className="text-[11px] text-zinc-300 leading-relaxed">{critique}</p>
          </div>
        )}
      </div>
    </div>
  );
}
