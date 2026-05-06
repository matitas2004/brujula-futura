import { INTERESTS } from '../data/db'

export default function Results({ results, selectedInterests }) {
  if (!results || results.length === 0) return null

  return (
    <section className="section results-section" id="resultados">
      <div className="section-inner">
        <div className="section-header center">
          <div className="section-label">Tus Resultados</div>
          <h2 className="section-title">Carreras que encajan contigo</h2>
          <p className="section-desc">
            Basado en tus intereses y respuestas del test, estas son las opciones con más compatibilidad.
          </p>
        </div>

        <div className="results-grid">
          {results.map((r, index) => (
            <div
              key={r.id}
              className={`result-card ${index === 0 ? 'result-top' : ''}`}
              id={`result-${r.id}`}
            >
              {index === 0 && <div className="result-crown">👑</div>}
              <span className={`result-label label-${r.label}`}>{r.labelText}</span>
              <div className="result-icon">{r.icon}</div>
              <h3>{r.name}</h3>
              {r.field && <span className="result-field">{r.field}</span>}
              <p>{r.desc}</p>
              <div className="result-match">
                <div className="match-bar-wrap">
                  <div
                    className="match-bar"
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
                <span className="match-pct">{r.pct}%</span>
              </div>
              {r.matchingTags && r.matchingTags.length > 0 && (
                <div className="result-tags">
                  {r.matchingTags.map(tag => {
                    const interest = INTERESTS.find(i => i.id === tag)
                    return interest ? (
                      <span key={tag} className="result-tag">
                        {interest.icon} {interest.label}
                      </span>
                    ) : null
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
