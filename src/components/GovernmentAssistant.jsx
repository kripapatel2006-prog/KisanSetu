/* AI Kisan Assistant — scoped styles.
   Reuses the app's existing design tokens (--forest, --wheat, --terracotta,
   --cream, --shadow-*, --radius-*) defined in src/assets/App.css so the
   assistant matches the rest of KisanSetu without redefining a palette. */

.ai-fab {
  position: fixed;
  bottom: 22px;
  right: 22px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, var(--forest), var(--forest-dark));
  color: var(--wheat-light);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
  z-index: 9999;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.ai-fab:hover {
  transform: translateY(-2px) scale(1.04);
}

.ai-fab::after {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid rgba(216, 181, 106, 0.45);
  animation: ai-fab-pulse 2.4s ease-out infinite;
}

@keyframes ai-fab-pulse {
  0% { transform: scale(0.9); opacity: 0.8; }
  70% { transform: scale(1.25); opacity: 0; }
  100% { opacity: 0; }
}

.ai-panel {
  position: fixed;
  bottom: 92px;
  right: 22px;
  width: 380px;
  max-height: 620px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
  font-size: 14px;
}

.ai-panel-header {
  background: linear-gradient(135deg, var(--forest), var(--forest-deep));
  color: var(--white);
  padding: 16px 18px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.ai-panel-header h3 {
  margin: 0;
  font-size: 16px;
}

.ai-panel-header p {
  margin: 2px 0 0;
  font-size: 12px;
  color: var(--sage);
}

.ai-panel-close {
  background: rgba(255, 255, 255, 0.12);
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  flex-shrink: 0;
}

.ai-offline-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--wheat-light);
  color: var(--forest-deep);
  padding: 8px 14px;
  font-size: 12px;
  border-bottom: 1px solid var(--border);
}

.ai-tabs {
  display: flex;
  border-bottom: 1px solid var(--border);
  background: var(--cream);
}

.ai-tabs button {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 9px 4px;
  background: none;
  border: none;
  color: var(--muted);
  font-size: 10.5px;
  font-weight: 600;
  border-bottom: 2px solid transparent;
}

.ai-tabs button.active {
  color: var(--forest);
  border-bottom-color: var(--forest);
  background: var(--green-light);
}

.ai-panel-body {
  flex: 1;
  overflow-y: auto;
  display: flex;
}

