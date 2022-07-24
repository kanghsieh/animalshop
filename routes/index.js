const users = require('./user');
const register = require('./register');

module.exports = app => {
  app.use('/users', users)
  app.use('/register', register)
}
