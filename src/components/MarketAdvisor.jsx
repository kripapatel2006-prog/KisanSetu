import { useEffect, useMemo, useRef, useState } from "react";
import {
  Sparkles,
  X,
  Send,
  MessageCircle,
  Stethoscope,
  LineChart,
  Landmark,
  WifiOff,
} from "lucide-react";
import VoiceRecorder, { speakText } from "./VoiceRecorder";
import CropDiagnosis from "./CropDiagnosis";
import MarketAdvisor from "./MarketAdvisor";
import GovernmentAssistant from "./GovernmentAssistant";
import {
  ASSISTANT_TEXT,
  CROP_LIST,
  OFFLINE_FAQS,
  findScheme,
  matchCropFromText,
  getMarketAdvice,
} from "./assistantData";
import "./assistant.css";

const MEMORY_KEY = "kisansetu_ai_memory";
const MAX_MESSAGES = 40;

function loadMemory() {
  try {
    const raw = localStorage.getItem(MEMORY_KEY);
    if (!raw) return { preferredCrop: null, recentQuestions: [], recentDiagnoses: [], messages: [] };
    return JSON.parse(raw);
  } catch {
    return { preferredCrop: null, recentQuestions: [], recentDiagnoses: [], messages: [] };
  }
}

function saveMemory(memory) {
  try {
    localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
  } catch {
    // localStorage unavailable — demo continues without persistence
  }
}

const DISEASE_HINTS = /(disease|pest|sick|spot|yellow|wilt|curl|blight|infect)/i;
const MARKET_HINTS = /(sell|price|rate|market|profit|worth)/i;

