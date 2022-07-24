const users = require('./user');
const register = require('./register');
const login = require('./auth');

module.exports = app => {
  app.use('/users', users)
  app.use('/register', register)
  app.use('/login', login)
}
