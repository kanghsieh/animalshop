const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./routes/users');
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => {
  res.json({message: 'Hello'});
});

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUsersById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
