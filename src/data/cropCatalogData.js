/**
 * CENTRALIZED CROP CATALOG & PHOTOGRAPHY DICTIONARY (SINGLE SOURCE OF TRUTH)
 * Strictly audited authentic real JPG agricultural photography for all crops.
 */

export const CROP_PHOTOGRAPHY = {
  Groundnut: "/images/crops/groundnut.jpg",
  Tomato: "/images/crops/tomato.jpg",
  Onion: "/images/crops/onion.jpg",
  Rice: "/images/crops/rice.jpg",
  Wheat: "/images/crops/wheat.jpg",
  Cotton: "/images/crops/cotton.jpg",
  Turmeric: "/images/crops/turmeric.jpg",
  Sugarcane: "/images/crops/sugarcane.jpg",
  Coffee: "/images/crops/coffee.jpg",
  Jute: "/images/crops/jute.jpg",
  Maize: "/images/crops/maize.jpg",
  Jowar: "/images/crops/jowar.jpg",
  Bajra: "/images/crops/bajra.jpg",
  Ragi: "/images/crops/ragi.jpg",
  "Red Gram (Tur)": "/images/crops/red-gram.jpg",
  "Green Gram (Moong)": "/images/crops/green-gram.jpg",
  "Black Gram (Urad)": "/images/crops/black-gram.jpg",
  "Bengal Gram (Chana)": "/images/crops/chana.jpg",
  Masoor: "/images/crops/masoor.jpg",
  Cowpea: "/images/crops/cowpea.jpg",
  FieldPea: "/images/crops/field-pea.jpg",
  Sesame: "/images/crops/sesame.jpg",
  Sunflower: "/images/crops/sunflower.jpg",
  Soybean: "/images/crops/soybean.jpg",
  Mustard: "/images/crops/mustard.jpg",
  Castor: "/images/crops/castor.jpg"
};

export const CROP_ICONS = {
  Groundnut: "🥜",
  Tomato: "🍅",
  Onion: "🧅",
  Rice: "🌾",
  Wheat: "🌾",
  Cotton: "☁️",
  Turmeric: "🟡",
  Sugarcane: "🎋",
  Coffee: "☕",
  Jute: "🌿",
  Maize: "🌽",
  Jowar: "🌾",
  Bajra: "🌾",
  Ragi: "🌾",
  "Red Gram (Tur)": "🫘",
  "Green Gram (Moong)": "🫘",
  "Black Gram (Urad)": "🫘",
  "Bengal Gram (Chana)": "🫘",
  Masoor: "🫘",
  Cowpea: "🫘",
  FieldPea: "🫛",
  Sesame: "🌱",
  Sunflower: "🌻",
  Soybean: "🫘",
  Mustard: "🌼",
  Castor: "🌱"
};

export const CROP_METADATA = {
  Groundnut: {
    category: "OILSEEDS",
    market: "Chevella Market",
    region: "Telangana / AP",
    basePrice: 6300,
    demand: 84,
    trend: 6.4,
    buyers: 18,
    storageRisk: 35,
    unit: "quintal"
  },
  Tomato: {
    category: "VEGETABLES",
    market: "Chevella Market",
    region: "Telangana / AP",
    basePrice: 2420,
    demand: 82,
    trend: 12.0,
    buyers: 24,
    storageRisk: 50,
    unit: "quintal"
  },
  Onion: {
    category: "VEGETABLES",
    market: "Nashik Yard",
    region: "Maharashtra",
    basePrice: 3100,
    demand: 88,
    trend: 8.2,
    buyers: 30,
    storageRisk: 40,
    unit: "quintal"
  },
  Rice: {
    category: "CEREALS",
    market: "Warangal Yard",
    region: "Telangana",
    basePrice: 2800,
    demand: 90,
    trend: 4.1,
    buyers: 20,
    storageRisk: 20,
    unit: "quintal"
  },
  Wheat: {
    category: "CEREALS",
    market: "Ludhiana Market",
    region: "Punjab",
    basePrice: 2280,
    demand: 78,
    trend: 3.2,
    buyers: 16,
    storageRisk: 22,
    unit: "quintal"
  },
  Cotton: {
    category: "COMMERCIAL",
    market: "Nagpur Yard",
    region: "Maharashtra",
    basePrice: 7100,
    demand: 85,
    trend: 5.5,
    buyers: 15,
    storageRisk: 30,
    unit: "quintal"
  },
  Turmeric: {
    category: "COMMERCIAL",
    market: "Nizamabad Yard",
    region: "Telangana",
    basePrice: 13500,
    demand: 92,
    trend: 9.1,
    buyers: 22,
    storageRisk: 25,
    unit: "quintal"
  }
};

