// AI Kisan Assistant — mock data + "AI" logic.
// Every function here is written as an async call with a simulated delay so
// the mock implementations (diagnoseCrop, getMarketAdvice) can be swapped
// for real Gemini/OpenAI Vision + market-data APIs later without changing
// any component code that calls them.

export const ASSISTANT_LANGS = ["en", "te", "hi"];

// Maps the app's existing language codes to BCP-47 locales for the
// Web Speech API (SpeechRecognition + speechSynthesis).
export const SPEECH_LOCALE = {
  en: "en-IN",
  te: "te-IN",
  hi: "hi-IN",
};

export const ASSISTANT_TEXT = {
  en: {
    assistantTitle: "AI Kisan Assistant",
    assistantSubtitle: "Your farming companion, anytime",
    openAssistant: "Open AI Assistant",
    tabChat: "Chat",
    tabDiagnose: "Diagnose",
    tabMarket: "Market",
    tabSchemes: "Schemes",
    chatPlaceholder: "Ask about crops, prices, or schemes...",
    chatSend: "Send",
    chatEmpty:
      "Ask me anything about your crops, market prices, or government schemes.",
    micStart: "Tap to speak",
    micListening: "Listening...",
    micNotSupported:
      "Voice input isn't supported on this browser. Please type instead.",
    micSpeak: "Speaking...",
    uploadPhoto: "Upload Photo",
    takePhoto: "Take Photo",
    analyzeCrop: "Analyze Crop",
    analyzing: "Analyzing your crop...",
    diagnosisResult: "Diagnosis",
    confidence: "Confidence",
    severity: "Severity",
    symptoms: "Symptoms",
    causes: "Causes",
    treatment: "Treatment",
    prevention: "Prevention",
    demoAiLabel: "Demo AI Diagnosis",
    selectCrop: "Select crop",
    askMarketPlaceholder: "e.g. Should I sell tomatoes today?",
    getAdvice: "Get Advice",
    sellNow: "Sell Now",
    wait: "Wait",
    sellPartially: "Sell Partially",
    marketReasoning: "Why",
    demoMarketLabel: "Demo Market Intelligence",
    schemesTitle: "Government Schemes",
    schemesPlaceholder: "Ask about PM-KISAN, insurance, soil card...",
    eligibility: "Eligibility",
    benefits: "Benefits",
    howToApply: "How to Apply",
    officialLink: "Official Website",
    offlineBanner: "You're offline",
    offlineNote:
      "Showing saved advice and FAQs until you're back online.",
    clearHistory: "Clear history",
    close: "Close",
    greeting:
      "Namaste! I'm your Kisan Assistant. Ask me about crop diseases, market prices, or government schemes.",
    defaultReply:
      "I can help with crop diagnosis, market advice, or government schemes. Try the tabs below, or ask me directly.",
    you: "You",
    assistantName: "Assistant",
    recentQuestions: "Recent questions",
    noRecent: "No recent questions yet",
    faqTitle: "Frequently asked (offline)",
    preferredCrop: "Preferred crop",
  },
  te: {
    assistantTitle: "AI కిసాన్ సహాయకుడు",
    assistantSubtitle: "మీ వ్యవసాయ మిత్రుడు, ఎప్పుడైనా",
    openAssistant: "AI సహాయకుడిని తెరవండి",
    tabChat: "చాట్",
    tabDiagnose: "నిర్ధారణ",
    tabMarket: "మార్కెట్",
    tabSchemes: "పథకాలు",
    chatPlaceholder: "పంటలు, ధరలు లేదా పథకాల గురించి అడగండి...",
    chatSend: "పంపండి",
    chatEmpty:
      "మీ పంటలు, మార్కెట్ ధరలు లేదా ప్రభుత్వ పథకాల గురించి నన్ను అడగండి.",
    micStart: "మాట్లాడటానికి నొక్కండి",
    micListening: "వింటున్నాను...",
    micNotSupported:
      "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ లేదు. దయచేసి టైప్ చేయండి.",
    micSpeak: "మాట్లాడుతోంది...",
    uploadPhoto: "ఫోటో అప్‌లోడ్ చేయండి",
    takePhoto: "ఫోటో తీయండి",
    analyzeCrop: "పంటను విశ్లేషించండి",
    analyzing: "మీ పంటను విశ్లేషిస్తోంది...",
    diagnosisResult: "నిర్ధారణ",
    confidence: "నమ్మకం",
    severity: "తీవ్రత",
    symptoms: "లక్షణాలు",
    causes: "కారణాలు",
    treatment: "చికిత్స",
    prevention: "నివారణ",
    demoAiLabel: "డెమో AI నిర్ధారణ",
    selectCrop: "పంటను ఎంచుకోండి",
    askMarketPlaceholder: "ఉదా. ఈరోజు టమాటాలు అమ్మాలా?",
    getAdvice: "సలహా పొందండి",
    sellNow: "ఇప్పుడే అమ్మండి",
    wait: "వేచి ఉండండి",
    sellPartially: "కొంత భాగం అమ్మండి",
    marketReasoning: "ఎందుకు",
    demoMarketLabel: "డెమో మార్కెట్ సమాచారం",
    schemesTitle: "ప్రభుత్వ పథకాలు",
    schemesPlaceholder: "PM-KISAN, బీమా, సాయిల్ కార్డ్ గురించి అడగండి...",
    eligibility: "అర్హత",
    benefits: "ప్రయోజనాలు",
    howToApply: "ఎలా దరఖాస్తు చేయాలి",
    officialLink: "అధికారిక వెబ్‌సైట్",
    offlineBanner: "మీరు ఆఫ్‌లైన్‌లో ఉన్నారు",
    offlineNote:
      "మీరు తిరిగి ఆన్‌లైన్‌లోకి వచ్చే వరకు సేవ్ చేసిన సలహాలు, FAQలు చూపిస్తోంది.",
    clearHistory: "చరిత్రను తొలగించండి",
    close: "మూసివేయండి",
    greeting:
      "నమస్తే! నేను మీ కిసాన్ సహాయకుడిని. పంట వ్యాధులు, మార్కెట్ ధరలు లేదా ప్రభుత్వ పథకాల గురించి నన్ను అడగండి.",
    defaultReply:
      "నేను పంట నిర్ధారణ, మార్కెట్ సలహా లేదా ప్రభుత్వ పథకాలలో సహాయం చేయగలను. కింద ఉన్న ట్యాబ్‌లను ప్రయత్నించండి లేదా నేరుగా నన్ను అడగండి.",
    you: "మీరు",
    assistantName: "సహాయకుడు",
    recentQuestions: "ఇటీవలి ప్రశ్నలు",
    noRecent: "ఇంకా ఇటీవలి ప్రశ్నలు లేవు",
    faqTitle: "తరచుగా అడిగే ప్రశ్నలు (ఆఫ్‌లైన్)",
    preferredCrop: "ఇష్టమైన పంట",
  },
  hi: {
    assistantTitle: "AI किसान सहायक",
    assistantSubtitle: "आपका खेती साथी, हर समय",
    openAssistant: "AI सहायक खोलें",
    tabChat: "चैट",
    tabDiagnose: "जांच",
    tabMarket: "बाज़ार",
    tabSchemes: "योजनाएं",
    chatPlaceholder: "फसल, कीमतों या योजनाओं के बारे में पूछें...",
    chatSend: "भेजें",
    chatEmpty:
      "अपनी फसल, बाज़ार भाव या सरकारी योजनाओं के बारे में मुझसे पूछें।",
    micStart: "बोलने के लिए दबाएं",
    micListening: "सुन रहा हूं...",
    micNotSupported:
      "इस ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है। कृपया टाइप करें।",
    micSpeak: "बोल रहा हूं...",
    uploadPhoto: "फोटो अपलोड करें",
    takePhoto: "फोटो लें",
    analyzeCrop: "फसल का विश्लेषण करें",
    analyzing: "आपकी फसल का विश्लेषण हो रहा है...",
    diagnosisResult: "जांच परिणाम",
    confidence: "विश्वास स्तर",
    severity: "गंभीरता",
    symptoms: "लक्षण",
    causes: "कारण",
    treatment: "उपचार",
    prevention: "रोकथाम",
    demoAiLabel: "डेमो AI जांच",
    selectCrop: "फसल चुनें",
    askMarketPlaceholder: "जैसे: क्या आज टमाटर बेचना चाहिए?",
    getAdvice: "सलाह लें",
    sellNow: "अभी बेचें",
    wait: "प्रतीक्षा करें",
    sellPartially: "आंशिक बिक्री करें",
    marketReasoning: "कारण",
    demoMarketLabel: "डेमो बाज़ार जानकारी",
    schemesTitle: "सरकारी योजनाएं",
    schemesPlaceholder: "PM-KISAN, बीमा, सॉइल कार्ड के बारे में पूछें...",
    eligibility: "पात्रता",
    benefits: "लाभ",
    howToApply: "आवेदन कैसे करें",
    officialLink: "आधिकारिक वेबसाइट",
    offlineBanner: "आप ऑफ़लाइन हैं",
    offlineNote:
      "जब तक आप वापस ऑनलाइन नहीं आते, सहेजी गई सलाह और सामान्य प्रश्न दिखाए जा रहे हैं।",
    clearHistory: "इतिहास मिटाएं",
    close: "बंद करें",
    greeting:
      "नमस्ते! मैं आपका किसान सहायक हूं। फसल की बीमारी, बाज़ार भाव या सरकारी योजनाओं के बारे में मुझसे पूछें।",
    defaultReply:
      "मैं फसल जांच, बाज़ार सलाह या सरकारी योजनाओं में मदद कर सकता हूं। नीचे दिए गए टैब आज़माएं, या सीधे मुझसे पूछें।",
    you: "आप",
    assistantName: "सहायक",
    recentQuestions: "हाल के सवाल",
    noRecent: "अभी तक कोई हाल का सवाल नहीं",
    faqTitle: "अक्सर पूछे जाने वाले सवाल (ऑफ़लाइन)",
    preferredCrop: "पसंदीदा फसल",
  },
};

