'use client';

import React from 'react';
import {
  getAvailablePoses,
  getAvailableProps,
} from '@/lib/prompt-engine/context-rules';
import { BEDROOM_POSES } from '@/lib/prompt-engine/data';
import { SceneState } from '@/lib/prompt-engine/types';
import { BEDROOM_POSES_AR, BEDROOM_PROPS_AR } from '@/lib/prompt-engine/ar-locale';
import { Tooltip } from '@/components/Tooltip';
import { UserCheck, Package, Check, ShieldCheck, Footprints, Bed } from 'lucide-react';

interface PoseSelectorProps {
  state: SceneState;
  onPoseChange: (poseId: string) => void;
  onPropChange: (propId: string) => void;
}

export function PoseSelector({
  state,
  onPoseChange,
  onPropChange,
}: PoseSelectorProps) {
  const availableProps = getAvailableProps(state.contextId);

  // Filter into standing poses vs bed/seated poses for clear organization
  const standingPoses = BEDROOM_POSES.filter((p) => p.postureType === 'standing');
  const otherPoses = BEDROOM_POSES.filter((p) => p.postureType !== 'standing');

  return (
    <div className="space-y-6">
      {/* 1. Spatial Standing Poses Across the Bedroom */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Footprints className="h-4 w-4 text-amber-400" />
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-100">
              وضعيات الوقوف في أرجاء الغرفة (سيلفي الذراع / المرآة)
            </h3>
          </div>
          <span className="text-[10px] text-emerald-400/90 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" />
            وضعية وقوف حتمية
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {standingPoses.map((pose) => {
            const isSelected = state.poseId === pose.id;
            const poseInfo = BEDROOM_POSES_AR[pose.id];
            const label = poseInfo?.labelAr || pose.name;
            const tooltip = poseInfo?.tooltipAr || pose.description;

            return (
              <button
                key={pose.id}
                type="button"
                onClick={() => onPoseChange(pose.id)}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-start transition-all border ${
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

      {/* 2. Bed & Seated Relaxation Poses */}
      <div className="space-y-3 pt-3 border-t border-zinc-800/80">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bed className="h-4 w-4 text-amber-400" />
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-100">
              وضعيات السرير والجلوس (استرخاء)
            </h3>
          </div>
          <span className="text-[10px] text-zinc-400">على السرير والكرسي</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {otherPoses.map((pose) => {
            const isSelected = state.poseId === pose.id;
            const poseInfo = BEDROOM_POSES_AR[pose.id];
            const label = poseInfo?.labelAr || pose.name;
            const tooltip = poseInfo?.tooltipAr || pose.description;

            return (
              <button
                key={pose.id}
                type="button"
                onClick={() => onPoseChange(pose.id)}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-start transition-all border ${
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

      {/* 3. Everyday Bedroom Props */}
      <div className="space-y-3 pt-3 border-t border-zinc-800/80">
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-amber-400" />
          <h3 className="text-xs sm:text-sm font-semibold text-zinc-100">
            تفاعل اليد الحرة والإكسسوارات
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {availableProps.map((prop) => {
            const isSelected = state.propId === prop.id;
            const propInfo = BEDROOM_PROPS_AR[prop.id];
            const label = propInfo?.labelAr || prop.name;
            const tooltip = propInfo?.tooltipAr || prop.description;

            return (
              <button
                key={prop.id}
                type="button"
                onClick={() => onPropChange(prop.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all border ${
                  isSelected
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-sm'
                    : 'bg-zinc-900/70 text-zinc-300 border-zinc-800 hover:bg-zinc-850 hover:text-zinc-100'
                }`}
              >
                <span>{label}</span>
                <Tooltip content={tooltip} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
