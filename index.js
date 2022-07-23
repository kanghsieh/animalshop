const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const mountRoutes = require('./routes');
mountRoutes(app);

app.get('/', (req, res) => {
  res.json({message: 'Hello'});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
