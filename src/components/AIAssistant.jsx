import { useEffect, useRef, useState } from "react";
import {
  Camera,
  Upload,
  Loader2,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import { CROP_LIST, diagnoseCrop } from "./assistantData";

const DEFAULT_TEXT = {
  selectCrop: "Select Crop",
  takePhoto: "Take Photo",
  uploadPhoto: "Upload Photo",
  analyzing: "Analyzing...",
  analyzeCrop: "Analyze Crop",
  demoAiLabel: "AI Analysis",
  confidence: "Confidence",
  symptoms: "Symptoms",
  causes: "Possible Causes",
  treatment: "Treatment",
  prevention: "Prevention",
};

export default function CropDiagnosis({
  t = {},
  defaultCrop,
  onDiagnosed,
}) {
  const text = {
    ...DEFAULT_TEXT,
    ...t,
  };

  /* -------------------------------------------------------
     CROP
  ------------------------------------------------------- */

  const getInitialCrop = () => {
    if (!defaultCrop) {
      return CROP_LIST[0] || null;
    }

    if (typeof defaultCrop === "object") {
      return defaultCrop;
    }

    const foundCrop = CROP_LIST.find(
      (item) =>
        item.id === defaultCrop ||
        item.name?.toLowerCase() ===
          String(defaultCrop).toLowerCase()
    );

    return foundCrop || CROP_LIST[0] || null;
  };

  const [crop, setCrop] = useState(getInitialCrop);

  /* -------------------------------------------------------
     PHOTO
  ------------------------------------------------------- */

  const [photo, setPhoto] = useState(null);

  /* -------------------------------------------------------
     ANALYSIS
  ------------------------------------------------------- */

  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  /* -------------------------------------------------------
     INPUT REFERENCES
  ------------------------------------------------------- */

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  /* -------------------------------------------------------
     KEEP DEFAULT CROP IN SYNC
  ------------------------------------------------------- */

  useEffect(() => {
    if (!defaultCrop) {
      return;
    }

    if (typeof defaultCrop === "object") {
      setCrop(defaultCrop);
      return;
    }

    const foundCrop = CROP_LIST.find(
      (item) =>
        item.id === defaultCrop ||
        item.name?.toLowerCase() ===
          String(defaultCrop).toLowerCase()
    );

    if (foundCrop) {
      setCrop(foundCrop);
    }
  }, [defaultCrop]);

  /* -------------------------------------------------------
     CLEAN OBJECT URL
  ------------------------------------------------------- */

  useEffect(() => {
    return () => {
      if (photo?.url) {
        URL.revokeObjectURL(photo.url);
      }
    };
  }, [photo]);

  /* -------------------------------------------------------
     HANDLE FILE
  ------------------------------------------------------- */

  const handleFile = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (photo?.url) {
      URL.revokeObjectURL(photo.url);
    }

    const imageUrl = URL.createObjectURL(file);

    setPhoto({
      url: imageUrl,
      file,
    });

    setResult(null);

    e.target.value = "";
  };

  /* -------------------------------------------------------
     RUN DIAGNOSIS
  ------------------------------------------------------- */

  const runDiagnosis = async () => {
    if (!photo?.file || analyzing || !crop) {
      return;
    }

    setAnalyzing(true);
    setResult(null);

    try {
      const diagnosis = await diagnoseCrop(
        crop,
        photo.file
      );

      setResult(diagnosis);

      if (onDiagnosed) {
        onDiagnosed(diagnosis);
      }
    } catch (error) {
      console.error(
        "Crop diagnosis failed:",
        error
      );

      const fallbackResult = {
        severity: "Medium",

        name: "Unable to complete diagnosis",

        confidence: 0,

        symptoms: [
          "The crop image could not be analyzed.",
        ],

        causes: [
          "An unexpected error occurred during analysis.",
        ],

        treatment: [
          "Please try uploading the image again.",
        ],

        prevention: [
          "Use a clear and well-lit crop image.",
        ],
      };

      setResult(fallbackResult);
    } finally {
      setAnalyzing(false);
    }
  };

  /* -------------------------------------------------------
     SEVERITY CLASS
  ------------------------------------------------------- */

  const severityClass = (severity) => {
    const normalizedSeverity = String(
      severity || ""
    ).toLowerCase();

    if (normalizedSeverity === "high") {
      return "severity-high";
    }

    if (normalizedSeverity === "medium") {
      return "severity-medium";
    }

    return "severity-low";
  };

  /* -------------------------------------------------------
     CROP NAME
  ------------------------------------------------------- */

  const cropName =
    typeof crop === "object"
      ? crop?.name || "Crop"
      : crop || "Crop";

  /* -------------------------------------------------------
     CONFIDENCE
  ------------------------------------------------------- */

  const confidence = Math.max(
    0,
    Math.min(
      100,
      Number(result?.confidence) || 0
    )
  );

  /* =======================================================
     IMPORTANT:
     The crop-diagnosis UI has intentionally been removed
     from the visible page.

     The component still contains all diagnosis logic so
     that it can be connected later without rewriting it.
  ======================================================= */

  return null;
}