/**
 * ═══════════════════════════════════════════════════════════════════
 * BRÚJULA FUTURA — Base de Datos Simulada (Mock DB)
 * ═══════════════════════════════════════════════════════════════════
 * 
 * Este archivo centraliza TODA la data de la aplicación.
 * En un futuro, estas funciones pueden reemplazarse por llamadas
 * a una API real (Firebase, Supabase, etc.) sin cambiar los componentes.
 * 
 * Estructura:
 *   - INTERESTS:     Áreas de interés para el selector
 *   - QUIZ_QUESTIONS: Preguntas del test rápido de aptitudes
 *   - CAREERS:       Carreras tradicionales con info detallada
 *   - EMERGING:      Carreras emergentes/nuevas
 *   - UNIVERSITIES:  Universidades ecuatorianas con costos reales
 *   - CAREER_VERSUS: Data para comparaciones lado a lado
 */

// ─── Áreas de Interés ────────────────────────────────────────────
export const INTERESTS = [
  { id: 'tech',    icon: '💻', label: 'Tecnología',     color: '#7c3aed' },
  { id: 'art',     icon: '🎨', label: 'Creatividad',    color: '#f43f5e' },
  { id: 'math',    icon: '📐', label: 'Números',        color: '#06b6d4' },
  { id: 'lead',    icon: '🧭', label: 'Liderazgo',      color: '#f59e0b' },
  { id: 'social',  icon: '🤝', label: 'Ayuda Social',   color: '#10b981' },
  { id: 'org',     icon: '📋', label: 'Organización',   color: '#0ea5e9' },
  { id: 'science', icon: '🔬', label: 'Investigación',  color: '#8b5cf6' },
  { id: 'comm',    icon: '💬', label: 'Comunicación',   color: '#ec4899' },
  { id: 'nature',  icon: '🌱', label: 'Naturaleza',     color: '#22c55e' },
]

// ─── Preguntas del Test Rápido ───────────────────────────────────
export const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    question: '¿Qué prefieres hacer un sábado libre?',
    options: [
      { id: 'a', text: 'Programar o armar algo digital', tags: ['tech', 'math'] },
      { id: 'b', text: 'Dibujar, pintar o diseñar', tags: ['art', 'comm'] },
      { id: 'c', text: 'Ayudar a alguien o hacer voluntariado', tags: ['social', 'lead'] },
      { id: 'd', text: 'Leer sobre ciencia o investigar un tema', tags: ['science', 'nature'] },
    ],
  },
  {
    id: 'q2',
    question: '¿Qué tipo de proyecto escolar disfrutas más?',
    options: [
      { id: 'a', text: 'Crear una app o página web', tags: ['tech', 'art'] },
      { id: 'b', text: 'Hacer un experimento científico', tags: ['science', 'math'] },
      { id: 'c', text: 'Organizar un evento o campaña', tags: ['lead', 'org'] },
      { id: 'd', text: 'Escribir un ensayo o hacer una presentación', tags: ['comm', 'social'] },
    ],
  },
  {
    id: 'q3',
    question: '¿Qué te importa más en un trabajo futuro?',
    options: [
      { id: 'a', text: 'Ganar bien y tener estabilidad', tags: ['tech', 'math', 'org'] },
      { id: 'b', text: 'Hacer algo creativo e innovador', tags: ['art', 'comm'] },
      { id: 'c', text: 'Ayudar a la comunidad o al planeta', tags: ['social', 'nature'] },
      { id: 'd', text: 'Liderar equipos y tomar decisiones', tags: ['lead', 'org'] },
    ],
  },
  {
    id: 'q4',
    question: '¿Cuál de estas herramientas usarías con más ganas?',
    options: [
      { id: 'a', text: 'Un computador con código y software', tags: ['tech'] },
      { id: 'b', text: 'Una cámara o tablet para diseñar', tags: ['art'] },
      { id: 'c', text: 'Un microscopio o equipo de laboratorio', tags: ['science', 'nature'] },
      { id: 'd', text: 'Un micrófono para comunicar ideas', tags: ['comm', 'lead'] },
    ],
  },
  {
    id: 'q5',
    question: '¿Qué frase te identifica más?',
    options: [
      { id: 'a', text: '"Me gusta resolver problemas complejos"', tags: ['tech', 'math', 'science'] },
      { id: 'b', text: '"Me gusta que las cosas se vean bien"', tags: ['art', 'comm'] },
      { id: 'c', text: '"Me gusta organizar y que todo funcione"', tags: ['org', 'lead'] },
      { id: 'd', text: '"Me importa el bienestar de los demás"', tags: ['social', 'nature'] },
    ],
  },
]

