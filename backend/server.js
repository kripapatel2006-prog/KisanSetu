const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// ============================================================
// Load .env file without requiring dotenv
// ============================================================
function loadDotEnv() {
  const envPath = path.join(__dirname, ".env");

  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) continue;

    const separator = trimmed.indexOf("=");

    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();

    let value = trimmed.slice(separator + 1).trim();

    value = value.replace(/^['"]|['"]$/g, "");

    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadDotEnv();

// ============================================================
// Middleware
// ============================================================
app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

// ============================================================
// Health Check
// ============================================================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "KisanSetu Backend is running"
  });
});

// ============================================================
// MARKET INTELLIGENCE
// ============================================================
app.post("/api/market/analyze", (req, res) => {
  const {
    crop,
    quantity,
    currentPrice,
    averagePrice,
    demand
  } = req.body;

  const safeCurrentPrice = Number(currentPrice) || 0;
  const safeAveragePrice = Number(averagePrice) || 1;

  const trend =
    ((safeCurrentPrice - safeAveragePrice) / safeAveragePrice) * 100;

  let recommendation;
  let confidence;
  let reason;

  if (trend >= 3 && demand === "HIGH") {
    recommendation = "WAIT";
    confidence = 82;

    reason =
      "Market prices are rising and buyer demand is high.";
  } else if (trend <= -2 || demand === "LOW") {
    recommendation = "SELL NOW";
    confidence = 79;

    reason =
      "Current market conditions indicate limited upside.";
  } else {
    recommendation = "SELL NOW";
    confidence = 68;

    reason =
      "Market conditions are relatively stable.";
  }

  const expectedPrice =
    recommendation === "WAIT"
      ? Math.round(safeCurrentPrice * 1.05)
      : safeCurrentPrice;

  const potentialGain =
    expectedPrice - safeCurrentPrice;

  res.json({
    success: true,

    analysis: {
      crop,
      quantity,
      currentPrice: safeCurrentPrice,
      averagePrice: safeAveragePrice,
      trend: Number(trend.toFixed(2)),
      demand,
      recommendation,
      confidence,
      expectedPrice,
      potentialGain,
      reason
    }
  });
});

// ============================================================
// MARKET PRICES
// ============================================================
app.get("/api/market/prices", (req, res) => {
  res.json({
    success: true,

    data: [
      {
        crop: "Wheat",
        market: "Hyderabad",
        price: 2450,
        unit: "quintal",
        trend: 4.2
      },
      {
        crop: "Tomato",
        market: "Hyderabad",
        price: 1850,
        unit: "quintal",
        trend: -1.8
      },
      {
        crop: "Rice",
        market: "Hyderabad",
        price: 3200,
        unit: "quintal",
        trend: 2.7
      }
    ]
  });
});

// ============================================================
// FARMER LISTINGS
// ============================================================
let listings = [];

app.post("/api/listings", (req, res) => {
  const listing = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  };

  listings.push(listing);

  res.status(201).json({
    success: true,
    listing
  });
});

app.get("/api/listings", (req, res) => {
  res.json({
    success: true,
    listings
  });
});

// ============================================================
// BUYER MATCHING
// ============================================================
app.post("/api/matches", (req, res) => {
  const { crop } = req.body;

  const requestedCrop = String(crop || "")
    .trim()
    .toLowerCase();

  const buyers = [
    {
      id: 1,
      name: "Hyderabad Fresh Foods",
      crop: "Wheat",
      location: "Hyderabad",
      requiredQuantity: 500,
      distance: 12
    },
    {
      id: 2,
      name: "Sri Lakshmi Traders",
      crop: "Wheat",
      location: "Hyderabad",
      requiredQuantity: 300,
      distance: 18
    },
    {
      id: 3,
      name: "Deccan Food Processing",
      crop: "Rice",
      location: "Hyderabad",
      requiredQuantity: 1000,
      distance: 24
    }
  ];

  const matches = buyers
    .filter(
      (buyer) =>
        buyer.crop.toLowerCase() === requestedCrop
    )
    .map((buyer) => ({
      ...buyer,

      matchScore: Math.max(
        50,
        100 - buyer.distance * 2
      )
    }))
    .sort(
      (a, b) =>
        b.matchScore - a.matchScore
    );

  res.json({
    success: true,
    matches
  });
});

// ============================================================
// KISAN AI ASSISTANT
// ============================================================

const AI_LANGUAGE_NAMES = {
  en: "English",
  hi: "Hindi",
  te: "Telugu"
};

// ============================================================
// Demo response when API key is not configured
// ============================================================
function buildDemoAnswer(message, language, role) {
  const roleName =
    role === "buyer"
      ? "buyer"
      : "farmer";

  if (language === "hi") {
    if (roleName === "farmer") {
      return (
        "नमस्ते! मैं KisanSetu AI हूँ। " +
        "आप फसल, बाजार भाव, बिक्री या खेती से जुड़ा सवाल पूछ सकते हैं।"
      );
    }

    return (
      "नमस्ते! मैं KisanSetu Buyer AI हूँ। " +
      "आप उपलब्ध फसल, कीमत, मात्रा या किसानों से जुड़ा सवाल पूछ सकते हैं।"
    );
  }

  if (language === "te") {
    if (roleName === "farmer") {
      return (
        "నమస్కారం! నేను KisanSetu AI. " +
        "మీరు పంటలు, మార్కెట్ ధరలు, అమ్మకం లేదా వ్యవసాయం గురించి ప్రశ్న అడగవచ్చు."
      );
    }

    return (
      "నమస్కారం! నేను KisanSetu Buyer AI. " +
      "అందుబాటులో ఉన్న పంటలు, ధరలు, పరిమాణం లేదా రైతుల గురించి ప్రశ్నలు అడగవచ్చు."
    );
  }

  if (roleName === "farmer") {
    return (
      "Hello! I am KisanSetu AI. " +
      "You can ask me about crops, market prices, selling, buyers, or farming."
    );
  }

  return (
    "Hello! I am KisanSetu Buyer AI. " +
    "You can ask me about available produce, prices, quantities, farmers, or purchasing."
  );
}

