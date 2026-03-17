# UI7 eSports Backend Server

Express.js backend server for the UI7 eSports platform with scrim management, player registration, and WhatsApp integration.

## 📋 Features

- **Scrim Management**: Create, read, and manage scrims
- **Player Registration**: Register players for scrims with validation
- **Team Management**: Manage team data and rankings
- **WhatsApp Integration**: Automatic WhatsApp group links for scrims
- **Data Persistence**: JSON-based data storage
- **RESTful API**: Complete REST API for all operations

## 🛠 Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Configuration

Create a `.env` file (already included):

```
PORT=5000
NODE_ENV=development
```

### 3. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will run on: `http://localhost:5000`

## 📡 API Endpoints

### Scrims

#### Get All Scrims
```
GET /scrims
```

#### Get Single Scrim
```
GET /scrims/:id
```

#### Join Scrim
```
POST /scrims/:id/join
Content-Type: application/json

Body:
{
  "playerName": "John Doe",
  "playerEmail": "john@example.com",
  "playerPhone": "+919876543210",
  "paymentId": "PAY123"
}

Response:
{
  "success": true,
  "message": "Successfully joined the scrim",
  "scrim": { ... },
  "whatsappLink": "https://chat.whatsapp.com/...",
  "player": { ... }
}
```

#### Leave Scrim
```
POST /scrims/:id/leave
Content-Type: application/json

Body:
{
  "playerEmail": "john@example.com"
}

Response:
{
  "success": true,
  "message": "Successfully left the scrim"
}
```

### Players

#### Get All Players
```
GET /players
```

#### Get Player by Email
```
GET /players/:email
```

#### Create New Player
```
POST /players
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210"
}

Response:
{
  "success": true,
  "message": "Player created successfully",
  "player": { ... }
}
```

### Teams

#### Get All Teams
```
GET /teams
```

#### Get Team by ID
```
GET /teams/:id
```

### Health Check

```
GET /health
```

## 🗂 Data Structure

### Scrims
```javascript
{
  "id": "scrim-ff-br-1",
  "title": "Free Fire - Battle Royale Scrim",
  "game": "Free Fire",
  "mode": "Battle Royale",
  "icon": "🔥",
  "pricePerTeam": 500,
  "maxTeams": 8,
  "registeredTeams": 5,
  "duration": "30 mins",
  "prizePool": 4000,
  "difficulty": "Intermediate",
  "nextStart": "45 mins",
  "description": "Competitive BR scrim with cash prizes",
  "whatsappLink": "https://chat.whatsapp.com/...",
  "registeredPlayers": ["email1@example.com", "email2@example.com"]
}
```

### Players
```javascript
{
  "id": "player-uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "joinedScrims": ["scrim-id-1", "scrim-id-2"],
  "whatsappNumber": "+919876543210"
}
```

### Teams
```javascript
{
  "id": "team1",
  "name": "Shadow Legends",
  "game": "Free Fire",
  "members": 5,
  "wins": 42,
  "earnings": 250000,
  "ranking": 1,
  "badge": "🏆",
  "whatsappGroup": "https://chat.whatsapp.com/..."
}
```

## 🔌 Integration with Frontend

The Vite frontend is configured to proxy API calls to the backend. In `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

### Frontend Usage

```javascript
// Fetch scrims
fetch('/api/scrims')
  .then(res => res.json())
  .then(data => console.log(data))

// Join scrim
fetch('/api/scrims/scrim-id/join', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    playerName: 'John',
    playerEmail: 'john@example.com',
    playerPhone: '+919876543210'
  })
})
```

## 📊 Database

Currently using JSON file (data.json) for storage. To upgrade to MongoDB:

1. Install MongoDB driver:
   ```bash
   npm install mongodb
   ```

2. Update endpoints to use MongoDB instead of JSON file

## 🔒 Security Features to Add

- Authentication (JWT)
- Rate limiting
- Input validation & sanitization
- HTTPS/SSL
- CORS configuration
- Payment gateway integration
- User authentication

## 📈 Future Enhancements

- [ ] Real-time updates with Socket.io
- [ ] Database migration to MongoDB
- [ ] Payment integration (Razorpay/Stripe)
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Admin dashboard
- [ ] User authentication
- [ ] Matchmaking algorithm

## 🚀 Deployment

For production deployment:

1. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "ui7-esports"
   ```

2. Use environment variables for configuration

3. Enable HTTPS

4. Set up proper error logging

5. Configure CORS properly

## 💬 WhatsApp Integration

The system automatically adds WhatsApp group links to each scrim. When a player joins:

1. They receive the WhatsApp group link
2. They can click to join the group
3. All team members get added to the same group
4. Updates are shared in real-time

WhatsApp links are stored in the `data.json` file and can be customized per scrim.

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Unix/Mac
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### CORS Errors
Check that the frontend is calling the correct API endpoint and the proxy is configured properly.

### Data Not Persisting
Ensure the server has write permissions to the data.json file.

## 📝 License

MIT License

---

**Backend Server for UI7 eSports Platform**
