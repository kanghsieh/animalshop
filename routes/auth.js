const db = require('../db');
const express = require('express');
const router = express.Router();

module.exports = router;

router.get('/login', async (req, res) => {
  res.render('login');
})
