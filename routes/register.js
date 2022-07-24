const db = require('../db');
const express = require('express');
const router = express.Router();

module.exports = router;

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  let allUsers = [];
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error;
    }
    allUsers.push(results['rows']);
  })
  if (!allUsers.includes(user => user.email === email)) {
    db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        message: 'New user registered',
        newUser: results['rows'],
      });
    })
  } else {
    res.status(400).json({
      message: 'User with this email already exists',
    });
  }
})
