/**
 * KisanSetu Trust & Safety Data Model & Helper Functions
 * Provides single source of truth for Marketplace Rules, Trust Profiles,
 * Protected Contact Activity, Disputes, Evidence Vault, and Moderation Cases.
 */

export const MARKETPLACE_RULES_FARMER = [
  "1. Do not list spoiled or diseased produce as fresh.",
  "2. Do not intentionally misrepresent crop quality or grade.",
  "3. Do not misrepresent quantity or lot weight.",
  "4. Do not upload misleading or stock produce photographs.",
  "5. Do not falsify harvest dates or storage conditions.",
  "6. Do not falsify quality certificates or lab tests.",
  "7. Do not substitute a different crop variety after purchase.",
  "8. Do not intentionally mix damaged and good produce without disclosure.",
  "9. Do not repeatedly cancel confirmed buyer orders without valid reason.",
  "10. Do not harass buyers or communicate inappropriately.",
  "11. Do not manipulate marketplace pricing or bidding information.",
  "12. Do not conduct fraudulent off-platform payment transactions."
];

export const MARKETPLACE_RULES_BUYER = [
  "1. Do not place fake or speculative purchase orders.",
  "2. Do not repeatedly cancel confirmed purchases without valid justification.",
  "3. Do not refuse legitimate payment upon verified delivery.",
  "4. Do not falsely report farmers or lodge unverified disputes.",
  "5. Do not intentionally damage produce post-delivery and claim spoilage.",
  "6. Do not harass farmers or field logistics staff.",
  "7. Do not manipulate prices or collude with other buyers unfairly.",
  "8. Do not misuse farmer personal contact information.",
  "9. Do not falsely claim quantity shortages without photographic evidence.",
  "10. Do not abuse the KisanSetu dispute resolution system.",
  "11. Do not impersonate another business entity or buyer.",
  "12. Do not conduct fraudulent off-platform transactions."
];

export const INITIAL_TRUST_PROFILES = {
  farmer: {
    id: "FARMER-2026-RAMESH",
    name: "Ramesh Kumar",
    role: "Farmer",
    location: "Chevella, Telangana",
    trustScore: 92,
    safetyStatus: "Trusted", // 'Trusted' | 'Under Review' | 'Restricted' | 'Suspended' | 'Permanently Banned'
    verificationBadges: [
      { key: "identity", label: "Identity Verified", description: "Government Aadhaar & Land Record KYC Verified" },
      { key: "quality", label: "Quality Consistent", description: "Over 90% of declared lot grades match buyer lab inspections" },
      { key: "fulfillment", label: "Reliable Seller", description: "96% on-time fulfillment rate across 24 orders" }
    ],
    metrics: {
      completedSales: 24,
      onTimeFulfillment: "96%",
      qualityMatchRate: "94%",
      cancellationRate: "2.1%",
      activeDisputes: 1,
      totalDisputes: 2,
      resolvedInFavor: 2,
      responseRate: "< 15 mins"
    },
    warnings: [
      {
        id: "WARN-101",
        date: "2026-08-14",
        issue: "Moisture Content Discrepancy",
        details: "Lot KS-GN-2026-88 recorded 14% moisture vs declared 10%.",
        status: "Acknowledged - Warning Issued",
        impact: "-3 Trust Points"
      }
    ],
    scoreBreakdown: [
      { component: "KYC & Identity Verification", points: 25, max: 25, status: "Verified ✓" },
      { component: "Order Fulfillment Record (24 Sales)", points: 28, max: 30, status: "96% Success ✓" },
      { component: "Quality Grade Consistency", points: 24, max: 25, status: "94% Match ✓" },
      { component: "Pickup & Inspection Reliability", points: 15, max: 15, status: "On-time ✓" },
      { component: "Dispute History & Cooperation", points: 0, max: 5, status: "1 Active Dispute ⚠" }
    ]
  },
  buyer: {
    id: "BUYER-2026-FRESHKART",
    name: "FreshKart Foods Pvt Ltd",
    role: "Corporate Buyer",
    location: "Hyderabad, Telangana",
    trustScore: 96,
    safetyStatus: "Trusted",
    verificationBadges: [
      { key: "business", label: "Business Verified", description: "FSSAI & GSTIN Corporate License Verified" },
      { key: "payment", label: "Prompt Pay Master", description: "100% payments settled within 2 hours of delivery" },
      { key: "buyer_tier", label: "Tier 1 Bulk Buyer", description: "Over 140+ completed procurement transactions" }
    ],
    metrics: {
      completedPurchases: 142,
      paymentReliability: "98.5%",
      pickupReliability: "99.1%",
      cancellationRate: "1.2%",
      activeDisputes: 0,
      totalDisputes: 1,
      resolvedInFavor: 1,
      responseRate: "< 10 mins"
    },
    warnings: [],
    scoreBreakdown: [
      { component: "GST & FSSAI Business KYC", points: 25, max: 25, status: "Verified ✓" },
      { component: "Payment Settlement Speed", points: 30, max: 30, status: "Instant Escrow ✓" },
      { component: "Purchase Completion (142 Lots)", points: 25, max: 25, status: "99% Complete ✓" },
      { component: "Pickup Transport Dispatch", points: 12, max: 12, status: "On-Schedule ✓" },
      { component: "Farmer Rating Average", points: 4, max: 8, status: "4.8 ★ Rating ✓" }
    ]
  }
};

