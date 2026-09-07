// src/components/assistantData.js

export const CROP_LIST = [
  { id: "rice", name: "Rice" },
  { id: "wheat", name: "Wheat" },
  { id: "cotton", name: "Cotton" },
  { id: "maize", name: "Maize" },
  { id: "tomato", name: "Tomato" },
  { id: "chilli", name: "Chilli" },
  { id: "groundnut", name: "Groundnut" },
  { id: "sugarcane", name: "Sugarcane" },
  { id: "soybean", name: "Soybean" },
  { id: "pulses", name: "Pulses" },
];

const DIAGNOSES = {
  rice: {
    severity: "Low",
    name: "Rice Crop - No Major Issue Detected",
    confidence: 88,
    symptoms: [
      "No major visible symptoms detected",
      "Crop should be monitored regularly",
    ],
    causes: [
      "Normal crop variation",
      "Environmental conditions may affect appearance",
    ],
    treatment: [
      "Continue regular crop monitoring",
      "Maintain appropriate irrigation",
      "Ensure balanced nutrient application",
    ],
    prevention: [
      "Inspect leaves regularly",
      "Monitor for pests and fungal symptoms",
      "Avoid excessive waterlogging",
    ],
  },

  wheat: {
    severity: "Low",
    name: "Wheat Crop - Healthy Appearance",
    confidence: 87,
    symptoms: [
      "No major visible disease symptoms",
      "Leaves appear suitable for continued monitoring",
    ],
    causes: [
      "No significant cause detected",
      "Environmental variation may affect leaf colour",
    ],
    treatment: [
      "Maintain appropriate irrigation",
      "Continue normal crop care",
      "Monitor leaves for rust or fungal spots",
    ],
    prevention: [
      "Avoid excessive irrigation",
      "Inspect plants regularly",
      "Maintain balanced nutrition",
    ],
  },

  cotton: {
    severity: "Medium",
    name: "Cotton Crop - Pest Monitoring Recommended",
    confidence: 82,
    symptoms: [
      "Possible leaf stress",
      "Monitor leaves and developing bolls",
    ],
    causes: [
      "Possible insect activity",
      "Environmental stress",
    ],
    treatment: [
      "Inspect the underside of leaves",
      "Remove severely damaged plant material",
      "Use appropriate pest management if infestation is confirmed",
    ],
    prevention: [
      "Monitor the crop regularly",
      "Maintain field sanitation",
      "Check for sucking pests and boll damage",
    ],
  },

  maize: {
    severity: "Low",
    name: "Maize Crop - Routine Monitoring",
    confidence: 86,
    symptoms: [
      "No major visible symptoms detected",
      "Routine monitoring recommended",
    ],
    causes: [
      "Normal crop variation",
      "Weather conditions",
    ],
    treatment: [
      "Maintain soil moisture",
      "Continue regular crop inspection",
    ],
    prevention: [
      "Monitor leaves for insect damage",
      "Maintain proper irrigation",
      "Keep weeds under control",
    ],
  },

  tomato: {
    severity: "Medium",
    name: "Tomato Crop - Disease Monitoring Recommended",
    confidence: 84,
    symptoms: [
      "Possible leaf spotting",
      "Monitor fruits and leaves for changes",
    ],
    causes: [
      "Possible fungal infection",
      "Excess moisture or prolonged leaf wetness",
    ],
    treatment: [
      "Remove severely affected plant parts",
      "Improve airflow around plants",
      "Avoid unnecessary overhead irrigation",
    ],
    prevention: [
      "Maintain proper plant spacing",
      "Avoid prolonged leaf wetness",
      "Inspect plants regularly",
    ],
  },

  chilli: {
    severity: "Medium",
    name: "Chilli Crop - Pest Monitoring Recommended",
    confidence: 81,
    symptoms: [
      "Possible leaf curling",
      "Monitor young leaves for insect activity",
    ],
    causes: [
      "Possible sucking pests",
      "Environmental stress",
    ],
    treatment: [
      "Inspect the underside of leaves",
      "Remove severely damaged plant parts",
      "Apply pest control only when infestation is confirmed",
    ],
    prevention: [
      "Regularly inspect young leaves",
      "Maintain proper irrigation",
      "Keep the field clean",
    ],
  },

  groundnut: {
    severity: "Low",
    name: "Groundnut Crop - Routine Monitoring",
    confidence: 85,
    symptoms: [
      "No major visible symptoms detected",
      "Continue regular field inspection",
    ],
    causes: [
      "No significant issue detected",
      "Environmental conditions",
    ],
    treatment: [
      "Maintain suitable soil moisture",
      "Continue normal crop management",
    ],
    prevention: [
      "Monitor leaves for spots",
      "Maintain good drainage",
      "Inspect plants for insect damage",
    ],
  },

  sugarcane: {
    severity: "Low",
    name: "Sugarcane Crop - Routine Monitoring",
    confidence: 86,
    symptoms: [
      "No major visible symptoms detected",
      "Crop should continue to be monitored",
    ],
    causes: [
      "No significant issue detected",
      "Normal environmental variation",
    ],
    treatment: [
      "Maintain proper irrigation",
      "Monitor stems and leaves regularly",
    ],
    prevention: [
      "Control weeds",
      "Inspect stems for pest damage",
      "Maintain appropriate field hygiene",
    ],
  },

  soybean: {
    severity: "Low",
    name: "Soybean Crop - Routine Monitoring",
    confidence: 85,
    symptoms: [
      "No major visible symptoms detected",
      "Routine crop monitoring recommended",
    ],
    causes: [
      "No significant issue detected",
      "Environmental variation",
    ],
    treatment: [
      "Maintain appropriate soil moisture",
      "Continue normal crop care",
    ],
    prevention: [
      "Inspect leaves regularly",
      "Monitor for insects",
      "Maintain balanced crop nutrition",
    ],
  },

  pulses: {
    severity: "Low",
    name: "Pulse Crop - Routine Monitoring",
    confidence: 84,
    symptoms: [
      "No major visible symptoms detected",
      "Monitor leaves and pods regularly",
    ],
    causes: [
      "No significant issue detected",
      "Environmental conditions",
    ],
    treatment: [
      "Continue regular field monitoring",
      "Maintain appropriate irrigation",
    ],
    prevention: [
      "Inspect pods for pest damage",
      "Monitor for leaf spots",
      "Maintain good field hygiene",
    ],
  },
};

export async function diagnoseCrop(crop, photoFile) {
  const cropId =
    typeof crop === "object"
      ? crop.id
      : String(crop || "rice").toLowerCase();

  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return (
    DIAGNOSES[cropId] || {
      severity: "Low",
      name: "Crop - Routine Monitoring Recommended",
      confidence: 75,
      symptoms: [
        "No major visible symptoms detected",
        "Further monitoring is recommended",
      ],
      causes: [
        "Insufficient information for detailed diagnosis",
      ],
      treatment: [
        "Continue regular crop monitoring",
        "Consult an agricultural expert if symptoms worsen",
      ],
      prevention: [
        "Inspect the crop regularly",
        "Maintain appropriate irrigation",
        "Monitor for pests and diseases",
      ],
    }
  );
}