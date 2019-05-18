const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/index'));

mongoose.connect('mongodb+srv://dommirr:aika99.,@cluster0-f5igf.mongodb.net/instacats-dev?retryWrites=true', (err, res) => {
  if (err) throw err;
  console.log('Connect to Mongodb')
})

app.listen(port, () => {
  console.log('Listen on port ', port)
});