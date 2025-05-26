// server.js

import express from 'express'
import session from 'express-session'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'
import { pool } from './db.js'
import cors from 'cors'

dotenv.config()

const app = express()

// ====================== MIDDLEWARE ====================== //
app.use(
  cors({
    origin: 'http://localhost:3000', // Frontend origin
    credentials: true,               // Allow cookies/session
  })
)

app.use(express.json())

app.use(
  session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

// ====================== PASSPORT CONFIG ====================== //
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value
        const name = profile.displayName

        console.log("Google user:", name, email)

        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email])

        if (existingUser.rows.length === 0) {
          console.log("Inserting new user to DB...")
          await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email])
        } else {
          console.log("User already exists in DB.")
        }

        return done(null, { name, email })
      } catch (err) {
        console.error("Error during Google login:", err)
        return done(err, null)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

// ====================== AUTH MIDDLEWARE ====================== //
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.status(401).json({ error: 'Unauthorized' })
}

// ====================== ROUTES ====================== //

// Start Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// Handle Google OAuth callback
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: 'http://localhost:3000/dashboard',
  })
)

// Logout and redirect to frontend
app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:3000')
  })
})

// Get currently logged-in user (protected route)
app.get('/api/user', isAuthenticated, (req, res) => {
  console.log("Session user:", req.user)
  res.json(req.user)
})

// Optional: check if user is authenticated (no profile details)
app.get('/api/check-auth', (req, res) => {
  res.json({ authenticated: req.isAuthenticated() })
})

// ====================== USER DB ROUTES (for testing/admin) ====================== //

// Create user manually (optional)
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get all users (admin/dev route)
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ====================== SERVER LISTEN ====================== //
app.listen(5000, () => console.log('✅ Server running on http://localhost:5000'))