export const CROP_LIST = [
  "Tomato",
  "Wheat",
  "Rice",
  "Cotton",
  "Chilli",
  "Potato",
];

// ---------------------------------------------------------------------------
// Crop disease "vision" mock — diagnoseCrop() below is the single seam where
// a real Gemini Vision / OpenAI Vision call would replace this lookup.
// ---------------------------------------------------------------------------
const DISEASE_DB = {
  Tomato: [
    {
      name: "Early Blight",
      severity: "Medium",
      symptoms: [
        "Dark concentric rings on older leaves",
        "Yellowing around leaf spots",
        "Leaves drying and dropping from the bottom up",
      ],
      causes: [
        "Fungal infection (Alternaria solani)",
        "Prolonged leaf wetness or humidity",
        "Poor air circulation between plants",
      ],
      treatment: [
        "Remove and destroy affected leaves",
        "Apply a copper-based or chlorothalonil fungicide",
        "Avoid overhead watering",
      ],
      prevention: [
        "Rotate crops each season",
        "Space plants for airflow",
        "Mulch to reduce soil splash onto leaves",
      ],
    },
    {
      name: "Leaf Curl Virus",
      severity: "High",
      symptoms: [
        "Upward curling of young leaves",
        "Stunted plant growth",
        "Yellowing along leaf veins",
      ],
      causes: [
        "Transmitted by whiteflies",
        "Nearby infected plants",
      ],
      treatment: [
        "Remove and destroy infected plants",
        "Control whitefly population with sticky traps",
        "Use recommended insecticide for whiteflies",
      ],
      prevention: [
        "Use virus-resistant varieties",
        "Cover nursery beds with insect netting",
        "Avoid planting near infected fields",
      ],
    },
  ],
  Wheat: [
    {
      name: "Yellow Rust",
      severity: "Medium",
      symptoms: [
        "Yellow-orange powdery stripes on leaves",
        "Stripes running parallel to leaf veins",
        "Reduced grain filling",
      ],
      causes: [
        "Fungal infection (Puccinia striiformis)",
        "Cool, humid weather",
      ],
      treatment: [
        "Apply a triazole-group fungicide",
        "Remove volunteer wheat plants nearby",
      ],
      prevention: [
        "Plant rust-resistant varieties",
        "Time sowing to avoid peak humid spells",
      ],
    },
  ],
  Rice: [
    {
      name: "Bacterial Leaf Blight",
      severity: "High",
      symptoms: [
        "Water-soaked streaks near leaf tips",
        "Leaves turning yellow then straw-colored",
        "Wilting in seedlings",
      ],
      causes: [
        "Bacterial infection (Xanthomonas oryzae)",
        "Standing water and warm temperatures",
      ],
      treatment: [
        "Drain excess field water where possible",
        "Apply a copper-based bactericide",
      ],
      prevention: [
        "Use certified disease-free seed",
        "Avoid excess nitrogen fertilizer",
      ],
    },
  ],
  Cotton: [
    {
      name: "Leaf Curl Virus",
      severity: "High",
      symptoms: [
        "Upward curling and thickening of leaves",
        "Dark green vein banding",
        "Reduced boll formation",
      ],
      causes: ["Transmitted by whiteflies"],
      treatment: [
        "Remove severely infected plants",
        "Manage whitefly population early",
      ],
      prevention: [
        "Plant approved resistant hybrids",
        "Monitor whitefly traps weekly",
      ],
    },
  ],
  Chilli: [
    {
      name: "Anthracnose (Fruit Rot)",
      severity: "Medium",
      symptoms: [
        "Sunken dark spots on fruit",
        "Concentric rings within spots",
        "Fruit drop in advanced stages",
      ],
      causes: [
        "Fungal infection (Colletotrichum spp.)",
        "Warm, wet conditions during fruiting",
      ],
      treatment: [
        "Remove and destroy infected fruit",
        "Apply a recommended fungicide spray",
      ],
      prevention: [
        "Avoid overhead irrigation",
        "Use disease-free seedlings",
      ],
    },
  ],
  Potato: [
    {
      name: "Late Blight",
      severity: "High",
      symptoms: [
        "Dark, water-soaked patches on leaves",
        "White fungal growth under leaves in humid weather",
        "Rapid collapse of foliage",
      ],
      causes: [
        "Fungal infection (Phytophthora infestans)",
        "Cool, wet weather",
      ],
      treatment: [
        "Apply a systemic fungicide promptly",
        "Remove and destroy infected plants",
      ],
      prevention: [
        "Use certified seed potatoes",
        "Ensure good field drainage",
      ],
    },
  ],
  default: [
    {
      name: "No Major Disease Detected",
      severity: "Low",
      symptoms: ["Leaves appear generally healthy"],
      causes: ["N/A"],
      treatment: ["Continue regular monitoring"],
      prevention: [
        "Maintain balanced fertilization",
        "Monitor weekly for early signs of stress",
      ],
    },
  ],
};

