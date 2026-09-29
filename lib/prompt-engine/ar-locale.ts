/**
 * Visual UI Mask: Bedroom Selfie Localization Dictionary
 * CRITICAL RULE:
 * The underlying Physics, Camera, Spatial-Consistency, and Prompt Generation Engine
 * remain 100% in English. The UI mapping layer translates purely for visual display.
 */

export const BEDROOM_ZONES_AR: Record<string, { labelAr: string; tooltipAr: string; tagAr: string }> = {
  on_the_bed: {
    labelAr: 'على السرير',
    tooltipAr: 'استرخاء مريح على السرير مع لحاف قطني ناعم ووسائد مريحة خلف الظهر.',
    tagAr: 'السرير واللحاف والوسائد',
  },
  bedroom_window: {
    labelAr: 'بجانب نافذة الغرفة',
    tooltipAr: 'وقوف بجانب نافذة غرفة النوم مع تدفق ضوء النهار الطبيعي وستائر خفيفة.',
    tagAr: 'نافذة الغرفة والستائر',
  },
  bedroom_mirror: {
    labelAr: 'أمام مرآة الغرفة (كاملة/تسريحة)',
    tooltipAr: 'وقفة سيلفي أمام مرآة الغرفة مع ظهور انعكاس الغرفة والجوال باليد.',
    tagAr: 'مرآة كاملة أو تسريحة',
  },
  bedroom_middle: {
    labelAr: 'في منتصف الغرفة',
    tooltipAr: 'وقوف في المساحة المفتوحة لغرفة النوم مع ظهور السرير بالخلفية.',
    tagAr: 'وسط الغرفة والسرير بالخلف',
  },
  bedroom_wardrobe: {
    labelAr: 'بجوار خزانة الملابس (الدولاب)',
    tooltipAr: 'وقوف بجانب خزانة الملابس الخشبية في لقطة عفوية هادئة.',
    tagAr: 'دولاب الملابس والجدار',
  },
  bedroom_door: {
    labelAr: 'بالقرب من باب الغرفة',
    tooltipAr: 'وقوف بالقرب من باب الغرفة المغلق وجدار الغرفة الداخلي.',
    tagAr: 'باب الغرفة والجدار',
  },
  bedroom_chair: {
    labelAr: 'استرخاء على كرسي الغرفة',
    tooltipAr: 'جلسة هادئة ومريحة في كرسي زاوية الغرفة الوثير أو كرسي المكتب.',
    tagAr: 'كرسي مريح وزاوية هادئة',
  },
};

export const BEDROOM_CONTEXTS_AR: Record<string, { labelAr: string; tooltipAr: string }> = {
  // Bed contexts
  propped_against_headboard: {
    labelAr: 'مستند على وسائد السرير',
    tooltipAr: 'جلوس مريح في السرير مع استناد الظهر والرأس على وسائد مرتبة خلف الهيدبورد.',
  },
  lying_back_on_bed: {
    labelAr: 'مستلقٍ بأريحية على المرتبة',
    tooltipAr: 'استلقاء على الظهر أو الجنب مع رفع الهاتف باليد بمدى ذراع طبيعي.',
  },
  sitting_on_bed_edge: {
    labelAr: 'جلوس على حافة السرير',
    tooltipAr: 'جلسة عفوية على طرف المرتبة مع ملامسة القدمين لسجادة الأرضية.',
  },

  // Standing contexts (Window, Mirror, Middle, Wardrobe, Door)
  standing_by_curtain: {
    labelAr: 'وقوف: بجانب نافذة الغرفة',
    tooltipAr: 'وقوف بجانب نافذة الغرفة مع ستائر خفيفة بالخلفية وسيلفي أمامي بمد الذراع.',
  },
  sitting_by_window_sill: {
    labelAr: 'جلوس بجانب عتبة النافذة',
    tooltipAr: 'جلسة هادئة عند عتبة النافذة مع سيلفي أمامي بالضوء الطبيعي.',
  },
  standing_mirror_full_length_ctx: {
    labelAr: 'وقوف: سيلفي أمام مرآة الغرفة',
    tooltipAr: 'وقوف أمام مرآة كاملة، الهاتف ظاهر بوضوح باليد مع انعكاس الجسم والغرفة.',
  },
  standing_vanity_mirror: {
    labelAr: 'وقوف أمام مرآة التسريحة',
    tooltipAr: 'سيلفي مرآة يظهر الجزء العلوي من الجسم والهاتف محمولاً بوضوح أمام المرآة.',
  },
  standing_middle_bedroom_ctx: {
    labelAr: 'وقوف: في منتصف الغرفة',
    tooltipAr: 'وقوف في منتصف الغرفة والسرير ظاهر بالخلفية بشكل ضبابي خفيف.',
  },
  standing_wardrobe_ctx: {
    labelAr: 'وقوف: بجوار خزانة الملابس (الدولاب)',
    tooltipAr: 'وقوف بجوار الدولاب في لقطة عفوية بكاميرا الجوال الأمامية.',
  },
  standing_door_ctx: {
    labelAr: 'وقوف: بالقرب من باب الغرفة',
    tooltipAr: 'وقوف بالقرب من باب الغرفة المغلق مع إظهار جدار الغرفة.',
  },

  // Chair contexts
  lounging_accent_armchair: {
    labelAr: 'استرخاء في كرسي الزاوية الوثير',
    tooltipAr: 'استقرار في الكرسي المريح مع سند الكوع على المسند وحمل الهاتف.',
  },
  bedroom_desk_chair: {
    labelAr: 'جلوس مريح على كرسي المكتب',
    tooltipAr: 'جلسة عفوية على كرسي المكتب داخل الغرفة بوضعية استرخاء.',
  },
};

