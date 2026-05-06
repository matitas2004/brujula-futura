export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">🧭</span>
          <span className="footer-name">Brújula Futura</span>
        </div>
        <p className="footer-desc">
          Herramienta de orientación vocacional para estudiantes de bachillerato en Ecuador.
          Proyecto de emprendimiento tecnológico — PUCE 2025.
        </p>
        <div className="footer-links">
          <a href="https://github.com/floressemily/Br-jula-Futura" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <span className="footer-sep">·</span>
          <a href="#inicio">Inicio</a>
          <span className="footer-sep">·</span>
          <a href="#test">Test</a>
          <span className="footer-sep">·</span>
          <a href="#carreras">Carreras</a>
        </div>
        <p className="footer-copy">
          Hecho con ❤️ para estudiantes de Fe y Alegría · <strong>Brújula Futura</strong> © 2025 · PUCE G8
        </p>
      </div>
    </footer>
  )
}
