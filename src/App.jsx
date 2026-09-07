import { useMemo, useState } from "react";
import "./assets/App.css";

const crops = {
  Tomato: { base: 2200, demand: 82, trend: 12, buyers: 18 },
  Onion: { base: 1900, demand: 74, trend: 7, buyers: 14 },
  Wheat: { base: 2450, demand: 68, trend: 4, buyers: 21 },
  Rice: { base: 3100, demand: 88, trend: 15, buyers: 26 },
  Cotton: { base: 7200, demand: 79, trend: 9, buyers: 16 },
};

const buyers = [
  {
    name: "FreshKart Foods",
    type: "Food Processor",
    distance: 18,
    rating: 4.8,
    quantity: 50,
    price: 2380,
    tier: "Trusted Buyer",
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
    tier: "Verified Buyer",
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
    tier: "New Buyer",
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
  if (pastSales >= 20 && gradeMatchRate >= 90) {
    return { label: "Trusted Supplier", className: "trusted" };
  }
  if (pastSales >= 5 && gradeMatchRate >= 80) {
    return { label: "Verified Farmer", className: "verified" };
  }
  return { label: "New Seller", className: "new" };
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

  const [activeTab, setActiveTab] = useState("dashboard");
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [showSaleReview, setShowSaleReview] = useState(false);
  const [saleCompleted, setSaleCompleted] = useState(false);
  const [saleReference, setSaleReference] = useState("");
  const [paymentLocked, setPaymentLocked] = useState(false);

  const farmerTier = useMemo(
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

              <span className={`verified-badge tier-${farmerTier.className}`}>
                🛡️ {farmerTier.label}
              </span>

              <div className="trust-stat">
                <span>Sales Completed</span>
                <strong>{farmerProfile.pastSales}</strong>
              </div>

              <div className="trust-stat">
                <span>Farmer Rating</span>
                <strong>{farmerProfile.rating}★</strong>
              </div>

              <div className="trust-stat">
                <span>Grade Match Rate</span>
                <strong>{farmerProfile.gradeMatchRate}%</strong>
              </div>

              <div className="trust-stat">
                <span>On-time Delivery</span>
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
                            {cropName}
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
                      {bestBuyer.verified ? (
                        <span className="verified-badge tier-verified small">
                          🛡️ {bestBuyer.tier}
                        </span>
                      ) : (
                        <span className="verified-badge tier-new small">
                          {bestBuyer.tier}
                        </span>
                      )}
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
                    <span>Past Orders</span>
                    <strong>{bestBuyer.pastOrders}</strong>
                  </div>

                  <div className="buyer-stat">
                    <span>Payment Reliability</span>
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
                      <span className="small-label">BUYER STATUS</span>
                      {bestBuyer.verified ? (
                        <span className="verified-badge tier-verified">
                          🛡️ {bestBuyer.tier}
                        </span>
                      ) : (
                        <span className="verified-badge tier-new">
                          {bestBuyer.tier}
                        </span>
                      )}
                    </div>

                    <div className="trust-stat">
                      <span>Past Orders</span>
                      <strong>{bestBuyer.pastOrders}</strong>
                    </div>

                    <div className="trust-stat">
                      <span>Payment Reliability</span>
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
                          ? "Payment Secured"
                          : "Payment Not Yet Secured"}
                      </strong>

                      <p>
                        {paymentLocked
                          ? `Buyer has locked ${formatCurrency(
                              bestBuyer.buyerNet * Number(quantity)
                            )} in escrow. Funds release automatically once delivery is confirmed.`
                          : "Ask the buyer to lock payment before you schedule pickup, so you're not left waiting after harvest."}
                      </p>
                    </div>

                    {!paymentLocked && (
                      <button
                        className="secondary-button lock-button"
                        onClick={() => setPaymentLocked(true)}
                      >
                        Request Payment Lock
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
                <span>Payment Status</span>
                <strong>🔒 Locked — releases on delivery confirmation</strong>
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
                  {buyer.verified ? (
                    <span className="verified-badge tier-verified small">
                      🛡️ {buyer.tier}
                    </span>
                  ) : (
                    <span className="verified-badge tier-new small">
                      {buyer.tier}
                    </span>
                  )}
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
                  <span>Past Orders</span>
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
            <span className="section-kicker">TRUST &amp; VERIFICATION</span>
            <h2>How "KisanSetu Verified" actually works</h2>
            <p>
              A declared quality grade or a star rating alone can be
              gamed. KisanSetu instead checks every sale at four
              independent points, so no single fake photo, review or
              claim can carry an entire transaction.
            </p>

            <div className="trust-pipeline">
              <div className="pipeline-step">
                <span className="pipeline-index">1</span>
                <h4>Declared Grade</h4>
                <p>Farmer selects A / B / C and captures a live, in-app photo — not a gallery upload.</p>
              </div>

              <div className="pipeline-arrow">→</div>

              <div className="pipeline-step">
                <span className="pipeline-index">2</span>
                <h4>AI Cross-check</h4>
                <p>An AI grading pass flags mismatches between the declared grade and the photo for review — it doesn't auto-approve.</p>
              </div>

              <div className="pipeline-arrow">→</div>

              <div className="pipeline-step">
                <span className="pipeline-index">3</span>
                <h4>Pickup Verification</h4>
                <p>Quantity and condition are physically checked by the collection point before transport begins.</p>
              </div>

              <div className="pipeline-arrow">→</div>

              <div className="pipeline-step">
                <span className="pipeline-index">4</span>
                <h4>Delivery Confirmation</h4>
                <p>Buyer confirms received quality before locked payment is released. Mismatches open a dispute, not an auto-payout.</p>
              </div>
            </div>

            <div className="trust-tiers-grid">
              <div className="tier-card">
                <span className="tier-dot new" />
                <h4>New Seller / Buyer</h4>
                <p>Just joined. Can trade, but counterparties may reasonably ask for a full payment lock until a track record exists.</p>
              </div>

              <div className="tier-card">
                <span className="tier-dot verified" />
                <h4>Verified</h4>
                <p>Identity/registration confirmed, 5+ completed orders, no unresolved disputes.</p>
              </div>

              <div className="tier-card">
                <span className="tier-dot trusted" />
                <h4>Trusted Supplier / Buyer</h4>
                <p>20+ completed orders with 90%+ grade-match and on-time rate. Ranks higher in Smart Matches and unlocks lower advance requirements.</p>
              </div>
            </div>

            <div className="payment-lock-explainer">
              <span className="lock-icon">🔒</span>
              <div>
                <h4>Payment Lock, explained</h4>
                <p>
                  Before a farmer commits to harvest and transport, the
                  buyer locks the agreed amount into escrow inside
                  KisanSetu. The farmer can see this before pickup — so
                  they're never left wondering if a buyer will actually
                  pay. Funds release automatically once the buyer
                  confirms delivery; a quality dispute keeps them
                  locked until resolved, instead of releasing
                  automatically either way.
                </p>
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

          <div className="footer-right">
            <span>Prototype</span>
            <span>SIH 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;