"use strict";

var express = require('express');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var User = require('../models/user');

var app = express();
app.post('/login', function _callee(req, res) {
  var body;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          body = req.body;
          User.findOne({
            email: body.email
          }, function (err, userDB) {
            if (err) {
              return res.status(500).json({
                ok: false,
                err: err
              });
            }

            if (!userDB) {
              return res.status(400).json({
                ok: false,
                err: {
                  message: "Invalid username or password"
                }
              });
            }

            if (!bcrypt.compareSync(body.password, userDB.password)) {
              return res.status(400).json({
                ok: false,
                err: {
                  message: "Invalid username or password"
                }
              });
            }

            var token = jwt.sign({
              user: userDB
            }, process.env.SEED, {
              expiresIn: process.env.CAR_TOKEN
            });
            res.json({
              ok: true,
              user: userDB.user,
              token: token
            });
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = app;