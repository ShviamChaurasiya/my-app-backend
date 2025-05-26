// server.js
const express = require('express')
const passport = require('passport')
const session = require('express-session')
const GoogleStrategy = require('passport-google-oauth20').Strategy
require('dotenv').config()

const app = express()

app.use(
  session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      // save user info here or in DB
      return done(null, profile)
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((obj, done) => {
  done(null, obj)
})

// Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: 'http://localhost:3000/dashboard',
  })
)

app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/')
  })
})

app.get('/api/user', (req, res) => {
  res.send(req.user)
})

app.listen(5000, () => console.log('Server on http://localhost:5000'))