// ─── Carreras Tradicionales ──────────────────────────────────────
export const CAREERS = [
  {
    id: 'sw',
    icon: '🖥️',
    name: 'Ingeniería de Software',
    field: 'Tecnología',
    desc: 'Diseñas y construyes el software que mueve al mundo: apps, plataformas y sistemas.',
    whatYouDo: 'Programar apps, resolver problemas y construir sistemas digitales.',
    pros: ['Alta demanda laboral mundial', 'Trabajo remoto posible', 'Salarios competitivos', 'Creatividad constante'],
    cons: ['Curva de aprendizaje intensa', 'Tecnologías cambian rápido', 'Puede ser sedentario', 'Estrés por deadlines'],
    demand: 'alta',
    demandLabel: '🔥 En auge',
    avgSalary: '$1,200 - $3,500/mes',
    duration: '4-5 años',
    tags: ['tech', 'math'],
    future: 'La IA no reemplaza a los ingenieros de software, los potencia. Se espera que la demanda crezca un 25% en los próximos 10 años.',
  },
  {
    id: 'psych',
    icon: '🧠',
    name: 'Psicología',
    field: 'Ciencias Sociales',
    desc: 'Comprendes la mente humana y ayudas a personas a superar sus desafíos emocionales.',
    whatYouDo: 'Escuchar, evaluar, hacer terapia y apoyo emocional a personas y comunidades.',
    pros: ['Impacto humano profundo', 'Campo amplio de especialización', 'Alta demanda post-pandemia', 'Trabajo con propósito'],
    cons: ['Requiere mucha empatía', 'Desgaste emocional posible', 'Salarios bajos al inicio', 'Requiere maestría para especializarse'],
    demand: 'media',
    demandLabel: '📈 Creciendo',
    avgSalary: '$800 - $2,000/mes',
    duration: '5 años',
    tags: ['social', 'science', 'comm'],
    future: 'La salud mental es prioridad global. La telepsicología y la neuropsicología están abriendo nuevos campos.',
  },
  {
    id: 'design',
    icon: '✏️',
    name: 'Diseño Gráfico & UX',
    field: 'Creatividad & Tecnología',
    desc: 'Creas experiencias visuales que comunican, enamoran y conectan con las personas.',
    whatYouDo: 'Diseñar interfaces, identidades de marca y experiencias digitales.',
    pros: ['Trabajo creativo diario', 'Portafolio visible', 'Gran demanda en startups', 'Freelance posible'],
    cons: ['Mercado competitivo', 'Necesitas portafolio fuerte', 'Clientes difíciles', 'Puede ser subvalorado'],
    demand: 'alta',
    demandLabel: '🔥 En auge',
    avgSalary: '$900 - $2,800/mes',
    duration: '4 años',
    tags: ['art', 'tech', 'comm'],
    future: 'El UX Design está entre las 10 carreras más demandadas en tecnología. Las empresas invierten cada vez más en experiencia de usuario.',
  },
  {
    id: 'medicine',
    icon: '⚕️',
    name: 'Medicina',
    field: 'Ciencias de la Salud',
    desc: 'Diagnosticas, tratas y previenes enfermedades para mejorar la calidad de vida de las personas.',
    whatYouDo: 'Consultas, diagnósticos, cirugías, investigación médica y salud pública.',
    pros: ['Profesión muy respetada', 'Salarios altos a largo plazo', 'Impacto directo en vidas', 'Estabilidad laboral'],
    cons: ['Carrera muy larga (7+ años)', 'Alto costo de estudios', 'Horarios agotadores', 'Estrés y presión constante'],
    demand: 'alta',
    demandLabel: '🔥 Siempre necesaria',
    avgSalary: '$1,500 - $5,000/mes',
    duration: '6-7 años + especialidad',
    tags: ['science', 'social'],
    future: 'La telemedicina y la IA diagnóstica están transformando el campo. Los médicos con habilidades tecnológicas serán los más valorados.',
  },
  {
    id: 'law',
    icon: '⚖️',
    name: 'Derecho',
    field: 'Ciencias Sociales',
    desc: 'Defiendes derechos, resuelves conflictos y construyes el marco legal de la sociedad.',
    whatYouDo: 'Litigar, asesorar legalmente, redactar contratos y defender causas.',
    pros: ['Muchas especialidades', 'Se puede emprender', 'Siempre hay demanda', 'Prestigio social'],
    cons: ['Mercado saturado en Ecuador', 'Mucha memorización', 'Proceso largo para establecerse', 'Burocracia constante'],
    demand: 'media',
    demandLabel: '⚠️ Saturada pero necesaria',
    avgSalary: '$800 - $3,000/mes',
    duration: '5 años',
    tags: ['comm', 'lead', 'org'],
    future: 'El Derecho Digital, Protección de Datos y Compliance son las ramas con más futuro. Los abogados tradicionales enfrentan saturación.',
  },
  {
    id: 'business',
    icon: '📊',
    name: 'Administración de Empresas',
    field: 'Negocios',
    desc: 'Gestionas organizaciones, tomas decisiones estratégicas y lideras equipos hacia el éxito.',
    whatYouDo: 'Planificar, organizar recursos, liderar equipos y tomar decisiones de negocio.',
    pros: ['Muy versátil', 'Base para emprender', 'Aplicable en cualquier industria', 'Desarrollo de liderazgo'],
    cons: ['Muy general sin especialización', 'Competencia alta', 'Necesitas experiencia real', 'MBA puede ser necesario'],
    demand: 'media',
    demandLabel: '📈 Estable',
    avgSalary: '$900 - $2,500/mes',
    duration: '4-5 años',
    tags: ['lead', 'org', 'math'],
    future: 'Las empresas buscan administradores con conocimientos en data analytics y transformación digital. El MBA sigue siendo valorado.',
  },
]

