import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster
          position="top-right"
          richColors
          toastOptions={{
            style: {
              background: 'rgba(20, 22, 38, 0.95)',
              border: '1px solid rgba(124, 58, 237, 0.25)',
              color: '#eeeeff',
              backdropFilter: 'blur(12px)',
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
