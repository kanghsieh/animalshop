const db = require('../db');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');

passport.use(new LocalStrategy(function verify(email, password, cb) {
  db.query('SELECT * FROM users WHERE email = $1', [ email ], (err, row) => {
    if (err) { return cb(err); }
    if (!row) { return cb(null, false, { message: 'Incorrect email or password.' }); }

    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect email or password.' });
      }
      return cb(null, row);
    });
  });
}));

module.exports = router;

router.get('/', async (req, res) => {
  // res.render('login');
  res.status(200).json({message: "Login"});
})

router.post('/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
