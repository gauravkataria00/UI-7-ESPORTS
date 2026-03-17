export default function Hero({ isDarkMode }) {
  return (
    <section className={`relative py-20 md:py-32 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-slate-900 to-slate-950 via-red-900/20' 
        : 'bg-gradient-to-b from-gray-50 to-white via-red-50/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className={`text-5xl md:text-7xl font-black leading-tight ${
                isDarkMode 
                  ? 'text-white' 
                  : 'text-slate-900'
              }`}>
                Play Like a
                <br />
                <span className="bg-gradient-to-r from-red-600 via-purple-600 to-red-600 bg-clip-text text-transparent">Pro Player</span>
              </h2>
            </div>
            <p className={`text-xl max-w-2xl font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Compete in tournaments, join paid scrims, and level up your skills. Connect with the best gaming community and win exclusive prizes.
            </p>
            <div className="flex gap-4 flex-wrap pt-4">
              <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-3 rounded-lg font-bold text-lg text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-600/50">
                Join Tournament
              </button>
              <button className={`px-8 py-3 rounded-lg font-bold text-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                isDarkMode 
                  ? 'border-red-600 text-red-600 hover:bg-red-600/10' 
                  : 'border-red-600 text-red-600 hover:bg-red-50'
              }`}>
                Browse Scrims
              </button>
            </div>
          </div>
          
          <div className={`relative h-96 rounded-2xl border-2 flex items-center justify-center transition-colors duration-300 overflow-hidden ${
            isDarkMode 
              ? 'bg-gradient-to-br from-red-900/20 to-purple-900/20 border-red-600/30' 
              : 'bg-gradient-to-br from-red-100/50 to-purple-100/50 border-red-600/30'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-purple-600/5"></div>
            <div className="relative text-center space-y-4">
              <div className="text-6xl">🎮</div>
              <p className={`font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Free Fire • BGMI • CS:GO • Valorant</p>
              <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Next Match Starting</p>
              <div className="flex gap-2 justify-center text-red-600 text-xl font-bold">
                <span>02</span>:<span>15</span>:<span>43</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
