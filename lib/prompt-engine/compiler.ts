import { SceneState, CompiledPromptResult } from './types';
import {
  getZoneById,
  getContextById,
  getPoseById,
  getCameraById,
  getLightingById,
  getPropById,
  getClothingById,
  getHairstyleById,
  getExpressionById,
  getSaudiDetailById,
} from './context-rules';

export function compileChatGPTImagesPrompt(state: SceneState): string {
  const zone = getZoneById(state.zoneId);
  const ctx = getContextById(state.contextId);
  const pose = getPoseById(state.poseId);
  const cam = getCameraById(state.cameraId);
  const light = getLightingById(state.lightingId);
  const prop = getPropById(state.propId);
  const clothing = getClothingById(state.clothingId);
  const hair = getHairstyleById(state.hairstyleId);
  const exp = getExpressionById(state.expressionId);
  const saudiDetail = getSaudiDetailById(state.saudiDetailId);

  const isMirror = cam.isMirrorMode || ctx.isMirrorContext || pose.requiresMirror;
  const isStanding = pose.postureType === 'standing' || ctx.isStandingContext;
  const isPitchDark = light.id === 'pitch_dark_screen_glow' || light.id === 'smartphone_screen_glow';

  // Hand/Arm selfie biomechanics guarantee
  const armBiomechanicsClause = isMirror
    ? `Mirror Selfie Biomechanics: The subject is holding their smartphone at chest level pointed directly toward the bedroom mirror. The smartphone and their hand grip are clearly visible in the mirror reflection, with their gaze directed toward the phone screen in the glass. Free hand rests casually in a pocket or loosely at their side.`
    : `Handheld Selfie Biomechanics: The photo is taken as an authentic handheld front-camera selfie. One arm is physically extended forward holding the smartphone (approx 55–60cm from face, natural 24mm wide-angle perspective), with the corresponding shoulder subtly raised and brought forward from holding the device. Free arm rests naturally by hip or side.`;

  // Secondary prop clause
  let propClause = '';
  if (prop.id !== 'prop_none') {
    propClause = `Secondary bedroom detail: ${prop.name} (${prop.description}).`;
  }

  // Dark room override constraint: strictly suppress any daylight or bright window details
  let contextualSaudiDetail = '';
  if (isPitchDark) {
    if (saudiDetail.id === 'detail_split_ac') {
      contextualSaudiDetail = `in the dim bedroom shadows of the pitch dark room, a white split air conditioner mounted on the wall is faintly visible in the soft-focus background.`;
    } else if (saudiDetail.id === 'detail_chiffon_curtains') {
      contextualSaudiDetail = `in the dark bedroom background, layered sheer chiffon curtains hang over the unlit window, shrouded in deep nighttime room shadows with zero outdoor light entering.`;
    } else {
      contextualSaudiDetail = `in the dark room background, a wooden wardrobe closet softly recedes into deep ambient room shadows.`;
    }
  } else {
    if (saudiDetail.id === 'detail_split_ac') {
      contextualSaudiDetail = `a white split air conditioner mounted on the wall is visible in the soft-focus contemporary bedroom background.`;
    } else if (saudiDetail.id === 'detail_chiffon_curtains') {
      contextualSaudiDetail = `layered sheer chiffon curtains hang over the window in the modern bedroom background.`;
    } else {
      contextualSaudiDetail = `a wooden wardrobe closet adds authentic lived-in warmth to the bedroom background.`;
    }
  }

  // Spatial location description with dark room suppression
  let spatialSettingClause = '';
  if (isStanding) {
    spatialSettingClause = `The subject is standing ${pose.spatialLocation}. The bedroom interior forms the authentic backdrop with soft room depth.`;
  } else if (state.zoneId === 'on_the_bed' || pose.spatialLocation.includes('bed')) {
    spatialSettingClause = `The subject is situated ${pose.spatialLocation}. Soft duvet folds and pillows are visible in close contact.`;
  } else {
    spatialSettingClause = `The subject is situated ${pose.spatialLocation}. The bedroom interior forms the authentic backdrop with soft room depth.`;
  }

  // Filter background details: remove any daytime or sunlight phrases when pitch dark is selected
  const rawDetails = zone.bedroomDetails.slice(0, 3);
  const filteredBackgroundDetails = isPitchDark
    ? rawDetails
        .filter((d) => !d.toLowerCase().includes('daylight') && !d.toLowerCase().includes('sun'))
        .map((d) => d.replace(/daylight/gi, 'dim interior light'))
        .concat(['Pitch-black unlit room background with ambient nighttime silence, zero outdoor sunlight'])
    : rawDetails;

  // Single coherent unified lead sentence: Subject Pose + Expression + Clothing + Lighting + Background Detail
  const unifiedLeadSentence = `A candid smartphone selfie inside a contemporary bedroom: the subject is ${pose.name.replace(/\.$/, '')}, captured with a ${exp.name.toLowerCase().replace(/\.$/, '')} while wearing ${clothing.name.toLowerCase().replace(/\.$/, '')}. The scene is illuminated by ${light.name.toLowerCase().replace(/\.$/, '')}, and ${contextualSaudiDetail}`;

  const prompt = [
    unifiedLeadSentence,
    `Subject & Appearance: A young man in his mid-20s with ${hair.name.toLowerCase()} (${hair.description}). He has a ${exp.name.toLowerCase()} (${exp.description}). He is dressed in ${clothing.name.toLowerCase()} (${clothing.description}). Real human skin with natural micro-pores, fine texture, and genuine highlight roll-off across the nose bridge and forehead, with zero plastic smoothing or airbrushed beauty filter.`,
    `Selfie Camera Setup & Body Posture: ${pose.description} Camera perspective: ${cam.name} (${cam.perspective}). ${armBiomechanicsClause} ${propClause}`,
    `Bedroom Environment & Spatial Depth: Set strictly inside a bedroom (${zone.name.toLowerCase()}: ${ctx.name.toLowerCase()}). ${spatialSettingClause} Background details: ${filteredBackgroundDetails.join(', ')}. Contemporary Saudi residential interior. Completely indoor atmosphere with natural room perspective. No outdoor elements, no cars, no public spaces.`,
    isPitchDark
      ? `Indoor Lighting & Atmosphere: ${light.name}. The room is pitch dark with zero window light or daytime illumination. Direct cool blue specular illumination radiates solely from the smartphone display held 45cm away, casting a dramatic screen-glow across the face and chest while the background falls completely into darkness. Moody, intimate late-night phone browsing atmosphere.`
      : `Indoor Lighting & Atmosphere: ${light.name} (${light.timeOfDay}). ${light.lightSource}. ${light.shadowDescription} Color temperature and ambiance: ${light.atmosphere}`,
    `Camera & Sensor Fidelity: Looks exactly like a genuine unedited photo saved to a personal smartphone camera roll. Captured on a flagship smartphone (f/1.9 aperture, 24mm equivalent lens). Natural optical depth of field with soft organic background blur, realistic dynamic range, authentic fabric creases, ${isPitchDark ? 'realistic low-light high-ISO camera sensor noise in dark shadows,' : ''} and true indoor room perspective.`
  ].filter(Boolean).join('\n\n');

  return prompt;
}

