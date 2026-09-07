import React, { useState } from "react";

export default function TrustProfileCard({ profile, onOpenRules, onOpenAppeals }) {
  const [showExplanation, setShowExplanation] = useState(false);

  if (!profile) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "Trusted":
        return { bg: "#e8f5e9", text: "#1b5e20", dot: "🟢" };
      case "Under Review":
        return { bg: "#fff8e1", text: "#b78103", dot: "🟡" };
      case "Restricted":
        return { bg: "#fff3e0", text: "#e65100", dot: "🟠" };
      case "Suspended":
        return { bg: "#ffebee", text: "#c62828", dot: "🔴" };
      case "Permanently Banned":
        return { bg: "#212121", text: "#ffffff", dot: "⚫" };
      default:
        return { bg: "#e8f5e9", text: "#1b5e20", dot: "🟢" };
    }
  };

  const statusMeta = getStatusColor(profile.safetyStatus);

  return (
    <div style={cardContainerStyle}>
      {/* Header Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <h3 style={{ margin: 0, fontSize: "1.25rem", color: "#112a1d", fontWeight: 800 }}>
              {profile.name}
            </h3>
            <span style={{
              background: statusMeta.bg,
              color: statusMeta.text,
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "0.78rem",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "4px"
            }}>
              {statusMeta.dot} {profile.safetyStatus}
            </span>
          </div>
          <p style={{ margin: "4px 0 0 0", fontSize: "0.88rem", color: "#496355" }}>
            {profile.role} • {profile.location} • ID: {profile.id}
          </p>
        </div>

        {/* Score Badge */}
        <div style={scoreBoxStyle} onClick={() => setShowExplanation(true)} title="Click for score breakdown">
          <span style={{ fontSize: "1.6rem", fontWeight: 900, color: "#1b5e20", lineHeight: 1 }}>
            {profile.trustScore}
          </span>
          <span style={{ fontSize: "0.75rem", color: "#496355", fontWeight: 700 }}>/ 100</span>
          <span style={{ fontSize: "0.7rem", color: "#2e7d32", textDecoration: "underline", marginTop: "2px" }}>
            Why? ⓘ
          </span>
        </div>
      </div>

      {/* Verification Badges Row */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "16px" }}>
        {profile.verificationBadges.map((badge) => (
          <div key={badge.key} style={badgeStyle} title={badge.description}>
            <span>✓</span> {badge.label}
          </div>
        ))}
      </div>

      {/* Key Metrics Grid */}
      <div style={metricsGridStyle}>
        <div style={metricCardStyle}>
          <div style={metricLabelStyle}>
            {profile.role === "Farmer" ? "Completed Sales" : "Completed Purchases"}
          </div>
          <div style={metricValueStyle}>
            {profile.role === "Farmer" ? profile.metrics.completedSales : profile.metrics.completedPurchases}
          </div>
        </div>

        <div style={metricCardStyle}>
          <div style={metricLabelStyle}>Fulfillment Rate</div>
          <div style={metricValueStyle}>
            {profile.role === "Farmer" ? profile.metrics.onTimeFulfillment : profile.metrics.paymentReliability}
          </div>
        </div>

        <div style={metricCardStyle}>
          <div style={metricLabelStyle}>Quality Match</div>
          <div style={metricValueStyle}>{profile.metrics.qualityMatchRate || profile.metrics.pickupReliability}</div>
        </div>

        <div style={metricCardStyle}>
          <div style={metricLabelStyle}>Active Disputes</div>
          <div style={{ ...metricValueStyle, color: profile.metrics.activeDisputes > 0 ? "#e65100" : "#2e7d32" }}>
            {profile.metrics.activeDisputes}
          </div>
        </div>
      </div>

      {/* Warnings Banner if any */}
      {profile.warnings && profile.warnings.length > 0 && (
        <div style={warningBannerStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "1.1rem" }}>⚠️</span>
            <strong style={{ fontSize: "0.85rem", color: "#b78103" }}>Marketplace Warning Active:</strong>
          </div>
          <p style={{ margin: "4px 0 0 0", fontSize: "0.8rem", color: "#5d4406" }}>
            {profile.warnings[0].issue}: {profile.warnings[0].details} ({profile.warnings[0].impact})
          </p>
        </div>
      )}

      {/* Footer Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid #e0ebe4" }}>
        <button onClick={onOpenRules} style={textLinkStyle}>
          📜 View Marketplace Rules
        </button>
        {profile.safetyStatus !== "Trusted" && (
          <button onClick={onOpenAppeals} style={appealButtonStyle}>
            ⚖️ Submit Status Appeal
          </button>
        )}
      </div>

      {/* Score Explanation Modal */}
      {showExplanation && (
        <div className="modal-overlay" style={overlayStyle}>
          <div className="modal-card" style={explanationModalStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "12px", borderBottom: "1px solid #e2ebe6" }}>
              <h4 style={{ margin: 0, fontSize: "1.1rem", color: "#112a1d" }}>
                Why is the Trust Score {profile.trustScore}/100?
              </h4>
              <button onClick={() => setShowExplanation(false)} style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
            </div>

            <p style={{ fontSize: "0.82rem", color: "#4d6056", margin: "12px 0" }}>
              KisanSetu calculates scores based strictly on verified transaction history, farm gate inspection proofs, payment speed, and dispute resolutions.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {profile.scoreBreakdown.map((item, idx) => (
                <div key={idx} style={scoreRowStyle}>
                  <div>
                    <strong style={{ fontSize: "0.85rem", color: "#1b382b" }}>{item.component}</strong>
                    <div style={{ fontSize: "0.75rem", color: "#556e60" }}>{item.status}</div>
                  </div>
                  <div style={{ textAlign: "right", fontWeight: 700, color: "#1b5e20", fontSize: "0.9rem" }}>
                    +{item.points} / {item.max} pts
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "16px", padding: "10px", background: "#f2f7f4", borderRadius: "8px", fontSize: "0.75rem", color: "#325241" }}>
              💡 <em>Scores are updated dynamically after every completed transaction or resolved dispute.</em>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline styles
const cardContainerStyle = {
  background: "#ffffff",
  border: "1px solid #cce0d4",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 4px 16px rgba(18, 51, 33, 0.06)",
  marginBottom: "20px"
};

const scoreBoxStyle = {
  background: "#f0f7f2",
  border: "1.5px solid #a8d5b5",
  borderRadius: "12px",
  padding: "8px 14px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  transition: "transform 0.2s ease"
};

const badgeStyle = {
  background: "#e8f5e9",
  color: "#1b5e20",
  padding: "4px 10px",
  borderRadius: "6px",
  fontSize: "0.78rem",
  fontWeight: 700,
  border: "1px solid #c8e6c9"
};

const metricsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  gap: "10px",
  marginTop: "16px"
};

const metricCardStyle = {
  background: "#f7faf8",
  border: "1px solid #e2ebe5",
  borderRadius: "10px",
  padding: "10px 12px"
};

const metricLabelStyle = {
  fontSize: "0.72rem",
  color: "#526e60",
  fontWeight: 600,
  textTransform: "uppercase"
};

const metricValueStyle = {
  fontSize: "1.1rem",
  fontWeight: 800,
  color: "#112a1d",
  marginTop: "2px"
};

const warningBannerStyle = {
  marginTop: "16px",
  background: "#fffde7",
  border: "1px solid #fff59d",
  borderLeft: "4px solid #fbc02d",
  borderRadius: "0 8px 8px 0",
  padding: "10px 12px"
};

const textLinkStyle = {
  background: "none",
  border: "none",
  color: "#2e7d32",
  fontWeight: 700,
  fontSize: "0.82rem",
  cursor: "pointer"
};

const appealButtonStyle = {
  background: "#fff3e0",
  color: "#e65100",
  border: "1px solid #ffe0b2",
  padding: "6px 12px",
  borderRadius: "8px",
  fontWeight: 700,
  fontSize: "0.8rem",
  cursor: "pointer"
};

const overlayStyle = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999
};

const explanationModalStyle = {
  background: "#ffffff",
  borderRadius: "16px",
  padding: "20px",
  maxWidth: "460px",
  width: "90%",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
};

const scoreRowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px 10px",
  background: "#f9fbf9",
  borderRadius: "8px",
  border: "1px solid #e6eee9"
};