export default function AIAssistant({ language = "en", defaultCrop }) {
  const t = ASSISTANT_TEXT[language] || ASSISTANT_TEXT.en;

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("chat");
  const [input, setInput] = useState("");
  const [online, setOnline] = useState(
    typeof navigator === "undefined" ? true : navigator.onLine
  );
  const [memory, setMemory] = useState(loadMemory);
  const [messages, setMessages] = useState(() => loadMemory().messages || []);
  const [thinking, setThinking] = useState(false);

  const scrollRef = useRef(null);
  const lastInputWasVoice = useRef(false);

  useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, mode]);

  const persist = (nextMemory, nextMessages) => {
    const merged = { ...nextMemory, messages: nextMessages.slice(-MAX_MESSAGES) };
    setMemory(merged);
    saveMemory(merged);
  };

  const buildReply = async (text) => {
    const scheme = findScheme(text);
    if (scheme) {
      return `${scheme.name}: ${scheme.summary} (${t.tabSchemes} → ${scheme.name})`;
    }

    const cropMatch = matchCropFromText(text);

    if (MARKET_HINTS.test(text) || (cropMatch && !DISEASE_HINTS.test(text))) {
      const crop = cropMatch || memory.preferredCrop || CROP_LIST[0];
      const advice = await getMarketAdvice(crop);
      const actionLabel =
        advice.action === "SELL_NOW" ? t.sellNow : advice.action === "WAIT" ? t.wait : t.sellPartially;
      return `${crop}: ${actionLabel} (${advice.confidence}% ${t.confidence.toLowerCase()}). ${advice.reasons[0]}`;
    }

    if (DISEASE_HINTS.test(text)) {
      return `${t.tabDiagnose}: ${t.uploadPhoto} / ${t.takePhoto} — I can identify the issue from a photo.`;
    }

    return t.defaultReply;
  };

  const handleSend = async (rawText) => {
    const text = (rawText ?? input).trim();
    if (!text) return;

    setInput("");

    const userMsg = { role: "user", text, time: Date.now() };
    const messagesWithUser = [...messages, userMsg];
    setMessages(messagesWithUser);

    const nextMemory = {
      ...memory,
      recentQuestions: [text, ...memory.recentQuestions.filter((q) => q !== text)].slice(0, 5),
      preferredCrop: matchCropFromText(text) || memory.preferredCrop,
    };
    persist(nextMemory, messagesWithUser);

    setThinking(true);
    const reply = await buildReply(text);
    setThinking(false);

    const assistantMsg = { role: "assistant", text: reply, time: Date.now() };
    const messagesWithReply = [...messagesWithUser, assistantMsg];
    setMessages(messagesWithReply);
    persist(nextMemory, messagesWithReply);

    if (lastInputWasVoice.current) {
      speakText(reply, language);
      lastInputWasVoice.current = false;
    }
  };

  const handleVoiceResult = (transcript) => {
    lastInputWasVoice.current = true;
    handleSend(transcript);
  };

  const handleDiagnosed = (diagnosis) => {
    const nextMemory = {
      ...memory,
      recentDiagnoses: [
        { crop: diagnosis.crop, name: diagnosis.name, at: diagnosis.diagnosedAt },
        ...memory.recentDiagnoses,
      ].slice(0, 5),
      preferredCrop: diagnosis.crop,
    };
    persist(nextMemory, messages);
  };

  const handleAdvised = (advice) => {
    const nextMemory = { ...memory, preferredCrop: advice.crop };
    persist(nextMemory, messages);
  };

  const clearHistory = () => {
    const fresh = { preferredCrop: null, recentQuestions: [], recentDiagnoses: [], messages: [] };
    setMemory(fresh);
    setMessages([]);
    saveMemory(fresh);
  };

  const tabs = useMemo(
    () => [
      { id: "chat", label: t.tabChat, icon: MessageCircle },
      { id: "diagnose", label: t.tabDiagnose, icon: Stethoscope },
      { id: "market", label: t.tabMarket, icon: LineChart },
      { id: "schemes", label: t.tabSchemes, icon: Landmark },
    ],
    [t]
  );

  const offlineFaqs = OFFLINE_FAQS[language] || OFFLINE_FAQS.en;

  return (
    <>
      <button
        type="button"
        className="ai-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.openAssistant}
        title={t.openAssistant}
      >
        <Sparkles size={22} />
      </button>

      {open && (
        <div className="ai-panel">
          <div className="ai-panel-header">
            <div>
              <h3>{t.assistantTitle}</h3>
              <p>{t.assistantSubtitle}</p>
            </div>
            <button
              type="button"
              className="ai-panel-close"
              onClick={() => setOpen(false)}
              aria-label={t.close}
            >
              <X size={18} />
            </button>
          </div>

          {!online && (
            <div className="ai-offline-banner">
              <WifiOff size={14} />
              <span>
                <strong>{t.offlineBanner}.</strong> {t.offlineNote}
              </span>
            </div>
          )}

          <div className="ai-tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className={mode === tab.id ? "active" : ""}
                  onClick={() => setMode(tab.id)}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="ai-panel-body">
            {mode === "chat" && (
              <div className="assistant-panel chat-panel">
                <div className="chat-messages" ref={scrollRef}>
                  {messages.length === 0 && (
                    <>
                      <div className="chat-bubble assistant">{t.greeting}</div>

                      {memory.recentQuestions.length > 0 && (
                        <div className="chat-recent">
                          <span>{t.recentQuestions}</span>
                          {memory.recentQuestions.map((q, i) => (
                            <button key={i} onClick={() => handleSend(q)}>
                              {q}
                            </button>
                          ))}
                        </div>
                      )}

                      {!online && (
                        <div className="chat-faq">
                          <span>{t.faqTitle}</span>
                          {offlineFaqs.map((f, i) => (
                            <div key={i} className="chat-faq-item">
                              <strong>{f.q}</strong>
                              <p>{f.a}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {messages.map((m, i) => (
                    <div key={i} className={`chat-bubble ${m.role}`}>
                      {m.text}
                    </div>
                  ))}

                  {thinking && <div className="chat-bubble assistant typing">...</div>}
                </div>

                <div className="chat-input-row">
                  <VoiceRecorder
                    language={language}
                    t={t}
                    onResult={handleVoiceResult}
                    disabled={!online && false}
                  />
                  <input
                    type="text"
                    value={input}
                    placeholder={t.chatPlaceholder}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <button
                    type="button"
                    className="chat-send-btn"
                    onClick={() => handleSend()}
                    aria-label={t.chatSend}
                  >
                    <Send size={16} />
                  </button>
                </div>

                {messages.length > 0 && (
                  <button type="button" className="clear-history-btn" onClick={clearHistory}>
                    {t.clearHistory}
                  </button>
                )}
              </div>
            )}

            {mode === "diagnose" && (
              <CropDiagnosis
                t={t}
                defaultCrop={memory.preferredCrop || defaultCrop}
                onDiagnosed={handleDiagnosed}
              />
            )}

            {mode === "market" && (
              <MarketAdvisor
                t={t}
                defaultCrop={memory.preferredCrop || defaultCrop}
                onAdvised={handleAdvised}
              />
            )}

            {mode === "schemes" && <GovernmentAssistant t={t} />}
          </div>
        </div>
      )}
    </>
  );
}