.assistant-panel {
  width: 100%;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Chat */
.chat-panel {
  padding: 0;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 220px;
  max-height: 380px;
}

.chat-bubble {
  max-width: 85%;
  padding: 9px 12px;
  border-radius: var(--radius-md);
  line-height: 1.4;
  font-size: 13px;
}

.chat-bubble.assistant {
  align-self: flex-start;
  background: var(--green-light);
  color: var(--forest-deep);
  border-bottom-left-radius: 4px;
}

.chat-bubble.user {
  align-self: flex-end;
  background: var(--forest);
  color: var(--white);
  border-bottom-right-radius: 4px;
}

.chat-bubble.typing {
  font-weight: 700;
  letter-spacing: 2px;
}

.chat-recent {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
}

.chat-recent span,
.chat-faq span {
  font-size: 11px;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.chat-recent button {
  text-align: left;
  background: var(--cream);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 7px 10px;
  font-size: 12px;
  color: var(--charcoal);
}

.chat-faq {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.chat-faq-item {
  background: var(--cream);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 8px 10px;
}

.chat-faq-item strong {
  display: block;
  font-size: 12px;
  color: var(--forest-deep);
}

.chat-faq-item p {
  margin: 3px 0 0;
  font-size: 11.5px;
  color: var(--muted);
}

.chat-input-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-top: 1px solid var(--border);
}

.chat-input-row input {
  flex: 1;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 8px 10px;
  font-size: 13px;
}

.chat-send-btn {
  background: var(--forest);
  color: var(--white);
  border: none;
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.clear-history-btn {
  align-self: center;
  margin: 0 0 10px;
  background: none;
  border: none;
  color: var(--muted);
  font-size: 11px;
  text-decoration: underline;
}

/* Voice recorder */
.voice-recorder {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.mic-button {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  background: var(--cream);
  color: var(--forest);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.mic-button.listening {
  background: var(--terracotta);
  border-color: var(--terracotta);
  color: var(--white);
}

.mic-waveform {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 18px;
}

.mic-waveform span {
  width: 3px;
  border-radius: 2px;
  background: var(--terracotta);
  animation: ai-wave 0.9s ease-in-out infinite;
}

.mic-waveform span:nth-child(1) { height: 6px; animation-delay: 0s; }
.mic-waveform span:nth-child(2) { height: 14px; animation-delay: 0.1s; }
.mic-waveform span:nth-child(3) { height: 18px; animation-delay: 0.2s; }
.mic-waveform span:nth-child(4) { height: 12px; animation-delay: 0.3s; }
.mic-waveform span:nth-child(5) { height: 8px; animation-delay: 0.4s; }

@keyframes ai-wave {
  0%, 100% { transform: scaleY(0.5); }
  50% { transform: scaleY(1); }
}

.mic-status {
  font-size: 11px;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 110px;
}

.voice-unsupported {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  color: var(--muted);
  max-width: 90px;
}

/* Diagnose / Market shared bits */
.diagnosis-crop-select,
.market-crop-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.diagnosis-crop-select label,
.market-crop-select label {
  font-size: 12px;
  color: var(--muted);
  font-weight: 600;
}

.diagnosis-crop-select select,
.market-crop-select select {
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 6px 8px;
  font-size: 12px;
}

.diagnosis-preview {
  border-radius: var(--radius-md);
  overflow: hidden;
  max-height: 160px;
  border: 1px solid var(--border);
}

.diagnosis-preview img {
  width: 100%;
  max-height: 160px;
  object-fit: cover;
  display: block;
}

.diagnosis-empty {
  height: 120px;
  border: 1.5px dashed var(--border);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--sage);
  background: var(--cream);
}

.diagnosis-actions {
  display: flex;
  gap: 8px;
}

.diagnosis-actions .secondary-button {
  flex: 1;
  justify-content: center;
  font-size: 12px;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.diagnosis-analyze-btn {
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
}

.spin {
  animation: ai-spin 0.9s linear infinite;
}

@keyframes ai-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.demo-badge {
  display: inline-block;
  background: var(--terracotta-light);
  color: var(--terracotta);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  padding: 3px 8px;
  border-radius: 999px;
}

.diagnosis-result,
.market-result,
.scheme-detail {
  border-top: 1px solid var(--border);
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.diagnosis-result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.severity-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 10.5px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 999px;
}

.severity-high { background: var(--terracotta-light); color: var(--terracotta); }
.severity-medium { background: var(--wheat-light); color: #8a6a1f; }
.severity-low { background: var(--green-light); color: var(--forest); }

.confidence-bar {
  position: relative;
  height: 20px;
  background: var(--border);
  border-radius: 999px;
  overflow: hidden;
}

.confidence-bar-fill {
  position: absolute;
  inset: 0;
  background: var(--green);
  border-radius: 999px;
}

.confidence-bar span {
  position: relative;
  z-index: 1;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 10.5px;
  font-weight: 700;
  color: var(--forest-deep);
}

.diagnosis-detail h5 {
  margin: 0 0 4px;
  font-size: 11.5px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--muted);
}

.diagnosis-detail ul {
  margin: 0;
  padding-left: 16px;
  font-size: 12.5px;
  color: var(--charcoal);
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.market-query-row {
  display: flex;
  gap: 8px;
}

.market-query-row input {
  flex: 1;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 8px 10px;
  font-size: 12.5px;
}

.market-action-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 13px;
  width: fit-content;
}

.action-sell { background: var(--terracotta-light); color: var(--terracotta); }
.action-wait { background: var(--green-light); color: var(--forest); }
.action-partial { background: var(--wheat-light); color: #8a6a1f; }

.market-stats {
  display: flex;
  gap: 10px;
}

.market-stats > div {
  flex: 1;
  background: var(--cream);
  border-radius: var(--radius-sm);
  padding: 8px;
  text-align: center;
}

.market-stats span {
  display: block;
  font-weight: 700;
  font-size: 13px;
  color: var(--forest-deep);
}

.market-stats small {
  font-size: 9.5px;
  color: var(--muted);
  text-transform: uppercase;
}

/* Schemes */
.panel-heading {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  font-size: 14px;
  color: var(--forest-deep);
}

.scheme-chip-row {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 2px;
}

.scheme-chip {
  flex-shrink: 0;
  background: var(--cream);
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 11.5px;
  color: var(--charcoal);
  white-space: nowrap;
}

.scheme-chip.active {
  background: var(--forest);
  border-color: var(--forest);
  color: var(--white);
}

.scheme-detail h4 {
  margin: 0;
  color: var(--forest-deep);
}

.scheme-detail p {
  margin: 0;
  font-size: 12.5px;
  color: var(--muted);
}

.scheme-official-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--forest);
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  align-self: flex-start;
}

/* Mobile */
@media (max-width: 480px) {
  .ai-panel {
    right: 12px;
    left: 12px;
    bottom: 84px;
    width: auto;
    max-height: 72vh;
  }

  .ai-fab {
    bottom: 16px;
    right: 16px;
  }
}
