import { UNIVERSITIES } from '../data/db'

export default function UniversitySection() {
  return (
    <section className="section universities-bg" id="universidades">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-label">Universidades</div>
          <h2 className="section-title">¿Dónde podrías estudiar?</h2>
          <p className="section-desc">
            Opciones reales en Ecuador, con información clara sobre costos, modalidad y becas disponibles.
          </p>
        </div>
        <div className="uni-grid">
          {UNIVERSITIES.map(u => (
            <div key={u.id} className="uni-card" id={`uni-${u.id}`}>
              <div className="uni-header">
                <div>
                  <span className="uni-name">{u.name}</span>
                  {u.fullName && <span className="uni-full-name">{u.fullName}</span>}
                </div>
                <span className={`uni-proximity prox-${u.proximity}`}>{u.proxLabel}</span>
              </div>
              <p className="uni-career">🎓 {u.career}</p>
              {u.highlight && (
                <div className="uni-highlight">⭐ {u.highlight}</div>
              )}
              <div className="uni-info">
                <div className="uni-info-item">
                  <span className="ui-label">Costo</span>
                  <span className={`ui-value cost-${u.costLevel}`}>{u.cost}</span>
                </div>
                <div className="uni-info-item">
                  <span className="ui-label">Modalidad</span>
                  <span className="ui-value">{u.mode}</span>
                </div>
                <div className="uni-info-item">
                  <span className="ui-label">Ubicación</span>
                  <span className="ui-value">{u.location}</span>
                </div>
              </div>
              <div className="uni-scholarship">
                🎫 {u.scholarship}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
