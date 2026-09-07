import { useMemo, useState } from "react";
import "./assets/App.css";

const crops = {
  Tomato: { base: 2200, demand: 82, trend: 12, buyers: 18, region: "Telangana / Andhra Pradesh" },
  Onion: { base: 1900, demand: 74, trend: 7, buyers: 14, region: "Maharashtra" },
  Wheat: { base: 2450, demand: 68, trend: 4, buyers: 21, region: "Punjab / Uttar Pradesh" },
  Rice: { base: 3100, demand: 88, trend: 15, buyers: 26, region: "Telangana / West Bengal" },
  Cotton: { base: 7200, demand: 79, trend: 9, buyers: 16, region: "Gujarat / Maharashtra" },
  Tea: { base: 18500, demand: 71, trend: 6, buyers: 12, region: "Assam" },
  Sugarcane: { base: 340, demand: 76, trend: 3, buyers: 19, region: "Uttar Pradesh" },
  Turmeric: { base: 9800, demand: 69, trend: 8, buyers: 11, region: "Telangana" },
  Coffee: { base: 15200, demand: 73, trend: 5, buyers: 9, region: "Karnataka" },
  Jute: { base: 4600, demand: 62, trend: 2, buyers: 8, region: "West Bengal" },
  Groundnut: { base: 6300, demand: 70, trend: 6, buyers: 13, region: "Gujarat" },
};

const buyers = [
  {
    name: "FreshKart Foods",
    type: "Food Processor",
    distance: 18,
    rating: 4.8,
    quantity: 50,
    price: 2380,
    tier: "trusted",
    verified: true,
    pastOrders: 142,
    paymentReliability: 98,
  },
  {
    name: "Hyderabad Fresh Market",
    type: "Wholesale Buyer",
    distance: 27,
    rating: 4.7,
    quantity: 35,
    price: 2310,
    tier: "verified",
    verified: true,
    pastOrders: 76,
    paymentReliability: 95,
  },
  {
    name: "GreenBasket Retail",
    type: "Retail Chain",
    distance: 41,
    rating: 4.6,
    quantity: 20,
    price: 2260,
    tier: "new",
    verified: false,
    pastOrders: 4,
    paymentReliability: 100,
  },
];

// Mocked "current farmer" trust profile — in a real build this comes
// from the farmer's account history, not hardcoded.
const farmerProfile = {
  name: "Ramesh Kumar",
  village: "Chevella, Vikarabad",
  pastSales: 24,
  rating: 4.7,
  gradeMatchRate: 94,
  onTimeDelivery: 96,
};

const getTrustTier = (pastSales, gradeMatchRate) => {
  if (pastSales >= 20 && gradeMatchRate >= 90) return "trusted";
  if (pastSales >= 5 && gradeMatchRate >= 80) return "verified";
  return "new";
};

const buyerTierLabel = (tierKey, t) =>
  ({
    new: t.tierBuyerNew,
    verified: t.tierBuyerVerified,
    trusted: t.tierBuyerTrusted,
  }[tierKey]);

const farmerTierLabel = (tierKey, t) =>
  ({
    new: t.tierFarmerNew,
    verified: t.tierFarmerVerified,
    trusted: t.tierFarmerTrusted,
  }[tierKey]);

const renderStars = (rating) => {
  const full = Math.round(rating);
  return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
};

