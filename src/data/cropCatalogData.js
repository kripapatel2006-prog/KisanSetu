/**
 * CENTRALIZED CROP CATALOG & PHOTOGRAPHY DICTIONARY (SINGLE SOURCE OF TRUTH)
 * Ensures every crop displays authentic, recognizable photography across all views.
 */

export const CROP_PHOTOGRAPHY = {
  Groundnut: "https://images.unsplash.com/photo-1567892320421-1c657571ea48?auto=format&fit=crop&w=600&q=80",
  Tomato: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
  Onion: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
  Rice: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80",
  Wheat: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
  Cotton: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80",
  Turmeric: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
  Sugarcane: "https://images.unsplash.com/photo-1595180630732-c7f7e914041b?auto=format&fit=crop&w=600&q=80",
  Coffee: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
  Maize: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80",
  "Red Gram (Tur)": "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80",
  "Green Gram (Moong)": "https://images.unsplash.com/photo-1585992629402-9907c125712e?auto=format&fit=crop&w=600&q=80",
  "Black Gram (Urad)": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
  "Bengal Gram (Chana)": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
  Mustard: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&q=80",
  Sunflower: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
  Soybean: "https://images.unsplash.com/photo-1599599810694-b5b37304c03d?auto=format&fit=crop&w=600&q=80"
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
 * Hierarchy: Farmer Uploaded Photo -> Lot Photo -> Reference Crop Photo -> Clean Fallback
 */
export function getCropImage(cropName, farmerPhotoUrl = null) {
  if (farmerPhotoUrl) return farmerPhotoUrl;
  if (CROP_PHOTOGRAPHY[cropName]) return CROP_PHOTOGRAPHY[cropName];
  return CROP_PHOTOGRAPHY["Groundnut"]; // Default fallback
}