// ─── Carreras Emergentes ─────────────────────────────────────────
export const EMERGING = [
  {
    id: 'cyber',
    icon: '🛡️',
    name: 'Ciberseguridad',
    tag: 'demand',
    tagLabel: 'Alta Demanda',
    why: '¿Por qué te interesaría?',
    desc: 'Proteges empresas y personas de ataques digitales. Cada año hay más hackeos y menos expertos.',
    glow: '#7c3aed',
    salary: '$1,500 - $4,000/mes',
    risk: 'bajo',
    tags: ['tech', 'math'],
  },
  {
    id: 'data',
    icon: '📊',
    name: 'Ciencia de Datos',
    tag: 'demand',
    tagLabel: 'Alta Demanda',
    why: '¿Por qué te interesaría?',
    desc: 'Conviertes enormes cantidades de datos en decisiones inteligentes. El petróleo del siglo XXI.',
    glow: '#06b6d4',
    salary: '$1,300 - $3,800/mes',
    risk: 'bajo',
    tags: ['tech', 'math', 'science'],
  },
  {
    id: 'ux',
    icon: '🎯',
    name: 'UX / Product Design',
    tag: 'growing',
    tagLabel: 'En Crecimiento',
    why: '¿Por qué te interesaría?',
    desc: 'Diseñas cómo las personas interactúan con apps y productos. Combina psicología y diseño.',
    glow: '#f43f5e',
    salary: '$1,000 - $3,200/mes',
    risk: 'bajo',
    tags: ['art', 'tech', 'comm'],
  },
  {
    id: 'mkt',
    icon: '📱',
    name: 'Marketing Digital',
    tag: 'new',
    tagLabel: 'Nueva Era',
    why: '¿Por qué te interesaría?',
    desc: 'Estrategias en redes, SEO, publicidad pagada y contenido. Mueves marcas en el mundo digital.',
    glow: '#f59e0b',
    salary: '$800 - $2,500/mes',
    risk: 'medio',
    tags: ['comm', 'art', 'lead'],
  },
  {
    id: 'auto',
    icon: '🤖',
    name: 'Automatización & IA',
    tag: 'future',
    tagLabel: 'Futuro',
    why: '¿Por qué te interesaría?',
    desc: 'Programas robots y sistemas que aprenden. La carrera que definirá los próximos 30 años.',
    glow: '#10b981',
    salary: '$1,800 - $5,000/mes',
    risk: 'bajo',
    tags: ['tech', 'math', 'science'],
  },
  {
    id: 'log',
    icon: '🚚',
    name: 'Logística & Supply Chain',
    tag: 'growing',
    tagLabel: 'En Crecimiento',
    why: '¿Por qué te interesaría?',
    desc: 'Gestionas el flujo de productos globalmente. E-commerce disparó su demanda al máximo.',
    glow: '#0ea5e9',
    salary: '$900 - $2,200/mes',
    risk: 'medio',
    tags: ['org', 'math', 'lead'],
  },
]