export const BEDROOM_POSES_AR: Record<string, { labelAr: string; tooltipAr: string }> = {
  // --- 5 EXACT SPATIAL STANDING POSES ---
  standing_mirror_full_length: {
    labelAr: 'وقوف: سيلفي أمام مرآة الغرفة',
    tooltipAr: 'وقوف أمام مرآة الغرفة الكاملة، الهاتف ظاهر بوضوح باليد في الانعكاس.',
  },
  standing_middle_of_bedroom: {
    labelAr: 'وقوف: في منتصف الغرفة',
    tooltipAr: 'وقوف في منتصف الغرفة، السرير بالخلفية بضبابية ناعمة، سيلفي أمامي بذراع ممتدة.',
  },
  standing_next_to_window: {
    labelAr: 'وقوف: بجانب نافذة الغرفة',
    tooltipAr: 'وقوف بجانب نافذة الغرفة مباشرة، ستائر النافذة بالخلفية، سيلفي أمامي بذراع ممتدة.',
  },
  standing_beside_wardrobe: {
    labelAr: 'وقوف: بجوار خزانة الملابس (الدولاب)',
    tooltipAr: 'وقوف بجوار دولاب الملابس، لقطة منزلية عفوية، سيلفي أمامي بذراع ممتدة.',
  },
  standing_near_bedroom_door: {
    labelAr: 'وقوف: بالقرب من باب الغرفة',
    tooltipAr: 'وقوف بالقرب من باب الغرفة المغلق، جدار الغرفة بالخلفية، سيلفي أمامي بذراع ممتدة.',
  },

  // Auxiliary standing poses
  standing_mirror_casual_lean: {
    labelAr: 'اتكاء على جانب المرآة/الجدار',
    tooltipAr: 'اتكاء خفيف بالكتف وحمل الهاتف بزاوية هادئة أمام المرآة.',
  },
  standing_window_quarter_turn: {
    labelAr: 'التفاتة ربع دائرية عند النافذة',
    tooltipAr: 'الجذع مائل قليلاً والرأس ملتفت بهدوء نحو ضوء النافذة.',
  },

  // Bed & Seated poses
  propped_bed_one_handed: {
    labelAr: 'مستند في السرير (يد ممتدة بالهاتف)',
    tooltipAr: 'ذراع واحدة ممتدة للأمام بمسافة 60سم لحمل الجوال، واليد الأخرى مسترخية على اللحاف.',
  },
  headboard_casual_tilt: {
    labelAr: 'إمالة الرأس على الوسادة (يد ممتدة)',
    tooltipAr: 'الرأس مائل برفق على وسادة بيضاء ناعمة مع حمل الهاتف بزاوية مرتفعة قليلاً.',
  },
  hand_on_cheek_bed: {
    labelAr: 'كوع مرتكز على السرير (يد قرب الخد)',
    tooltipAr: 'ارتكاز الكوع الحر على المرتبة ومساندة الخد، بينما اليد الأخرى تحمل الجوال.',
  },
  lying_overhead_selfie: {
    labelAr: 'مستلقٍ على الظهر (الهاتف للأعلى)',
    tooltipAr: 'استلقاء على السرير ورفع الهاتف بمدى الذراع للأعلى بزاوية عمودية مريحة.',
  },
  lying_pillow_rest: {
    labelAr: 'مستلقٍ على الجنب (لقطة وسادة قريبة)',
    tooltipAr: 'نوم على الجنب والوجه قريب من الوسادة مع لقطة سيلفي حميمة وعفوية.',
  },
  bed_edge_casual_sit: {
    labelAr: 'جلوس على حافة السرير (كوع على الركبة)',
    tooltipAr: 'جلسة عادية على طرف السرير، يد ممتدة بالجوال والأخرى مستندة على الركبة.',
  },
  bed_edge_forward_lean: {
    labelAr: 'جلوس حافة السرير (حمل باليدين)',
    tooltipAr: 'حمل الهاتف بكلتا اليدين أمام الصدر مع ابتسامة هادئة نحو الشاشة.',
  },
  window_sill_sit: {
    labelAr: 'جلوس بجانب النافذة (وضعية مريحة)',
    tooltipAr: 'جلسة هادئة ويد تحمل الهاتف بمدى ذراع مناسب لالتقاط الضوء الطبيعي.',
  },
  chair_lounging_selfie: {
    labelAr: 'استرخاء في الكرسي (كوع على المسند)',
    tooltipAr: 'ارتكاز الكوع على مسند الكرسي ومد الهاتف بزاوية 55سم نحو الوجه.',
  },
  chair_elbow_lean: {
    labelAr: 'انحناء خفيف للأمام على الكرسي',
    tooltipAr: 'جلسة متفاعلة مع إمالة الرأس وحمل الهاتف بمدى طبيعي.',
  },
};

