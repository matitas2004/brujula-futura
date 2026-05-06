export default function Hero({ onNavigate }) {
  return (
    <section className="hero" id="inicio">
      <div className="hero-bg" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-particles">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`} />
        ))}
      </div>
      <div className="hero-content section-inner">
        <div className="hero-badge">
          <span className="dot" />
          Orientación Vocacional para Bachilleres
        </div>
        <h1>
          Explora tu<br />
          <span className="accent">futuro</span>
        </h1>
        <p className="hero-sub">
          Descubre carreras, compara opciones y encuentra un camino más claro
          para tu vida profesional. Una experiencia guiada, rápida y pensada para ti.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" id="btn-explorar" onClick={() => onNavigate('test')}>
            ✨ Hacer el test
          </button>
          <button className="btn-secondary" id="btn-ver-carreras" onClick={() => onNavigate('carreras')}>
            Ver carreras
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">12+</span>
            <span className="stat-label">Carreras exploradas</span>
          </div>
          <div className="stat">
            <span className="stat-num">6</span>
            <span className="stat-label">Universidades</span>
          </div>
          <div className="stat">
            <span className="stat-num">100%</span>
            <span className="stat-label">Gratuito</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll" onClick={() => onNavigate('test')}>
        <span>Descubre más</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  )
}
