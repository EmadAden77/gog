import { SceneState } from './types';

export interface BedroomPreset {
  id: string;
  title: string;
  tagline: string;
  category: 'bed' | 'mirror' | 'window' | 'chair' | 'standing';
  state: Partial<SceneState>;
}

export const BEDROOM_PRESETS: BedroomPreset[] = [
  {
    id: 'preset_window_sleeveless_selfie',
    title: 'Standing by Window (Sleeveless Tank & Shorts)',
    tagline: 'Standing right next to window, sleeveless tank top and breathable shorts, soft natural daylight',
    category: 'standing',
    state: {
      zoneId: 'bedroom_window',
      contextId: 'standing_by_curtain',
      poseId: 'standing_next_to_window',
      cameraId: 'front_camera_eye_level',
      lightingId: 'bright_morning_daylight',
      saudiDetailId: 'detail_chiffon_curtains',
      propId: 'prop_none',
      clothingId: 'clothing_sleeveless_tank_shorts',
      hairstyleId: 'hair_casual_bedhead_stubble',
      expressionId: 'exp_sleepy_candid_morning',
    },
  },
  {
    id: 'preset_standing_mirror_full',
    title: 'Standing Mirror Selfie (Athletic Tee & Shorts)',
    tagline: 'Standing in front of full-length bedroom mirror, fitted athletic t-shirt and short sports shorts',
    category: 'mirror',
    state: {
      zoneId: 'bedroom_mirror',
      contextId: 'standing_mirror_full_length_ctx',
      poseId: 'standing_mirror_full_length',
      cameraId: 'mirror_selfie_handheld',
      lightingId: 'overhead_room_light',
      saudiDetailId: 'detail_split_ac',
      propId: 'prop_none',
      clothingId: 'clothing_athletic_tshirt_shorts',
      hairstyleId: 'hair_low_fade_textured',
      expressionId: 'exp_serious_focused_mirror',
    },
  },
  {
    id: 'preset_standing_middle_bedroom',
    title: 'Standing in Middle of Bedroom (Cozy Tee & Shorts)',
    tagline: 'Standing in the center of the bedroom, oversized cozy casual t-shirt and cotton lounge shorts',
    category: 'standing',
    state: {
      zoneId: 'bedroom_middle',
      contextId: 'standing_middle_bedroom_ctx',
      poseId: 'standing_middle_of_bedroom',
      cameraId: 'front_camera_eye_level',
      lightingId: 'overhead_room_light',
      saudiDetailId: 'detail_split_ac',
      propId: 'prop_none',
      clothingId: 'clothing_oversized_tshirt_shorts',
      hairstyleId: 'hair_casual_bedhead_stubble',
      expressionId: 'exp_getting_ready_confident',
    },
  },
  {
    id: 'preset_standing_wardrobe_closet',
    title: 'Standing Beside Wardrobe (Classic Tee & Denim Shorts)',
    tagline: 'Standing beside closet doors, classic plain cotton t-shirt and casual denim shorts',
    category: 'standing',
    state: {
      zoneId: 'bedroom_wardrobe',
      contextId: 'standing_wardrobe_ctx',
      poseId: 'standing_beside_wardrobe',
      cameraId: 'front_camera_eye_level',
      lightingId: 'overhead_room_light',
      saudiDetailId: 'detail_wardrobe_closet',
      propId: 'prop_none',
      clothingId: 'clothing_classic_tshirt_denim_shorts',
      hairstyleId: 'hair_wavy_dark_messy',
      expressionId: 'exp_getting_ready_confident',
    },
  },
  {
    id: 'preset_bed_warm_lamp',
    title: 'Cozy Bed & Nightstand Lamp',
    tagline: 'Propped in bed, warm 2700K bedside lamp glow, soft matching summer sleepwear',
    category: 'bed',
    state: {
      zoneId: 'on_the_bed',
      contextId: 'propped_against_headboard',
      poseId: 'propped_bed_one_handed',
      cameraId: 'front_camera_eye_level',
      lightingId: 'warm_tungsten_nightstand_lamp',
      saudiDetailId: 'detail_split_ac',
      propId: 'prop_none',
      clothingId: 'clothing_matching_summer_sleepwear',
      hairstyleId: 'hair_casual_bedhead_stubble',
      expressionId: 'exp_sleepy_candid_morning',
    },
  },
  {
    id: 'preset_late_night_screen_glow',
    title: 'Late-Night Screen Glow in Dark',
    tagline: 'Pitch dark bedroom, face illuminated solely by the smartphone display',
    category: 'bed',
    state: {
      zoneId: 'on_the_bed',
      contextId: 'lying_back_on_bed',
      poseId: 'lying_overhead_selfie',
      cameraId: 'front_camera_high_angle',
      lightingId: 'pitch_dark_screen_glow',
      saudiDetailId: 'detail_split_ac',
      propId: 'prop_airpods_case',
      clothingId: 'clothing_minimal_white_undershirt',
      hairstyleId: 'hair_casual_bedhead_stubble',
      expressionId: 'exp_sleepy_candid_morning',
    },
  },
];
