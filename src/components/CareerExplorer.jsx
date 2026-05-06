import { useState } from 'react'
import { CAREERS, EMERGING } from '../data/db'

export default function CareerExplorer() {
  const [expandedId, setExpandedId] = useState(null)
  const [filter, setFilter] = useState('all') // 'all', 'traditional', 'emerging'

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id)
  }

  const filteredCareers = filter === 'traditional' ? CAREERS
    : filter === 'emerging' ? EMERGING
    : [...CAREERS, ...EMERGING]

  return (
    <section className="section" id="carreras">
      <div className="section-inner">
        <div className="section-header center">
          <div className="section-label">Explorar</div>
          <h2 className="section-title">Conoce las carreras</h2>
          <p className="section-desc">
            Información real sobre carreras tradicionales y emergentes.
            Lo bueno, lo malo, salarios y demanda actual.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="career-filters" id="career-filters">
          <button
            className={`filter-tab${filter === 'all' ? ' active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Todas
          </button>
          <button
            className={`filter-tab${filter === 'traditional' ? ' active' : ''}`}
            onClick={() => setFilter('traditional')}
          >
            Tradicionales
          </button>
          <button
            className={`filter-tab${filter === 'emerging' ? ' active' : ''}`}
            onClick={() => setFilter('emerging')}
          >
            🚀 Emergentes
          </button>
        </div>

        {/* Career Grid */}
        <div className="careers-grid">
          {filteredCareers.map(c => (
            <div
              key={c.id}
              className={`career-card${expandedId === c.id ? ' expanded' : ''}`}
              id={`career-${c.id}`}
              onClick={() => toggleExpand(c.id)}
            >
              {c.glow && (
                <div className="career-card-glow" style={{ background: c.glow }} />
              )}
              <div className="career-card-top">
                <div className="career-card-icon">{c.icon}</div>
                {c.tagLabel && (
                  <span className={`career-demand-tag tag-${c.tag || c.demand}`}>
                    {c.tagLabel || c.demandLabel}
                  </span>
                )}
              </div>
              <h3>{c.name}</h3>
              {c.field && <span className="career-field">{c.field}</span>}
              <p className="desc">{c.desc}</p>

              {/* Expanded details */}
              {expandedId === c.id && (
                <div className="career-expanded">
                  {c.whatYouDo && (
                    <div className="detail-item">
                      <span className="detail-badge badge-do">Harías</span>
                      <span className="detail-text">{c.whatYouDo}</span>
                    </div>
                  )}
                  {c.pros && (
                    <div className="career-pros-cons">
                      <div className="pros-list">
                        <h4>✅ Lo bueno</h4>
                        <ul>
                          {c.pros.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                      </div>
                      <div className="cons-list">
                        <h4>⚠️ Los retos</h4>
                        <ul>
                          {c.cons.map((p, i) => <li key={i}>{p}</li>)}
                        </ul>
                      </div>
                    </div>
                  )}
                  <div className="career-meta">
                    {c.avgSalary && (
                      <div className="meta-item">
                        <span className="meta-label">💰 Salario</span>
                        <span className="meta-value">{c.avgSalary}</span>
                      </div>
                    )}
                    {c.salary && (
                      <div className="meta-item">
                        <span className="meta-label">💰 Salario</span>
                        <span className="meta-value">{c.salary}</span>
                      </div>
                    )}
                    {c.duration && (
                      <div className="meta-item">
                        <span className="meta-label">📅 Duración</span>
                        <span className="meta-value">{c.duration}</span>
                      </div>
                    )}
                  </div>
                  {c.future && (
                    <div className="career-future">
                      <span className="future-label">🔮 Futuro de esta carrera</span>
                      <p>{c.future}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="career-card-footer">
                <span className="expand-hint">
                  {expandedId === c.id ? 'Ver menos ↑' : 'Ver más detalles ↓'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