const translations = {
  en: {
    dashboard: "Dashboard",
    market: "Market Analysis",
    buyers: "Buyers",
    insights: "Insights",
    language: "Language",
    liveMarket: "Live Market",
    heroTitle: "Make the right selling decision.",
    heroSubtitle:
      "Know when to sell, who to sell to, and how much you actually earn.",
    analyse: "Analyse My Produce",
    fairPrice: "Fair Price",
    demand: "Demand",
    trend: "Price Trend",
    buyersLabel: "Buyers",
    analyseTitle: "Analyse Your Produce",
    analyseSubtitle:
      "Enter your crop details to receive a smart selling recommendation.",
    crop: "Crop",
    quantity: "Quantity",
    quality: "Quality",
    location: "Location",
    expectedOffer: "Expected Buyer Offer",
    premium: "A — Premium",
    standard: "B — Standard",
    basic: "C — Basic",
    quintal: "quintal",
    marketPrice: "Current Fair Price",
    yourOffer: "Your Offer",
    estimatedNet: "Estimated Net Realisation",
    afterCosts: "After estimated transport and storage costs",
    smartDecision: "Smart Selling Decision",
    confidence: "Confidence",
    wait: "WAIT",
    partialSell: "PARTIAL SELL",
    sellNow: "SELL NOW",
    expectedPrice: "Expected Price",
    sellPortion: "Suggested Sell",
    holdPortion: "Suggested Hold",
    why: "Why this recommendation?",
    netRealisation: "Net Realisation",
    offerPrice: "Offer Price",
    transport: "Transport",
    storageRisk: "Storage Risk",
    totalEarnings: "Estimated Total Earnings",
    bestBuyer: "Best Buyer",
    bestMatch: "Best Match",
    proceedSale: "Review Sale",
    distance: "Distance",
    rating: "Rating",
    quantityAvailable: "Buyer Capacity",
    reliability: "Reliability",
    buyerReason:
      "This buyer provides the strongest combination of net realisation, distance, capacity and rating.",
    allBuyers: "Available Buyers",
    noAnalysis: "Analyse your produce to unlock buyer recommendations.",
    insightsTitle: "How KisanSetu Works",
    insightsSubtitle:
      "A farmer-first decision system designed to improve actual earnings.",
    step1: "Enter Produce",
    step1Text: "Provide crop, quantity, quality and location.",
    step2: "Analyse Market",
    step2Text: "We evaluate price, demand and market movement.",
    step3: "Compare Buyers",
    step3Text: "Buyers are ranked using net realisation and risk.",
    step4: "Complete Sale",
    step4Text: "Review the recommendation and confirm your sale.",
    differentiator: "Why KisanSetu?",
    differentiatorText:
      "Instead of ranking buyers only by their offer price, KisanSetu estimates the farmer's actual net realisation after transport and storage costs.",
    reviewTitle: "Review Your Sale",
    reviewSubtitle:
      "Check the details below before confirming the transaction.",
    confirmSale: "Confirm Sale",
    cancel: "Go Back",
    saleSuccess: "Sale Confirmed",
    successText:
      "Your sale has been successfully recorded in this prototype.",
    reference: "Sale Reference",
    startNew: "Start New Analysis",
    prototype:
      "Prototype demonstration. Financial values and buyer information are simulated.",

    // Trust, verification & payment lock
    tierBuyerNew: "New Buyer",
    tierBuyerVerified: "Verified Buyer",
    tierBuyerTrusted: "Trusted Buyer",
    tierFarmerNew: "New Seller",
    tierFarmerVerified: "Verified Farmer",
    tierFarmerTrusted: "Trusted Supplier",
    salesCompletedLabel: "Sales Completed",
    farmerRatingLabel: "Farmer Rating",
    gradeMatchLabel: "Grade Match Rate",
    onTimeDeliveryLabel: "On-time Delivery",
    pastOrdersLabel: "Past Orders",
    paymentReliabilityLabel: "Payment Reliability",
    trustedByPrefix: "Trusted by",
    trustedBySuffix: "farmers",
    buyerStatusLabel: "BUYER STATUS",
    paymentSecuredTitle: "Payment Secured",
    paymentSecuredText:
      "Buyer has locked {amount} in escrow. Funds release automatically once delivery is confirmed.",
    paymentPendingTitle: "Payment Not Yet Secured",
    paymentPendingText:
      "Ask the buyer to lock payment before you schedule pickup, so you're not left waiting after harvest.",
    requestPaymentLock: "Request Payment Lock",
    paymentStatusLabel: "Payment Status",
    paymentLockedNote: "Locked — releases on delivery confirmation",
    trustSectionLabel: "TRUST & VERIFICATION",
    trustHowTitle: 'How "KisanSetu Verified" actually works',
    trustIntro:
      "A declared quality grade or a star rating alone can be gamed. KisanSetu instead checks every sale at four independent points, so no single fake photo, review or claim can carry an entire transaction.",
    pipelineStep1Title: "Declared Grade",
    pipelineStep1Text:
      "Farmer selects A / B / C and captures a live, in-app photo — not a gallery upload.",
    pipelineStep2Title: "AI Cross-check",
    pipelineStep2Text:
      "An AI grading pass flags mismatches between the declared grade and the photo for review — it doesn't auto-approve.",
    pipelineStep3Title: "Pickup Verification",
    pipelineStep3Text:
      "Quantity and condition are physically checked by the collection point before transport begins.",
    pipelineStep4Title: "Delivery Confirmation",
    pipelineStep4Text:
      "Buyer confirms received quality before locked payment is released. Mismatches open a dispute, not an auto-payout.",
    tierNewTitle: "New Seller / Buyer",
    tierNewText:
      "Just joined. Can trade, but counterparties may reasonably ask for a full payment lock until a track record exists.",
    tierVerifiedTitle: "Verified",
    tierVerifiedText:
      "Identity/registration confirmed, 5+ completed orders, no unresolved disputes.",
    tierTrustedTitle: "Trusted Supplier / Buyer",
    tierTrustedText:
      "20+ completed orders with 90%+ grade-match and on-time rate. Ranks higher in Smart Matches and unlocks lower advance requirements.",
    paymentLockTitle: "Payment Lock, explained",
    paymentLockText:
      "Before a farmer commits to harvest and transport, the buyer locks the agreed amount into escrow inside KisanSetu. The farmer can see this before pickup — so they're never left wondering if a buyer will actually pay. Funds release automatically once the buyer confirms delivery; a quality dispute keeps them locked until resolved, instead of releasing automatically either way.",
    photoLabel: "Produce Photo",
    photoCta: "Capture Produce Photo",
    photoRetake: "Retake Photo",
    photoCaptured: "Photo captured — will be cross-checked at pickup",
    photoNote:
      "Take a live photo, not a gallery upload. This helps buyers trust your listing.",
  },

  te: {
    dashboard: "డ్యాష్‌బోర్డ్",
    market: "మార్కెట్ విశ్లేషణ",
    buyers: "కొనుగోలుదారులు",
    insights: "సమాచారం",
    language: "భాష",
    liveMarket: "లైవ్ మార్కెట్",
    heroTitle: "సరైన అమ్మకపు నిర్ణయం తీసుకోండి.",
    heroSubtitle:
      "ఎప్పుడు అమ్మాలి, ఎవరికి అమ్మాలి, నిజంగా ఎంత సంపాదిస్తారో తెలుసుకోండి.",
    analyse: "నా పంటను విశ్లేషించండి",
    fairPrice: "న్యాయమైన ధర",
    demand: "డిమాండ్",
    trend: "ధర మార్పు",
    buyersLabel: "కొనుగోలుదారులు",
    analyseTitle: "మీ పంటను విశ్లేషించండి",
    analyseSubtitle:
      "స్మార్ట్ అమ్మకపు సూచన కోసం మీ పంట వివరాలను నమోదు చేయండి.",
    crop: "పంట",
    quantity: "పరిమాణం",
    quality: "నాణ్యత",
    location: "ప్రదేశం",
    expectedOffer: "కొనుగోలుదారు ఆఫర్",
    premium: "A — ప్రీమియం",
    standard: "B — స్టాండర్డ్",
    basic: "C — బేసిక్",
    quintal: "క్వింటాల్",
    marketPrice: "ప్రస్తుత న్యాయ ధర",
    yourOffer: "మీ ఆఫర్",
    estimatedNet: "అంచనా నికర ఆదాయం",
    afterCosts: "రవాణా మరియు నిల్వ ఖర్చుల తర్వాత",
    smartDecision: "స్మార్ట్ అమ్మకపు నిర్ణయం",
    confidence: "నమ్మకం",
    wait: "వేచి ఉండండి",
    partialSell: "కొంత అమ్మండి",
    sellNow: "ఇప్పుడే అమ్మండి",
    expectedPrice: "అంచనా ధర",
    sellPortion: "సూచించిన అమ్మకం",
    holdPortion: "సూచించిన నిల్వ",
    why: "ఈ సూచన ఎందుకు?",
    netRealisation: "నికర ఆదాయం",
    offerPrice: "ఆఫర్ ధర",
    transport: "రవాణా",
    storageRisk: "నిల్వ ప్రమాదం",
    totalEarnings: "అంచనా మొత్తం ఆదాయం",
    bestBuyer: "ఉత్తమ కొనుగోలుదారు",
    bestMatch: "ఉత్తమ మ్యాచ్",
    proceedSale: "అమ్మకాన్ని పరిశీలించండి",
    distance: "దూరం",
    rating: "రేటింగ్",
    quantityAvailable: "కొనుగోలు సామర్థ్యం",
    reliability: "నమ్మకత",
    buyerReason:
      "నికర ఆదాయం, దూరం, సామర్థ్యం మరియు రేటింగ్ ఆధారంగా ఈ కొనుగోలుదారు ఉత్తమంగా ఉన్నారు.",
    allBuyers: "అందుబాటులో ఉన్న కొనుగోలుదారులు",
    noAnalysis: "కొనుగోలుదారుల సూచనలను పొందడానికి మీ పంటను విశ్లేషించండి.",
    insightsTitle: "KisanSetu ఎలా పనిచేస్తుంది",
    insightsSubtitle:
      "రైతుల వాస్తవ ఆదాయాన్ని మెరుగుపరచడానికి రూపొందించిన నిర్ణయ వ్యవస్థ.",
    step1: "పంట వివరాలు",
    step1Text: "పంట, పరిమాణం, నాణ్యత మరియు ప్రదేశాన్ని నమోదు చేయండి.",
    step2: "మార్కెట్ విశ్లేషణ",
    step2Text: "ధర, డిమాండ్ మరియు మార్కెట్ మార్పులను విశ్లేషిస్తాము.",
    step3: "కొనుగోలుదారుల పోలిక",
    step3Text: "నికర ఆదాయం మరియు ప్రమాదం ఆధారంగా కొనుగోలుదారులను ర్యాంక్ చేస్తాము.",
    step4: "అమ్మకం పూర్తి చేయండి",
    step4Text: "సూచనను పరిశీలించి అమ్మకాన్ని నిర్ధారించండి.",
    differentiator: "KisanSetu ప్రత్యేకత",
    differentiatorText:
      "కేవలం ఆఫర్ ధర ఆధారంగా కాకుండా, రవాణా మరియు నిల్వ ఖర్చుల తర్వాత రైతుకు లభించే నికర ఆదాయాన్ని అంచనా వేస్తుంది.",
    reviewTitle: "మీ అమ్మకాన్ని పరిశీలించండి",
    reviewSubtitle: "నిర్ధారించే ముందు దిగువ వివరాలను పరిశీలించండి.",
    confirmSale: "అమ్మకాన్ని నిర్ధారించండి",
    cancel: "వెనక్కి వెళ్లండి",
    saleSuccess: "అమ్మకం నిర్ధారించబడింది",
    successText: "ఈ ప్రోటోటైప్‌లో మీ అమ్మకం విజయవంతంగా నమోదు చేయబడింది.",
    reference: "అమ్మకపు రిఫరెన్స్",
    startNew: "కొత్త విశ్లేషణ ప్రారంభించండి",
    prototype:
      "ప్రోటోటైప్ ప్రదర్శన. ఆర్థిక విలువలు మరియు కొనుగోలుదారుల సమాచారం సిమ్యులేట్ చేయబడింది.",

    // Trust, verification & payment lock
    tierBuyerNew: "కొత్త కొనుగోలుదారు",
    tierBuyerVerified: "వెరిఫైడ్ కొనుగోలుదారు",
    tierBuyerTrusted: "నమ్మకమైన కొనుగోలుదారు",
    tierFarmerNew: "కొత్త విక్రేత",
    tierFarmerVerified: "వెరిఫైడ్ రైతు",
    tierFarmerTrusted: "నమ్మకమైన సరఫరాదారు",
    salesCompletedLabel: "పూర్తయిన అమ్మకాలు",
    farmerRatingLabel: "రైతు రేటింగ్",
    gradeMatchLabel: "గ్రేడ్ మ్యాచ్ రేటు",
    onTimeDeliveryLabel: "సకాలంలో డెలివరీ",
    pastOrdersLabel: "గత ఆర్డర్లు",
    paymentReliabilityLabel: "చెల్లింపు విశ్వసనీయత",
    trustedByPrefix: "నమ్మకం పొందింది",
    trustedBySuffix: "మంది రైతుల నుండి",
    buyerStatusLabel: "కొనుగోలుదారు స్థితి",
    paymentSecuredTitle: "చెల్లింపు సురక్షితం",
    paymentSecuredText:
      "కొనుగోలుదారు {amount} ఎస్క్రోలో లాక్ చేశారు. డెలివరీ నిర్ధారించిన వెంటనే మొత్తం విడుదల అవుతుంది.",
    paymentPendingTitle: "చెల్లింపు ఇంకా సురక్షితం కాలేదు",
    paymentPendingText:
      "పికప్ షెడ్యూల్ చేయడానికి ముందు కొనుగోలుదారుని చెల్లింపు లాక్ చేయమని అడగండి, తద్వారా పంట తర్వాత మీరు వేచి ఉండాల్సిన అవసరం లేదు.",
    requestPaymentLock: "చెల్లింపు లాక్ కోరండి",
    paymentStatusLabel: "చెల్లింపు స్థితి",
    paymentLockedNote: "లాక్ చేయబడింది — డెలివరీ నిర్ధారణపై విడుదల అవుతుంది",
    trustSectionLabel: "నమ్మకం & ధృవీకరణ",
    trustHowTitle: '"KisanSetu Verified" ఎలా పనిచేస్తుంది',
    trustIntro:
      "ప్రకటించిన నాణ్యత గ్రేడ్ లేదా రేటింగ్ మాత్రమే మోసం చేయబడవచ్చు. కాబట్టి KisanSetu ప్రతి అమ్మకాన్ని నాలుగు స్వతంత్ర పాయింట్ల వద్ద తనిఖీ చేస్తుంది.",
    pipelineStep1Title: "ప్రకటించిన గ్రేడ్",
    pipelineStep1Text:
      "రైతు A / B / C ఎంచుకుని, గ్యాలరీ నుండి కాకుండా, యాప్‌లోనే ప్రత్యక్ష ఫోటో తీస్తారు.",
    pipelineStep2Title: "AI క్రాస్-చెక్",
    pipelineStep2Text:
      "AI గ్రేడింగ్ ప్రకటించిన గ్రేడ్ మరియు ఫోటో మధ్య తేడాలను గుర్తించి సమీక్ష కోసం ఫ్లాగ్ చేస్తుంది — స్వయంచాలకంగా ఆమోదించదు.",
    pipelineStep3Title: "పికప్ ధృవీకరణ",
    pipelineStep3Text:
      "రవాణా ప్రారంభమయ్యే ముందు పరిమాణం మరియు స్థితిని కలెక్షన్ పాయింట్ వద్ద భౌతికంగా తనిఖీ చేస్తారు.",
    pipelineStep4Title: "డెలివరీ నిర్ధారణ",
    pipelineStep4Text:
      "లాక్ చేసిన చెల్లింపు విడుదల కావడానికి ముందు కొనుగోలుదారు అందుకున్న నాణ్యతను నిర్ధారిస్తారు. తేడాలు వివాదాన్ని తెరుస్తాయి, స్వయంచాలక చెల్లింపు కాదు.",
    tierNewTitle: "కొత్త విక్రేత / కొనుగోలుదారు",
    tierNewText:
      "ఇప్పుడే చేరారు. వ్యాపారం చేయవచ్చు, కానీ ట్రాక్ రికార్డ్ ఏర్పడే వరకు పూర్తి చెల్లింపు లాక్ అడగవచ్చు.",
    tierVerifiedTitle: "వెరిఫైడ్",
    tierVerifiedText:
      "గుర్తింపు/నమోదు నిర్ధారించబడింది, 5+ పూర్తయిన ఆర్డర్లు, పరిష్కరించని వివాదాలు లేవు.",
    tierTrustedTitle: "నమ్మకమైన సరఫరాదారు / కొనుగోలుదారు",
    tierTrustedText:
      "90%+ గ్రేడ్-మ్యాచ్ మరియు సకాలం రేటుతో 20+ పూర్తయిన ఆర్డర్లు. స్మార్ట్ మ్యాచెస్‌లో ఎక్కువ ప్రాధాన్యత మరియు తక్కువ అడ్వాన్స్ అవసరాలు.",
    paymentLockTitle: "చెల్లింపు లాక్ వివరణ",
    paymentLockText:
      "రైతు పంట కోత మరియు రవాణాకు కట్టుబడి ఉండటానికి ముందు, కొనుగోలుదారు అంగీకరించిన మొత్తాన్ని KisanSetu లోని ఎస్క్రోలో లాక్ చేస్తారు. పికప్‌కు ముందే రైతు దీన్ని చూడగలరు — కొనుగోలుదారు నిజంగా చెల్లిస్తారా అని ఆలోచించాల్సిన అవసరం లేదు. కొనుగోలుదారు డెలివరీని నిర్ధారించిన వెంటనే మొత్తం స్వయంచాలకంగా విడుదల అవుతుంది; నాణ్యత వివాదం పరిష్కారమయ్యే వరకు లాక్‌గా ఉంటుంది.",
    photoLabel: "పంట ఫోటో",
    photoCta: "పంట ఫోటో తీయండి",
    photoRetake: "మళ్ళీ ఫోటో తీయండి",
    photoCaptured: "ఫోటో తీయబడింది — పికప్ వద్ద క్రాస్-చెక్ చేయబడుతుంది",
    photoNote:
      "గ్యాలరీ నుండి కాకుండా ప్రత్యక్ష ఫోటో తీయండి. ఇది కొనుగోలుదారులు మీ లిస్టింగ్‌ను నమ్మడానికి సహాయపడుతుంది.",
  },

  hi: {
    dashboard: "डैशबोर्ड",
    market: "बाज़ार विश्लेषण",
    buyers: "खरीदार",
    insights: "जानकारी",
    language: "भाषा",
    liveMarket: "लाइव मार्केट",
    heroTitle: "सही बिक्री का निर्णय लें।",
    heroSubtitle:
      "जानें कब बेचना है, किसे बेचना है और वास्तव में कितना कमाना है।",
    analyse: "मेरी उपज का विश्लेषण करें",
    fairPrice: "उचित मूल्य",
    demand: "मांग",
    trend: "मूल्य रुझान",
    buyersLabel: "खरीदार",
    analyseTitle: "अपनी उपज का विश्लेषण करें",
    analyseSubtitle:
      "स्मार्ट बिक्री सुझाव प्राप्त करने के लिए अपनी फसल की जानकारी दर्ज करें।",
    crop: "फसल",
    quantity: "मात्रा",
    quality: "गुणवत्ता",
    location: "स्थान",
    expectedOffer: "खरीदार का ऑफर",
    premium: "A — प्रीमियम",
    standard: "B — स्टैंडर्ड",
    basic: "C — बेसिक",
    quintal: "क्विंटल",
    marketPrice: "वर्तमान उचित मूल्य",
    yourOffer: "आपका ऑफर",
    estimatedNet: "अनुमानित शुद्ध आय",
    afterCosts: "परिवहन और भंडारण लागत के बाद",
    smartDecision: "स्मार्ट बिक्री निर्णय",
    confidence: "विश्वास",
    wait: "प्रतीक्षा करें",
    partialSell: "आंशिक बिक्री",
    sellNow: "अभी बेचें",
    expectedPrice: "अनुमानित मूल्य",
    sellPortion: "सुझाई गई बिक्री",
    holdPortion: "सुझाया गया भंडारण",
    why: "यह सुझाव क्यों?",
    netRealisation: "शुद्ध प्राप्ति",
    offerPrice: "ऑफर मूल्य",
    transport: "परिवहन",
    storageRisk: "भंडारण जोखिम",
    totalEarnings: "अनुमानित कुल आय",
    bestBuyer: "सर्वश्रेष्ठ खरीदार",
    bestMatch: "सर्वश्रेष्ठ मैच",
    proceedSale: "बिक्री की समीक्षा करें",
    distance: "दूरी",
    rating: "रेटिंग",
    quantityAvailable: "खरीदार क्षमता",
    reliability: "विश्वसनीयता",
    buyerReason:
      "शुद्ध आय, दूरी, क्षमता और रेटिंग के आधार पर यह खरीदार सबसे बेहतर है।",
    allBuyers: "उपलब्ध खरीदार",
    noAnalysis: "खरीदार सुझाव देखने के लिए अपनी उपज का विश्लेषण करें।",
    insightsTitle: "KisanSetu कैसे काम करता है",
    insightsSubtitle:
      "किसानों की वास्तविक आय बढ़ाने के लिए बनाया गया निर्णय सिस्टम।",
    step1: "उपज दर्ज करें",
    step1Text: "फसल, मात्रा, गुणवत्ता और स्थान दर्ज करें।",
    step2: "बाज़ार विश्लेषण",
    step2Text: "हम मूल्य, मांग और बाज़ार के रुझान का विश्लेषण करते हैं।",
    step3: "खरीदारों की तुलना",
    step3Text: "खरीदारों को शुद्ध आय और जोखिम के आधार पर रैंक किया जाता है।",
    step4: "बिक्री पूरी करें",
    step4Text: "सुझाव की समीक्षा करें और बिक्री की पुष्टि करें।",
    differentiator: "KisanSetu की खासियत",
    differentiatorText:
      "सिर्फ ऑफर मूल्य नहीं, बल्कि परिवहन और भंडारण लागत के बाद किसान की वास्तविक शुद्ध आय का अनुमान लगाता है।",
    reviewTitle: "अपनी बिक्री की समीक्षा करें",
    reviewSubtitle:
      "पुष्टि करने से पहले नीचे दिए गए विवरणों की जांच करें।",
    confirmSale: "बिक्री की पुष्टि करें",
    cancel: "वापस जाएं",
    saleSuccess: "बिक्री की पुष्टि हो गई",
    successText:
      "इस प्रोटोटाइप में आपकी बिक्री सफलतापूर्वक दर्ज की गई है।",
    reference: "बिक्री संदर्भ",
    startNew: "नया विश्लेषण शुरू करें",
    prototype:
      "प्रोटोटाइप प्रदर्शन। वित्तीय मूल्य और खरीदार जानकारी सिम्युलेटेड है।",

    // Trust, verification & payment lock
    tierBuyerNew: "नया खरीदार",
    tierBuyerVerified: "सत्यापित खरीदार",
    tierBuyerTrusted: "विश्वसनीय खरीदार",
    tierFarmerNew: "नया विक्रेता",
    tierFarmerVerified: "सत्यापित किसान",
    tierFarmerTrusted: "विश्वसनीय आपूर्तिकर्ता",
    salesCompletedLabel: "पूर्ण बिक्री",
    farmerRatingLabel: "किसान रेटिंग",
    gradeMatchLabel: "ग्रेड मिलान दर",
    onTimeDeliveryLabel: "समय पर डिलीवरी",
    pastOrdersLabel: "पिछले ऑर्डर",
    paymentReliabilityLabel: "भुगतान विश्वसनीयता",
    trustedByPrefix: "भरोसा किया",
    trustedBySuffix: "किसानों ने",
    buyerStatusLabel: "खरीदार स्थिति",
    paymentSecuredTitle: "भुगतान सुरक्षित",
    paymentSecuredText:
      "खरीदार ने {amount} एस्क्रो में लॉक कर दिया है। डिलीवरी की पुष्टि होते ही राशि स्वतः जारी हो जाएगी।",
    paymentPendingTitle: "भुगतान अभी सुरक्षित नहीं है",
    paymentPendingText:
      "पिकअप शेड्यूल करने से पहले खरीदार से भुगतान लॉक करने के लिए कहें, ताकि फसल कटाई के बाद आपको इंतज़ार न करना पड़े।",
    requestPaymentLock: "भुगतान लॉक का अनुरोध करें",
    paymentStatusLabel: "भुगतान स्थिति",
    paymentLockedNote: "लॉक किया गया — डिलीवरी की पुष्टि पर जारी होगा",
    trustSectionLabel: "विश्वास और सत्यापन",
    trustHowTitle: '"KisanSetu Verified" वास्तव में कैसे काम करता है',
    trustIntro:
      "केवल घोषित गुणवत्ता ग्रेड या रेटिंग को धोखा दिया जा सकता है। इसलिए KisanSetu हर बिक्री की जांच चार स्वतंत्र बिंदुओं पर करता है, ताकि कोई भी एक नकली फोटो, समीक्षा या दावा पूरे लेनदेन को प्रभावित न कर सके।",
    pipelineStep1Title: "घोषित ग्रेड",
    pipelineStep1Text:
      "किसान A / B / C चुनता है और गैलरी अपलोड के बजाय ऐप के भीतर सीधे फोटो खींचता है।",
    pipelineStep2Title: "AI क्रॉस-चेक",
    pipelineStep2Text:
      "एक AI ग्रेडिंग जांच घोषित ग्रेड और फोटो के बीच बेमेल को समीक्षा के लिए फ़्लैग करती है — यह स्वतः स्वीकृत नहीं करती।",
    pipelineStep3Title: "पिकअप सत्यापन",
    pipelineStep3Text:
      "परिवहन शुरू होने से पहले मात्रा और स्थिति की जांच संग्रह केंद्र पर भौतिक रूप से की जाती है।",
    pipelineStep4Title: "डिलीवरी की पुष्टि",
    pipelineStep4Text:
      "लॉक किया गया भुगतान जारी होने से पहले खरीदार प्राप्त गुणवत्ता की पुष्टि करता है। बेमेल होने पर विवाद खुलता है, स्वतः भुगतान नहीं।",
    tierNewTitle: "नया विक्रेता / खरीदार",
    tierNewText:
      "अभी-अभी जुड़े हैं। व्यापार कर सकते हैं, लेकिन ट्रैक रिकॉर्ड बनने तक प्रतिपक्ष पूर्ण भुगतान लॉक मांग सकते हैं।",
    tierVerifiedTitle: "सत्यापित",
    tierVerifiedText:
      "पहचान/पंजीकरण की पुष्टि, 5+ पूर्ण ऑर्डर, कोई अनसुलझा विवाद नहीं।",
    tierTrustedTitle: "विश्वसनीय आपूर्तिकर्ता / खरीदार",
    tierTrustedText:
      "90%+ ग्रेड-मिलान और समय पर दर के साथ 20+ पूर्ण ऑर्डर। स्मार्ट मैचेस में उच्च प्राथमिकता और कम अग्रिम आवश्यकताएं।",
    paymentLockTitle: "भुगतान लॉक, समझाया गया",
    paymentLockText:
      "किसान के फसल कटाई और परिवहन के लिए प्रतिबद्ध होने से पहले, खरीदार सहमत राशि को KisanSetu के भीतर एस्क्रो में लॉक करता है। किसान पिकअप से पहले ही यह देख सकता है — इसलिए उन्हें कभी संदेह नहीं रहता कि खरीदार वास्तव में भुगतान करेगा या नहीं। खरीदार द्वारा डिलीवरी की पुष्टि होते ही राशि स्वतः जारी हो जाती है; गुणवत्ता विवाद होने पर यह समाधान होने तक लॉक रहती है।",
    photoLabel: "उपज फोटो",
    photoCta: "उपज की फोटो लें",
    photoRetake: "फिर से फोटो लें",
    photoCaptured: "फोटो ली गई — पिकअप पर क्रॉस-चेक की जाएगी",
    photoNote:
      "गैलरी अपलोड के बजाय लाइव फोटो लें। इससे खरीदारों को आपकी लिस्टिंग पर भरोसा करने में मदद मिलती है।",
  },
};