export const BEDROOM_CAMERAS_AR: Record<string, { labelAr: string; tooltipAr: string }> = {
  front_camera_eye_level: {
    labelAr: 'كاميرا الجوال الأمامية (مستوى العين 24مم)',
    tooltipAr: 'امتداد ذراع يدوي حقيقي (~60سم) بزاوية واسعة طبيعية تحاكي كاميرا الجوال الأمامية بدقة.',
  },
  front_camera_high_angle: {
    labelAr: 'كاميرا الجوال الأمامية (زاوية علوية لأسفل)',
    tooltipAr: 'رفع الجوال فوق مستوى الجبين وإمالته للأسفل بزاوية 15-20 درجة تبرز تفاصيل الغرفة.',
  },
  front_camera_chest_tilt: {
    labelAr: 'كاميرا الجوال الأمامية (زاوية الصدر للأعلى)',
    tooltipAr: 'حمل الهاتف بمستوى الصدر مع إمالة بسيطة للأعلى تلتقط سقف الغرفة والأجواء المحيطة.',
  },
  mirror_selfie_handheld: {
    labelAr: 'سيلفي المرآة (انعكاس حقيقي للهاتف باليد)',
    tooltipAr: 'توجيه الكاميرا الخلفية للمرآة مع ظهور الهاتف باليد وتفاصيل الملابس والغرفة بالخلفية.',
  },
};

export const BEDROOM_LIGHTING_AR: Record<string, { labelAr: string; tooltipAr: string }> = {
  bright_morning_daylight: {
    labelAr: 'شمس الصباح الساطعة من النافذة',
    tooltipAr: 'ضوء نهار صباحي مشرق يتدفق عبر النافذة مع ظلال ناعمة طبيعية على الوجه.',
  },
  warm_tungsten_nightstand_lamp: {
    labelAr: 'إضاءة ليلية دافئة (أبجورة)',
    tooltipAr: 'إضاءة أباجورة الطاولة الجانبية للسرير، أجواء داخلية مسائية حميمة مع ظلال هادئة.',
  },
  pitch_dark_screen_glow: {
    labelAr: 'ظلام مع إضاءة شاشة الجوال فقط',
    tooltipAr: 'غرفة مظلمة تماماً مع إضاءة باردة من شاشة الهاتف فقط تسطع بوهج درامي على الوجه، مع حجب أي ضوء نافذة أو نهار.',
  },
  overhead_room_light: {
    labelAr: 'إضاءة الغرفة العلوية',
    tooltipAr: 'إضاءة السقف العلوية الموزعة لغرفة النوم بنغمات دافئة متوازنة واقعية.',
  },
  // Backward compatibility aliases
  natural_window_daylight: {
    labelAr: 'شمس الصباح الساطعة من النافذة',
    tooltipAr: 'ضوء نهار صباحي مشرق يتدفق عبر النافذة مع ظلال ناعمة طبيعية على الوجه.',
  },
  warm_nightstand_lamp: {
    labelAr: 'إضاءة ليلية دافئة (أبجورة)',
    tooltipAr: 'إضاءة أباجورة الطاولة الجانبية للسرير، أجواء داخلية مسائية حميمة مع ظلال هادئة.',
  },
  smartphone_screen_glow: {
    labelAr: 'ظلام مع إضاءة شاشة الجوال فقط',
    tooltipAr: 'غرفة مظلمة تماماً مع إضاءة باردة من شاشة الهاتف فقط تسطع بوهج درامي على الوجه، مع حجب أي ضوء نافذة أو نهار.',
  },
};

