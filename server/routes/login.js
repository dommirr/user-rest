const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

var app = express();


app.post('/login', (req, res) => {

  let body = req.body;

  console.log(body);


  User.findOne({ email: body.email }, (err, userDB) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (!userDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario o contraseña incorrectos"
        }
      });
    }

    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuario o contraseña incorrectos"
        }
      });
    }

    res.json({
      ok: true,
      user: userDB.user,
      token: '123'
    });
  });
});



module.exports = app;