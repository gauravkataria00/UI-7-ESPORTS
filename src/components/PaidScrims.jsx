import { useState } from 'react'
import { useScrims } from '../context/ScrimContext'
import JoinScrimModal from './JoinScrimModal'

export default function PaidScrims({ isDarkMode }) {
  const { scrims, loading, error } = useScrims()
  const [selectedScrim, setSelectedScrim] = useState(null)

  const getSpotsFilled = (registered, max) => {
    return Math.round((registered / max) * 100)
  }

  if (loading) {
    return (
      <section className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className={`text-xl font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Loading scrims... 🎮
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`p-6 rounded-lg border-2 text-center ${isDarkMode ? 'border-red-600/30 bg-red-600/10' : 'border-red-200 bg-red-50'}`}>
            <p className={`text-lg font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
              ⚠️ Error loading scrims
            </p>
            <p className={`text-sm mt-2 ${isDarkMode ? 'text-red-300/70' : 'text-red-600/70'}`}>
              {error}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="scrims" className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <span className="bg-gradient-to-r from-purple-600 via-red-600 to-purple-600 bg-clip-text text-transparent">Paid Practice Scrims</span>
          </h2>
          <p className={`text-xl font-medium max-w-3xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            Level up with real competition. Join paid scrims and compete against serious players. Win cash prizes and prove your skills.
          </p>
        </div>

        {scrims.length === 0 ? (
          <div className="text-center p-12">
            <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              No scrims available at the moment. Check back soon! 🎮
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scrims.map((scrim) => (
              <div 
                key={scrim.id} 
                className={`rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-600/30 hover:border-purple-600/60 shadow-lg shadow-purple-900/20' 
                    : 'bg-gradient-to-br from-gray-50 to-white border border-purple-200 hover:border-purple-500 shadow-md'
                }`}
                onClick={() => setSelectedScrim(scrim)}
              >
                {/* Header */}
                <div className={`p-6 border-b ${isDarkMode ? 'border-purple-600/20' : 'border-purple-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{scrim.icon}</span>
                      <div>
                        <h3 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {scrim.title}
                        </h3>
                        <p className={`text-sm font-semibold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                          {scrim.mode}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {scrim.description}
                  </p>
                </div>

                {/* Stats */}
                <div className={`p-6 space-y-4 border-b ${isDarkMode ? 'border-purple-600/20 bg-slate-800/50' : 'border-purple-200 bg-purple-50/30'}`}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className={`text-xs font-bold uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Price/Team</p>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                        ₹{scrim.pricePerTeam}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs font-bold uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Prize Pool</p>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                        ₹{scrim.prizePool.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs font-bold uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Duration</p>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {scrim.duration}
                      </p>
                    </div>
                    <div>
                      <p className={`text-xs font-bold uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Level</p>
                      <p className={`text-lg font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        {scrim.difficulty}
                      </p>
                    </div>
                  </div>

                  {/* Spots Filled */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <p className={`text-xs font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Teams Registered
                      </p>
                      <p className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        {scrim.registeredTeams}/{scrim.maxTeams}
                      </p>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-gray-300'}`}>
                      <div 
                        className="h-full bg-gradient-to-r from-purple-600 to-red-600 transition-all duration-300"
                        style={{ width: `${getSpotsFilled(scrim.registeredTeams, scrim.maxTeams)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Next Start */}
                  <div className={`p-3 rounded-lg text-center ${isDarkMode ? 'bg-red-600/20' : 'bg-red-100'}`}>
                    <p className={`text-xs font-bold uppercase ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                      Next Match In
                    </p>
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                      {scrim.nextStart}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={`p-6 space-y-3 ${isDarkMode ? 'bg-slate-800/50' : 'bg-purple-50/20'}`}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedScrim(scrim)
                    }}
                    className={`w-full py-2 rounded-lg font-bold transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white' 
                        : 'bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white'
                    }`}>
                    Join Scrim
                  </button>
                  <a
                    href={scrim.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`block w-full py-2 rounded-lg font-semibold transition-all duration-300 text-center border-2 ${
                      isDarkMode 
                        ? 'border-green-600 text-green-400 hover:bg-green-600/10' 
                        : 'border-green-600 text-green-600 hover:bg-green-50'
                    }`}>
                    📱 WhatsApp Group
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* How it works section */}
        <div className={`mt-16 p-8 rounded-xl transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-slate-800 border border-purple-600/30' 
            : 'bg-purple-50 border border-purple-200'
        }`}>
          <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            How Paid Scrims Work
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Register Team', desc: 'Add your team and pay the scrim fee' },
              { step: 2, title: 'Match Time', desc: 'Wait for scrim to start at scheduled time' },
              { step: 3, title: 'Play & Win', desc: 'Compete against other teams for the prize' },
              { step: 4, title: 'Get Winnings', desc: 'Receive prize money directly to your account' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-3 mx-auto ${
                  isDarkMode 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-purple-600 text-white'
                }`}>
                  {item.step}
                </div>
                <h4 className={`font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {item.title}
                </h4>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Modal */}
      {selectedScrim && (
        <JoinScrimModal 
          scrim={selectedScrim} 
          isDarkMode={isDarkMode}
          onClose={() => setSelectedScrim(null)}
        />
      )}
    </section>
  )
}
