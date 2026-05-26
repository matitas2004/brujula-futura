/**
 * Brújula Futura — Página de Registro
 * Validación onBlur profesional, medidor de fuerza de contraseña, iconos Lucide.
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, UserRound, AlertCircle, ArrowRight, Loader2, Check, X as XIcon } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedPage from '../components/AnimatedPage';
import { useAuth } from '../context/AuthContext';
import { registrarse } from '../services/api';

/* ── Utilidades de validación ────────────────────────────── */
const PASSWORD_RULES = [
  { id: 'length', label: 'Al menos 8 caracteres', test: (v) => v.length >= 8 },
  { id: 'number', label: 'Contiene un número', test: (v) => /\d/.test(v) },
  { id: 'upper', label: 'Contiene una mayúscula', test: (v) => /[A-Z]/.test(v) },
];

const getPasswordStrength = (value) => {
  if (!value) return { level: 0, label: '', color: '' };
  const passed = PASSWORD_RULES.filter(r => r.test(value)).length;
  if (passed <= 1) return { level: 1, label: 'Débil', color: 'var(--rose)' };
  if (passed === 2) return { level: 2, label: 'Media', color: 'var(--amber)' };
  return { level: 3, label: 'Fuerte', color: 'var(--emerald)' };
};

const validateField = (name, value, form) => {
  switch (name) {
    case 'nombres':
      if (!value.trim()) return 'Este campo es obligatorio.';
      if (value.trim().length < 2) return 'El nombre debe tener al menos 2 caracteres.';
      return '';
    case 'apellidos':
      if (!value.trim()) return 'Este campo es obligatorio.';
      if (value.trim().length < 2) return 'Los apellidos deben tener al menos 2 caracteres.';
      return '';
    case 'correo':
      if (!value) return 'Este campo es obligatorio.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Por favor, introduce un correo electrónico válido.';
      return '';
    case 'clave':
      if (!value) return 'Este campo es obligatorio.';
      if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
      return '';
    case 'confirmarClave':
      if (!value) return 'Este campo es obligatorio.';
      if (value !== form.clave) return 'Las contraseñas no coinciden.';
      return '';
    default:
      return '';
  }
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    nombres: '',
    apellidos: '',
    correo: '',
    clave: '',
    confirmarClave: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(form.clave);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value, { ...form, [name]: value }) }));
    }
    // Si cambia la contraseña, revalidar confirmación
    if (name === 'clave' && touched.confirmarClave) {
      setErrors(prev => ({ ...prev, confirmarClave: validateField('confirmarClave', form.confirmarClave, { ...form, clave: value }) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value, form) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = ['nombres', 'apellidos', 'correo', 'clave', 'confirmarClave'];
    const newErrors = {};
    const newTouched = {};
    fields.forEach(key => {
      newErrors[key] = validateField(key, form[key], form);
      newTouched[key] = true;
    });
    setErrors(newErrors);
    setTouched(newTouched);

    if (Object.values(newErrors).some(e => e)) {
      toast.error('Por favor, corrige los errores antes de continuar.');
      return;
    }

    setLoading(true);
    try {
      const res = await registrarse({
        nombres: form.nombres,
        apellidos: form.apellidos,
        correo: form.correo,
        clave: form.clave,
      });
      login(res.access_token, res.usuario);
      toast.success('¡Cuenta creada con éxito! Redirigiendo al test...');
      navigate('/test', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Ocurrió un error al registrarse. Inténtalo de nuevo.');
    }
    setLoading(false);
  };

  const renderField = (name, label, type, placeholder, icon, autoComplete) => (
    <div className={`auth-field ${touched[name] && errors[name] ? 'field-error' : touched[name] && !errors[name] ? 'field-valid' : ''}`}>
      <label htmlFor={`reg-${name}`}>
        {icon} {label}
      </label>
      <input
        id={`reg-${name}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={form[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete={autoComplete}
        aria-invalid={touched[name] && !!errors[name]}
      />
      {touched[name] && errors[name] && (
        <motion.span className="field-error-msg" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
          <AlertCircle size={13} /> {errors[name]}
        </motion.span>
      )}
    </div>
  );

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
                initial={{ rotate: 20, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <Sparkles size={32} className="auth-lucide-icon" />
              </motion.div>
              <h1>Crea tu cuenta</h1>
              <p>Regístrate para descubrir tu vocación ideal</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="auth-form" id="register-form" noValidate>
              <div className="auth-row">
                {renderField('nombres', 'Nombres', 'text', 'Juan Carlos', <UserRound size={14} className="field-icon" />, 'given-name')}
                {renderField('apellidos', 'Apellidos', 'text', 'Pérez López', <UserRound size={14} className="field-icon" />, 'family-name')}
              </div>

              {renderField('correo', 'Correo electrónico', 'email', 'tu@correo.com', <Mail size={14} className="field-icon" />, 'email')}

              <div className="auth-row">
                {renderField('clave', 'Contraseña', 'password', 'Mínimo 8 caracteres', <Lock size={14} className="field-icon" />, 'new-password')}
                {renderField('confirmarClave', 'Confirmar', 'password', 'Repetir contraseña', <Lock size={14} className="field-icon" />, 'new-password')}
              </div>

              {/* Password strength meter */}
              {form.clave && (
                <motion.div
                  className="password-strength"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="strength-bar-track">
                    <motion.div
                      className="strength-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${(strength.level / 3) * 100}%` }}
                      style={{ backgroundColor: strength.color }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="strength-label" style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                  <div className="strength-rules">
                    {PASSWORD_RULES.map(rule => (
                      <span key={rule.id} className={`rule ${rule.test(form.clave) ? 'rule-pass' : 'rule-fail'}`}>
                        {rule.test(form.clave) ? <Check size={12} /> : <XIcon size={12} />}
                        {rule.label}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.button
                type="submit"
                className="auth-submit"
                id="btn-registro"
                disabled={loading}
                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(124,58,237,0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <span className="auth-spinner"><Loader2 size={18} className="spin-icon" /> Registrando...</span>
                ) : (
                  <><ArrowRight size={18} /> Crear Cuenta</>
                )}
              </motion.button>
            </form>

            {/* Footer */}
            <div className="auth-footer">
              <p>
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="auth-link">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </AnimatedPage>
  );
}