const formatCurrency = (value) =>
  `₹${Math.round(value).toLocaleString("en-IN")}`;

function App() {
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  const [crop, setCrop] = useState("Tomato");
  const [quantity, setQuantity] = useState(10);
  const [quality, setQuality] = useState("A");
  const [location, setLocation] = useState("Hyderabad");
  const [offer, setOffer] = useState(2100);
  const [producePhoto, setProducePhoto] = useState(null);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [showSaleReview, setShowSaleReview] = useState(false);
  const [saleCompleted, setSaleCompleted] = useState(false);
  const [saleReference, setSaleReference] = useState("");
  const [paymentLocked, setPaymentLocked] = useState(false);

  const farmerTierKey = useMemo(
    () =>
      getTrustTier(
        farmerProfile.pastSales,
        farmerProfile.gradeMatchRate
      ),
    []
  );

  const selectedCrop = crops[crop];

  const qualityMultiplier = {
    A: 1.1,
    B: 1,
    C: 0.9,
  }[quality];

  const fairPrice = selectedCrop.base * qualityMultiplier;

  const storageRiskMap = {
    Tomato: 50,
    Onion: 40,
    Rice: 25,
    Wheat: 20,
    Cotton: 30,
    Tea: 15,
    Sugarcane: 35,
    Turmeric: 22,
    Coffee: 18,
    Jute: 28,
    Groundnut: 26,
  };

  const storageRisk = storageRiskMap[crop] || 30;

  const transportCost = location === "Hyderabad" ? 120 : 150;

  const netRealisation = useMemo(() => {
    const perQuintal = Math.max(
      offer - transportCost - storageRisk,
      0
    );

    return {
      perQuintal,
      total: perQuintal * Number(quantity || 0),
    };
  }, [offer, transportCost, storageRisk, quantity]);

  const sellDecision = useMemo(() => {
    if (selectedCrop.demand >= 85 && selectedCrop.trend >= 10) {
      return {
        decision: "PARTIAL SELL",
        confidence: 91,
        sell: 40,
        hold: 60,
        expectedPrice: fairPrice * 1.03,
        reason:
          "Demand is strong and prices are rising. Selling a portion now protects against storage risk while allowing you to benefit from a possible price increase.",
      };
    }

    if (selectedCrop.demand >= 75 && selectedCrop.trend >= 5) {
      return {
        decision: "WAIT",
        confidence: 86,
        sell: 0,
        hold: 100,
        expectedPrice: fairPrice * 1.05,
        reason:
          "Demand is healthy and the market is showing an upward trend. Waiting may improve your expected realization.",
      };
    }

    if (selectedCrop.trend < 0 || selectedCrop.demand < 60) {
      return {
        decision: "SELL NOW",
        confidence: 88,
        sell: 100,
        hold: 0,
        expectedPrice: fairPrice,
        reason:
          "Market conditions are weaker, so delaying the sale could increase price and storage risk.",
      };
    }

    return {
      decision: "SELL NOW",
      confidence: 80,
      sell: 100,
      hold: 0,
      expectedPrice: fairPrice,
      reason:
        "Current market conditions support selling at the present fair price.",
    };
  }, [selectedCrop, fairPrice]);

  const matchedBuyers = useMemo(() => {
    return buyers
      .map((buyer) => {
        const buyerTransport = 60 + buyer.distance * 3;
        const buyerNet =
          buyer.price - buyerTransport - storageRisk;

        const quantityFit = Math.min(
          Number(quantity || 0) / buyer.quantity,
          1
        );

        const distanceScore = Math.max(
          0,
          1 - buyer.distance / 100
        );

        const ratingScore = buyer.rating / 5;

        const priceScore = Math.min(
          buyerNet / fairPrice,
          1.2
        );

        const score = Math.min(
          100,
          priceScore * 40 +
            distanceScore * 25 +
            quantityFit * 20 +
            ratingScore * 15
        );

        return {
          ...buyer,
          buyerTransport,
          buyerNet,
          score: Math.round(score),
        };
      })
      .sort((a, b) => b.score - a.score);
  }, [quantity, fairPrice, storageRisk]);

  const bestBuyer = matchedBuyers[0];

  const recommendationLabel = {
    WAIT: t.wait,
    "PARTIAL SELL": t.partialSell,
    "SELL NOW": t.sellNow,
  }[sellDecision.decision];

  const handleAnalyse = () => {
    setAnalysisStarted(true);
    setShowSaleReview(false);
    setSaleCompleted(false);
    setActiveTab("market");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleProceedToSale = () => {
    if (!bestBuyer) return;

    setShowSaleReview(true);
    setSaleCompleted(false);
    setPaymentLocked(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleConfirmSale = () => {
    const reference = `KS-${Date.now()
      .toString()
      .slice(-8)}`;

    setSaleReference(reference);
    setSaleCompleted(true);
    setShowSaleReview(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleStartNewAnalysis = () => {
    setCrop("Tomato");
    setQuantity(10);
    setQuality("A");
    setLocation("Hyderabad");
    setOffer(2100);
    setProducePhoto(null);

    setAnalysisStarted(false);
    setShowSaleReview(false);
    setSaleCompleted(false);
    setSaleReference("");
    setPaymentLocked(false);
    setActiveTab("dashboard");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navigate = (tab) => {
    setActiveTab(tab);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePhotoCapture = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (producePhoto) URL.revokeObjectURL(producePhoto.url);

    setProducePhoto({
      url: URL.createObjectURL(file),
      capturedAt: new Date().toLocaleTimeString(),
    });
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="nav-container">
          <button
            className="logo"
            onClick={() => navigate("dashboard")}
          >
            <span className="logo-mark">
              <span className="logo-leaf" />
            </span>

            <span className="logo-text">
              Kisan<span>Setu</span>
            </span>
          </button>

          <nav className="nav-links">
            <button
              className={activeTab === "dashboard" ? "active" : ""}
              onClick={() => navigate("dashboard")}
            >
              {t.dashboard}
            </button>

            <button
              className={activeTab === "market" ? "active" : ""}
              onClick={() => navigate("market")}
            >
              {t.market}
            </button>

            <button
              className={activeTab === "buyers" ? "active" : ""}
              onClick={() => navigate("buyers")}
            >
              {t.buyers}
            </button>

            <button
              className={activeTab === "insights" ? "active" : ""}
              onClick={() => navigate("insights")}
            >
              {t.insights}
            </button>
          </nav>

          <div className="nav-actions">
            <span className="live-indicator">
              <span />
              {t.liveMarket}
            </span>

            <select
              className="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              aria-label={t.language}
            >
              <option value="en">English</option>
              <option value="te">తెలుగు</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
        </div>
      </header>

      {activeTab === "dashboard" && (
        <>
          <section className="hero">
            <div className="page-container hero-grid">
              <div className="hero-copy">
                <div className="eyebrow">
                  <span className="eyebrow-line" />
                  FARMER DECISION SUPPORT
                </div>

                <h1>{t.heroTitle}</h1>

                <p>{t.heroSubtitle}</p>

                <button
                  className="primary-button"
                  onClick={() => {
                    navigate("dashboard");

                    setTimeout(() => {
                      document
                        .getElementById("analysis-form")
                        ?.scrollIntoView({
                          behavior: "smooth",
                        });
                    }, 50);
                  }}
                >
                  {t.analyse}
                  <span>→</span>
                </button>
              </div>

              <div className="hero-decision-card">
                <div className="decision-card-top">
                  <div>
                    <span className="small-label">
                      SMART DECISION
                    </span>

                    <h3>{recommendationLabel}</h3>
                  </div>

                  <div className="confidence-ring">
                    <strong>{sellDecision.confidence}%</strong>
                    <span>{t.confidence}</span>
                  </div>
                </div>

                <div className="decision-divider" />

                <div className="decision-price-row">
                  <div>
                    <span>{t.expectedPrice}</span>
                    <strong>
                      {formatCurrency(
                        sellDecision.expectedPrice
                      )}
                      <small>/q</small>
                    </strong>
                  </div>

                  <div className="trend-positive">
                    +{selectedCrop.trend}%
                    <span>market trend</span>
                  </div>
                </div>

                <div className="decision-bar">
                  <div
                    style={{
                      width: `${sellDecision.sell}%`,
                    }}
                  />
                </div>

                <div className="decision-bar-labels">
                  <span>
                    Sell {sellDecision.sell}%
                  </span>
                  <span>
                    Hold {sellDecision.hold}%
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="market-strip">
            <div className="page-container market-strip-grid">
              <div className="market-strip-title">
                <span className="market-dot" />
                {crop} Market
              </div>

              <div className="market-stat">
                <span>{t.fairPrice}</span>
                <strong>
                  {formatCurrency(fairPrice)}
                  <small>/q</small>
                </strong>
              </div>

              <div className="market-stat">
                <span>{t.demand}</span>
                <strong>{selectedCrop.demand}/100</strong>
              </div>

              <div className="market-stat">
                <span>{t.trend}</span>
                <strong className="positive">
                  +{selectedCrop.trend}%
                </strong>
              </div>

              <div className="market-stat">
                <span>{t.buyersLabel}</span>
                <strong>{selectedCrop.buyers}</strong>
              </div>
            </div>
          </section>

          <section className="trust-strip">
            <div className="page-container trust-strip-grid">
              <div className="trust-identity">
                <div className="trust-avatar">RK</div>
                <div>
                  <strong>{farmerProfile.name}</strong>
                  <span>{farmerProfile.village}</span>
                </div>
              </div>

              <span className={`verified-badge tier-${farmerTierKey}`}>
                🛡️ {farmerTierLabel(farmerTierKey, t)}
              </span>

              <div className="trust-stat">
                <span>{t.salesCompletedLabel}</span>
                <strong>{farmerProfile.pastSales}</strong>
              </div>

              <div className="trust-stat">
                <span>{t.farmerRatingLabel}</span>
                <strong>{farmerProfile.rating}★</strong>
              </div>

              <div className="trust-stat">
                <span>{t.gradeMatchLabel}</span>
                <strong>{farmerProfile.gradeMatchRate}%</strong>
              </div>

              <div className="trust-stat">
                <span>{t.onTimeDeliveryLabel}</span>
                <strong>{farmerProfile.onTimeDelivery}%</strong>
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab === "dashboard" && (
        <main className="page-container main-area">
          <section
            className="analysis-section"
            id="analysis-form"
          >
            <div className="section-heading">
              <div>
                <span className="section-kicker">
                  STEP 01
                </span>
                <h2>{t.analyseTitle}</h2>
                <p>{t.analyseSubtitle}</p>
              </div>
            </div>

            <div className="analysis-layout">
              <div className="produce-form">
                <div className="form-grid">
                  <div className="form-field">
                    <label>{t.crop}</label>

                    <select
                      value={crop}
                      onChange={(e) =>
                        setCrop(e.target.value)
                      }
                    >
                      {Object.keys(crops).map(
                        (cropName) => (
                          <option
                            key={cropName}
                            value={cropName}
                          >
                            {cropName} — {crops[cropName].region}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="form-field">
                    <label>{t.quantity}</label>

                    <div className="input-unit">
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(
                            Math.max(
                              1,
                              Number(e.target.value)
                            )
                          )
                        }
                      />

                      <span>{t.quintal}</span>
                    </div>
                  </div>

                  <div className="form-field">
                    <label>{t.quality}</label>

                    <select
                      value={quality}
                      onChange={(e) =>
                        setQuality(e.target.value)
                      }
                    >
                      <option value="A">
                        {t.premium}
                      </option>
                      <option value="B">
                        {t.standard}
                      </option>
                      <option value="C">
                        {t.basic}
                      </option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>{t.location}</label>

                    <select
                      value={location}
                      onChange={(e) =>
                        setLocation(e.target.value)
                      }
                    >
                      <option value="Hyderabad">
                        Hyderabad
                      </option>
                      <option value="Other">
                        Other
                      </option>
                    </select>
                  </div>
                </div>

                <div className="form-field offer-field">
                  <label>{t.expectedOffer}</label>

                  <div className="price-input">
                    <span>₹</span>

                    <input
                      type="number"
                      min="0"
                      value={offer}
                      onChange={(e) =>
                        setOffer(
                          Math.max(
                            0,
                            Number(e.target.value)
                          )
                        )
                      }
                    />

                    <small>/ quintal</small>
                  </div>
                </div>

                <div className="form-field photo-field">
                  <label>{t.photoLabel}</label>

                  {producePhoto ? (
                    <div className="photo-preview">
                      <img src={producePhoto.url} alt="Captured produce" />
                      <div className="photo-preview-info">
                        <span className="photo-captured-badge">
                          ✅ {t.photoCaptured}
                        </span>
                        <label className="secondary-button photo-retake">
                          {t.photoRetake}
                          <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handlePhotoCapture}
                            hidden
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label className="photo-capture-box">
                      <span className="photo-capture-icon">📷</span>
                      <span className="photo-capture-text">{t.photoCta}</span>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handlePhotoCapture}
                        hidden
                      />
                    </label>
                  )}

                  <p className="photo-note">{t.photoNote}</p>
                </div>

                <button
                  className="analyse-button"
                  onClick={handleAnalyse}
                >
                  {t.analyse}
                  <span>→</span>
                </button>
              </div>

              <div className="earnings-preview">
                <span className="preview-label">
                  {t.estimatedNet}
                </span>

                <strong>
                  {formatCurrency(
                    netRealisation.total
                  )}
                </strong>

                <p>{t.afterCosts}</p>

                <div className="preview-divider" />

                <div className="preview-row">
                  <span>{t.marketPrice}</span>
                  <strong>
                    {formatCurrency(fairPrice)}/q
                  </strong>
                </div>

                <div className="preview-row">
                  <span>{t.yourOffer}</span>
                  <strong>
                    {formatCurrency(offer)}/q
                  </strong>
                </div>

                <div className="preview-row">
                  <span>{t.transport}</span>
                  <strong>
                    −{formatCurrency(transportCost)}/q
                  </strong>
                </div>
              </div>
            </div>
          </section>

          <section className="differentiator">
            <div className="differentiator-number">
              01
            </div>

            <div>
              <span className="section-kicker">
                OUR DIFFERENTIATOR
              </span>

              <h3>{t.differentiator}</h3>

              <p>{t.differentiatorText}</p>
            </div>
          </section>
        </main>
      )}

      {activeTab === "market" && (
        <main className="page-container inner-page">
          {!analysisStarted ? (
            <div className="empty-state">
              <div className="empty-number">01</div>
              <h2>{t.analyseTitle}</h2>
              <p>{t.noAnalysis}</p>

              <button
                className="primary-button"
                onClick={() => navigate("dashboard")}
              >
                {t.analyse}
                <span>→</span>
              </button>
            </div>
          ) : (
            <>
              <div className="inner-header">
                <div>
                  <span className="section-kicker">
                    MARKET ANALYSIS
                  </span>

                  <h2>
                    {crop}{" "}
                    <span className="header-muted">
                      / {quantity} {t.quintal}
                    </span>
                  </h2>
                </div>

                <div className="header-market-price">
                  <span>{t.fairPrice}</span>
                  <strong>
                    {formatCurrency(fairPrice)}/q
                  </strong>
                </div>
              </div>

              <div className="market-overview">
                <div className="overview-item">
                  <span>{t.demand}</span>
                  <strong>{selectedCrop.demand}/100</strong>
                  <div className="mini-progress">
                    <span
                      style={{
                        width: `${selectedCrop.demand}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="overview-item">
                  <span>{t.trend}</span>
                  <strong className="positive">
                    +{selectedCrop.trend}%
                  </strong>
                  <p>Positive movement</p>
                </div>

                <div className="overview-item">
                  <span>{t.buyersLabel}</span>
                  <strong>{selectedCrop.buyers}</strong>
                  <p>Potential buyers</p>
                </div>

                <div className="overview-item">
                  <span>{t.estimatedNet}</span>
                  <strong>
                    {formatCurrency(
                      netRealisation.total
                    )}
                  </strong>
                  <p>Based on your offer</p>
                </div>
              </div>

              <div className="recommendation">
                <div className="recommendation-top">
                  <div>
                    <span className="section-kicker">
                      KISANSETU RECOMMENDATION
                    </span>

                    <h2>{recommendationLabel}</h2>
                  </div>

                  <div className="confidence-large">
                    <strong>
                      {sellDecision.confidence}%
                    </strong>

                    <span>{t.confidence}</span>
                  </div>
                </div>

                <div className="recommendation-content">
                  <div className="decision-circle">
                    <span>
                      {sellDecision.sell}%
                    </span>
                    <small>SELL</small>
                  </div>

                  <div className="recommendation-text">
                    <h3>{t.why}</h3>
                    <p>{sellDecision.reason}</p>

                    <div className="decision-metrics">
                      <div>
                        <span>{t.expectedPrice}</span>
                        <strong>
                          {formatCurrency(
                            sellDecision.expectedPrice
                          )}
                          /q
                        </strong>
                      </div>

                      <div>
                        <span>{t.sellPortion}</span>
                        <strong>
                          {sellDecision.sell}%
                        </strong>
                      </div>

                      <div>
                        <span>{t.holdPortion}</span>
                        <strong>
                          {sellDecision.hold}%
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="net-card">
                <div className="net-card-heading">
                  <div>
                    <span className="section-kicker">
                      YOUR FINANCIAL OUTCOME
                    </span>
                    <h2>{t.netRealisation}</h2>
                  </div>

                  <strong>
                    {formatCurrency(
                      netRealisation.total
                    )}
                  </strong>
                </div>

                <div className="net-breakdown">
                  <div>
                    <span>{t.offerPrice}</span>
                    <strong>
                      {formatCurrency(offer)}/q
                    </strong>
                  </div>

                  <div className="minus">−</div>

                  <div>
                    <span>{t.transport}</span>
                    <strong>
                      {formatCurrency(transportCost)}/q
                    </strong>
                  </div>

                  <div className="minus">−</div>

                  <div>
                    <span>{t.storageRisk}</span>
                    <strong>
                      {formatCurrency(storageRisk)}/q
                    </strong>
                  </div>

                  <div className="equals">=</div>

                  <div className="net-result">
                    <span>{t.totalEarnings}</span>
                    <strong>
                      {formatCurrency(
                        netRealisation.perQuintal
                      )}
                      /q
                    </strong>
                  </div>
                </div>
              </div>

              <div className="best-buyer">
                <div className="buyer-section-heading">
                  <div>
                    <span className="section-kicker">
                      MATCHING ENGINE
                    </span>

                    <h2>{t.bestBuyer}</h2>
                  </div>

                  <span className="match-label">
                    {t.bestMatch}
                  </span>
                </div>

                <div className="best-buyer-content">
                  <div className="buyer-identity">
                    <div className="buyer-avatar">
                      {bestBuyer.name
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </div>

                    <div>
                      <h3>{bestBuyer.name}</h3>
                      <p>{bestBuyer.type}</p>
                      <span className={`verified-badge tier-${bestBuyer.tier}`}>
                        {bestBuyer.verified ? "🛡️ " : ""}
                        {buyerTierLabel(bestBuyer.tier, t)}
                      </span>
                      <div className="buyer-rating-line">
                        <span className="stars">{renderStars(bestBuyer.rating)}</span>
                        <span className="rating-number">{bestBuyer.rating}/5</span>
                        {bestBuyer.verified && (
                          <span className="trusted-by">
                            · {t.trustedByPrefix} {bestBuyer.pastOrders}+ {t.trustedBySuffix}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="buyer-score">
                    <strong>{bestBuyer.score}</strong>
                    <span>match score</span>
                  </div>

                  <div className="buyer-stat">
                    <span>{t.distance}</span>
                    <strong>
                      {bestBuyer.distance} km
                    </strong>
                  </div>

                  <div className="buyer-stat">
                    <span>{t.rating}</span>
                    <strong>
                      {bestBuyer.rating}/5
                    </strong>
                  </div>

                  <div className="buyer-stat">
                    <span>{t.pastOrdersLabel}</span>
                    <strong>{bestBuyer.pastOrders}</strong>
                  </div>

                  <div className="buyer-stat">
                    <span>{t.paymentReliabilityLabel}</span>
                    <strong>{bestBuyer.paymentReliability}%</strong>
                  </div>
                </div>

                <div className="buyer-bottom">
                  <p>{t.buyerReason}</p>

                  <button
                    className="analyse-button compact"
                    onClick={handleProceedToSale}
                  >
                    {t.proceedSale}
                    <span>→</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {showSaleReview && bestBuyer && (
            <div className="modal-overlay">
              <div className="sale-review">
                <button
                  className="close-button"
                  onClick={() =>
                    setShowSaleReview(false)
                  }
                >
                  ×
                </button>

                <span className="section-kicker">
                  FINAL REVIEW
                </span>

                <h2>{t.reviewTitle}</h2>

                <p>{t.reviewSubtitle}</p>

                <div className="sale-review-grid">
                  <div>
                    <span>{t.crop}</span>
                    <strong>{crop}</strong>
                  </div>

                  <div>
                    <span>{t.quantity}</span>
                    <strong>
                      {quantity} {t.quintal}
                    </strong>
                  </div>

                  <div>
                    <span>{t.quality}</span>
                    <strong>{quality}</strong>
                  </div>

                  <div>
                    <span>{t.location}</span>
                    <strong>{location}</strong>
                  </div>

                  <div>
                    <span>{t.bestBuyer}</span>
                    <strong>{bestBuyer.name}</strong>
                  </div>

                  <div>
                    <span>{t.offerPrice}</span>
                    <strong>
                      {formatCurrency(offer)}/q
                    </strong>
                  </div>
                </div>

                <div className="sale-total">
                  <span>{t.totalEarnings}</span>

                  <strong>
                    {formatCurrency(
                      bestBuyer.buyerNet *
                        Number(quantity)
                    )}
                  </strong>
                </div>

                <div className="trust-panel">
                  <div className="trust-panel-row">
                    <div>
                      <span className="small-label">{t.buyerStatusLabel}</span>
                      <span className={`verified-badge tier-${bestBuyer.tier}`}>
                        {bestBuyer.verified ? "🛡️ " : ""}
                        {buyerTierLabel(bestBuyer.tier, t)}
                      </span>
                    </div>

                    <div className="trust-stat">
                      <span>{t.pastOrdersLabel}</span>
                      <strong>{bestBuyer.pastOrders}</strong>
                    </div>

                    <div className="trust-stat">
                      <span>{t.paymentReliabilityLabel}</span>
                      <strong>{bestBuyer.paymentReliability}%</strong>
                    </div>
                  </div>

                  <div
                    className={`payment-lock-box ${
                      paymentLocked ? "locked" : "pending"
                    }`}
                  >
                    <span className="lock-icon">
                      {paymentLocked ? "🔒" : "🔓"}
                    </span>

                    <div className="lock-copy">
                      <strong>
                        {paymentLocked
                          ? t.paymentSecuredTitle
                          : t.paymentPendingTitle}
                      </strong>

                      <p>
                        {paymentLocked
                          ? t.paymentSecuredText.replace(
                              "{amount}",
                              formatCurrency(
                                bestBuyer.buyerNet * Number(quantity)
                              )
                            )
                          : t.paymentPendingText}
                      </p>
                    </div>

                    {!paymentLocked && (
                      <button
                        className="secondary-button lock-button"
                        onClick={() => setPaymentLocked(true)}
                      >
                        {t.requestPaymentLock}
                      </button>
                    )}
                  </div>
                </div>

                <div className="prototype-note">
                  {t.prototype}
                </div>

                <div className="sale-actions">
                  <button
                    className="secondary-button"
                    onClick={() =>
                      setShowSaleReview(false)
                    }
                  >
                    {t.cancel}
                  </button>

                  <button
                    className="primary-button"
                    onClick={handleConfirmSale}
                    disabled={!paymentLocked}
                  >
                    {t.confirmSale}
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {saleCompleted && (
            <div className="success-state">
              <div className="success-check">✓</div>

              <span className="section-kicker">
                TRANSACTION COMPLETE
              </span>

              <h2>{t.saleSuccess}</h2>

              <p>{t.successText}</p>

              <div className="reference">
                <span>{t.reference}</span>
                <strong>{saleReference}</strong>
              </div>

              <div className="reference">
                <span>{t.paymentStatusLabel}</span>
                <strong>🔒 {t.paymentLockedNote}</strong>
              </div>

              <button
                className="primary-button"
                onClick={handleStartNewAnalysis}
              >
                {t.startNew}
                <span>→</span>
              </button>
            </div>
          )}
        </main>
      )}

      {activeTab === "buyers" && (
        <main className="page-container inner-page">
          <div className="inner-header">
            <div>
              <span className="section-kicker">
                BUYER NETWORK
              </span>
              <h2>{t.allBuyers}</h2>
            </div>

            <span className="buyer-count">
              {matchedBuyers.length} matched
            </span>
          </div>

          <div className="buyers-table">
            {matchedBuyers.map((buyer, index) => (
              <div
                className={`buyer-row ${
                  index === 0 ? "top-row" : ""
                }`}
                key={buyer.name}
              >
                <div className="rank">
                  0{index + 1}
                </div>

                <div className="buyer-name">
                  <strong>{buyer.name}</strong>
                  <span>{buyer.type}</span>
                  <span className={`verified-badge tier-${buyer.tier} small`}>
                    {buyer.verified ? "🛡️ " : ""}
                    {buyerTierLabel(buyer.tier, t)}
                  </span>
                  <div className="buyer-rating-line">
                    <span className="stars">{renderStars(buyer.rating)}</span>
                    <span className="rating-number">{buyer.rating}/5</span>
                  </div>
                </div>

                <div>
                  <span>{t.distance}</span>
                  <strong>
                    {buyer.distance} km
                  </strong>
                </div>

                <div>
                  <span>{t.rating}</span>
                  <strong>{buyer.rating}/5</strong>
                </div>

                <div>
                  <span>{t.pastOrdersLabel}</span>
                  <strong>{buyer.pastOrders}</strong>
                </div>

                <div>
                  <span>{t.netRealisation}</span>
                  <strong>
                    {formatCurrency(
                      buyer.buyerNet
                    )}
                    /q
                  </strong>
                </div>

                <div className="score-column">
                  <span>Match</span>
                  <strong>{buyer.score}/100</strong>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {activeTab === "insights" && (
        <main className="page-container inner-page">
          <div className="insights-intro">
            <span className="section-kicker">
              THE KISANSETU PROCESS
            </span>

            <h2>{t.insightsTitle}</h2>

            <p>{t.insightsSubtitle}</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <span>01</span>
              <h3>{t.step1}</h3>
              <p>{t.step1Text}</p>
            </div>

            <div className="step-card">
              <span>02</span>
              <h3>{t.step2}</h3>
              <p>{t.step2Text}</p>
            </div>

            <div className="step-card">
              <span>03</span>
              <h3>{t.step3}</h3>
              <p>{t.step3Text}</p>
            </div>

            <div className="step-card">
              <span>04</span>
              <h3>{t.step4}</h3>
              <p>{t.step4Text}</p>
            </div>
          </div>

          <div className="insight-banner">
            <div className="insight-number">
              ₹
            </div>

            <div>
              <span className="section-kicker">
                THE CORE IDEA
              </span>

              <h3>
                Highest offer ≠ highest earnings.
              </h3>

              <p>
                KisanSetu evaluates the actual amount
                a farmer can realise after considering
                transport and storage costs.
              </p>
            </div>
          </div>

          <div className="trust-explainer">
            <span className="section-kicker">{t.trustSectionLabel}</span>
            <h2>{t.trustHowTitle}</h2>
            <p>{t.trustIntro}</p>

            <div className="trust-pipeline">
              <div className="pipeline-step">
                <span className="pipeline-index">1</span>
                <h4>{t.pipelineStep1Title}</h4>
                <p>{t.pipelineStep1Text}</p>
              </div>

              <div className="pipeline-arrow">→</div>

              <div className="pipeline-step">
                <span className="pipeline-index">2</span>
                <h4>{t.pipelineStep2Title}</h4>
                <p>{t.pipelineStep2Text}</p>
              </div>

              <div className="pipeline-arrow">→</div>

              <div className="pipeline-step">
                <span className="pipeline-index">3</span>
                <h4>{t.pipelineStep3Title}</h4>
                <p>{t.pipelineStep3Text}</p>
              </div>

              <div className="pipeline-arrow">→</div>

              <div className="pipeline-step">
                <span className="pipeline-index">4</span>
                <h4>{t.pipelineStep4Title}</h4>
                <p>{t.pipelineStep4Text}</p>
              </div>
            </div>

            <div className="trust-tiers-grid">
              <div className="tier-card">
                <span className="tier-dot new" />
                <h4>{t.tierNewTitle}</h4>
                <p>{t.tierNewText}</p>
              </div>

              <div className="tier-card">
                <span className="tier-dot verified" />
                <h4>{t.tierVerifiedTitle}</h4>
                <p>{t.tierVerifiedText}</p>
              </div>

              <div className="tier-card">
                <span className="tier-dot trusted" />
                <h4>{t.tierTrustedTitle}</h4>
                <p>{t.tierTrustedText}</p>
              </div>
            </div>

            <div className="payment-lock-explainer">
              <span className="lock-icon">🔒</span>
              <div>
                <h4>{t.paymentLockTitle}</h4>
                <p>{t.paymentLockText}</p>
              </div>
            </div>
          </div>
        </main>
      )}

      <footer className="footer">
        <div className="page-container footer-inner">
          <div>
            <div className="footer-logo">
              Kisan<span>Setu</span>
            </div>

            <p>
              Farmer-first decision support for smarter
              agricultural selling.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default App;