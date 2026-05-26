/**
 * Brújula Futura — Footer
 * Pie de página con iconografía Lucide y links funcionales.
 */
import { Compass, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Compass size={20} className="footer-logo-icon" />
          <span className="footer-name">Brújula Futura</span>
        </div>
        <p className="footer-desc">
          Herramienta de orientación vocacional para estudiantes de bachillerato en Ecuador.
          Proyecto de emprendimiento tecnológico — PUCE 2025.
        </p>
        <div className="footer-links">
          <a href="https://github.com/matitas2004/brujula-futura" target="_blank" rel="noopener noreferrer">
            <ExternalLink size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
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
          Hecho con <Heart size={13} style={{ verticalAlign: 'middle', color: 'var(--rose)', fill: 'var(--rose)' }} /> para estudiantes de Fe y Alegría · <strong>Brújula Futura</strong> © 2025 · PUCE G8
        </p>
      </div>
    </footer>
  );
}
