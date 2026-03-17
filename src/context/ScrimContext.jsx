import React, { createContext, useState, useCallback, useEffect } from 'react'

// Mock data for offline testing
const MOCK_SCRIMS = [
  {
    id: 'scrim-ff-br-1',
    title: 'Free Fire - Battle Royale Scrim',
    game: 'Free Fire',
    mode: 'Battle Royale',
    icon: '🔥',
    pricePerTeam: '₹500',
    maxTeams: 8,
    registeredTeams: 5,
    duration: '30 mins',
    prizePool: 4000,
    difficulty: 'Intermediate',
    nextStart: '45 mins',
    description: 'Competitive BR scrim with cash prizes',
    whatsappLink: 'https://chat.whatsapp.com/ExampleGroupLink1',
    registeredPlayers: ['player1@example.com', 'player2@example.com']
  },
  {
    id: 'scrim-bgmi-sq-1',
    title: 'BGMI - Squad Ranked Scrim',
    game: 'BGMI',
    mode: 'Squad Ranked',
    icon: '🎮',
    pricePerTeam: '₹800',
    maxTeams: 10,
    registeredTeams: 7,
    duration: '45 mins',
    prizePool: 8000,
    difficulty: 'Hard',
    nextStart: '2h 30m',
    description: 'High-level squad scrim for serious players',
    whatsappLink: 'https://chat.whatsapp.com/ExampleGroupLink2',
    registeredPlayers: ['player4@example.com', 'player5@example.com']
  },
  {
    id: 'scrim-ff-lw-1',
    title: 'Free Fire - Solo Ranked',
    game: 'Free Fire',
    mode: 'Solo Ranked',
    icon: '🔥',
    pricePerTeam: '₹300',
    maxTeams: 20,
    registeredTeams: 14,
    duration: '20 mins',
    prizePool: 6000,
    difficulty: 'All Levels',
    nextStart: '20 mins',
    description: 'Solo ranked scrim - prove yourself',
    whatsappLink: 'https://chat.whatsapp.com/ExampleGroupLink3',
    registeredPlayers: ['player6@example.com', 'player7@example.com']
  },
  {
    id: 'scrim-bgmi-duo-1',
    title: 'BGMI - Duo Elimination',
    game: 'BGMI',
    mode: 'Duo',
    icon: '🎮',
    pricePerTeam: '₹600',
    maxTeams: 12,
    registeredTeams: 9,
    duration: '35 mins',
    prizePool: 7200,
    difficulty: 'Intermediate',
    nextStart: '1h 30m',
    description: 'Fast-paced duo combat scrim',
    whatsappLink: 'https://chat.whatsapp.com/ExampleGroupLink4',
    registeredPlayers: ['player9@example.com']
  },
  {
    id: 'scrim-csgo-1',
    title: 'CS:GO - Competitive Match',
    game: 'CS:GO',
    mode: 'Competitive',
    icon: '🔫',
    pricePerTeam: '₹1200',
    maxTeams: 2,
    registeredTeams: 1,
    duration: '45 mins',
    prizePool: 2400,
    difficulty: 'Expert',
    nextStart: '3h',
    description: 'Professional-level CS:GO scrim',
    whatsappLink: 'https://chat.whatsapp.com/ExampleGroupLink5',
    registeredPlayers: ['player11@example.com']
  }
]

export const ScrimContext = createContext()

export function ScrimProvider({ children }) {
  const [scrims, setScrims] = useState(MOCK_SCRIMS)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '')

  // Fetch all scrims from backend (with fallback to mock data)
  const fetchScrims = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)

      const response = await fetch('/api/scrims', { signal: controller.signal })
      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        setScrims(data)
      } else {
        throw new Error('Backend unavailable')
      }
    } catch (err) {
      console.warn('Using mock data. Backend status:', err.message)
      setScrims(MOCK_SCRIMS)
    } finally {
      setLoading(false)
    }
  }, [])

  // Join a scrim - works with both backend and mock data
  const joinScrim = useCallback(async (scrimId, playerDetails) => {
    try {
      // Update local state immediately
      setScrims(prevScrims =>
        prevScrims.map(scrim => {
          if (scrim.id === scrimId) {
            const alreadyJoined = scrim.registeredPlayers.includes(playerDetails.playerEmail)
            if (alreadyJoined) {
              throw new Error('Already registered for this scrim')
            }
            if (scrim.registeredTeams >= scrim.maxTeams) {
              throw new Error('Scrim is full')
            }
            return {
              ...scrim,
              registeredTeams: scrim.registeredTeams + 1,
              registeredPlayers: [...scrim.registeredPlayers, playerDetails.playerEmail]
            }
          }
          return scrim
        })
      )

      // Save user email
      localStorage.setItem('userEmail', playerDetails.playerEmail)
      setUserEmail(playerDetails.playerEmail)

      return {
        success: true,
        message: 'Successfully joined scrim! 🎉'
      }
    } catch (err) {
      console.error('Error joining scrim:', err)
      throw new Error(err.message)
    }
  }, [])

  // Leave a scrim
  const leaveScrim = useCallback(async (scrimId, playerEmail) => {
    try {
      setScrims(prevScrims =>
        prevScrims.map(scrim => {
          if (scrim.id === scrimId) {
            return {
              ...scrim,
              registeredTeams: Math.max(0, scrim.registeredTeams - 1),
              registeredPlayers: scrim.registeredPlayers.filter(p => p !== playerEmail)
            }
          }
          return scrim
        })
      )

      return { success: true, message: 'Left scrim successfully' }
    } catch (err) {
      console.error('Error leaving scrim:', err)
      throw err
    }
  }, [])

  // Check if player is already joined
  const isPlayerJoined = useCallback((scrimId) => {
    if (!userEmail) return false
    const scrim = scrims.find(s => s.id === scrimId)
    return scrim ? scrim.registeredPlayers.includes(userEmail) : false
  }, [scrims, userEmail])

  // Get available spots for a scrim
  const getAvailableSpots = useCallback((scrim) => {
    return scrim.maxTeams - scrim.registeredTeams
  }, [])

  // Initial fetch on mount
  useEffect(() => {
    fetchScrims()
  }, [fetchScrims])

  const value = {
    scrims,
    loading,
    error,
    userEmail,
    setUserEmail,
    joinScrim,
    leaveScrim,
    fetchScrims,
    isPlayerJoined,
    getAvailableSpots
  }

  return <ScrimContext.Provider value={value}>{children}</ScrimContext.Provider>
}

export function useScrims() {
  const context = React.useContext(ScrimContext)
  if (!context) {
    throw new Error('useScrims must be used within ScrimProvider')
  }
  return context
}
