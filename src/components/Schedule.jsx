export default function Schedule({ isDarkMode }) {
  const schedule = [
    {
      id: 1,
      date: 'March 20, 2026',
      time: '18:00 IST',
      tournament: 'Free Fire Pro League',
      game: 'Free Fire',
      team1: 'Shadow Legends',
      team2: 'Elite Squad',
      status: 'Upcoming',
      viewers: '12K',
      type: 'Tournament'
    },
    {
      id: 2,
      date: 'March 20, 2026',
      time: '20:00 IST',
      tournament: 'BGMI Squad Scrim',
      game: 'BGMI',
      team1: 'Phoenix Rising',
      team2: 'Cyber Ninjas',
      status: 'Upcoming',
      viewers: '8K',
      type: 'Paid Scrim'
    },
    {
      id: 3,
      date: 'March 21, 2026',
      time: '17:00 IST',
      tournament: 'Free Fire Lone Wolf',
      game: 'Free Fire',
      team1: 'Player Rankings',
      team2: 'Live Standings',
      status: 'Upcoming',
      viewers: '5K',
      type: 'Paid Scrim'
    },
    {
      id: 4,
      date: 'March 21, 2026',
      time: '19:00 IST',
      tournament: 'BGMI National Championship',
      game: 'BGMI',
      team1: 'Dragon Force',
      team2: 'Nova Titans',
      status: 'Upcoming',
      viewers: '25K',
      type: 'Tournament'
    }
  ]

  return (
    <section id="schedule" className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent">Upcoming Matches</span>
          </h2>
          <p className={`text-xl font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            Don't miss the next big matches - bookmark your favorites
          </p>
        </div>

        <div className="space-y-4">
          {schedule.map((match) => (
            <div 
              key={match.id} 
              className={`rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] ${
                isDarkMode 
                  ? 'bg-slate-800 border border-green-600/20 hover:border-green-600/50 shadow-lg shadow-green-900/10' 
                  : 'bg-gray-50 border border-green-200 hover:border-green-500 shadow-md'
              }`}
            >
              <div className="p-6">
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  {/* Date & Time */}
                  <div className={`text-center md:text-left`}>
                    <p className={`text-xs font-bold uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Date & Time</p>
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {match.date}
                    </p>
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-green-500' : 'text-green-600'}`}>
                      {match.time}
                    </p>
                  </div>

                  {/* Tournament & Game */}
                  <div>
                    <p className={`text-xs font-bold uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Event</p>
                    <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {match.tournament}
                    </p>
                    <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      🎮 {match.game}
                    </p>
                  </div>

                  {/* Teams */}
                  <div className="md:col-span-2">
                    <p className={`text-xs font-bold uppercase mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Teams</p>
                    <div className="flex items-center gap-3">
                      <div className={`flex-1 px-4 py-2 rounded-lg font-semibold text-center border transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-slate-700/50 border-green-600/30 text-green-400' 
                          : 'bg-green-50 border-green-300 text-green-700'
                      }`}>
                        {match.team1}
                      </div>
                      <p className={`font-bold text-lg ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>VS</p>
                      <div className={`flex-1 px-4 py-2 rounded-lg font-semibold text-center border transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-slate-700/50 border-green-600/30 text-green-400' 
                          : 'bg-green-50 border-green-300 text-green-700'
                      }`}>
                        {match.team2}
                      </div>
                    </div>
                  </div>

                  {/* Status & Action */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                        match.type === 'Tournament'
                          ? isDarkMode ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-700'
                          : isDarkMode ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {match.type}
                      </span>
                      <p className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        👁️ {match.viewers}
                      </p>
                    </div>
                    <button className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 text-sm whitespace-nowrap ${
                      isDarkMode 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}>
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
