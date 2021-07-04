const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('./config/config');

const app = express();

let port = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/index'));

mongoose.connect(process.env.DEV, { useNewUrlParser: true });

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // eslint-disable-line
db.once('open', function () {
  console.log('connect to mongodb'); // eslint-disable-line
});

app.listen(port, () => {
  console.log('Listen on port ', port); // eslint-disable-line
});
