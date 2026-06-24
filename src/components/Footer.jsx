/**
 * Brújula Futura — Footer Premium
 * Diseño moderno con gradiente de marca, orbs decorativos y tipografía elegante.
 */
import { useNavigate } from 'react-router-dom'
import { GraduationCap, Github, ExternalLink, ArrowUpRight, Compass } from 'lucide-react'

export default function Footer() {
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  return (
    <footer className="ft">
      {/* Cinta de gradiente superior */}
      <div className="ft-gradient-bar" />

      {/* Orb decorativo de fondo */}
      <div className="ft-orb ft-orb-1" />
      <div className="ft-orb ft-orb-2" />

      <div className="ft-inner">
        {/* ── Fila superior ── */}
        <div className="ft-top">

          {/* Marca */}
          <div className="ft-brand">
            <button className="ft-logo" onClick={() => navigate('/')}>
              <div className="ft-logo-icon">
                <Compass size={20} />
              </div>
              <span>Brújula Futura</span>
            </button>
            <p className="ft-tagline">
              Orientación vocacional inteligente para estudiantes de bachillerato en Ecuador.
            </p>
            <div className="ft-badge-row">
              <span className="ft-badge">PUCE 2025</span>
              <span className="ft-badge">G8 Emprendimiento</span>
              <span className="ft-badge ft-badge-green">100% Gratuito</span>
            </div>
          </div>

          {/* Links */}
          <div className="ft-nav-cols">
            <div className="ft-nav-col">
              <p className="ft-nav-heading">Plataforma</p>
              <button className="ft-nav-link" onClick={() => navigate('/')}>Inicio</button>
              <button className="ft-nav-link" onClick={() => navigate('/test')}>Test Vocacional</button>
              <button className="ft-nav-link" onClick={() => navigate('/explorar')}>Explorar Carreras</button>
              <button className="ft-nav-link" onClick={() => navigate('/explorar')}>Comparar Opciones</button>
            </div>
            <div className="ft-nav-col">
              <p className="ft-nav-heading">Proyecto</p>
              <a className="ft-nav-link ft-ext" href="https://github.com/matitas2004/brujula-futura" target="_blank" rel="noreferrer">
                <Github size={13} /> GitHub <ArrowUpRight size={11} />
              </a>
              <a className="ft-nav-link ft-ext" href="https://www.puce.edu.ec" target="_blank" rel="noreferrer">
                PUCE Ecuador <ArrowUpRight size={11} />
              </a>
              <a className="ft-nav-link ft-ext" href="https://feyalegria.org" target="_blank" rel="noreferrer">
                Fe y Alegría <ArrowUpRight size={11} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Divisor ── */}
        <div className="ft-divider" />

        {/* ── Fila inferior ── */}
        <div className="ft-bottom">
          <div className="ft-bottom-left">
            <GraduationCap size={14} className="ft-bottom-icon" />
            <span>© {year} Brújula Futura · Todos los derechos reservados</span>
          </div>
          <div className="ft-bottom-right">
            <span>Hecho con pasión para estudiantes ecuatorianos</span>
            <span className="ft-dot">·</span>
            <span className="ft-bottom-highlight">PUCE G8</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
