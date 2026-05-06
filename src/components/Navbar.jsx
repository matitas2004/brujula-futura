import { INTERESTS } from '../data/db'

export default function Navbar({ onNavigate }) {
  return (
    <nav className="navbar" id="navbar">
      <div className="nav-brand" onClick={() => onNavigate('inicio')}>
        <span className="compass">🧭</span>
        <span>Brújula Futura</span>
      </div>
      <div className="nav-links">
        <button className="nav-link" onClick={() => onNavigate('test')}>Test</button>
        <button className="nav-link" onClick={() => onNavigate('carreras')}>Carreras</button>
        <button className="nav-link" onClick={() => onNavigate('versus')}>Versus</button>
        <button className="nav-link" onClick={() => onNavigate('universidades')}>Universidades</button>
      </div>
      <button className="nav-cta" id="btn-comenzar" onClick={() => onNavigate('test')}>
        Comenzar
      </button>
    </nav>
  )
}