/**
 * Image Priority Resolver
 * Hierarchy: Farmer Uploaded Photo -> Exact Match -> Case Insensitive / Alias Match -> Groundnut Local Photo Fallback
 */
export function getCropImage(cropName, farmerPhotoUrl = null) {
  if (farmerPhotoUrl) return farmerPhotoUrl;
  if (!cropName) return CROP_PHOTOGRAPHY["Groundnut"];

  const trimmed = String(cropName).trim();

  // 1. Direct Match
  if (CROP_PHOTOGRAPHY[trimmed]) return CROP_PHOTOGRAPHY[trimmed];

  // 2. Case-Insensitive & Multilingual Alias Match
  const normalized = trimmed.toLowerCase();
  if (normalized.includes("groundnut") || normalized.includes("peanut") || normalized.includes("పల్లీ") || normalized.includes("మూంగఫలీ")) {
    return CROP_PHOTOGRAPHY["Groundnut"];
  }
  if (normalized.includes("tomato") || normalized.includes("టమాటా") || normalized.includes("टमाटर")) {
    return CROP_PHOTOGRAPHY["Tomato"];
  }
  if (normalized.includes("onion") || normalized.includes("ఉల్లి") || normalized.includes("प्याज")) {
    return CROP_PHOTOGRAPHY["Onion"];
  }
  if (normalized.includes("rice") || normalized.includes("paddy") || normalized.includes("వరి") || normalized.includes("चावल")) {
    return CROP_PHOTOGRAPHY["Rice"];
  }
  if (normalized.includes("wheat") || normalized.includes("గోధుమ") || normalized.includes("गेहूं")) {
    return CROP_PHOTOGRAPHY["Wheat"];
  }
  if (normalized.includes("cotton") || normalized.includes("పత్తి") || normalized.includes("कपास")) {
    return CROP_PHOTOGRAPHY["Cotton"];
  }
  if (normalized.includes("turmeric") || normalized.includes("పసుపు") || normalized.includes("हल्दी")) {
    return CROP_PHOTOGRAPHY["Turmeric"];
  }
  if (normalized.includes("red gram") || normalized.includes("tur") || normalized.includes("pigeon") || normalized.includes("కంది")) {
    return CROP_PHOTOGRAPHY["Red Gram (Tur)"];
  }
  if (normalized.includes("green gram") || normalized.includes("moong") || normalized.includes("పెసలు")) {
    return CROP_PHOTOGRAPHY["Green Gram (Moong)"];
  }
  if (normalized.includes("black gram") || normalized.includes("urad") || normalized.includes("మినుములు")) {
    return CROP_PHOTOGRAPHY["Black Gram (Urad)"];
  }
  if (normalized.includes("chana") || normalized.includes("chickpea") || normalized.includes("bengal gram")) {
    return CROP_PHOTOGRAPHY["Bengal Gram (Chana)"];
  }
  if (normalized.includes("mustard") || normalized.includes("ఆవాలు") || normalized.includes("सरसों")) {
    return CROP_PHOTOGRAPHY["Mustard"];
  }
  if (normalized.includes("sunflower") || normalized.includes("పొద్దుతిరుగుడు") || normalized.includes("सूरजमुखी")) {
    return CROP_PHOTOGRAPHY["Sunflower"];
  }
  if (normalized.includes("soybean") || normalized.includes("సోయాబిన్")) {
    return CROP_PHOTOGRAPHY["Soybean"];
  }

  // Find in dictionary by case-insensitive key search
  const foundKey = Object.keys(CROP_PHOTOGRAPHY).find(
    (key) => key.toLowerCase() === normalized
  );
  if (foundKey) return CROP_PHOTOGRAPHY[foundKey];

  // Default fallback
  return CROP_PHOTOGRAPHY["Groundnut"];
}

export function getCropIcon(cropName) {
  if (!cropName) return "🌾";
  const trimmed = String(cropName).trim();
  if (CROP_ICONS[trimmed]) return CROP_ICONS[trimmed];
  return "🌾";
}
