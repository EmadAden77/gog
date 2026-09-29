'use client';

import React from 'react';
import { BEDROOM_ZONES } from '@/lib/prompt-engine/data';
import { BedroomZoneId } from '@/lib/prompt-engine/types';
import { BEDROOM_ZONES_AR } from '@/lib/prompt-engine/ar-locale';
import { Tooltip } from '@/components/Tooltip';
import { Bed, Eye, Sun, Armchair, DoorClosed, Maximize2, Shield, Check, Footprints } from 'lucide-react';

interface LocationSelectorProps {
  selectedLocationId: string;
  onSelectLocation: (zoneId: BedroomZoneId) => void;
}

export function LocationSelector({
  selectedLocationId,
  onSelectLocation,
}: LocationSelectorProps) {
  const getZoneIcon = (id: BedroomZoneId) => {
    switch (id) {
      case 'on_the_bed':
        return <Bed className="h-4 w-4" />;
      case 'bedroom_window':
        return <Sun className="h-4 w-4" />;
      case 'bedroom_mirror':
        return <Eye className="h-4 w-4" />;
      case 'bedroom_middle':
        return <Footprints className="h-4 w-4" />;
      case 'bedroom_wardrobe':
        return <Maximize2 className="h-4 w-4" />;
      case 'bedroom_door':
        return <DoorClosed className="h-4 w-4" />;
      case 'bedroom_chair':
        return <Armchair className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-3">
      {/* Bedroom Spatial Zones Grid */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {BEDROOM_ZONES.map((zone) => {
          const isSelected = selectedLocationId === zone.id;
          const zoneInfo = BEDROOM_ZONES_AR[zone.id];
          const label = zoneInfo?.labelAr || zone.name;
          const tooltip = zoneInfo?.tooltipAr || zone.description;
          const tag = zoneInfo?.tagAr || 'منطقة الغرفة';

          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => onSelectLocation(zone.id)}
              className={`group relative flex items-center justify-between rounded-xl px-4 py-3.5 text-start transition-all duration-200 border ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500/40 shadow-sm shadow-amber-500/5 ring-1 ring-amber-500/30'
                  : 'bg-zinc-900/60 border-zinc-800/90 hover:bg-zinc-850 hover:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-zinc-800/80 text-zinc-400 group-hover:text-zinc-200'
                  }`}
                >
                  {getZoneIcon(zone.id)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-zinc-100 truncate">
                      {label}
                    </span>
                    <Tooltip content={tooltip} />
                  </div>
                  <div className="text-[11px] text-zinc-500 mt-0.5 truncate">
                    {tag}
                  </div>
                </div>
              </div>

              {isSelected && (
                <div className="ms-2 shrink-0">
                  <Check className="h-4 w-4 text-amber-400" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
