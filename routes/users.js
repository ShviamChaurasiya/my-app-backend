// example: routes/users.js
import express from 'express'
import { pool } from '../db.js'
const router = express.Router()

router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

export default router
