import { useState, useCallback } from 'react'
import { calculateAffinity } from './data/db'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TestSection from './components/TestSection'
import CareerExplorer from './components/CareerExplorer'
import Versus from './components/Versus'
import Results from './components/Results'
import UniversitySection from './components/UniversitySection'
import Footer from './components/Footer'
import './App.css'
import './components/components.css'

export default function App() {
  const [selectedInterests, setSelectedInterests] = useState([])
  const [quizAnswers, setQuizAnswers] = useState([])
  const [results, setResults] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const toggleInterest = useCallback((id) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }, [])

  const handleAnswer = useCallback((questionId, optionId) => {
    setQuizAnswers(prev => {
      const existing = prev.findIndex(a => a.questionId === questionId)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = { questionId, optionId }
        return updated
      }
      return [...prev, { questionId, optionId }]
    })
  }, [])

  const handleFinishTest = useCallback(() => {
    const computed = calculateAffinity(selectedInterests, quizAnswers)
    setResults(computed)
    setShowResults(true)
    setTimeout(() => {
      document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [selectedInterests, quizAnswers])

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className="bf-app">
      <Navbar onNavigate={scrollTo} />
      <Hero onNavigate={scrollTo} />
      <TestSection
        selectedInterests={selectedInterests}
        onToggleInterest={toggleInterest}
        quizAnswers={quizAnswers}
        onAnswer={handleAnswer}
        onFinish={handleFinishTest}
      />
      <CareerExplorer />
      <Versus />
      {showResults && (
        <Results results={results} selectedInterests={selectedInterests} />
      )}
      <UniversitySection />
      <Footer />
    </div>
  )
}