// ─── Universidades Ecuatorianas ──────────────────────────────────
export const UNIVERSITIES = [
  {
    id: 'u1',
    name: 'PUCE',
    fullName: 'Pontificia Universidad Católica del Ecuador',
    career: 'Ingeniería de Sistemas',
    cost: '$1,800 / semestre',
    costLevel: 'alto',
    mode: 'Presencial',
    scholarship: 'Becas por mérito disponibles',
    location: 'Quito',
    proximity: 'near',
    proxLabel: 'Cerca de ti',
    website: 'https://www.puce.edu.ec',
    highlight: 'Mejor universidad privada del Ecuador según QS Rankings',
  },
  {
    id: 'u2',
    name: 'ESPOL',
    fullName: 'Escuela Superior Politécnica del Litoral',
    career: 'Ingeniería en Computación',
    cost: '$700 / semestre',
    costLevel: 'medio',
    mode: 'Presencial',
    scholarship: 'SENESCYT cubre hasta 60%',
    location: 'Guayaquil',
    proximity: 'far',
    proxLabel: 'Requiere traslado',
    website: 'https://www.espol.edu.ec',
    highlight: 'Top 3 en ingeniería en Ecuador, referente en tecnología',
  },
  {
    id: 'u3',
    name: 'UTE',
    fullName: 'Universidad Tecnológica Equinoccial',
    career: 'Diseño Gráfico y Digital',
    cost: '$1,200 / semestre',
    costLevel: 'medio',
    mode: 'Híbrida',
    scholarship: 'Convenio Fe y Alegría',
    location: 'Quito',
    proximity: 'near',
    proxLabel: 'Cerca de ti',
    website: 'https://www.ute.edu.ec',
    highlight: 'Fuerte enfoque práctico y convenios empresariales',
  },
  {
    id: 'u4',
    name: 'UIDE',
    fullName: 'Universidad Internacional del Ecuador',
    career: 'Marketing Digital',
    cost: '$1,500 / semestre',
    costLevel: 'alto',
    mode: 'Semipresencial',
    scholarship: 'Beca excelencia 25%',
    location: 'Quito',
    proximity: 'near',
    proxLabel: 'Cerca de ti',
    website: 'https://www.uide.edu.ec',
    highlight: 'Convenios internacionales y doble titulación',
  },
  {
    id: 'u5',
    name: 'EPN',
    fullName: 'Escuela Politécnica Nacional',
    career: 'Ingeniería en Ciencias de la Computación',
    cost: '$500 / semestre',
    costLevel: 'bajo',
    mode: 'Presencial',
    scholarship: 'Gratuidad estatal + becas internas',
    location: 'Quito',
    proximity: 'near',
    proxLabel: 'Cerca de ti',
    website: 'https://www.epn.edu.ec',
    highlight: 'Universidad pública #1 en ingeniería del Ecuador',
  },
  {
    id: 'u6',
    name: 'UDLA',
    fullName: 'Universidad de Las Américas',
    career: 'Psicología Clínica',
    cost: '$2,100 / semestre',
    costLevel: 'alto',
    mode: 'Presencial',
    scholarship: 'Beca académica hasta 40%',
    location: 'Quito',
    proximity: 'near',
    proxLabel: 'Cerca de ti',
    website: 'https://www.udla.edu.ec',
    highlight: 'Infraestructura moderna y laboratorios equipados',
  },
]

