import { useState } from 'react'
import { useScrims } from '../context/ScrimContext'

export default function JoinScrimModal({ scrim, isDarkMode, onClose }) {
  const { joinScrim, isPlayerJoined, leaveScrim, userEmail } = useScrims()
  const [formData, setFormData] = useState({
    playerName: '',
    playerEmail: userEmail || '',
    playerPhone: '',
    team: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.playerName.trim()) throw new Error('Please enter your name')
    if (!formData.playerEmail.trim()) throw new Error('Please enter your email')
    if (!formData.playerPhone.trim()) throw new Error('Please enter your WhatsApp number')
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.playerEmail)) throw new Error('Invalid email address')
    
    if (formData.playerPhone.length < 10) throw new Error('Invalid phone number')
  }

  const handleJoinScrim = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccessMessage('')

    try {
      validateForm()
      
      const result = await joinScrim(scrim.id, formData)
      setSuccessMessage(`✅ ${result.message}`)
      
      setTimeout(() => {
        if (scrim.whatsappLink) {
          window.open(scrim.whatsappLink, '_blank')
        }
        setTimeout(onClose, 1500)
      }, 1500)
    } catch (err) {
      setError(err.message || 'Failed to join scrim')
    } finally {
      setLoading(false)
    }
  }

  const handleLeaveScrim = async () => {
    if (!window.confirm('Are you sure you want to leave this scrim?')) return

    setLoading(true)
    try {
      await leaveScrim(scrim.id, userEmail)
      setSuccessMessage('✅ Left scrim successfully')
      setTimeout(onClose, 1500)
    } catch (err) {
      setError(err.message || 'Failed to leave scrim')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenWhatsApp = () => {
    if (scrim.whatsappLink) {
      window.open(scrim.whatsappLink, '_blank')
    }
  }

  const alreadyJoined = isPlayerJoined(scrim.id)
  const spotsAvailable = scrim.maxTeams - scrim.registeredTeams
  const fillPercentage = (scrim.registeredTeams / scrim.maxTeams) * 100

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className={`rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 transform ${
        isDarkMode 
          ? 'bg-slate-900 border border-red-600/30 shadow-2xl shadow-red-900/30' 
          : 'bg-white border border-red-600/20 shadow-2xl shadow-red-200/30'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 p-6 border-b flex justify-between items-start ${
          isDarkMode ? 'border-red-600/20 bg-slate-800/80' : 'border-red-600/10 bg-gradient-to-r from-gray-50 to-red-50/50'
        }`}>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{scrim.icon}</span>
              <div>
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {scrim.title}
                </h2>
                <p className={`text-xs font-semibold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                  {scrim.mode}
                </p>
              </div>
            </div>
            <p className={`text-sm max-w-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {scrim.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg text-2xl transition-all ${isDarkMode ? 'hover:bg-red-600/20 text-gray-400 hover:text-red-400' : 'hover:bg-red-100 text-gray-600 hover:text-red-600'}`}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Scrim Details Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg border transition-all ${isDarkMode ? 'bg-slate-800/50 border-purple-600/20' : 'bg-purple-50 border-purple-200'}`}>
              <p className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                Price Per Team
              </p>
              <p className={`text-3xl font-bold mt-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                {scrim.pricePerTeam}
              </p>
            </div>

            <div className={`p-4 rounded-lg border transition-all ${isDarkMode ? 'bg-slate-800/50 border-yellow-600/20' : 'bg-yellow-50 border-yellow-200'}`}>
              <p className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                Prize Pool
              </p>
              <p className={`text-3xl font-bold mt-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                ₹{scrim.prizePool.toLocaleString()}
              </p>
            </div>

            <div className={`p-4 rounded-lg border transition-all ${isDarkMode ? 'bg-slate-800/50 border-blue-600/20' : 'bg-blue-50 border-blue-200'}`}>
              <p className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                Duration
              </p>
              <p className={`text-3xl font-bold mt-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {scrim.duration}
              </p>
            </div>

            <div className={`p-4 rounded-lg border transition-all ${isDarkMode ? 'bg-slate-800/50 border-purple-600/20' : 'bg-purple-50 border-purple-200'}`}>
              <p className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                Difficulty Level
              </p>
              <p className={`text-3xl font-bold mt-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {scrim.difficulty}
              </p>
            </div>
          </div>

          {/* Spots Available */}
          <div className={`p-4 rounded-lg transition-all ${isDarkMode ? 'border border-red-600/20 bg-red-600/5' : 'border border-red-200 bg-red-50'}`}>
            <div className="flex justify-between items-center mb-3">
              <p className={`font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                🎮 Teams Registered
              </p>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {scrim.registeredTeams}/{scrim.maxTeams}
              </p>
            </div>
            <div className={`h-3 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-gray-300'}`}>
              <div 
                className="h-full bg-gradient-to-r from-red-600 via-red-500 to-pink-500 transition-all duration-500"
                style={{ width: `${fillPercentage}%` }}
              ></div>
            </div>
            <p className={`text-sm mt-2 font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {spotsAvailable > 0 ? `✅ ${spotsAvailable} spots available` : '❌ Fully booked'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className={`p-4 rounded-lg border-l-4 ${isDarkMode ? 'bg-red-600/20 border-red-600 text-red-300' : 'bg-red-100 border-red-600 text-red-700'}`}>
              <p className="font-semibold">⚠️ {error}</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className={`p-4 rounded-lg border-l-4 animate-pulse ${isDarkMode ? 'bg-green-600/20 border-green-600 text-green-300' : 'bg-green-100 border-green-600 text-green-700'}`}>
              <p className="font-semibold">{successMessage}</p>
            </div>
          )}

          {/* Form or Already Joined Message */}
          {alreadyJoined ? (
            <div className={`p-6 rounded-xl text-center space-y-4 border-2 ${isDarkMode ? 'bg-green-600/10 border-green-600/30' : 'bg-green-50 border-green-300'}`}>
              <p className="text-3xl">✅</p>
              <p className={`text-lg font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
                You're registered!
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Don't forget to join the WhatsApp group for important updates and match details
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleOpenWhatsApp}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg transition-all transform hover:scale-105"
                >
                  📱 Join WhatsApp Group
                </button>
                <button
                  onClick={handleLeaveScrim}
                  disabled={loading}
                  className={`w-full py-2 text-sm font-semibold rounded-lg transition-colors ${isDarkMode ? 'text-red-400 hover:text-red-300 hover:bg-red-600/10' : 'text-red-600 hover:text-red-700 hover:bg-red-100'}`}
                >
                  {loading ? '⏳ Leaving...' : '❌ Leave this scrim'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleJoinScrim} className="space-y-4">
              <div>
                <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="playerName"
                  value={formData.playerName}
                  onChange={handleChange}
                  placeholder="E.g., Rajesh Kumar"
                  required
                  className={`w-full px-4 py-2 rounded-lg border-2 transition-all ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-500 focus:border-red-600 focus:ring-2 focus:ring-red-600/20'
                      : 'bg-white border-gray-300 text-slate-900 placeholder-gray-400 focus:border-red-600 focus:ring-2 focus:ring-red-600/20'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="playerEmail"
                  value={formData.playerEmail}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className={`w-full px-4 py-2 rounded-lg border-2 transition-all ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-500 focus:border-red-600 focus:ring-2 focus:ring-red-600/20'
                      : 'bg-white border-gray-300 text-slate-900 placeholder-gray-400 focus:border-red-600 focus:ring-2 focus:ring-red-600/20'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-bold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  name="playerPhone"
                  value={formData.playerPhone}
                  onChange={handleChange}
                  placeholder="+919876543210"
                  required
                  className={`w-full px-4 py-2 rounded-lg border-2 transition-all ${
                    isDarkMode
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-gray-500 focus:border-red-600 focus:ring-2 focus:ring-red-600/20'
                      : 'bg-white border-gray-300 text-slate-900 placeholder-gray-400 focus:border-red-600 focus:ring-2 focus:ring-red-600/20'
                  }`}
                />
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  Include country code: +91XXXXXXXXXX
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || spotsAvailable <= 0}
                className={`w-full py-3 rounded-lg font-bold text-lg transition-all duration-300 transform ${
                  spotsAvailable <= 0
                    ? isDarkMode
                      ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                      : 'bg-gray-400 cursor-not-allowed text-gray-600'
                    : isDarkMode
                    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:scale-105 shadow-lg shadow-red-900/50'
                    : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white hover:scale-105 shadow-lg'
                }`}
              >
                {loading ? '⏳ Joining...' : spotsAvailable <= 0 ? '❌ Scrim Full' : `✅ Join & Pay ${scrim.pricePerTeam}`}
              </button>

              <p className={`text-center text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                🔒 Secure payment • ⚡ Instant confirmation • 💬 Auto WhatsApp group join
              </p>
            </form>
          )}

          {/* WhatsApp Info Box */}
          <div className={`p-4 rounded-lg border-2 ${isDarkMode ? 'border-green-600/30 bg-green-600/5' : 'border-green-200 bg-green-50'}`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl">💬</span>
              <div>
                <p className={`font-bold mb-1 ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>
                  WhatsApp Group Benefits
                </p>
                <ul className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  <li>✓ Real-time match updates</li>
                  <li>✓ Venue & timing confirmations</li>
                  <li>✓ Live scoring during events</li>
                  <li>✓ Prize distribution details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`sticky bottom-0 p-6 border-t flex gap-4 ${isDarkMode ? 'border-red-600/20 bg-slate-800/80' : 'border-red-600/10 bg-gray-50'}`}>
          <button
            onClick={onClose}
            className={`flex-1 px-6 py-2 rounded-lg font-bold transition-all ${
              isDarkMode
                ? 'bg-slate-700 hover:bg-slate-600 text-white'
                : 'bg-gray-300 hover:bg-gray-400 text-slate-900'
            }`}
          >
            Close
          </button>
          {alreadyJoined && (
            <button
              onClick={handleOpenWhatsApp}
              className="flex-1 px-6 py-2 rounded-lg font-bold bg-green-600 hover:bg-green-700 text-white transition-all transform hover:scale-105"
            >
              📱 WhatsApp
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