export const BEDROOM_PROPS_AR: Record<string, { labelAr: string; tooltipAr: string }> = {
  prop_none: {
    labelAr: 'بدون إكسسوار (اليد بالجيب/حرة)',
    tooltipAr: 'اليد الحرة مسترخية بجانب الجسم أو داخل جيب الشورت.',
  },
  prop_mug_tea: {
    labelAr: 'كوب شاي/قهوة خزفي دافئ',
    tooltipAr: 'كوب شاي دافئ على الكومودينة أو محمول باليد الحرة بارتياح.',
  },
  prop_airpods_case: {
    labelAr: 'سماعة أذن لاسلكية مفردة',
    tooltipAr: 'سماعة بيضاء صغيرة في إحدى الأذنين للاستماع داخل الغرفة.',
  },
  prop_reading_book: {
    labelAr: 'كتاب قراءة في الجوار',
    tooltipAr: 'كتاب قراءة ورقي مستقر بجانب المخدات أو على الطاولة الجانبية.',
  },
};

export const BEDROOM_CLOTHING_AR: Record<string, { labelAr: string; tooltipAr: string }> = {
  // --- 5 EXACT USER REQUESTED CASUAL T-SHIRTS & SHORTS ---
  clothing_oversized_tshirt_shorts: {
    labelAr: 'تيشيرت واسع مريح وشورت قطني',
    tooltipAr: 'تيشيرت كاجوال مريح أوفرسايز من القطن الناعم مع شورت منزلي قطني مريح.',
  },
  clothing_athletic_tshirt_shorts: {
    labelAr: 'تيشيرت رياضي وشورت قصير',
    tooltipAr: 'تيشيرت رياضي ملائم للجسم مع شورت تدريب قصير وخفيف الملمس.',
  },
  clothing_classic_tshirt_denim_shorts: {
    labelAr: 'تيشيرت سادة كلاسيكي وشورت جينز',
    tooltipAr: 'تيشيرت قطني سادة كلاسيكي مع شورت جينز كاجوال عصري ومريح.',
  },
  clothing_matching_summer_sleepwear: {
    labelAr: 'بدلة نوم صيفية (تيشيرت وشورت متطابق)',
    tooltipAr: 'طقم ملابس نوم صيفي متطابق وخفيف الوزن مكون من تيشيرت وشورت ناعم.',
  },
  clothing_sleeveless_tank_shorts: {
    labelAr: 'تيشيرت بدون أكمام وشورت خفيف',
    tooltipAr: 'فانيلة بدون أكمام (تانك توب) مع شورت خفيف مسامي للاسترخاء المنزلي.',
  },

  // Additional options
  clothing_bedroom_soft_tee_shorts: {
    labelAr: 'تيشيرت رمادي قطني ناعم وشورت منزلي',
    tooltipAr: 'تيشيرت قطني مريح مغسول بلون رمادي فاتح مع شورت مريح للاسترخاء المنزلي.',
  },
  clothing_minimal_white_undershirt: {
    labelAr: 'فانيلة قطنية بيضاء كلاسيكية وشورت',
    tooltipAr: 'فانيلة قطنية مضلعة بيضاء مريحة وشورت نوم منزلي خفيف.',
  },
  clothing_relaxed_thobe_nom: {
    labelAr: 'ثوب نوم منزلي خفيف ومريح',
    tooltipAr: 'ثوب نوم سعودي منزلي فضفاض بقماش قطني بارد ومريح لغرفة النوم.',
  },
  clothing_hoodie_sweatpants: {
    labelAr: 'هودي شتوي دافئ وبنطال مريح',
    tooltipAr: 'هودي قطني ناعم بلون رملي أو بيج مع بنطال رياضي مريح لأجواء غرفة دافئة.',
  },
  clothing_cotton_pajama_set: {
    labelAr: 'طقم بيجاما نوم قطنية مخططة',
    tooltipAr: 'طقم بيجاما كلاسيكي مريح بخطوط زرقاء أو رمادية أنيقة لأجواء النوم.',
  },
};

