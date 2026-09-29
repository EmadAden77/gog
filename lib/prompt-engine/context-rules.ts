import {
  BEDROOM_ZONES,
  BEDROOM_CONTEXTS,
  BEDROOM_POSES,
  BEDROOM_CAMERAS,
  BEDROOM_LIGHTING,
  BEDROOM_PROPS,
  BEDROOM_CLOTHING,
  BEDROOM_HAIRSTYLES,
  BEDROOM_EXPRESSIONS,
  SAUDI_BEDROOM_DETAILS,
} from './data';
import {
  SceneState,
  BedroomZoneOption,
  BedroomContextOption,
  BedroomPoseOption,
  BedroomCameraOption,
  BedroomLightingOption,
  BedroomPropOption,
  SaudiBedroomDetailOption,
  BedroomZoneId,
} from './types';

export function getZoneById(id: string): BedroomZoneOption {
  return BEDROOM_ZONES.find((z) => z.id === id) || BEDROOM_ZONES[0];
}

export function getContextById(id: string): BedroomContextOption {
  return BEDROOM_CONTEXTS.find((c) => c.id === id) || BEDROOM_CONTEXTS[0];
}

export function getPoseById(id: string): BedroomPoseOption {
  return BEDROOM_POSES.find((p) => p.id === id) || BEDROOM_POSES[0];
}

export function getCameraById(id: string): BedroomCameraOption {
  return BEDROOM_CAMERAS.find((c) => c.id === id) || BEDROOM_CAMERAS[0];
}

export function getLightingById(id: string): BedroomLightingOption {
  // Support both new IDs and old aliases
  if (id === 'natural_window_daylight') return BEDROOM_LIGHTING.find((l) => l.id === 'bright_morning_daylight') || BEDROOM_LIGHTING[0];
  if (id === 'warm_nightstand_lamp') return BEDROOM_LIGHTING.find((l) => l.id === 'warm_tungsten_nightstand_lamp') || BEDROOM_LIGHTING[1];
  if (id === 'smartphone_screen_glow') return BEDROOM_LIGHTING.find((l) => l.id === 'pitch_dark_screen_glow') || BEDROOM_LIGHTING[2];
  return BEDROOM_LIGHTING.find((l) => l.id === id) || BEDROOM_LIGHTING[0];
}

export function getPropById(id: string): BedroomPropOption {
  return BEDROOM_PROPS.find((p) => p.id === id) || BEDROOM_PROPS[0];
}

export function getClothingById(id: string) {
  return BEDROOM_CLOTHING.find((c) => c.id === id) || BEDROOM_CLOTHING[0];
}

export function getHairstyleById(id: string) {
  return BEDROOM_HAIRSTYLES.find((h) => h.id === id) || BEDROOM_HAIRSTYLES[0];
}

export function getExpressionById(id: string) {
  if (id === 'exp_sleepy_relaxed_smile') return BEDROOM_EXPRESSIONS.find((e) => e.id === 'exp_sleepy_candid_morning') || BEDROOM_EXPRESSIONS[0];
  return BEDROOM_EXPRESSIONS.find((e) => e.id === id) || BEDROOM_EXPRESSIONS[0];
}

export function getSaudiDetailById(id: string): SaudiBedroomDetailOption {
  return SAUDI_BEDROOM_DETAILS.find((d) => d.id === id) || SAUDI_BEDROOM_DETAILS[0];
}

export function getAvailableSaudiDetails(): SaudiBedroomDetailOption[] {
  return SAUDI_BEDROOM_DETAILS;
}

export function getAvailableContexts(zoneId: BedroomZoneId): BedroomContextOption[] {
  const zone = getZoneById(zoneId);
  return BEDROOM_CONTEXTS.filter((c) => zone.supportedContextIds.includes(c.id));
}

