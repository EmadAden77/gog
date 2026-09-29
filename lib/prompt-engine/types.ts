export type TargetPlatform = 'chatgpt' | 'gemini';

export type BedroomZoneId = 
  | 'on_the_bed'
  | 'bedroom_mirror'
  | 'bedroom_window'
  | 'bedroom_middle'
  | 'bedroom_wardrobe'
  | 'bedroom_door'
  | 'bedroom_chair';

export interface BedroomZoneOption {
  id: BedroomZoneId;
  name: string; // Engine value (English)
  description: string;
  bedroomDetails: string[];
  supportedContextIds: string[];
  defaultContextId: string;
  defaultLightingId: string;
  defaultPoseId: string;
  defaultCameraId: string;
  isStandingZone?: boolean;
}

export interface BedroomContextOption {
  id: string;
  name: string; // Engine value (English)
  description: string;
  isMirrorContext: boolean;
  isStandingContext: boolean;
  allowedZoneIds: BedroomZoneId[];
  defaultPoseId: string;
  defaultCameraId: string;
  allowedPoseIds: string[];
  allowedCameraIds: string[];
  allowedPropIds: string[];
}

export interface BedroomPoseOption {
  id: string;
  name: string; // Engine value (English)
  shortLabel: string;
  description: string;
  biomechanics: string;
  postureType: 'standing' | 'sitting' | 'lying';
  requiresMirror: boolean;
  spatialLocation: string;
}

export interface BedroomCameraOption {
  id: string;
  name: string; // Engine value (English)
  perspective: string;
  armReach: string;
  phoneGrip: string;
  opticalNote: string;
  isMirrorMode: boolean;
}

export interface BedroomLightingOption {
  id: string;
  name: string; // Engine value (English)
  timeOfDay: string;
  lightSource: string;
  shadowDescription: string;
  atmosphere: string;
}

export interface BedroomPropOption {
  id: string;
  name: string; // Engine value (English)
  description: string;
}

export interface BedroomClothingOption {
  id: string;
  name: string; // Engine value (English)
  category: 'tshirt_shorts' | 'loungewear' | 'pajamas' | 'casual_home';
  description: string;
}

export interface BedroomHairstyleOption {
  id: string;
  name: string; // Engine value (English)
  description: string;
}

export interface BedroomExpressionOption {
  id: string;
  name: string; // Engine value (English)
  description: string;
  microExpression: string;
}

export interface SaudiBedroomDetailOption {
  id: string;
  name: string; // Engine value (English)
  description: string;
}

export interface SceneState {
  zoneId: BedroomZoneId;
  contextId: string;
  poseId: string;
  cameraId: string;
  lightingId: string;
  saudiDetailId: string;
  propId: string;
  // Global personal options
  clothingId: string;
  hairstyleId: string;
  expressionId: string;
  // Micro-details
  includeDuvetTexture: boolean;
  imperfectionLevel: 'candid_raw' | 'balanced_everyday';
}

export interface CompiledPromptResult {
  chatgpt: string;
  gemini: string;
  coherenceSummary: {
    zoneBrief: string;
    contextBrief: string;
    cameraBrief: string;
    lightingBrief: string;
    saudiDetailBrief: string;
    appearanceBrief: string;
  };
}
