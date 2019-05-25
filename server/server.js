const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

let port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/index'));

mongoose.connect('mongodb+srv://dommirr:aika99.,@cluster0-f5igf.mongodb.net/instacats-dev?retryWrites=true', { useNewUrlParser: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connect to mongodb');
});

app.listen(port, () => {
  console.log('Listen on port ', port)
});