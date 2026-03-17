export default function Tournaments({ isDarkMode }) {
  const tournaments = [
    {
      id: 1,
      name: 'Free Fire Pro League',
      game: 'Free Fire',
      icon: '🔥',
      prize: '₹50,00,000',
      teams: 16,
      status: 'Ongoing',
      rounds: '4/6',
      nextMatch: '2h 15m'
    },
    {
      id: 2,
      name: 'BGMI National Championship',
      game: 'BGMI',
      icon: '🎮',
      prize: '₹75,00,000',
      teams: 32,
      status: 'Upcoming',
      rounds: 'Registration',
      nextMatch: '5 days'
    },
    {
      id: 3,
      name: 'CS:GO Elite Series',
      game: 'Counter-Strike: GO',
      icon: '🔫',
      prize: '₹30,00,000',
      teams: 8,
      status: 'Ongoing',
      rounds: '2/4',
      nextMatch: '30m'
    },
    {
      id: 4,
      name: 'Valorant Champions Cup',
      game: 'Valorant',
      icon: '⚔️',
      prize: '₹25,00,000',
      teams: 12,
      status: 'Registration Open',
      rounds: 'Qualify',
      nextMatch: '3 days'
    },
    {
      id: 5,
      name: 'Free Fire Clash Squad',
      game: 'Free Fire',
      icon: '🔥',
      prize: '₹10,00,000',
      teams: 24,
      status: 'Upcoming',
      rounds: '0/5',
      nextMatch: '1 week'
    },
    {
      id: 6,
      name: 'BGMI Squad Tournament',
      game: 'BGMI',
      icon: '🎮',
      prize: '₹15,00,000',
      teams: 20,
      status: 'Ongoing',
      rounds: '3/5',
      nextMatch: '12h'
    }
  ]

  return (
    <section id="tournaments" className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <span className="bg-gradient-to-r from-red-600 via-purple-600 to-red-600 bg-clip-text text-transparent">Tournament Directory</span>
          </h2>
          <p className={`text-xl font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            Choose your game and compete for glory and rewards
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => (
            <div 
              key={tournament.id} 
              className={`rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-900 border border-red-600/20 hover:border-red-600/50 shadow-lg shadow-red-900/10' 
                  : 'bg-white border border-gray-200 hover:border-red-600 shadow-md'
              }`}
            >
              <div className={`p-6 border-b ${isDarkMode ? 'border-red-600/20' : 'border-gray-200'}`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl">{tournament.icon}</span>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        tournament.status === 'Ongoing' 
                          ? 'bg-green-500/20 text-green-400' 
                          : tournament.status === 'Registration Open' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {tournament.status}
                      </span>
                    </div>
                    <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {tournament.name}
                    </h3>
                    <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {tournament.game}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`p-6 space-y-4 ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50'}`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Prize Pool</p>
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-red-500' : 'text-red-600'}`}>
                      {tournament.prize}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Teams</p>
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {tournament.teams}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Rounds</p>
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                      {tournament.rounds}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Next Match</p>
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {tournament.nextMatch}
                    </p>
                  </div>
                </div>

                <button className={`w-full py-2 rounded-lg font-bold transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white' 
                    : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                }`}>
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