// ─── Data para Versus (Comparación de Carreras) ──────────────────
export const CAREER_VERSUS = [
  {
    id: 'vs1',
    careerA: 'Ingeniería de Software',
    careerB: 'Ciencia de Datos',
    criteria: [
      { label: 'Salario promedio', a: '$1,200 - $3,500', b: '$1,300 - $3,800', winner: 'b' },
      { label: 'Demanda laboral', a: 'Muy alta', b: 'Muy alta', winner: 'tie' },
      { label: 'Dificultad', a: 'Alta', b: 'Muy alta', winner: 'a' },
      { label: 'Trabajo remoto', a: 'Muy posible', b: 'Posible', winner: 'a' },
      { label: 'Tiempo de estudio', a: '4-5 años', b: '4-5 años + especialización', winner: 'a' },
      { label: 'Riesgo de automatización', a: 'Bajo', b: 'Muy bajo', winner: 'b' },
    ],
  },
  {
    id: 'vs2',
    careerA: 'Psicología',
    careerB: 'Medicina',
    criteria: [
      { label: 'Salario promedio', a: '$800 - $2,000', b: '$1,500 - $5,000', winner: 'b' },
      { label: 'Duración de carrera', a: '5 años', b: '6-7 años + residencia', winner: 'a' },
      { label: 'Costo de estudios', a: 'Moderado', b: 'Alto', winner: 'a' },
      { label: 'Impacto social', a: 'Alto', b: 'Muy alto', winner: 'b' },
      { label: 'Balance vida-trabajo', a: 'Bueno', b: 'Difícil al inicio', winner: 'a' },
      { label: 'Opciones de emprender', a: 'Consultorio propio', b: 'Clínica privada', winner: 'tie' },
    ],
  },
  {
    id: 'vs3',
    careerA: 'Diseño Gráfico & UX',
    careerB: 'Marketing Digital',
    criteria: [
      { label: 'Salario promedio', a: '$900 - $2,800', b: '$800 - $2,500', winner: 'a' },
      { label: 'Creatividad requerida', a: 'Muy alta', b: 'Alta', winner: 'a' },
      { label: 'Freelance posible', a: 'Muy posible', b: 'Muy posible', winner: 'tie' },
      { label: 'Conocimientos técnicos', a: 'Figma, Adobe, código', b: 'Ads, SEO, analytics', winner: 'tie' },
      { label: 'Demanda en Ecuador', a: 'Alta', b: 'Muy alta', winner: 'b' },
      { label: 'Necesitas portafolio', a: 'Imprescindible', b: 'Ayuda mucho', winner: 'b' },
    ],
  },
]

// ─── Función helper para calcular afinidad ───────────────────────
/**
 * Calcula qué carreras son más afines según las respuestas del usuario.
 * @param {string[]} selectedInterests - IDs de intereses seleccionados
 * @param {Object[]} quizAnswers - Respuestas del quiz [{questionId, optionId}]
 * @returns {Object[]} Carreras ordenadas por afinidad con porcentaje
 */
export function calculateAffinity(selectedInterests, quizAnswers = []) {
  const allCareers = [...CAREERS, ...EMERGING]
  const tagCounts = {}

  // Contar tags de intereses seleccionados
  selectedInterests.forEach(interest => {
    tagCounts[interest] = (tagCounts[interest] || 0) + 2
  })

  // Contar tags de respuestas del quiz
  quizAnswers.forEach(answer => {
    const question = QUIZ_QUESTIONS.find(q => q.id === answer.questionId)
    if (question) {
      const option = question.options.find(o => o.id === answer.optionId)
      if (option) {
        option.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1
        })
      }
    }
  })

  // Calcular afinidad para cada carrera
  const results = allCareers.map(career => {
    const matchingTags = career.tags.filter(tag => tagCounts[tag])
    const totalWeight = matchingTags.reduce((sum, tag) => sum + (tagCounts[tag] || 0), 0)
    const maxPossible = career.tags.length * 3 // máximo posible por carrera
    const pct = Math.min(Math.round((totalWeight / maxPossible) * 100), 98)

    return {
      ...career,
      pct,
      matchingTags,
      label: pct >= 80 ? 'top' : pct >= 60 ? 'possible' : 'explore',
      labelText: pct >= 80 ? 'Muy Afín' : pct >= 60 ? 'Posible Opción' : 'Explorar Más',
    }
  })

  return results
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 5)
}
