import { useState } from 'react'
import './App.css'
import { ScrimProvider } from './context/ScrimContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Tournaments from './components/Tournaments'
import PaidScrims from './components/PaidScrims'
import Teams from './components/Teams'
import Schedule from './components/Schedule'
import Footer from './components/Footer'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <ScrimProvider>
      <div className={darkMode ? 'dark' : 'light'}>
        <div className={`min-h-screen transition-colors duration-300 ${
          darkMode 
            ? 'bg-slate-950 text-white' 
            : 'bg-white text-slate-900'
        }`}>
          <Header isDarkMode={darkMode} onThemeToggle={toggleTheme} />
          <Hero isDarkMode={darkMode} />
          <Tournaments isDarkMode={darkMode} />
          <PaidScrims isDarkMode={darkMode} />
          <Teams isDarkMode={darkMode} />
          <Schedule isDarkMode={darkMode} />
          <Footer isDarkMode={darkMode} />
        </div>
      </div>
    </ScrimProvider>
  )
}

export default App