export function compileGeminiPrompt(state: SceneState): string {
  const zone = getZoneById(state.zoneId);
  const ctx = getContextById(state.contextId);
  const pose = getPoseById(state.poseId);
  const cam = getCameraById(state.cameraId);
  const light = getLightingById(state.lightingId);
  const prop = getPropById(state.propId);
  const clothing = getClothingById(state.clothingId);
  const hair = getHairstyleById(state.hairstyleId);
  const exp = getExpressionById(state.expressionId);
  const saudiDetail = getSaudiDetailById(state.saudiDetailId);

  const isMirror = cam.isMirrorMode || ctx.isMirrorContext || pose.requiresMirror;
  const isStanding = pose.postureType === 'standing' || ctx.isStandingContext;
  const isPitchDark = light.id === 'pitch_dark_screen_glow' || light.id === 'smartphone_screen_glow';

  const mechanicsSummary = isMirror
    ? `Mirror selfie setup: Handheld smartphone held at chest height in front of bedroom mirror, camera pointed into glass reflecting the subject and cozy bedroom interior behind.`
    : `Handheld front-camera selfie setup: One arm extended at natural arm reach (approx 60cm, 24-26mm focal length), one shoulder subtly elevated, camera framing upper torso and head.`;

  let propClause = '';
  if (prop.id !== 'prop_none') {
    propClause = `Secondary detail: ${prop.name} (${prop.description}).`;
  }

  // Dark room override constraint: strictly suppress any daylight or bright window details
  let contextualSaudiDetail = '';
  if (isPitchDark) {
    if (saudiDetail.id === 'detail_split_ac') {
      contextualSaudiDetail = `in the dim shadows of the dark room, a white split air conditioner mounted on the wall is faintly visible in the soft-focus background.`;
    } else if (saudiDetail.id === 'detail_chiffon_curtains') {
      contextualSaudiDetail = `in the dark room background, layered sheer chiffon curtains hang over the unlit window in deep nighttime shadows.`;
    } else {
      contextualSaudiDetail = `in the dark room background, a wooden wardrobe closet recedes into soft ambient room shadows.`;
    }
  } else {
    if (saudiDetail.id === 'detail_split_ac') {
      contextualSaudiDetail = `a white split air conditioner mounted on the wall is visible in the soft-focus contemporary bedroom background.`;
    } else if (saudiDetail.id === 'detail_chiffon_curtains') {
      contextualSaudiDetail = `layered sheer chiffon curtains hang over the window in the modern bedroom background.`;
    } else {
      contextualSaudiDetail = `a wooden wardrobe closet adds authentic lived-in warmth to the bedroom background.`;
    }
  }

  const postureSummary = isStanding
    ? `Standing posture: Standing ${pose.spatialLocation}, upright relaxed balance.`
    : `Resting posture: ${pose.spatialLocation}, natural contact with bed or bedroom furniture.`;

  // Coherent unified narrative sentence
  const unifiedLeadSentence = `Authentic handheld smartphone selfie: ${pose.name.replace(/\.$/, '')}, captured with a ${exp.name.toLowerCase().replace(/\.$/, '')}, wearing ${clothing.name.toLowerCase().replace(/\.$/, '')}. Illuminated by ${light.name.toLowerCase().replace(/\.$/, '')}, and ${contextualSaudiDetail}`;

  const prompt = [
    unifiedLeadSentence,
    `Medium close-up portrait with true smartphone front-camera wide-angle optics (24mm focal length, f/2.0 aperture). ${mechanicsSummary}`,
    `Subject: Man with ${hair.name.toLowerCase()} (${hair.description}), showing an ${exp.name.toLowerCase()} (${exp.microExpression}). Wearing ${clothing.name.toLowerCase()} (${clothing.description}). Real human skin with natural pores, fine texture, realistic subsurface scattering, and natural highlights.`,
    `Posture & Spatial Physics: ${pose.description} ${postureSummary} ${cam.phoneGrip} ${propClause}`,
    isPitchDark
      ? `Environment: Private contemporary bedroom interior (${zone.name}: ${ctx.name}). The room is pitch dark; no daylight or window light. Background elements such as ${saudiDetail.id === 'detail_split_ac' ? 'the wall-mounted split air conditioner' : 'the room furniture'} are faintly discernible in the soft-focus darkness. 100% indoors.`
      : `Environment: Private bedroom interior (${zone.name}: ${ctx.name}). Details: ${zone.bedroomDetails.join(', ')}. Contemporary Saudi residential setting. Cozy, lived-in everyday bedroom atmosphere. Completely indoors.`,
    isPitchDark
      ? `Illumination: ${light.name}. The space is dark; illumination comes solely from the cool blue light of the smartphone screen held near the face, creating dramatic specular screen catchlights in the eyes and casting soft falloff onto the chest.`
      : `Illumination: ${light.name}. ${light.lightSource}. ${light.shadowDescription} Ambient mood: ${light.atmosphere}`,
    `Sensor & Aesthetics: Authentic mobile phone snapshot from camera roll, restrained HDR tone mapping, genuine skin texture, ${isPitchDark ? 'authentic high-ISO sensor noise in dark low-light shadow areas,' : ''} zero artificial CGI smoothing, zero DSLR compression, 100% natural candid selfie realism.`
  ].filter(Boolean).join('\n\n');

  return prompt;
}