export function getAvailablePoses(contextId: string): BedroomPoseOption[] {
  const ctx = getContextById(contextId);
  return BEDROOM_POSES.filter((p) => ctx.allowedPoseIds.includes(p.id));
}

export function getAvailableCameras(contextId: string): BedroomCameraOption[] {
  const ctx = getContextById(contextId);
  return BEDROOM_CAMERAS.filter((c) => ctx.allowedCameraIds.includes(c.id));
}

export function getAvailableLighting(): BedroomLightingOption[] {
  return BEDROOM_LIGHTING;
}

export function getAvailableProps(contextId: string): BedroomPropOption[] {
  const ctx = getContextById(contextId);
  return BEDROOM_PROPS.filter((p) => ctx.allowedPropIds.includes(p.id));
}

/**
 * Enforces strict physical consistency when switching Bedroom Zone.
 * Prevents sitting/lying contradictions when selecting a standing zone.
 */
export function sanitizeSceneStateOnZoneChange(
  current: SceneState,
  newZoneId: BedroomZoneId
): SceneState {
  const zone = getZoneById(newZoneId);
  const availableContexts = getAvailableContexts(newZoneId);

  let nextContextId = zone.defaultContextId;
  if (!availableContexts.some((c) => c.id === nextContextId)) {
    nextContextId = availableContexts[0]?.id || zone.supportedContextIds[0];
  }

  const nextContext = getContextById(nextContextId);
  const availablePoses = getAvailablePoses(nextContextId);
  
  // Strict posture conflict resolution:
  // If zone is a standing zone, pose MUST be standing!
  let nextPoseId = zone.defaultPoseId;
  if (availablePoses.some((p) => p.id === current.poseId)) {
    nextPoseId = current.poseId;
  }

  const availableCameras = getAvailableCameras(nextContextId);
  const nextCameraId = availableCameras.some((c) => c.id === current.cameraId)
    ? current.cameraId
    : nextContext.defaultCameraId;

  const availableProps = getAvailableProps(nextContextId);
  const nextPropId = availableProps.some((p) => p.id === current.propId)
    ? current.propId
    : 'prop_none';

  return {
    ...current,
    zoneId: newZoneId,
    contextId: nextContextId,
    poseId: nextPoseId,
    cameraId: nextCameraId,
    propId: nextPropId,
  };
}

/**
 * Enforces consistency when switching context.
 */
export function sanitizeSceneStateOnContextChange(
  current: SceneState,
  newContextId: string
): SceneState {
  const nextContext = getContextById(newContextId);
  const availablePoses = getAvailablePoses(newContextId);
  const nextPoseId = availablePoses.some((p) => p.id === current.poseId)
    ? current.poseId
    : nextContext.defaultPoseId;

  const availableCameras = getAvailableCameras(newContextId);
  const nextCameraId = availableCameras.some((c) => c.id === current.cameraId)
    ? current.cameraId
    : nextContext.defaultCameraId;

  const availableProps = getAvailableProps(newContextId);
  const nextPropId = availableProps.some((p) => p.id === current.propId)
    ? current.propId
    : 'prop_none';

  return {
    ...current,
    contextId: newContextId,
    poseId: nextPoseId,
    cameraId: nextCameraId,
    propId: nextPropId,
  };
}

/**
 * Handles direct pose selection with automatic zone & context resolution.
 * If user selects a standing pose, it automatically overrides any sitting/lying state!
 */
