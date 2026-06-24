/**
 * Brújula Futura — Footer
 * Pie de página con columnas de navegación y links del proyecto.
 */
import { useNavigate } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="footer-main">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo" onClick={() => navigate('/')}>
              <GraduationCap size={22} />
              <span>Brújula Futura</span>
            </div>
            <p>Herramienta de orientación vocacional para estudiantes de bachillerato en Ecuador. Desarrollada en PUCE 2025.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h5>Navegación</h5>
              <a onClick={() => navigate('/')}>Inicio</a>
              <a onClick={() => navigate('/test')}>Test Vocacional</a>
              <a onClick={() => navigate('/explorar')}>Explorar Carreras</a>
            </div>
            <div className="footer-col">
              <h5>Proyecto</h5>
              <a href="https://github.com/matitas2004/brujula-futura" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.puce.edu.ec" target="_blank" rel="noreferrer">PUCE Ecuador</a>
              <a href="https://feyalegria.org" target="_blank" rel="noreferrer">Fe y Alegría</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Brújula Futura · PUCE G8</span>
          <span>Hecho para estudiantes de Fe y Alegría</span>
        </div>
      </div>
    </footer>
  )
}
