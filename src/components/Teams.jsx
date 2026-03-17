export default function Teams({ isDarkMode }) {
  const teams = [
    {
      id: 1,
      name: 'Shadow Legends',
      game: 'Free Fire',
      members: 5,
      wins: 42,
      earnings: '₹2,50,000',
      ranking: 1,
      badge: '🏆'
    },
    {
      id: 2,
      name: 'Phoenix Rising',
      game: 'BGMI',
      members: 5,
      wins: 38,
      earnings: '₹2,10,000',
      ranking: 2,
      badge: '👑'
    },
    {
      id: 3,
      name: 'Elite Squad',
      game: 'Free Fire',
      members: 5,
      wins: 35,
      earnings: '₹1,85,000',
      ranking: 3,
      badge: '🥇'
    },
    {
      id: 4,
      name: 'Cyber Ninjas',
      game: 'BGMI',
      members: 5,
      wins: 32,
      earnings: '₹1,65,000',
      ranking: 4,
      badge: '⚡'
    },
    {
      id: 5,
      name: 'Dragon Force',
      game: 'CS:GO',
      members: 5,
      wins: 29,
      earnings: '₹1,45,000',
      ranking: 5,
      badge: '🔥'
    },
    {
      id: 6,
      name: 'Nova Titans',
      game: 'Valorant',
      members: 5,
      wins: 26,
      earnings: '₹1,25,000',
      ranking: 6,
      badge: '⭐'
    }
  ]

  return (
    <section id="teams" className={`py-20 transition-colors duration-300 ${isDarkMode ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <span className="bg-gradient-to-r from-red-600 via-purple-600 to-red-600 bg-clip-text text-transparent">Top Performing Teams</span>
          </h2>
          <p className={`text-xl font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            Elite squads dominating our tournaments and scrims
          </p>
        </div>

        <div className={`rounded-xl overflow-hidden border transition-colors duration-300 ${isDarkMode ? 'border-red-600/20' : 'border-gray-200'}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDarkMode ? 'bg-slate-900 border-red-600/20' : 'bg-gray-100 border-gray-200'}`}>
                  <th className={`text-left py-4 px-6 font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Rank</th>
                  <th className={`text-left py-4 px-6 font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Team Name</th>
                  <th className={`text-left py-4 px-6 font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Game</th>
                  <th className={`text-center py-4 px-6 font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Members</th>
                  <th className={`text-center py-4 px-6 font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Wins</th>
                  <th className={`text-right py-4 px-6 font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Total Earnings</th>
                  <th className={`text-center py-4 px-6 font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr 
                    key={team.id} 
                    className={`border-b transition-colors duration-300 ${
                      isDarkMode 
                        ? 'border-red-600/10 hover:bg-slate-900/50' 
                        : 'border-gray-200 hover:bg-purple-50'
                    }`}
                  >
                    <td className={`py-4 px-6 font-bold text-lg ${isDarkMode ? 'text-red-500' : 'text-red-600'}`}>
                      {team.badge} #{team.ranking}
                    </td>
                    <td className={`py-4 px-6 font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {team.name}
                    </td>
                    <td className={`py-4 px-6 font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {team.game}
                    </td>
                    <td className={`py-4 px-6 text-center font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {team.members}
                    </td>
                    <td className={`py-4 px-6 text-center font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {team.wins}W
                    </td>
                    <td className={`py-4 px-6 text-right font-bold ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                      {team.earnings}
                    </td>
                    <td className={`py-4 px-6 text-center`}>
                      <button className={`font-bold transition-colors duration-300 ${
                        isDarkMode 
                          ? 'text-purple-400 hover:text-purple-300' 
                          : 'text-purple-600 hover:text-purple-700'
                      }`}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
