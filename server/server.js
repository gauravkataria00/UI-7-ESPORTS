import express from 'express'
import cors from 'cors'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { v4 as uuidv4 } from 'uuid'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Read data from JSON file
const readData = () => {
  const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8')
  return JSON.parse(data)
}

// Write data to JSON file
const writeData = (data) => {
  fs.writeFileSync(`${__dirname}/data.json`, JSON.stringify(data, null, 2))
}

// ============ SCRIMS ENDPOINTS ============

// GET all scrims
app.get('/scrims', (req, res) => {
  try {
    const data = readData()
    res.json(data.scrims)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scrims' })
  }
})

// GET single scrim by ID
app.get('/scrims/:id', (req, res) => {
  try {
    const data = readData()
    const scrim = data.scrims.find(s => s.id === req.params.id)
    if (scrim) {
      res.json(scrim)
    } else {
      res.status(404).json({ error: 'Scrim not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scrim' })
  }
})

// POST - Join scrim
app.post('/scrims/:id/join', (req, res) => {
  try {
    const { playerName, playerEmail, playerPhone, paymentId } = req.body
    const data = readData()
    
    const scrim = data.scrims.find(s => s.id === req.params.id)
    
    if (!scrim) {
      return res.status(404).json({ error: 'Scrim not found' })
    }
    
    // Check if spots available
    if (scrim.registeredTeams >= scrim.maxTeams) {
      return res.status(400).json({ error: 'Scrim is full' })
    }
    
    // Check if player already registered
    if (scrim.registeredPlayers.includes(playerEmail)) {
      return res.status(400).json({ error: 'Already registered for this scrim' })
    }
    
    // Add player to scrim
    const playerId = `player-${uuidv4()}`
    scrim.registeredPlayers.push(playerEmail)
    scrim.registeredTeams += 1
    
    // Check if player exists, if not create
    let player = data.players.find(p => p.email === playerEmail)
    if (!player) {
      player = {
        id: playerId,
        name: playerName,
        email: playerEmail,
        phone: playerPhone,
        joinedScrims: [req.params.id],
        whatsappNumber: playerPhone
      }
      data.players.push(player)
    } else {
      if (!player.joinedScrims.includes(req.params.id)) {
        player.joinedScrims.push(req.params.id)
      }
    }
    
    // Save data
    writeData(data)
    
    res.json({
      success: true,
      message: 'Successfully joined the scrim',
      scrim: scrim,
      whatsappLink: scrim.whatsappLink,
      player: player
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to join scrim', details: error.message })
  }
})

// POST - Leave scrim
app.post('/scrims/:id/leave', (req, res) => {
  try {
    const { playerEmail } = req.body
    const data = readData()
    
    const scrim = data.scrims.find(s => s.id === req.params.id)
    
    if (!scrim) {
      return res.status(404).json({ error: 'Scrim not found' })
    }
    
    const playerIndex = scrim.registeredPlayers.indexOf(playerEmail)
    if (playerIndex > -1) {
      scrim.registeredPlayers.splice(playerIndex, 1)
      scrim.registeredTeams = Math.max(0, scrim.registeredTeams - 1)
    }
    
    // Update player record
    const player = data.players.find(p => p.email === playerEmail)
    if (player) {
      const scrimIndex = player.joinedScrims.indexOf(req.params.id)
      if (scrimIndex > -1) {
        player.joinedScrims.splice(scrimIndex, 1)
      }
    }
    
    writeData(data)
    
    res.json({
      success: true,
      message: 'Successfully left the scrim'
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to leave scrim' })
  }
})

// ============ PLAYERS ENDPOINTS ============

// GET all players
app.get('/players', (req, res) => {
  try {
    const data = readData()
    res.json(data.players)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch players' })
  }
})

// GET player by email
app.get('/players/:email', (req, res) => {
  try {
    const data = readData()
    const player = data.players.find(p => p.email === req.params.email)
    if (player) {
      res.json(player)
    } else {
      res.status(404).json({ error: 'Player not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch player' })
  }
})

// POST - Create player
app.post('/players', (req, res) => {
  try {
    const { name, email, phone } = req.body
    const data = readData()
    
    // Check if player already exists
    if (data.players.find(p => p.email === email)) {
      return res.status(400).json({ error: 'Player already exists' })
    }
    
    const newPlayer = {
      id: `player-${uuidv4()}`,
      name,
      email,
      phone,
      joinedScrims: [],
      whatsappNumber: phone
    }
    
    data.players.push(newPlayer)
    writeData(data)
    
    res.status(201).json({
      success: true,
      message: 'Player created successfully',
      player: newPlayer
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create player' })
  }
})

// ============ TEAMS ENDPOINTS ============

// GET all teams
app.get('/teams', (req, res) => {
  try {
    const data = readData()
    res.json(data.teams)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' })
  }
})

// GET team by ID
app.get('/teams/:id', (req, res) => {
  try {
    const data = readData()
    const team = data.teams.find(t => t.id === req.params.id)
    if (team) {
      res.json(team)
    } else {
      res.status(404).json({ error: 'Team not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' })
  }
})

// ============ HEALTH CHECK ============

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() })
})

// Start server
app.listen(PORT, () => {
  console.log(`🎮 UI7 eSports Server running on port ${PORT}`)
  console.log(`📡 API running at http://localhost:${PORT}`)
})
