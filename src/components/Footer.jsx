export default function Footer({ isDarkMode }) {
  return (
    <footer className={`transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-slate-950 border-t border-red-600/20' 
        : 'bg-slate-900 border-t border-red-600/20'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">UI7</span>
              </div>
              <h3 className="font-black text-lg text-white">eSports</h3>
            </div>
            <p className="text-gray-400 text-sm">
              India's premier gaming platform for tournaments and paid scrims.
            </p>
          </div>

          {/* Tournaments */}
          <div>
            <h4 className="font-bold mb-4 text-white">Tournaments</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-red-500 transition">Free Fire</a></li>
              <li><a href="#" className="hover:text-red-500 transition">BGMI</a></li>
              <li><a href="#" className="hover:text-red-500 transition">CS:GO</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Valorant</a></li>
            </ul>
          </div>

          {/* Scrims */}
          <div>
            <h4 className="font-bold mb-4 text-white">Paid Scrims</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-red-500 transition">Battle Royale</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Squad Ranked</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Lone Wolf</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Custom Matches</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-bold mb-4 text-white">Community</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-red-500 transition">Teams</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Players</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Leaderboards</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Forums</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-red-500 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Contact</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Privacy</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Terms</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t ${isDarkMode ? 'border-red-600/20' : 'border-red-600/30'} pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-sm">
              © 2026 UI7 eSports. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-red-500 transition font-semibold">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition font-semibold">Discord</a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition font-semibold">YouTube</a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition font-semibold">Instagram</a>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className={`mt-8 p-6 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center ${
          isDarkMode 
            ? 'bg-slate-900/50 border border-red-600/20' 
            : 'bg-slate-800/50 border border-red-600/30'
        }`}>
          {[
            { label: 'Active Players', value: '5.2M+' },
            { label: 'Tournaments', value: '240+' },
            { label: 'Prize Money', value: '₹50Cr+' },
            { label: 'Happy Teams', value: '12K+' }
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-red-500 mb-1">{stat.value}</p>
              <p className="text-xs font-semibold text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
