# 🎮 UI7 eSports - Complete Setup Guide

Follow these steps to get the entire application running (Frontend + Backend + WhatsApp Integration).

## 📋 Prerequisites

- **Node.js**: v16 or higher [Download](https://nodejs.org/)
- **npm**: v7 or higher (comes with Node.js)
- **Git**: (Optional, for version control)
- **WhatsApp**: For group link creation

## 🚀 Quick Start (2 Terminals Required)

### Terminal 1: Run Backend Server

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Start the server (development mode with auto-reload)
npm run dev

# Expected output:
# 🎮 UI7 eSports Server running on port 5000
# 📡 API running at http://localhost:5000
```

### Terminal 2: Run Frontend

```bash
# In the root project folder
npm install

# Start development server
npm run dev

# Expected output:
# VITE v5.x.x ready in XXX ms
# ➜  Local:   http://localhost:5173/
```

Then open `http://localhost:5173` in your browser.

## 🔧 Project Structure

```
ui7-esports/
├── src/                          # Frontend React code
│   ├── components/
│   │   ├── Header.jsx           # Navigation & theme toggle
│   │   ├── Hero.jsx             # Hero section
│   │   ├── Tournaments.jsx        # Tournament listings
│   │   ├── PaidScrims.jsx         # Paid scrims (connects to backend)
│   │   ├── Teams.jsx             # Team rankings
│   │   ├── Schedule.jsx          # Match schedule
│   │   ├── Footer.jsx            # Footer
│   │   └── JoinScrimModal.jsx     # Join scrim form with WhatsApp
│   ├── context/
│   │   └── ScrimContext.jsx      # State management for scrims
│   ├── App.jsx                   # Main app component
│   └── index.css                 # Global styles
├── server/                       # Backend Express server
│   ├── server.js                # Main server file
│   ├── package.json             # Backend dependencies
│   ├── data.json                # JSON database
│   ├── .env                     # Environment variables
│   └── README.md                # Backend documentation
├── vite.config.js               # Frontend build config (with API proxy)
├── tailwind.config.js           # Tailwind CSS config
├── index.html                   # HTML entry point
└── package.json                 # Frontend dependencies
```

## 🎯 Key Features

### 1. **Tournament Browsing**
- View all active tournaments across multiple games (FF, BGMI, CS:GO, Valorant)
- See prize pools, team count, and status
- Professional card-based layout

### 2. **Paid Scrims with Backend Integration**
- Real-time scrim data from backend
- Join scrims with one click
- Automatic team spot tracking
- Price and prize calculation

### 3. **Player Registration Form**
- Name, email, phone validation
- Direct WhatsApp number input
- Payment ID tracking
- Error handling and success messages

### 4. **WhatsApp Integration**
- Automatic WhatsApp group links for each scrim
- Direct group join from the modal
- WhatsApp button on each scrim card
- Pre-filled WhatsApp messages for sharing

### 5. **Dark/Light Mode**
- Toggle button in header (🌙/☀️)
- Smooth theme transitions
- Persistent theme preference
- All components support both themes

### 6. **Team Rankings & Stats**
- Top teams leaderboard
- Live earnings tracking
- Win-loss records
- Team badges and rankings

### 7. **Live Schedule**
- Upcoming match times
- Real-time countdowns
- Team vs team matchups
- Viewer counts

## 💻 Working with the Backend

### API Integration Flow

```
1. Frontend (React) 
   ↓
2. Vite Proxy (localhost:5173/api → localhost:5000)
   ↓
3. Express Server
   ↓
4. data.json (Database)
```

### Adding a Player to a Scrim

```javascript
// From frontend/JoinScrimModal.jsx
const result = await joinScrim(scrim.id, {
  playerName: 'John Doe',
  playerEmail: 'john@example.com',
  playerPhone: '+919876543210'
})

// Backend processes:
// 1. Validates player doesn't already exist
// 2. Checks scrim has available spots
// 3. Adds player to registeredPlayers list
// 4. Increments registeredTeams counter
// 5. Creates/updates player record
// 6. Returns WhatsApp link to frontend
```

### Modifying Scrims Data

Edit `server/data.json` to:
- Add new scrims
- Update WhatsApp group links
- Modify prize pools
- Adjust available spots

## 📱 WhatsApp Setup

### For Each Scrim, You Need:

1. **Create a WhatsApp Group**
   - Name: `[Game] [Mode] - UI7 eSports` (e.g., "FF Battle Royale - UI7")
   - Add admin bot (optional)

2. **Get Group Link**
   - Open group → Menu (⋮) → Group info
   - Scroll to "Invite via link"
   - Copy group link

3. **Add to data.json**
   ```json
   {
     "id": "scrim-id",
     "title": "...",
     "whatsappLink": "https://chat.whatsapp.com/YourGroupLink",
     ...
   }
   ```

## 🔐 WhatsApp Security Tips

- Keep group links private
- Add members manually when needed
- Use group settings to restrict posting
- Monitor for spam/inappropriate content
- Regular member verification

## 📊 Testing the System

### Test Joining a Scrim

1. Open `http://localhost:5173`
2. Scroll to "Paid Practice Scrims"
3. Click on any scrim card
4. Modal opens with join form
5. Fill in details:
   - Name: Test Player
   - Email: test@example.com
   - Phone: +919876543210
6. Click "Join Scrim"
7. Backend registers player
8. WhatsApp link shown
9. Player can join group

### Check Backend Data

1. Open `server/data.json`
2. Look for your player in `registeredPlayers` array for the scrim
3. Check updated `registeredTeams` count
4. Verify player record in `players` array

## 🚨 Common Issues & Solutions

### Issue: "Cannot GET /api/scrims"
**Solution**: 
- Ensure backend is running on port 5000
- Check vite.config.js proxy configuration
- Restart both servers

### Issue: "CORS Error"
**Solution**:
- Backend CORS is already configured
- Check both servers are running
- Clear browser cache

### Issue: "WhatsApp link not working"
**Solution**:
- Verify link format in data.json
- Ensure group link is not expired
- Group link format: `https://chat.whatsapp.com/ExampleCode`

### Issue: Backend won't start
**Solution**:
```bash
# Check if port 5000 is already in use
# Unix/Mac: lsof -i :5000
# Windows: netstat -ano | findstr :5000

# Kill the process and restart
npm run dev
```

### Issue: Data not saving
**Solution**:
- Ensure write permissions on data.json
- Check data.json is valid JSON
- Restart backend server

## 📦 Build for Production

### Frontend Build

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview

# Output: dist/ folder ready to deploy
```

### Backend Deployment

```bash
# Install PM2 globally
npm install -g pm2

# Start server with PM2
pm2 start server/server.js --name "ui7-backend"

# Configure auto-restart
pm2 startup
pm2 save
```

## 🔄 Development Workflow

### Making Changes

1. **Frontend Changes**
   - Edit files in `src/`
   - Vite hot-reload applies changes automatically
   - No need to restart

2. **Backend Changes**
   - Edit files in `server/`
   - `npm run dev` watches and restarts automatically
   - Refresh frontend to see changes

3. **Data Changes**
   - Edit `server/data.json`
   - Restart backend to load new data
   - Or use API endpoints to modify

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Express.js Guide](https://expressjs.com/)
- [WhatsApp Business API](https://developers.facebook.com/docs/whatsapp/)

## 🤝 Team Collaboration

### Using Git

```bash
# Clone repository
git clone <repo-url>

# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "Add feature"

# Push to repository
git push origin feature/your-feature
```

## ✅ Checklist Before Launch

- [ ] Both servers running (Frontend + Backend)
- [ ] All API endpoints tested
- [ ] WhatsApp groups created and links updated
- [ ] Dark/Light mode tested
- [ ] Mobile responsive design verified
- [ ] Form validation working
- [ ] Error messages display correctly
- [ ] Data persists after refresh
- [ ] WhatsApp links functional
- [ ] All games display correctly

## 🎉 You're All Set!

Your UI7 eSports platform is now running with:
- ✅ Full backend API
- ✅ Real-time scrim data
- ✅ WhatsApp group integration
- ✅ Dark/Light theme
- ✅ Player registration
- ✅ Responsive design
- ✅ Professional UI

## 📞 Support

For issues or questions:
- Check the troubleshooting section above
- Review backend README.md
- Check browser console for errors
- Check server logs in terminal

---

**Happy Gaming! 🎮**
