import React, { useState } from "react";
import TrustProfileCard from "./TrustProfileCard";
import ProtectedContactModal from "./ProtectedContactModal";
import OrderDisputeModal from "./OrderDisputeModal";
import {
  INITIAL_TRUST_PROFILES,
  MARKETPLACE_RULES_FARMER,
  MARKETPLACE_RULES_BUYER,
  DEMO_APPEAL_CASES
} from "../../data/trustSafetyData";

export default function TrustSafetyCenter({ userRole = "farmer" }) {
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'rules' | 'disputes' | 'appeals'
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isDisputeOpen, setIsDisputeOpen] = useState(false);
  const [appealText, setAppealText] = useState("");
  const [appealSubmitted, setAppealSubmitted] = useState(false);

  const profile = INITIAL_TRUST_PROFILES[userRole] || INITIAL_TRUST_PROFILES.farmer;
  const rulesList = userRole === "farmer" ? MARKETPLACE_RULES_FARMER : MARKETPLACE_RULES_BUYER;

  const handleAppealSubmit = (e) => {
    e.preventDefault();
    setAppealSubmitted(true);
  };

  return (
    <div className="trust-safety-center" style={centerContainerStyle}>
      {/* Signature Banner */}
      <div style={heroBannerStyle}>
        <div style={{ maxWidth: "720px" }}>
          <span style={heroBadgeStyle}>KISANSETU TRUST & SAFETY SYSTEM</span>
          <h2 style={{ margin: "8px 0", fontSize: "1.6rem", color: "#ffffff", fontWeight: 900 }}>
            "We don't just connect farmers and buyers. We make the transaction trustworthy."
          </h2>
          <p style={{ margin: 0, fontSize: "0.88rem", color: "#c8e6c9", lineHeight: 1.5 }}>
            Traceable Produce Lots • Verified Identity KYC • Masked Protected Calls • Evidence-Based Quality Vault • Fair Dispute Resolution
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={subTabBarStyle}>
        <button
          onClick={() => setActiveTab("overview")}
          style={{ ...subTabStyle, borderBottom: activeTab === "overview" ? "3px solid #2e7d32" : "none", color: activeTab === "overview" ? "#1b5e20" : "#556e60" }}
        >
          🛡️ My Trust Profile
        </button>
        <button
          onClick={() => setActiveTab("rules")}
          style={{ ...subTabStyle, borderBottom: activeTab === "rules" ? "3px solid #2e7d32" : "none", color: activeTab === "rules" ? "#1b5e20" : "#556e60" }}
        >
          📜 Marketplace Rules
        </button>
        <button
          onClick={() => setActiveTab("disputes")}
          style={{ ...subTabStyle, borderBottom: activeTab === "disputes" ? "3px solid #2e7d32" : "none", color: activeTab === "disputes" ? "#1b5e20" : "#556e60" }}
        >
          ⚖️ Active Disputes & Evidence ({profile.metrics.activeDisputes})
        </button>
        <button
          onClick={() => setActiveTab("appeals")}
          style={{ ...subTabStyle, borderBottom: activeTab === "appeals" ? "3px solid #2e7d32" : "none", color: activeTab === "appeals" ? "#1b5e20" : "#556e60" }}
        >
          🚨 Status Appeals & Safety
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div style={{ marginTop: "20px" }}>
          <TrustProfileCard
            profile={profile}
            onOpenRules={() => setActiveTab("rules")}
            onOpenAppeals={() => setActiveTab("appeals")}
          />

          {/* Quick Action Cards */}
          <div style={quickActionGridStyle}>
            <div style={actionCardStyle}>
              <span style={{ fontSize: "2rem" }}>📞</span>
              <h4 style={{ margin: "8px 0 4px 0", fontSize: "1rem", color: "#112a1d" }}>
                Protected Masked Telephony
              </h4>
              <p style={{ margin: "0 0 12px 0", fontSize: "0.8rem", color: "#4d6056" }}>
                Contact trading partners safely without sharing personal mobile numbers.
              </p>
              <button onClick={() => setIsContactOpen(true)} style={actionButtonStyle}>
                Test Protected Call
              </button>
            </div>

            <div style={actionCardStyle}>
              <span style={{ fontSize: "2rem" }}>⚖️</span>
              <h4 style={{ margin: "8px 0 4px 0", fontSize: "1rem", color: "#112a1d" }}>
                Quality & Spoilage Vault
              </h4>
              <p style={{ margin: "0 0 12px 0", fontSize: "0.8rem", color: "#4d6056" }}>
                Inspect farm gate pickup photos vs destination warehouse delivery proofs.
              </p>
              <button onClick={() => setIsDisputeOpen(true)} style={actionButtonStyle}>
                Open Evidence Vault
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Marketplace Rules Tab */}
      {activeTab === "rules" && (
        <div style={cardBoxStyle}>
          <h3 style={{ margin: "0 0 8px 0", fontSize: "1.2rem", color: "#112a1d" }}>
            Central KisanSetu Marketplace Code of Conduct ({userRole.toUpperCase()} RULES)
          </h3>
          <p style={{ margin: "0 0 16px 0", fontSize: "0.85rem", color: "#4d6056" }}>
            To protect both farmers and buyers, all platform transactions are governed by evidence-based accountability rules.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {rulesList.map((rule, idx) => (
              <div key={idx} style={ruleItemStyle}>
                <span style={{ color: "#2e7d32", fontWeight: 800 }}>✓</span>
                <span style={{ fontSize: "0.88rem", color: "#1b382b", fontWeight: 500 }}>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Disputes Tab */}
      {activeTab === "disputes" && (
        <div style={cardBoxStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "1.2rem", color: "#112a1d" }}>
              Order Quality & Payment Evidence Vault
            </h3>
            <button onClick={() => setIsDisputeOpen(true)} style={actionButtonStyle}>
              ➕ Open New Dispute
            </button>
          </div>

          <div style={disputeItemCardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <strong style={{ fontSize: "1rem", color: "#112a1d" }}>Dispute ID: DISP-2026-8801</strong>
                <p style={{ margin: "2px 0 0 0", fontSize: "0.82rem", color: "#4d6056" }}>
                  Lot: KS-GN-2026-9402 (Groundnut 10 Quintals) • Raised by FreshKart Foods
                </p>
              </div>
              <span style={chipWarningStyle}>Awaiting Farmer Response</span>
            </div>
            <p style={{ margin: "10px 0", fontSize: "0.85rem", color: "#334155" }}>
              <strong>Claim:</strong> Buyer reported minor dampness post-delivery. Farm gate pickup photos verified dry (10.2% moisture). Transit exposure under review.
            </p>
            <button onClick={() => setIsDisputeOpen(true)} style={textLinkStyle}>
              📸 View Side-by-Side Pickup vs Delivery Evidence →
            </button>
          </div>
        </div>
      )}

      {/* Appeals & Safety Tab */}
      {activeTab === "appeals" && (
        <div style={cardBoxStyle}>
          <h3 style={{ margin: "0 0 8px 0", fontSize: "1.2rem", color: "#112a1d" }}>
            Progressive Safety & Appeal Center
          </h3>
          <p style={{ margin: "0 0 16px 0", fontSize: "0.85rem", color: "#4d6056" }}>
            KisanSetu enforces a progressive safety ladder: 🟢 Trusted ➔ 🟡 Under Review ➔ 🟠 Restricted ➔ 🔴 Suspended ➔ ⚫ Banned.
            No user is penalized without evidence review or opportunity for appeal.
          </p>

          {/* Progressive Safety Ladder graphic */}
          <div style={ladderStyle}>
            <div style={{ ...ladderStepStyle, background: "#e8f5e9", borderColor: "#a5d6a7" }}>🟢 Trusted</div>
            <div style={{ ...ladderStepStyle, background: "#fff8e1", borderColor: "#ffe082" }}>🟡 Under Review</div>
            <div style={{ ...ladderStepStyle, background: "#fff3e0", borderColor: "#ffcc80" }}>🟠 Restricted</div>
            <div style={{ ...ladderStepStyle, background: "#ffebee", borderColor: "#ef9a9a" }}>🔴 Suspended</div>
            <div style={{ ...ladderStepStyle, background: "#212121", color: "#fff", borderColor: "#000" }}>⚫ Permanently Banned</div>
          </div>

          <h4 style={{ margin: "24px 0 10px 0", fontSize: "1rem", color: "#112a1d" }}>
            Submit Account Status Appeal
          </h4>

          {appealSubmitted ? (
            <div style={successBoxStyle}>
              ✅ <strong>Appeal Submitted Successfully (Ref: APP-2026-99).</strong>
              <p style={{ margin: "4px 0 0 0", fontSize: "0.8rem" }}>
                Our Trust & Safety Committee will review your revenue inspector certificates within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleAppealSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <textarea
                required
                placeholder="Explain what happened (e.g. unseasonal cyclonic rain caused transport delay) and list supporting Mandal documents..."
                value={appealText}
                onChange={(e) => setAppealText(e.target.value)}
                style={{ width: "100%", height: "90px", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", boxSizing: "border-box", fontFamily: "inherit" }}
              />
              <button type="submit" style={{ ...actionButtonStyle, width: "200px" }}>
                ⚖️ Lodge Formal Appeal
              </button>
            </form>
          )}
        </div>
      )}

      {/* Modals */}
      <ProtectedContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        targetUser={userRole === "farmer" ? { name: "FreshKart Foods", role: "Corporate Buyer" } : { name: "Ramesh Kumar", role: "Farmer" }}
      />

      <OrderDisputeModal
        isOpen={isDisputeOpen}
        onClose={() => setIsDisputeOpen(false)}
        userRole={userRole}
      />
    </div>
  );
}

// Inline Styles
const centerContainerStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "20px 10px"
};

const heroBannerStyle = {
  background: "linear-gradient(135deg, #1b382b 0%, #2e7d32 100%)",
  borderRadius: "20px",
  padding: "28px 32px",
  color: "#ffffff",
  boxShadow: "0 10px 30px rgba(27, 56, 43, 0.2)",
  marginBottom: "24px"
};

const heroBadgeStyle = {
  background: "rgba(255, 255, 255, 0.15)",
  color: "#a5d6a7",
  padding: "4px 12px",
  borderRadius: "20px",
  fontSize: "0.75rem",
  fontWeight: 800,
  letterSpacing: "1px"
};

const subTabBarStyle = {
  display: "flex",
  gap: "10px",
  borderBottom: "2px solid #e0ebe4",
  marginBottom: "20px",
  overflowX: "auto"
};

const subTabStyle = {
  background: "none",
  border: "none",
  padding: "12px 16px",
  fontWeight: 700,
  fontSize: "0.9rem",
  cursor: "pointer",
  whiteSpace: "nowrap"
};

const quickActionGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "16px"
};

const actionCardStyle = {
  background: "#ffffff",
  border: "1px solid #d4e6db",
  borderRadius: "14px",
  padding: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
};

const actionButtonStyle = {
  background: "#2e7d32",
  color: "#ffffff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  fontWeight: 700,
  fontSize: "0.85rem",
  cursor: "pointer"
};

const cardBoxStyle = {
  background: "#ffffff",
  border: "1px solid #d4e6db",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
};

const ruleItemStyle = {
  display: "flex",
  gap: "10px",
  padding: "10px 12px",
  background: "#f8fbf9",
  border: "1px solid #e2ece5",
  borderRadius: "8px"
};

const disputeItemCardStyle = {
  background: "#fffde7",
  border: "1px solid #fff59d",
  borderRadius: "12px",
  padding: "16px"
};

const chipWarningStyle = {
  background: "#fef3c7",
  color: "#92400e",
  padding: "4px 10px",
  borderRadius: "12px",
  fontSize: "0.75rem",
  fontWeight: 800
};

const textLinkStyle = {
  background: "none",
  border: "none",
  color: "#2e7d32",
  fontWeight: 700,
  fontSize: "0.85rem",
  cursor: "pointer",
  padding: 0
};

const ladderStyle = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  marginTop: "12px"
};

const ladderStepStyle = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid",
  fontSize: "0.78rem",
  fontWeight: 800
};

const successBoxStyle = {
  background: "#f0fdf4",
  border: "1px solid #bbf7d0",
  color: "#166534",
  padding: "14px",
  borderRadius: "10px"
};

