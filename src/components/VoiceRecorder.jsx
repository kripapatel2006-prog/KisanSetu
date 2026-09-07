import { useState } from "react";
import { Search, ExternalLink, Landmark } from "lucide-react";
import { GOV_SCHEMES, findScheme } from "./assistantData";

export default function GovernmentAssistant({ t }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const handleSearch = () => {
    const match = findScheme(query);
    setSelected(match || null);
  };

  return (
    <div className="assistant-panel schemes-panel">
      <h4 className="panel-heading">
        <Landmark size={16} />
        {t.schemesTitle}
      </h4>

      <div className="market-query-row">
        <input
          type="text"
          value={query}
          placeholder={t.schemesPlaceholder}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button type="button" className="primary-button" onClick={handleSearch}>
          <Search size={16} />
        </button>
      </div>

      <div className="scheme-chip-row">
        {GOV_SCHEMES.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`scheme-chip ${selected?.id === s.id ? "active" : ""}`}
            onClick={() => setSelected(s)}
          >
            {s.name}
          </button>
        ))}
      </div>

      {selected && (
        <div className="scheme-detail">
          <h4>{selected.name}</h4>
          <p>{selected.summary}</p>

          <div className="diagnosis-detail">
            <h5>{t.eligibility}</h5>
            <ul>
              {selected.eligibility.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>

          <div className="diagnosis-detail">
            <h5>{t.benefits}</h5>
            <ul>
              {selected.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>

          <div className="diagnosis-detail">
            <h5>{t.howToApply}</h5>
            <ul>
              {selected.howToApply.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          <a
            className="scheme-official-link"
            href={selected.link}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={14} />
            {t.officialLink}
          </a>
        </div>
      )}
    </div>
  );
}
