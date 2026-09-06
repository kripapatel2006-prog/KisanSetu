const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "KisanSetu Backend is running"
  });
});

// Market intelligence
app.post("/api/market/analyze", (req, res) => {
  const {
    crop,
    quantity,
    currentPrice,
    averagePrice,
    demand
  } = req.body;

  const trend =
    ((currentPrice - averagePrice) / averagePrice) * 100;

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
      ? Math.round(currentPrice * 1.05)
      : currentPrice;

  const potentialGain =
    expectedPrice - currentPrice;

  res.json({
    success: true,
    analysis: {
      crop,
      quantity,
      currentPrice,
      averagePrice,
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

// Farmer listings
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

// Buyer matching
app.post("/api/matches", (req, res) => {
  const { crop, location, quantity } = req.body;

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
      buyer =>
        buyer.crop.toLowerCase() === crop.toLowerCase()
    )
    .map(buyer => ({
      ...buyer,
      matchScore: Math.max(
        50,
        100 - buyer.distance * 2
      )
    }))
    .sort((a, b) => b.matchScore - a.matchScore);

  res.json({
    success: true,
    matches
  });
});

app.listen(PORT, () => {
  console.log(`KisanSetu backend running on http://localhost:${PORT}`);
});