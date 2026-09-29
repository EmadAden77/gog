'use client';

import React from 'react';
import { getAvailableLighting } from '@/lib/prompt-engine/context-rules';
import { SceneState } from '@/lib/prompt-engine/types';
import { BEDROOM_LIGHTING_AR, BEDROOM_UI_STRINGS } from '@/lib/prompt-engine/ar-locale';
import { Tooltip } from '@/components/Tooltip';
import { Lamp, Moon, Sun, Lightbulb, Check, Sparkles } from 'lucide-react';

interface LightingSelectorProps {
  state: SceneState;
  onLightingChange: (lightingId: string) => void;
  onToggleDuvet: (val: boolean) => void;
  onImperfectionChange: (level: 'candid_raw' | 'balanced_everyday') => void;
}

export function LightingSelector({
  state,
  onLightingChange,
  onToggleDuvet,
  onImperfectionChange,
}: LightingSelectorProps) {
  const availableLighting = getAvailableLighting();

  const getLightingIcon = (id: string) => {
    switch (id) {
      case 'bright_morning_daylight':
      case 'natural_window_daylight':
        return <Sun className="h-4 w-4" />;
      case 'warm_tungsten_nightstand_lamp':
      case 'warm_nightstand_lamp':
        return <Lamp className="h-4 w-4" />;
      case 'overhead_room_light':
        return <Lightbulb className="h-4 w-4" />;
      case 'pitch_dark_screen_glow':
      case 'smartphone_screen_glow':
        return <Moon className="h-4 w-4" />;
      default:
        return <Lamp className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lamp className="h-4 w-4 text-amber-400" />
          <h3 className="text-xs sm:text-sm font-semibold text-zinc-100">
            خيارات الإضاءة الداخلية الحصرية لغرفة النوم
          </h3>
        </div>
        <span className="text-[11px] text-zinc-400">إضاءات غرف النوم فقط</span>
      </div>

      {/* 4 Bedroom Lighting Cards */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {availableLighting.map((light) => {
          const isSelected = state.lightingId === light.id;
          const lightInfo = BEDROOM_LIGHTING_AR[light.id];
          const label = lightInfo?.labelAr || light.name;
          const tooltip = `${lightInfo?.tooltipAr || light.lightSource} (${light.timeOfDay})`;

          return (
            <button
              key={light.id}
              type="button"
              onClick={() => onLightingChange(light.id)}
              className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-start transition-all border ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500/40 shadow-sm ring-1 ring-amber-500/30'
                  : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-850 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${
                    isSelected ? 'bg-amber-500/20 text-amber-300' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {getLightingIcon(light.id)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-zinc-100 truncate">
                      {label}
                    </span>
                    <Tooltip content={tooltip} />
                  </div>
                  <span className="text-[10px] text-zinc-500 block truncate">
                    {light.timeOfDay}
                  </span>
                </div>
              </div>

              {isSelected && (
                <Check className="h-4 w-4 text-amber-400 ms-2 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Duvet & Texture Realism Toggle */}
      <div className="rounded-xl border border-zinc-800/90 bg-zinc-900/40 p-3.5 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0 flex-1 text-start">
            <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-xs sm:text-sm font-semibold text-zinc-200 block truncate">
                {BEDROOM_UI_STRINGS.duvetTextureToggle}
              </span>
              <p className="text-[11px] text-zinc-400 truncate">
                {BEDROOM_UI_STRINGS.duvetTextureDesc}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onToggleDuvet(!state.includeDuvetTexture)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors shrink-0 ${
              state.includeDuvetTexture
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            {state.includeDuvetTexture ? 'مُفعّل' : 'مُعطّل'}
          </button>
        </div>
      </div>
    </div>
  );
}