// ============================================================
// AI ASSISTANT API
// ============================================================
app.post("/api/ai/ask", async (req, res) => {
  try {
    const {
      message,
      language = "en",
      role = "farmer",
      context = {}
    } = req.body || {};

    const cleanMessage =
      String(message || "").trim();

    const safeLanguage =
      AI_LANGUAGE_NAMES[language]
        ? language
        : "en";

    const safeRole =
      role === "buyer"
        ? "buyer"
        : "farmer";

    // --------------------------------------------------------
    // Validate question
    // --------------------------------------------------------
    if (!cleanMessage) {
      return res.status(400).json({
        success: false,
        message: "Please provide a question."
      });
    }

    // --------------------------------------------------------
    // If no OpenAI API key exists, use demo mode
    // --------------------------------------------------------
    if (!process.env.OPENAI_API_KEY) {
      return res.json({
        success: true,
        demo: true,
        answer: buildDemoAnswer(
          cleanMessage,
          safeLanguage,
          safeRole
        )
      });
    }

    // --------------------------------------------------------
    // AI instructions
    // --------------------------------------------------------
    const systemPrompt = `
You are KisanSetu AI, an intelligent agricultural marketplace assistant for India.

USER ROLE:
${safeRole}

LANGUAGE:
Always answer in ${AI_LANGUAGE_NAMES[safeLanguage]}.

IMPORTANT:
Use very simple and easy-to-understand language.

The user may be a farmer with limited digital literacy.
Avoid complicated technical words.
Give practical and short answers.

If the user is a FARMER:
- Help with crops
- Explain market prices
- Help with selling decisions
- Help find buyers
- Explain how to create listings
- Answer general farming questions
- Explain crop-related problems
- Help understand marketplace information

If the user is a BUYER:
- Help find available crops
- Explain prices
- Explain quantities
- Help find farmers
- Help compare produce
- Help with purchasing
- Help understand marketplace listings
- Help with locations and matching

VOICE CONVERSATION:
The answer will potentially be read aloud.
Therefore:
- Keep answers concise.
- Avoid unnecessary formatting.
- Avoid very long lists.
- Use natural conversational language.

IMPORTANT ACCURACY RULE:
Do not claim that a live market price is verified unless actual live market data has been supplied to you.

If giving agricultural, financial, or safety-sensitive advice, tell the user when they should verify the information with a local agricultural expert or official source.

USER CONTEXT:
${JSON.stringify(context)}
`;

    // --------------------------------------------------------
    // Call OpenAI
    // --------------------------------------------------------
    const openAIResponse = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization:
            `Bearer ${process.env.OPENAI_API_KEY}`
        },

        body: JSON.stringify({
          model:
            process.env.OPENAI_MODEL ||
            "gpt-5.6-luna",

          instructions: systemPrompt,

          input: cleanMessage,

          max_output_tokens: 500
        })
      }
    );

    const data =
      await openAIResponse.json();

    // --------------------------------------------------------
    // Handle OpenAI error
    // --------------------------------------------------------
    if (!openAIResponse.ok) {
      console.error(
        "OpenAI API error:",
        data
      );

      return res.status(502).json({
        success: false,

        message:
          data?.error?.message ||
          "The AI service returned an error."
      });
    }

    // --------------------------------------------------------
    // Extract AI response
    // --------------------------------------------------------
    let answer = "";

    if (
      typeof data.output_text ===
      "string"
    ) {
      answer =
        data.output_text.trim();
    }

    // Fallback response extraction
    if (
      !answer &&
      Array.isArray(data.output)
    ) {
      answer =
        data.output
          .flatMap((item) =>
            Array.isArray(item.content)
              ? item.content
              : []
          )
          .map(
            (item) =>
              item.text || ""
          )
          .filter(Boolean)
          .join("\n")
          .trim();
    }

    // --------------------------------------------------------
    // Empty AI response
    // --------------------------------------------------------
    if (!answer) {
      return res.status(502).json({
        success: false,

        message:
          "The AI returned an empty answer. Please try again."
      });
    }

    // --------------------------------------------------------
    // Send answer to frontend
    // --------------------------------------------------------
    return res.json({
      success: true,
      demo: false,
      answer,
      language: safeLanguage,
      role: safeRole
    });

  } catch (error) {
    console.error(
      "Kisan AI request failed:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Unable to connect to the AI service. Check your server and API key."
    });
  }
});

// ============================================================
// START SERVER
// ============================================================
app.listen(PORT, () => {
  console.log(
    `KisanSetu backend running on http://localhost:${PORT}`
  );

  if (process.env.OPENAI_API_KEY) {
    console.log(
      "Kisan AI: OpenAI API enabled"
    );
  } else {
    console.log(
      "Kisan AI: demo mode (OPENAI_API_KEY not found)"
    );
  }
});