export const BEDROOM_HAIRSTYLES_AR: Record<string, { labelAr: string; tooltipAr: string }> = {
  hair_casual_bedhead_stubble: {
    labelAr: 'شعر نوم طبيعي عفوي (بيدهيد) ولحية خفيفة',
    tooltipAr: 'شعر داكن بملمس الاستيقاظ العفوي الطبيعي مع لحية خفيفة يومين غير مبالغ بها.',
  },
  hair_low_fade_textured: {
    labelAr: 'تدريج واطي مع شعر قصير ولحية مرتبة',
    tooltipAr: 'تدريج أطراف نظيف مع شعر قصير محدد ولحية قصيرة مهندمة بدقة.',
  },
  hair_buzz_fade: {
    labelAr: 'قصة شعر قصيرة جداً (بز كت) مع ظل لحية',
    tooltipAr: 'شعر محلوق قصير مع ظل خفيف على الفك يعكس البساطة والراحة.',
  },
  hair_wavy_dark_messy: {
    labelAr: 'شعر مموج طبيعي عفوي وعوارض خفيفة',
    tooltipAr: 'خصلات داكنة مموجة بعفوية منزلية هادئة تعطي إحساساً مريحاً غير متكلف.',
  },
};

export const BEDROOM_EXPRESSIONS_AR: Record<string, { labelAr: string; tooltipAr: string }> = {
  // 3 New Candid Facial Expressions (Exact User Requirements)
  exp_sleepy_candid_morning: {
    labelAr: 'ابتسامة نعاس صباحية عفوية',
    tooltipAr: 'ابتسامة نعاس صباحية عفوية مع جفون ثقيلة مسترخية ونظرة دافئة هادئة.',
  },
  exp_serious_focused_mirror: {
    labelAr: 'نظرة جدية (سيلفي المرآة)',
    tooltipAr: 'نظرة جادة وهادئة ومركزة نحو شاشة الجوال أثناء التقاط السيلفي أمام المرآة.',
  },
  exp_getting_ready_confident: {
    labelAr: 'استعداد للخروج (نظرة ثقة)',
    tooltipAr: 'نظرة تفقد المظهر قبل الخروج مع نصف ابتسامة واثقة وهادئة أمام الكاميرا.',
  },

  // Auxiliary expressions
  exp_sleepy_relaxed_smile: {
    labelAr: 'ابتسامة نعاس صباحية عفوية',
    tooltipAr: 'ابتسامة نعاس صباحية عفوية مع جفون ثقيلة مسترخية ونظرة دافئة هادئة.',
  },
  exp_calm_neutral_direct: {
    labelAr: 'نظرة هادئة ومباشرة لشاشة الجوال',
    tooltipAr: 'عينان هادئتان باتجاه شاشة الهاتف والعدسة الأمامية مباشرة دون تصنع.',
  },
  exp_candid_glance_away: {
    labelAr: 'نظرة عفوية خاطفة بعيداً عن العدسة',
    tooltipAr: 'العينان متجهتان بهدوء نحو زاوية الغرفة في لقطة عفوية.',
  },
  exp_playful_smirk_head_tilt: {
    labelAr: 'نصف ابتسامة مرحة مع إمالة الرأس',
    tooltipAr: 'ملامح ودودة غير متكلفة مع إمالة عفوية خفيفة للرأس تعبر عن الارتياح.',
  },
};

