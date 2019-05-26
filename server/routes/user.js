const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');

const app = express();

app.get('/user', async (req, res) => {
  let desde = req.query.desde || 0;
  let limite = req.query.limite || 5;
  desde = Number(desde);
  limite = Number(limite);

  const counter = await User.count({ status: true });
  const users = await User.find({ status: true }).skip(desde).limit(limite);

  if (!users) {
    return res.status(400).json({
      ok: false,
      err: err
    });
  }
  res.json({
    ok: true,
    users: users,
    total: counter
  });
});

app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(400).json({
      ok: false,
      err: err
    });
  }
  res.json({
    ok: true,
    persona: user
  });
});

app.post('/user', async (req, res) => {
  let body = req.body;

  let user = new User({
    name: body.name,
    username: body.username,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  const newUser = await user.save();

  if (!newUser) {
    return res.status(400).json({
      ok: false,
      err: err
    });
  }
  res.json({
    ok: true,
    persona: newUser
  });
});

app.put('/user/:id', async (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

  const user = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true });
  if (!user) {
    return res.status(400).json({
      ok: false,
      err: err
    });
  };
  res.json({
    ok: true,
    persona: user
  });
});

app.delete('/user/:id', async (req, res) => {
  const { id } = req.params;
  const deleteUser = {
    status: false
  };
  // const user = await User.findByIdAndRemove(id);
  const user = await User.findByIdAndUpdate(id, deleteUser);
  if (!user) {
    return res.status(400).json({
      ok: false,
      err: err
    });
  };
  res.json({
    ok: true, persona: user
  });
});

module.exports = app;