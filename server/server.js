const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/index'));

mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
  if (err) throw err;
  console.log('Connect to Mongodb')
})

app.listen(port, () => {
  console.log('Listen on port ', port)
});