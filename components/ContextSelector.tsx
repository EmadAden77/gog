'use client';

import React from 'react';
import { getAvailableContexts } from '@/lib/prompt-engine/context-rules';
import { SceneState } from '@/lib/prompt-engine/types';
import { BEDROOM_CONTEXTS_AR } from '@/lib/prompt-engine/ar-locale';
import { Tooltip } from '@/components/Tooltip';
import { Check } from 'lucide-react';

interface ContextSelectorProps {
  state: SceneState;
  onContextChange: (contextId: string) => void;
}

export function ContextSelector({
  state,
  onContextChange,
}: ContextSelectorProps) {
  const availableContexts = getAvailableContexts(state.zoneId);

  return (
    <div className="space-y-3">
      {/* Sub-Context Options Grid */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {availableContexts.map((ctx) => {
          const isSelected = state.contextId === ctx.id;
          const ctxInfo = BEDROOM_CONTEXTS_AR[ctx.id];
          const label = ctxInfo?.labelAr || ctx.name;
          const tooltip = ctxInfo?.tooltipAr || ctx.description;

          return (
            <button
              key={ctx.id}
              type="button"
              onClick={() => onContextChange(ctx.id)}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-start transition-all border ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500/40 shadow-sm ring-1 ring-amber-500/30'
                  : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-xs sm:text-sm font-semibold text-zinc-100 truncate">
                  {label}
                </span>
                <Tooltip content={tooltip} />
              </div>

              {isSelected && (
                <Check className="h-4 w-4 text-amber-400 ms-2 shrink-0" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
