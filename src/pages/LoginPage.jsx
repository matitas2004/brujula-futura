/**
 * Brújula Futura — Página de Login
 * Validación en tiempo real (onBlur), iconos Lucide, notificaciones con Sonner.
 */
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Mail, Lock, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedPage from '../components/AnimatedPage';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin } from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from || '/test';

  const [form, setForm] = useState({ correo: '', clave: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  // Validación por campo individual
  const validateField = (name, value) => {
    switch (name) {
      case 'correo':
        if (!value) return 'Este campo es obligatorio.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Por favor, introduce un correo electrónico válido.';
        return '';
      case 'clave':
        if (!value) return 'Este campo es obligatorio.';
        if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Si ya se tocó el campo, revalidar en tiempo real
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar todo al enviar
    const newErrors = {};
    Object.keys(form).forEach(key => {
      newErrors[key] = validateField(key, form[key]);
    });
    setErrors(newErrors);
    setTouched({ correo: true, clave: true });

    if (Object.values(newErrors).some(e => e)) return;

    setLoading(true);
    try {
      const res = await apiLogin(form);
      login(res.access_token, res.usuario);
      toast.success(`¡Bienvenido de vuelta, ${res.usuario?.nombres?.split(' ')[0] || 'estudiante'}!`);
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Credenciales incorrectas. Verifica tu correo y contraseña.');
    }
    setLoading(false);
  };

  return (
    <AnimatedPage>
      <section className="auth-page">
        <div className="auth-container">
          <div className="auth-glow auth-glow-1" />
          <div className="auth-glow auth-glow-2" />

          <motion.div
            className="auth-card"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', duration: 0.7, bounce: 0.3 }}
          >
            {/* Header */}
            <div className="auth-header">
              <motion.div
                className="auth-icon-wrapper"
                initial={{ rotate: -20, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <Compass size={32} className="auth-lucide-icon" />
              </motion.div>
              <h1>Bienvenido de vuelta</h1>
              <p>Inicia sesión para continuar tu orientación vocacional</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="auth-form" id="login-form" noValidate>
              <div className={`auth-field ${touched.correo && errors.correo ? 'field-error' : touched.correo && !errors.correo ? 'field-valid' : ''}`}>
                <label htmlFor="login-correo">
                  <Mail size={14} className="field-icon" /> Correo electrónico
                </label>
                <input
                  id="login-correo"
                  type="email"
                  name="correo"
                  placeholder="tu@correo.com"
                  value={form.correo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                  aria-invalid={touched.correo && !!errors.correo}
                />
                {touched.correo && errors.correo && (
                  <motion.span className="field-error-msg" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                    <AlertCircle size={13} /> {errors.correo}
                  </motion.span>
                )}
              </div>

              <div className={`auth-field ${touched.clave && errors.clave ? 'field-error' : touched.clave && !errors.clave ? 'field-valid' : ''}`}>
                <label htmlFor="login-clave">
                  <Lock size={14} className="field-icon" /> Contraseña
                </label>
                <input
                  id="login-clave"
                  type="password"
                  name="clave"
                  placeholder="••••••••"
                  value={form.clave}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="current-password"
                  aria-invalid={touched.clave && !!errors.clave}
                />
                {touched.clave && errors.clave && (
                  <motion.span className="field-error-msg" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                    <AlertCircle size={13} /> {errors.clave}
                  </motion.span>
                )}
              </div>

              <motion.button
                type="submit"
                className="auth-submit"
                id="btn-login"
                disabled={loading}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <span className="auth-spinner"><Loader2 size={18} className="spin-icon" /> Ingresando...</span>
                ) : (
                  <><ArrowRight size={18} /> Iniciar Sesión</>
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <div className="auth-footer">
              <p>
                ¿No tienes cuenta?{' '}
                <Link to="/registro" className="auth-link">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </AnimatedPage>
  );
}
