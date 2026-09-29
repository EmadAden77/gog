'use client';

import React, { useState, useMemo } from 'react';
import { TargetPlatform, SceneState, BedroomZoneId } from '@/lib/prompt-engine/types';
import {
  INITIAL_SCENE_STATE,
  sanitizeSceneStateOnZoneChange,
  sanitizeSceneStateOnContextChange,
  sanitizeSceneStateOnPoseChange,
  getZoneById,
  getContextById,
  getPoseById,
  getCameraById,
  getLightingById,
  getClothingById,
} from '@/lib/prompt-engine/context-rules';
import { compilePrompt } from '@/lib/prompt-engine/compiler';
import { BedroomPreset } from '@/lib/prompt-engine/presets';
import { Header } from '@/components/Header';
import { PresetSelector } from '@/components/PresetSelector';
import { LocationSelector } from '@/components/LocationSelector';
import { ContextSelector } from '@/components/ContextSelector';
import { PoseSelector } from '@/components/PoseSelector';
import { CameraSelector } from '@/components/CameraSelector';
import { LightingSelector } from '@/components/LightingSelector';
import { AppearanceSelector } from '@/components/AppearanceSelector';
import { SaudiDetailSelector } from '@/components/SaudiDetailSelector';
import { PromptViewer } from '@/components/PromptViewer';
import { CoherenceInspector } from '@/components/CoherenceInspector';
import {
  BEDROOM_ZONES_AR,
  BEDROOM_POSES_AR,
  BEDROOM_CAMERAS_AR,
  BEDROOM_LIGHTING_AR,
  BEDROOM_CLOTHING_AR,
  BEDROOM_UI_STRINGS,
} from '@/lib/prompt-engine/ar-locale';
import {
  Bed,
  User,
  UserCheck,
  Eye,
  Lamp,
  Copy,
  Check,
  ShieldCheck,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

type TabKey = 'zone' | 'appearance' | 'pose' | 'camera' | 'lighting';

export default function HomePage() {
  const [target, setTarget] = useState<TargetPlatform>('chatgpt');
  const [sceneState, setSceneState] = useState<SceneState>(INITIAL_SCENE_STATE);
  const [activePresetId, setActivePresetId] = useState<string | undefined>('preset_bed_warm_lamp');
  const [activeTab, setActiveTab] = useState<TabKey>('zone');
  const [mobileCopied, setMobileCopied] = useState(false);

  // Compile prompt reactively (Engine runs strictly in English)
  const compiledResult = useMemo(() => {
    return compilePrompt(sceneState);
  }, [sceneState]);

  // Tab navigation items
  const tabs = [
    {
      id: 'zone' as TabKey,
      label: 'زاوية الغرفة',
      icon: Bed,
      activeSummary: BEDROOM_ZONES_AR[sceneState.zoneId]?.labelAr || getZoneById(sceneState.zoneId).name,
    },
    {
      id: 'appearance' as TabKey,
      label: 'الملابس والمظهر',
      icon: User,
      activeSummary: BEDROOM_CLOTHING_AR[sceneState.clothingId]?.labelAr || getClothingById(sceneState.clothingId).name,
    },
    {
      id: 'pose' as TabKey,
      label: 'وضعية السيلفي',
      icon: UserCheck,
      activeSummary: BEDROOM_POSES_AR[sceneState.poseId]?.labelAr || getPoseById(sceneState.poseId).shortLabel,
    },
    {
      id: 'camera' as TabKey,
      label: 'الكاميرا والزاوية',
      icon: Eye,
      activeSummary: BEDROOM_CAMERAS_AR[sceneState.cameraId]?.labelAr || getCameraById(sceneState.cameraId).name,
    },
    {
      id: 'lighting' as TabKey,
      label: 'إضاءة الغرفة',
      icon: Lamp,
      activeSummary: BEDROOM_LIGHTING_AR[sceneState.lightingId]?.labelAr || getLightingById(sceneState.lightingId).name,
    },
  ];

  // Preset Selection
  const handleSelectPreset = (preset: BedroomPreset) => {
    setActivePresetId(preset.id);
    setSceneState((prev) => ({
      ...prev,
      ...preset.state,
    }));
  };

  // Zone Change
  const handleZoneChange = (newZoneId: BedroomZoneId) => {
    setActivePresetId(undefined);
    setSceneState((prev) => sanitizeSceneStateOnZoneChange(prev, newZoneId));
  };

  // Context Change
  const handleContextChange = (newContextId: string) => {
    setActivePresetId(undefined);
    setSceneState((prev) => sanitizeSceneStateOnContextChange(prev, newContextId));
  };

  // Reset to default
  const handleReset = () => {
    setSceneState(INITIAL_SCENE_STATE);
    setActivePresetId(undefined);
  };

  // Mobile Copy Handler
  const handleMobileCopy = async () => {
    const textToCopy = target === 'chatgpt' ? compiledResult.chatgpt : compiledResult.gemini;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setMobileCopied(true);
      setTimeout(() => setMobileCopied(false), 2000);
    } catch {
      setMobileCopied(true);
      setTimeout(() => setMobileCopied(false), 2000);
    }
  };

  const scrollToPrompt = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  // Step transitions
  const tabKeys: TabKey[] = ['zone', 'appearance', 'pose', 'camera', 'lighting'];
  const currentTabIndex = tabKeys.indexOf(activeTab);

  const goToNextTab = () => {
    if (currentTabIndex < tabKeys.length - 1) {
      setActiveTab(tabKeys[currentTabIndex + 1]);
    }
  };

  const goToPrevTab = () => {
    if (currentTabIndex > 0) {
      setActiveTab(tabKeys[currentTabIndex - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500/20 selection:text-amber-200">
      {/* Top Header */}
      <Header target={target} onTargetChange={setTarget} />

      {/* Bedroom Presets Bar */}
      <div className="border-b border-zinc-800/60 bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-start">
            <p className="text-xs text-zinc-400">
              محرّك متخصص حصرياً لصور سيلفي غرفة النوم: فيزياء يد حقيقية، إضاءات غرف النوم، وانعكاسات المرآة.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium shrink-0">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>مقتصر على غرفة النوم 100% · بدون أماكن خارجية</span>
            </div>
          </div>

          <PresetSelector
            onSelectPreset={handleSelectPreset}
            activePresetId={activePresetId}
          />
        </div>
      </div>

      {/* Main Workspace Layout */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Tabbed Bedroom Builder (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <CoherenceInspector state={sceneState} onReset={handleReset} />

            {/* Tab Navigation Bar */}
            <div className="flex items-center gap-1.5 p-1 bg-zinc-900/80 rounded-xl border border-zinc-800 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-1 justify-center ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-zinc-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content Cards */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 sm:p-5 shadow-sm">
              {/* Tab 1: Bedroom Zone & Sub-Context */}
              {activeTab === 'zone' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-start">
                      <div>
                        <h2 className="text-sm font-semibold tracking-tight text-zinc-100">
                          1. تحديد زاوية الغرفة الرئيسية
                        </h2>
                        <p className="text-[11px] text-zinc-400">
                          اختر المكان المناسب داخل غرفة النوم
                        </p>
                      </div>
                      <span className="text-[11px] font-medium text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        موضع المشهد
                      </span>
                    </div>

                    <LocationSelector
                      selectedLocationId={sceneState.zoneId}
                      onSelectLocation={handleZoneChange}
                    />
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80">
                    <div className="mb-3 text-start">
                      <h3 className="text-xs sm:text-sm font-semibold tracking-tight text-zinc-100">
                        سياق الاسترخاء والتموضع
                      </h3>
                      <p className="text-[11px] text-zinc-400">
                        التفاصيل الدقيقة للجلوس أو الاستلقاء في {BEDROOM_ZONES_AR[sceneState.zoneId]?.labelAr}
                      </p>
                    </div>

                    <ContextSelector
                      state={sceneState}
                      onContextChange={handleContextChange}
                    />
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80">
                    <SaudiDetailSelector
                      state={sceneState}
                      onSaudiDetailChange={(saudiDetailId) => setSceneState((p) => ({ ...p, saudiDetailId }))}
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Appearance & Loungewear */}
              {activeTab === 'appearance' && (
                <div>
                  <div className="flex items-center justify-between mb-3 text-start">
                    <div>
                      <h2 className="text-sm font-semibold tracking-tight text-zinc-100">
                        2. ملابس النوم والمظهر المنزلي
                      </h2>
                      <p className="text-[11px] text-zinc-400">
                        أزياء مريحة وشعر نوم طبيعي عفوي
                      </p>
                    </div>
                  </div>

                  <AppearanceSelector
                    state={sceneState}
                    onClothingChange={(clothingId) => setSceneState((p) => ({ ...p, clothingId }))}
                    onHairstyleChange={(hairstyleId) => setSceneState((p) => ({ ...p, hairstyleId }))}
                    onExpressionChange={(expressionId) => setSceneState((p) => ({ ...p, expressionId }))}
                  />
                </div>
              )}

              {/* Tab 3: Pose & Biomechanics */}
              {activeTab === 'pose' && (
                <div>
                  <div className="flex items-center justify-between mb-3 text-start">
                    <div>
                      <h2 className="text-sm font-semibold tracking-tight text-zinc-100">
                        3. وضعية الجسد واليد الحرة
                      </h2>
                      <p className="text-[11px] text-zinc-400">
                        حركات سيلفي عفوية تضمن انشغال اليد بحمل الهاتف
                      </p>
                    </div>
                  </div>

                  <PoseSelector
                    state={sceneState}
                    onPoseChange={(poseId) => {
                      setActivePresetId(undefined);
                      setSceneState((p) => sanitizeSceneStateOnPoseChange(p, poseId));
                    }}
                    onPropChange={(propId) => setSceneState((p) => ({ ...p, propId }))}
                  />
                </div>
              )}

              {/* Tab 4: Camera & Angles */}
              {activeTab === 'camera' && (
                <div>
                  <div className="flex items-center justify-between mb-3 text-start">
                    <div>
                      <h2 className="text-sm font-semibold tracking-tight text-zinc-100">
                        4. هندسة كاميرا الجوال
                      </h2>
                      <p className="text-[11px] text-zinc-400">
                        كاميرا أمامية بزاوية 24-26مم أو لقطة مرآة حقيقية (تم استبعاد عدسات DSLR)
                      </p>
                    </div>
                  </div>

                  <CameraSelector
                    state={sceneState}
                    onCameraChange={(cameraId) => setSceneState((p) => ({ ...p, cameraId }))}
                  />
                </div>
              )}

              {/* Tab 5: Bedroom Lighting */}
              {activeTab === 'lighting' && (
                <div>
                  <div className="flex items-center justify-between mb-3 text-start">
                    <div>
                      <h2 className="text-sm font-semibold tracking-tight text-zinc-100">
                        5. إضاءة غرفة النوم
                      </h2>
                      <p className="text-[11px] text-zinc-400">
                        إضاءات منزلية داخلية حصرية (نافذة، أباجورة دافئة، سقف، أو وهج الشاشة)
                      </p>
                    </div>
                  </div>

                  <LightingSelector
                    state={sceneState}
                    onLightingChange={(lightingId) => setSceneState((p) => ({ ...p, lightingId }))}
                    onToggleDuvet={(includeDuvetTexture) => setSceneState((p) => ({ ...p, includeDuvetTexture }))}
                    onImperfectionChange={(imperfectionLevel) => setSceneState((p) => ({ ...p, imperfectionLevel }))}
                  />
                </div>
              )}

              {/* Step Navigation Footer */}
              <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                {currentTabIndex > 0 ? (
                  <button
                    type="button"
                    onClick={goToPrevTab}
                    className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                    <span>السابق: {tabs[currentTabIndex - 1].label}</span>
                  </button>
                ) : <div />}

                {currentTabIndex < tabKeys.length - 1 ? (
                  <button
                    type="button"
                    onClick={goToNextTab}
                    className="flex items-center gap-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-750 px-3.5 py-1.5 text-xs font-semibold text-zinc-100 transition-colors border border-zinc-700"
                  >
                    <span>التالي: {tabs[currentTabIndex + 1].label}</span>
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={scrollToPrompt}
                    className="flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 px-3.5 py-1.5 text-xs font-semibold text-zinc-950 transition-colors"
                  >
                    <span>عرض البرومبت الجاهز</span>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Live Compiled English Prompt & Coherence Matrix (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-4">
            <PromptViewer
              promptResult={compiledResult}
              target={target}
              onTargetChange={setTarget}
              sceneState={sceneState}
            />

            {/* Bedroom Rules Callout */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-4 text-xs text-zinc-400 space-y-2 text-start">
              <div className="flex items-center gap-1.5 font-semibold text-zinc-200 text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>قواعد واقعية سيلفي غرفة النوم</span>
              </div>
              <p className="text-[11px] leading-relaxed text-zinc-400">
                المشهد محصور بالكامل داخل غرفة النوم (سرير، مرآة، نافذة، أو كرسي استرخاء). يضمن المحرك أن الهاتف محمول باليد مع زاوية كاميرا هاتف واقعية وإضاءة داخلية دقيقة، والنص المُولّد بالإنجليزية تماماً لأعلى جودة عند التوليد.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sticky Quick Action Bar */}
      <div className="lg:hidden sticky bottom-0 z-30 border-t border-zinc-800/90 bg-zinc-950/95 backdrop-blur-md px-4 py-2.5">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <button
            type="button"
            onClick={scrollToPrompt}
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white"
          >
            <ChevronDown className="h-4 w-4 text-amber-400" />
            <span>عرض البرومبت</span>
          </button>

          <button
            type="button"
            onClick={handleMobileCopy}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              mobileCopied
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-md shadow-amber-500/20 active:scale-95'
            }`}
          >
            {mobileCopied ? (
              <>
                <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                <span>{BEDROOM_UI_STRINGS.copiedSuccess}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>نسخ برومبت {target === 'chatgpt' ? 'ChatGPT' : 'Gemini'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