export function compilePrompt(state: SceneState): CompiledPromptResult {
  const zone = getZoneById(state.zoneId);
  const ctx = getContextById(state.contextId);
  const cam = getCameraById(state.cameraId);
  const light = getLightingById(state.lightingId);
  const clothing = getClothingById(state.clothingId);
  const hair = getHairstyleById(state.hairstyleId);
  const exp = getExpressionById(state.expressionId);
  const saudiDetail = getSaudiDetailById(state.saudiDetailId);

  return {
    chatgpt: compileChatGPTImagesPrompt(state),
    gemini: compileGeminiPrompt(state),
    coherenceSummary: {
      zoneBrief: `${zone.name} (${ctx.name}) - Private bedroom interior`,
      contextBrief: `${ctx.name} - ${ctx.description}`,
      cameraBrief: `${cam.name} (${cam.isMirrorMode ? 'Mirror Reflection' : 'Handheld Arm Reach ~60cm'})`,
      lightingBrief: `${light.name.split(',')[0]} (${light.timeOfDay})`,
      saudiDetailBrief: `${saudiDetail.name.split(',')[0]}`,
      appearanceBrief: `${clothing.name.split(',')[0]} · ${hair.name.split('&')[0]} · ${exp.name.split(',')[0]}`,
    },
  };
}