export const SAMPLE_CONTACT_LOGS = [
  {
    id: "LOG-901",
    timestamp: "Today, 10:42 AM",
    orderId: "KS-LOT-2026-9402",
    crop: "Groundnut (Pod)",
    buyerName: "FreshKart Foods",
    farmerName: "Ramesh Kumar",
    initiatedBy: "Buyer",
    reason: "Confirm quantity and pickup schedule",
    type: "Protected Call",
    status: "Accepted & Completed",
    duration: "2m 14s",
    notes: "Buyer confirmed truck arrival at 3:00 PM."
  },
  {
    id: "LOG-902",
    timestamp: "Yesterday, 4:15 PM",
    orderId: "KS-LOT-2026-9402",
    crop: "Groundnut (Pod)",
    buyerName: "AgriCorp Processors",
    farmerName: "Ramesh Kumar",
    initiatedBy: "Farmer",
    reason: "Discuss harvest moisture testing",
    type: "Protected Message",
    status: "Delivered",
    duration: "Text Message",
    notes: "Farmer sent laboratory moisture report (9.8%)."
  }
];

export const INITIAL_DISPUTES = [
  {
    id: "DISP-2026-8801",
    orderId: "KS-LOT-2026-9402",
    lotId: "KS-GN-2026-9402",
    cropName: "Groundnut (Pod)",
    quantity: "10 Quintals",
    raisedBy: "Buyer (FreshKart Foods)",
    respondent: "Farmer (Ramesh Kumar)",
    dateOpened: "Today, 11:30 AM",
    category: "Quality / Spoilage Claim",
    claimedIssue: "Buyer reported 8% broken pod ratio and moisture dampness upon unloading at warehouse.",
    status: "Awaiting Farmer Response", // 'Awaiting Farmer Response' | 'Under Investigation' | 'Resolved (Transport Damage)' | 'Resolved (Refund Issued)' | 'Dismissed'
    possibleCause: "Under Review (Pickup condition vs Delivery condition analysis in progress)",
    pickupCondition: {
      timestamp: "Today, 8:15 AM (At Farm Gate, Chevella)",
      quantityConfirmed: "10.0 Quintals",
      gradeConfirmed: "Grade A Pods (Farmer Declared)",
      moistureReading: "10.2% (Dry)",
      photoUrl: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=600&q=80",
      inspectedBy: "KisanSetu Field Agent (Suresh V.)"
    },
    deliveryCondition: {
      timestamp: "Today, 11:15 AM (At Buyer Warehouse, Hyderabad)",
      quantityConfirmed: "9.8 Quintals",
      gradeClaimed: "Grade B (Minor dampness observed)",
      moistureReading: "13.5% (Elevated)",
      photoUrl: "https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&w=600&q=80",
      inspectedBy: "Warehouse Receiving Executive (Rajesh K.)"
    },
    timeline: [
      { stage: "Dispute Opened", time: "Today, 11:30 AM", detail: "Buyer uploaded delivery photos and logged moisture claim." },
      { stage: "Evidence Vault Synced", time: "Today, 11:32 AM", detail: "Pickup photos and field inspector report linked automatically." },
      { stage: "Farmer Notified", time: "Today, 11:35 AM", detail: "Ramesh Kumar alerted via Voice SMS & KisanSetu app." },
      { stage: "Transport Check Pending", time: "In Progress", detail: "Analyzing open-bed truck weather exposure log during transit." }
    ],
    resolutionOptions: [
      { id: "transport_damage", label: "Transport Weather Exposure", description: "Damage occurred in transit; carrier insurance covers ₹1,200 compensation. Neither farmer nor buyer penalized." },
      { id: "partial_adjustment", label: "Partial Price Adjustment (-4%)", description: "Adjust price by ₹250/quintal due to moisture variance." },
      { id: "dismiss", label: "Dismiss Dispute", description: "Pickup condition verified dry; claim inconsistent with farm gate proof." }
    ]
  }
];

export const DEMO_APPEAL_CASES = [
  {
    id: "APP-2026-04",
    userId: "FARMER-9912",
    userName: "Venkat Rao",
    userRole: "Farmer",
    currentStatus: "Restricted",
    restrictionReason: "Two unfulfilled commitments due to heavy rainfall in Guntur.",
    appealReason: "Unseasonal cyclonic rain flooded storage barn; provided Mandal Revenue Inspector certificate.",
    evidenceSubmitted: "Mandal Officer Weather Certificate & Rain Damage Photos",
    submittedAt: "Yesterday, 3:20 PM",
    reviewStatus: "Under Review"
  }
];

export const MODERATION_METRICS = {
  openDisputes: 3,
  underReview: 2,
  resolvedToday: 14,
  appealsPending: 1,
  trustedUsersCount: 1420,
  restrictedUsersCount: 4
};

