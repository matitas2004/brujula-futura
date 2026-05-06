import { useState } from 'react'
import { QUIZ_QUESTIONS, INTERESTS } from '../data/db'

export default function TestSection({ selectedInterests, onToggleInterest, quizAnswers, onAnswer, onFinish }) {
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)

  const handleAnswer = (questionId, optionId) => {
    onAnswer(questionId, optionId)
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(prev => prev + 1)
    }
  }

  const allAnswered = quizAnswers.length === QUIZ_QUESTIONS.length

  return (
    <section className="section interests-bg" id="test">
      <div className="section-inner">
        {/* Paso 1: Intereses */}
        <div className="section-header">
          <div className="section-label">Paso 1</div>
          <h2 className="section-title">¿Qué te mueve por dentro?</h2>
          <p className="section-desc">
            Elige los temas que más te llaman la atención. No hay respuestas correctas, solo las tuyas.
          </p>
        </div>
        <div className="chips-grid">
          {INTERESTS.map(i => (
            <button
              key={i.id}
              id={`chip-${i.id}`}
              className={`chip${selectedInterests.includes(i.id) ? ' active' : ''}`}
              onClick={() => onToggleInterest(i.id)}
              aria-pressed={selectedInterests.includes(i.id)}
              style={selectedInterests.includes(i.id) ? { '--chip-color': i.color } : {}}
            >
              <span className="chip-icon">{i.icon}</span>
              {i.label}
            </button>
          ))}
        </div>
        {selectedInterests.length > 0 && (
          <p className="chip-hint">
            Seleccionaste <span>{selectedInterests.length}</span>{' '}
            {selectedInterests.length === 1 ? 'interés' : 'intereses'} — ¡genial!
          </p>
        )}

        {/* Transición al quiz */}
        {selectedInterests.length >= 2 && !showQuiz && (
          <div className="quiz-prompt">
            <button className="btn-primary quiz-start-btn" id="btn-iniciar-test" onClick={() => setShowQuiz(true)}>
              🎯 Hacer test rápido (5 preguntas)
            </button>
            <p className="quiz-prompt-hint">Solo toma 2 minutos y mejora tus resultados</p>
          </div>
        )}

        {/* Paso 2: Quiz Rápido */}
        {showQuiz && (
          <div className="quiz-section" id="quiz">
            <div className="section-header" style={{ marginTop: '64px' }}>
              <div className="section-label">Paso 2</div>
              <h2 className="section-title">Test rápido de aptitudes</h2>
              <p className="section-desc">
                Responde estas 5 preguntas para afinar tus resultados. Elige la que más te represente.
              </p>
            </div>

            {/* Progress bar */}
            <div className="quiz-progress">
              <div className="quiz-progress-bar" style={{ width: `${((currentQ + 1) / QUIZ_QUESTIONS.length) * 100}%` }} />
              <span className="quiz-progress-text">{currentQ + 1} / {QUIZ_QUESTIONS.length}</span>
            </div>

            {/* Question Card */}
            <div className="quiz-card" id={`quiz-q${currentQ + 1}`}>
              <h3 className="quiz-question">{QUIZ_QUESTIONS[currentQ].question}</h3>
              <div className="quiz-options">
                {QUIZ_QUESTIONS[currentQ].options.map(opt => {
                  const answered = quizAnswers.find(a => a.questionId === QUIZ_QUESTIONS[currentQ].id)
                  return (
                    <button
                      key={opt.id}
                      className={`quiz-option${answered?.optionId === opt.id ? ' selected' : ''}`}
                      onClick={() => handleAnswer(QUIZ_QUESTIONS[currentQ].id, opt.id)}
                      id={`quiz-opt-${QUIZ_QUESTIONS[currentQ].id}-${opt.id}`}
                    >
                      <span className="option-letter">{opt.id.toUpperCase()}</span>
                      <span className="option-text">{opt.text}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="quiz-nav">
              {currentQ > 0 && (
                <button className="btn-secondary quiz-nav-btn" onClick={() => setCurrentQ(prev => prev - 1)}>
                  ← Anterior
                </button>
              )}
              {currentQ < QUIZ_QUESTIONS.length - 1 && quizAnswers.find(a => a.questionId === QUIZ_QUESTIONS[currentQ].id) && (
                <button className="btn-secondary quiz-nav-btn" onClick={() => setCurrentQ(prev => prev + 1)}>
                  Siguiente →
                </button>
              )}
            </div>

            {/* Results CTA */}
            {allAnswered && (
              <div className="quiz-complete">
                <p className="quiz-complete-text">🎉 ¡Test completado! Veamos tus resultados.</p>
                <button className="btn-primary" id="btn-ver-resultados" onClick={onFinish}>
                  🚀 Ver mis resultados
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