export const SAUDI_BEDROOM_DETAILS_AR: Record<string, { labelAr: string; tooltipAr: string }> = {
  detail_split_ac: {
    labelAr: 'عادية مع مكيف سبلت بالخلفية',
    tooltipAr: 'غرفة نوم معاصرة عادية، مكيف سبلت جداري أبيض ظاهر في الخلفية بنعومة خارج التركيز.',
  },
  detail_chiffon_curtains: {
    labelAr: 'عصرية مع ستائر شيفون مزدوجة',
    tooltipAr: 'ديكور غرفة نوم عصرية، ستائر شيفون مزدوجة وشفافة تغطي النافذة بالخلفية.',
  },
  detail_wardrobe_closet: {
    labelAr: 'عفوية مع خزانة ملابس (دولاب)',
    tooltipAr: 'أجواء غرفة نوم عفوية ودافئة، خزانة ملابس خشبية (دولاب) ظاهرة بالخلفية.',
  },
};

export const BEDROOM_PRESETS_AR: Record<string, { titleAr: string; taglineAr: string }> = {
  preset_window_sleeveless_selfie: {
    titleAr: 'وقوف عند النافذة (تانك توب وشورت)',
    taglineAr: 'وقوف بجانب النافذة، تيشيرت بدون أكمام وشورت خفيف، ضوء نهار طبيعي',
  },
  preset_standing_mirror_full: {
    titleAr: 'وقوف: سيلفي مرآة الغرفة الكاملة',
    taglineAr: 'وقوف أمام المرآة، تيشيرت رياضي وشورت قصير، انعكاس الجوال والغرفة',
  },
  preset_standing_middle_bedroom: {
    titleAr: 'وقوف: في منتصف الغرفة',
    taglineAr: 'وقوف بمنتصف الغرفة، تيشيرت واسع مريح وشورت قطني، السرير بالخلفية',
  },
  preset_bed_warm_lamp: {
    titleAr: 'على السرير مع أبجورة دافئة',
    taglineAr: 'استناد في السرير، إضاءة أباجورة 2700K دافئة، ولحاف قطني مريح',
  },
  preset_late_night_screen_glow: {
    titleAr: 'وهج شاشة الجوال في الظلام',
    taglineAr: 'غرفة نوم مظلمة تماماً، والوجه مضاء بنقاء شاشة الهاتف فقط',
  },
  preset_standing_wardrobe_closet: {
    titleAr: 'وقوف: بجوار خزانة الملابس',
    taglineAr: 'وقوف بجوار الدولاب، تيشيرت سادة كلاسيكي وشورت جينز، سيلفي أمامي',
  },
};

export const BEDROOM_UI_STRINGS = {
  appName: 'محرّك سيلفي غرفة النوم',
  appSubtitle: 'توليد برومبتات سيلفي واقعية وحصرية لغرفة النوم بالجوال',
  bedroomBadge: 'بيئة غرفة النوم الحصرية',
  chatgptLabel: 'ChatGPT',
  geminiLabel: 'Gemini',
  presetsTitle: 'مشاهد غرفة النوم الجاهزة',
  presetsSubtitle: 'تركيبات واقعية منسقة للوقوف والسرير والمرآة بنقرة واحدة',
  compiledPromptTitle: 'البرومبت الإنجليزي المُولّد',
  copyPrompt: 'نسخ البرومبت',
  copiedSuccess: 'تم النسخ بنجاح!',
  breakdownToggle: 'مصفوفة التناسق',
  evaluateButton: 'فحص الواقعية وفيزياء سيلفي الغرفة عبر Gemini',
  evaluatingStatus: 'جاري فحص واقعية سيلفي الغرفة عبر Gemini...',
  directorAnalysisTitle: 'تقرير خبير الإخراج الفوتوغرافي',
  armReachBadge: 'يد مشغولة بالهاتف حتماً (~60سم)',
  indoorOnlyBadge: 'بيئة غرفة نوم داخلية 100%',
  cameraRollBadge: 'لقطة كاميرا جوال حقيقية (بدون DSLR)',
  wordsCount: 'كلمة',
  charsCount: 'حرف',
  resetDefaults: 'إعادة ضبط افتراضي',
  activeSummaryTitle: 'ملخص المشهد الحالي',
  duvetTextureToggle: 'إبراز تفاصيل الغرفة والأقمشة',
  duvetTextureDesc: 'محاكاة طيات القماش والأثاث المنزلي لمزيد من الواقعية اليومية',
  tabs: {
    zone: 'زاوية الغرفة والوقوف',
    appearance: 'الملابس والمظهر',
    pose: 'وضعية السيلفي',
    camera: 'الكاميرا والزاوية',
    lighting: 'إضاءة الغرفة',
  },
};