export function sanitizeSceneStateOnPoseChange(
  current: SceneState,
  newPoseId: string
): SceneState {
  const pose = getPoseById(newPoseId);

  // If standing pose selected, ensure zone & context are compatible with that standing pose
  if (pose.postureType === 'standing') {
    let targetZoneId = current.zoneId;
    let targetContextId = current.contextId;

    if (newPoseId === 'standing_mirror_full_length' || newPoseId === 'standing_mirror_casual_lean') {
      targetZoneId = 'bedroom_mirror';
      targetContextId = 'standing_mirror_full_length_ctx';
    } else if (newPoseId === 'standing_next_to_window' || newPoseId === 'standing_window_quarter_turn') {
      targetZoneId = 'bedroom_window';
      targetContextId = 'standing_by_curtain';
    } else if (newPoseId === 'standing_middle_of_bedroom') {
      targetZoneId = 'bedroom_middle';
      targetContextId = 'standing_middle_bedroom_ctx';
    } else if (newPoseId === 'standing_beside_wardrobe') {
      targetZoneId = 'bedroom_wardrobe';
      targetContextId = 'standing_wardrobe_ctx';
    } else if (newPoseId === 'standing_near_bedroom_door') {
      targetZoneId = 'bedroom_door';
      targetContextId = 'standing_door_ctx';
    }

    const availableCameras = getAvailableCameras(targetContextId);
    const cameraId = pose.requiresMirror
      ? 'mirror_selfie_handheld'
      : (availableCameras.some((c) => c.id === current.cameraId && !c.isMirrorMode)
          ? current.cameraId
          : 'front_camera_eye_level');

    return {
      ...current,
      zoneId: targetZoneId,
      contextId: targetContextId,
      poseId: newPoseId,
      cameraId,
    };
  }

  // If non-standing pose selected, ensure zone & context are compatible
  let targetZoneId = current.zoneId;
  let targetContextId = current.contextId;

  if (newPoseId === 'chair_lounging_selfie' || newPoseId === 'chair_elbow_lean') {
    targetZoneId = 'bedroom_chair';
    targetContextId = newPoseId === 'chair_elbow_lean' ? 'bedroom_desk_chair' : 'lounging_accent_armchair';
  } else if (newPoseId === 'window_sill_sit') {
    targetZoneId = 'bedroom_window';
    targetContextId = 'sitting_by_window_sill';
  } else if (
    newPoseId === 'propped_bed_one_handed' ||
    newPoseId === 'headboard_casual_tilt' ||
    newPoseId === 'hand_on_cheek_bed' ||
    newPoseId === 'lying_overhead_selfie' ||
    newPoseId === 'lying_pillow_rest' ||
    newPoseId === 'bed_edge_casual_sit' ||
    newPoseId === 'bed_edge_forward_lean'
  ) {
    targetZoneId = 'on_the_bed';
    if (newPoseId === 'lying_overhead_selfie' || newPoseId === 'lying_pillow_rest') {
      targetContextId = 'lying_back_on_bed';
    } else if (newPoseId === 'bed_edge_casual_sit' || newPoseId === 'bed_edge_forward_lean') {
      targetContextId = 'sitting_on_bed_edge';
    } else {
      targetContextId = 'propped_against_headboard';
    }
  }

  const availableCameras = getAvailableCameras(targetContextId);
  const nextCameraId = availableCameras.some((c) => c.id === current.cameraId && !c.isMirrorMode)
    ? current.cameraId
    : (newPoseId === 'lying_overhead_selfie' ? 'front_camera_high_angle' : availableCameras[0]?.id || 'front_camera_eye_level');

  return {
    ...current,
    zoneId: targetZoneId,
    contextId: targetContextId,
    poseId: newPoseId,
    cameraId: nextCameraId,
  };
}

export const INITIAL_SCENE_STATE: SceneState = {
  zoneId: 'bedroom_window',
  contextId: 'standing_by_curtain',
  poseId: 'standing_next_to_window',
  cameraId: 'front_camera_eye_level',
  lightingId: 'bright_morning_daylight',
  saudiDetailId: 'detail_split_ac',
  propId: 'prop_none',
  clothingId: 'clothing_sleeveless_tank_shorts',
  hairstyleId: 'hair_casual_bedhead_stubble',
  expressionId: 'exp_sleepy_candid_morning',
  includeDuvetTexture: true,
  imperfectionLevel: 'candid_raw',
};
