'use client';

import React from 'react';
import { SceneState } from '@/lib/prompt-engine/types';
import {
  getZoneById,
  getPoseById,
  getLightingById,
  getCameraById,
  getSaudiDetailById,
} from '@/lib/prompt-engine/context-rules';
import {
  BEDROOM_ZONES_AR,
  BEDROOM_POSES_AR,
  BEDROOM_LIGHTING_AR,
  BEDROOM_CAMERAS_AR,
  SAUDI_BEDROOM_DETAILS_AR,
  BEDROOM_UI_STRINGS,
} from '@/lib/prompt-engine/ar-locale';
import { RotateCcw, ShieldCheck } from 'lucide-react';

interface CoherenceInspectorProps {
  state: SceneState;
  onReset: () => void;
}

export function CoherenceInspector({ state, onReset }: CoherenceInspectorProps) {
  const zone = getZoneById(state.zoneId);
  const pose = getPoseById(state.poseId);
  const cam = getCameraById(state.cameraId);
  const light = getLightingById(state.lightingId);
  const saudiDetail = getSaudiDetailById(state.saudiDetailId);

  const zoneLabel = BEDROOM_ZONES_AR[zone.id]?.labelAr || zone.name;
  const poseLabel = BEDROOM_POSES_AR[pose.id]?.labelAr || pose.shortLabel;
  const camLabel = BEDROOM_CAMERAS_AR[cam.id]?.labelAr || cam.name;
  const lightLabel = BEDROOM_LIGHTING_AR[light.id]?.labelAr || light.name;
  const saudiDetailLabel = SAUDI_BEDROOM_DETAILS_AR[saudiDetail.id]?.labelAr || saudiDetail.name;

  return (
    <div className="rounded-xl border border-zinc-800/90 bg-zinc-950/60 p-3.5 space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>{BEDROOM_UI_STRINGS.activeSummaryTitle}</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          <span>{BEDROOM_UI_STRINGS.resetDefaults}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
        <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 text-start">
          <span className="text-zinc-500 block text-[10px]">المنطقة</span>
          <span className="text-zinc-200 font-medium truncate block">{zoneLabel}</span>
        </div>
        <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 text-start">
          <span className="text-zinc-500 block text-[10px]">الوضعية</span>
          <span className="text-zinc-200 font-medium truncate block">{poseLabel}</span>
        </div>
        <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 text-start">
          <span className="text-zinc-500 block text-[10px]">وضع الكاميرا</span>
          <span className="text-zinc-200 font-medium truncate block">{camLabel.split('(')[0]}</span>
        </div>
        <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 text-start">
          <span className="text-zinc-500 block text-[10px]">الإضاءة</span>
          <span className="text-amber-300 font-medium truncate block">{lightLabel}</span>
        </div>
        <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/60 text-start col-span-2 sm:col-span-1">
          <span className="text-zinc-500 block text-[10px]">البيئة السعودية</span>
          <span className="text-emerald-300 font-medium truncate block">{saudiDetailLabel}</span>
        </div>
      </div>
    </div>
  );
}
