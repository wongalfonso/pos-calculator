const express = require('express');
const morgan = require('morgan');
const app = express();

const menu = require('./food.json');

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.static('dist'));
app.use(bodyParser.json());

app.get("/menu", (req, res) => {
  res.send(menu);
})

module.exports = app;