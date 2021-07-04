"use strict";

var express = require('express');

var bcrypt = require('bcrypt');

var _ = require('underscore');

var User = require('../models/user');

var _require = require('../middlewares/auth'),
    verifyToken = _require.verifyToken;

var app = express();
app.get('/users', verifyToken, function _callee(req, res) {
  var from, limit, counter, users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          from = req.query.from || 0;
          limit = req.query.limit || 5;
          from = Number(from);
          limit = Number(limit);
          _context.next = 7;
          return regeneratorRuntime.awrap(User.count({
            status: true
          }));

        case 7:
          counter = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(User.find({
            status: true
          }).skip(from).limit(limit));

        case 10:
          users = _context.sent;
          res.json({
            ok: true,
            users: users,
            total: counter
          });
          _context.next = 17;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(400).json({
            ok: false,
            err: _context.t0
          }));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
});
app.get('/user/:id', verifyToken, function _callee2(req, res) {
  var id, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            _id: id
          }));

        case 4:
          user = _context2.sent;
          res.json({
            ok: true,
            user: user
          });
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(400).json({
            ok: false,
            err: {
              message: "User does not exist."
            }
          }));

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
});
app.get('/user/profile/:username', verifyToken, function _callee3(req, res) {
  var username, Username;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          username = req.params.username;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            username: username
          }));

        case 3:
          Username = _context3.sent;

          if (Username) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            ok: false,
            err: {
              message: "User does not exist."
            }
          }));

        case 6:
          res.json({
            ok: true,
            username: Username
          });

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.post('/user', function _callee4(req, res) {
  var body, user, newUser;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          body = req.body;
          user = new User({
            name: body.name,
            username: body.username,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role
          });
          _context4.next = 5;
          return regeneratorRuntime.awrap(user.save());

        case 5:
          newUser = _context4.sent;
          res.json({
            ok: true,
            user: newUser
          });
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(400).json({
            ok: false,
            err: _context4.t0
          }));

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
app.put('/user/:id', verifyToken, function _callee5(req, res) {
  var id, body, user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);
          _context5.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(id, body, {
            "new": true,
            runValidators: true
          }));

        case 5:
          user = _context5.sent;
          res.json({
            ok: true,
            user: user
          });
          _context5.next = 12;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(400).json({
            ok: false,
            err: {
              message: _context5.t0.message
            }
          }));

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
app["delete"]('/user/:id', verifyToken, function _callee6(req, res) {
  var id, deleteUser, user;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          deleteUser = {
            status: false
          }; // const user = await User.findByIdAndRemove(id);

          _context6.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(id, deleteUser));

        case 5:
          user = _context6.sent;
          res.json({
            ok: true,
            user: user
          });
          _context6.next = 12;
          break;

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", res.status(400).json({
            ok: false,
            err: {
              message: "Usuario no existe."
            }
          }));

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = app;