export default function Header({ isDarkMode, onThemeToggle }) {
  return (
    <header className={`${isDarkMode ? 'bg-slate-900 border-red-600/30' : 'bg-white border-red-600/20'} border-b sticky top-0 z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center transform hover:scale-105 transition`}>
              <span className="text-white font-bold text-lg">UI7</span>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-red-600 via-purple-600 to-red-600 bg-clip-text text-transparent">Esports</h1>
              <p className="text-xs text-gray-500 font-semibold">Pro Gaming Platform</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#tournaments" className={`${isDarkMode ? 'hover:text-red-500' : 'hover:text-red-600'} transition font-medium`}>Tournaments</a>
            <a href="#scrims" className={`${isDarkMode ? 'hover:text-red-500' : 'hover:text-red-600'} transition font-medium`}>Paid Scrims</a>
            <a href="#teams" className={`${isDarkMode ? 'hover:text-red-500' : 'hover:text-red-600'} transition font-medium`}>Teams</a>
            <a href="#schedule" className={`${isDarkMode ? 'hover:text-red-500' : 'hover:text-red-600'} transition font-medium`}>Schedule</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={onThemeToggle}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' 
                  : 'bg-gray-200 hover:bg-gray-300 text-slate-600'
              }`}
              title="Toggle dark/light mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 1.78a1 1 0 011.408 0l.708.708a1 1 0 01-1.408 1.408l-.708-.708a1 1 0 010-1.408zm2.834 2.834a1 1 0 011.408 0l.708.708a1 1 0 01-1.408 1.408l-.708-.708a1 1 0 010-1.408zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm2.22 2.22a1 1 0 01-1.408 0l-.708-.708a1 1 0 011.408-1.408l.708.708a1 1 0 010 1.408zM10 17a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22 1.78a1 1 0 01-1.408 0l-.708-.708a1 1 0 011.408-1.408l.708.708a1 1 0 010 1.408zM4 11a1 1 0 100-2H3a1 1 0 100 2h1zm-2.22 2.22a1 1 0 01-1.408 0l-.708-.708a1 1 0 011.408-1.408l.708.708a1 1 0 010 1.408zM10 5a5 5 0 110 10 5 5 0 010-10z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            <button className="hidden md:block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-6 py-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-600/50">
              Register Now
            </button>

            <div className="md:hidden">
              <button className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 transition">
                <span className="sr-only">Menu</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