function seededRandom(seedStr) {
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) {
    seed = (seed * 31 + seedStr.charCodeAt(i)) % 100000;
  }
  return seed / 100000;
}

// Mock crop-disease "vision" call.
// TODO(production): replace this function body with a real call to
// Gemini Vision / OpenAI Vision, passing the captured image. Keep the
// same return shape so CropDiagnosis.jsx needs no changes.
export async function diagnoseCrop(cropName, imageFile) {
  await new Promise((r) => setTimeout(r, 1400));

  const options = DISEASE_DB[cropName] || DISEASE_DB.default;
  const seed = seededRandom(
    (cropName || "crop") + (imageFile?.name || Date.now())
  );
  const pick = options[Math.floor(seed * options.length)];
  const confidence = Math.round(72 + seed * 24);

  return {
    ...pick,
    crop: cropName,
    confidence,
    diagnosedAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Market advisor mock — mirrors the shape of the backend's
// /api/market/analyze endpoint so it can call the real API later.
// ---------------------------------------------------------------------------
const MARKET_MOCK = {
  Tomato: { currentPrice: 1850, averagePrice: 1780, demand: "MEDIUM" },
  Wheat: { currentPrice: 2450, averagePrice: 2350, demand: "HIGH" },
  Rice: { currentPrice: 3200, averagePrice: 3115, demand: "HIGH" },
  Cotton: { currentPrice: 7200, averagePrice: 7050, demand: "MEDIUM" },
  Chilli: { currentPrice: 14500, averagePrice: 15200, demand: "LOW" },
  Potato: { currentPrice: 1400, averagePrice: 1450, demand: "LOW" },
};

export function matchCropFromText(text) {
  const lower = (text || "").toLowerCase();
  return CROP_LIST.find((c) => lower.includes(c.toLowerCase())) || null;
}

// TODO(production): replace MARKET_MOCK lookups with live Agmarknet/eNAM
// price feeds and a real weather + transport-cost signal. Keep the same
// return shape so MarketAdvisor.jsx needs no changes.
export async function getMarketAdvice(cropName) {
  await new Promise((r) => setTimeout(r, 1000));

  const data = MARKET_MOCK[cropName] || MARKET_MOCK.Tomato;
  const trend =
    ((data.currentPrice - data.averagePrice) / data.averagePrice) * 100;

  let action = "SELL_NOW";
  let confidence = 68;
  const reasons = [];

  if (trend >= 3 && data.demand === "HIGH") {
    action = "WAIT";
    confidence = 84;
    reasons.push("Prices are trending up and buyer demand is high");
    reasons.push("Waiting a few days may fetch a better rate");
  } else if (trend <= -2 || data.demand === "LOW") {
    action = "SELL_NOW";
    confidence = 79;
    reasons.push("Prices are flat or falling in your market");
    reasons.push("Holding stock risks further price drops");
  } else if (data.demand === "MEDIUM" && trend > 0) {
    action = "SELL_PARTIALLY";
    confidence = 71;
    reasons.push("Demand is moderate with a slight upward trend");
    reasons.push("Selling part of your stock now balances risk and upside");
  } else {
    reasons.push("Market conditions look stable");
  }

  return {
    crop: cropName,
    currentPrice: data.currentPrice,
    trend: Number(trend.toFixed(1)),
    demand: data.demand,
    action,
    confidence,
    reasons,
  };
}

// ---------------------------------------------------------------------------
// Government scheme data (verified against official portals as of the
// content written here — always point farmers to the official site to
// confirm current details before applying).
// ---------------------------------------------------------------------------
export const GOV_SCHEMES = [
  {
    id: "pmkisan",
    name: "PM-KISAN",
    keywords: ["pm kisan", "pm-kisan", "kisan samman", "income support", "6000"],
    summary:
      "A central scheme giving eligible farmer families direct income support of ₹6,000 per year, paid in three installments straight to their bank account.",
    eligibility: [
      "Landholding farmer families (as per state/UT land records)",
      "Excludes higher-income categories such as institutional landholders and income-tax payers",
    ],
    benefits: ["₹6,000/year direct benefit transfer, paid in 3 installments"],
    howToApply: [
      "Register on the PM-KISAN portal or via your local CSC",
      "Provide Aadhaar, land records, and bank account details",
      "Check status anytime under 'Beneficiary Status'",
    ],
    link: "https://pmkisan.gov.in",
  },
  {
    id: "pmfby",
    name: "PMFBY (Crop Insurance)",
    keywords: ["insurance", "crop insurance", "pmfby", "fasal bima", "bima"],
    summary:
      "Pradhan Mantri Fasal Bima Yojana covers farmers against crop loss from natural calamities, pests, and diseases, with the premium mostly subsidized by the government.",
    eligibility: [
      "All farmers growing notified crops in a notified area",
      "Both loanee and non-loanee farmers can enroll",
    ],
    benefits: [
      "Low farmer premium share (around 1.5–5% depending on season/crop)",
      "Coverage for localized and widespread crop losses",
    ],
    howToApply: [
      "Apply on the National Crop Insurance Portal (pmfby.gov.in)",
      "Or apply via your bank, CSC, or insurance intermediary",
      "Report crop loss within 72 hours of the event",
    ],
    link: "https://pmfby.gov.in",
  },
  {
    id: "soilhealth",
    name: "Soil Health Card",
    keywords: ["soil", "soil health", "soil card", "nutrients"],
    summary:
      "A free soil testing scheme that gives farmers a report on their land's nutrient levels along with crop-wise fertilizer recommendations.",
    eligibility: ["All farmers with cultivable land"],
    benefits: [
      "Free soil nutrient report every cycle",
      "Guidance on fertilizer use to cut input costs",
    ],
    howToApply: [
      "Apply on the Soil Health Card portal or through your nearest KVK/CSC",
      "Submit land details and a soil sample for testing",
      "Download your card once results are ready",
    ],
    link: "https://soilhealth.dac.gov.in",
  },
  {
    id: "kcc",
    name: "Kisan Credit Card",
    keywords: ["credit", "loan", "kcc", "credit card"],
    summary:
      "Gives farmers timely access to short-term credit for crop, and allied-activity needs, at subsidized interest rates.",
    eligibility: ["Farmers, tenant farmers, and sharecroppers"],
    benefits: [
      "Flexible short-term credit at subsidized interest",
      "Covers crop production and allied activities",
    ],
    howToApply: [
      "Apply through any nearest bank branch",
      "Or apply online via your bank's net-banking / the myScheme portal",
    ],
    link: "https://www.myscheme.gov.in",
  },
  {
    id: "registry",
    name: "Farmer Registry (Agristack)",
    keywords: ["registry", "farmer id", "agristack", "farmer registry"],
    summary:
      "A digital farmer ID linking land records to a unified profile, used to simplify enrollment across multiple schemes.",
    eligibility: ["All landholding farmers"],
    benefits: [
      "One digital ID usable across multiple government schemes",
      "Faster verification when applying for benefits",
    ],
    howToApply: [
      "Register through your state's Agristack / farmer registry camp",
      "Or check availability via the myScheme portal",
    ],
    link: "https://www.myscheme.gov.in",
  },
];

export function findScheme(query) {
  const lower = (query || "").toLowerCase();
  return (
    GOV_SCHEMES.find((s) => s.keywords.some((k) => lower.includes(k))) || null
  );
}

export const OFFLINE_FAQS = {
  en: [
    { q: "When should I water my crop?", a: "Early morning or evening reduces evaporation loss." },
    { q: "How do I reduce pest attacks?", a: "Rotate crops and monitor weekly with sticky traps." },
  ],
  te: [
    { q: "నా పంటకు ఎప్పుడు నీరు పెట్టాలి?", a: "ఉదయం లేదా సాయంత్రం నీరు పెడితే ఆవిరి నష్టం తగ్గుతుంది." },
    { q: "పురుగుల బెడదను ఎలా తగ్గించాలి?", a: "పంట మార్పిడి చేయండి, వారానికొకసారి స్టికీ ట్రాప్‌లతో పరిశీలించండి." },
  ],
  hi: [
    { q: "फसल को कब पानी देना चाहिए?", a: "सुबह जल्दी या शाम को पानी देने से वाष्पीकरण कम होता है।" },
    { q: "कीट प्रकोप कैसे कम करें?", a: "फसल चक्र अपनाएं और साप्ताहिक रूप से स्टिकी ट्रैप से निगरानी करें।" },
  ],
};
