const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');
const { verifyToken } = require('../middlewares/auth')

const app = express();

app.get('/users', verifyToken, async (req, res) => {
  try {
    let from = req.query.from || 0;
    let limit = req.query.limit || 5;
    from = Number(from);
    limit = Number(limit);

    const counter = await User.count({ status: true });
    const users = await User.find({ status: true }).skip(from).limit(limit);

    res.json({
      ok: true,
      users,
      total: counter
    });
  }
  catch (err) {
    return res.status(400).json({
      ok: false,
      err: err
    });
  }
});

app.get('/user/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    res.json({
      ok: true,
      user
    });
  }
  catch (err) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "User does not exist."
      }
    });
  }
});

app.get('/user/profile/:username', verifyToken, async (req, res) => {
  const { username } = req.params;
  const Username = await User.findOne({ username });

  if (!Username) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "User does not exist."
      }
    });
  }
  res.json({
    ok: true,
    username: Username
  });
});

app.post('/user', async (req, res) => {
  try {
    let body = req.body;
    let user = new User({
      name: body.name,
      username: body.username,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      role: body.role
    });

    const newUser = await user.save();

    res.json({
      ok: true,
      user: newUser
    });
  }
  catch (err) {
    return res.status(400).json({
      ok: false,
      err
    });
  }
});

app.put('/user/:id', verifyToken, async (req, res) => {
  try {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);
    const user = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    res.json({
      ok: true,
      user
    });
  }
  catch (err) {
    return res.status(400).json({
      ok: false,
      err: {
        message: err.message,
      }
    });
  }
});

app.delete('/user/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = {
      status: false
    };
    // const user = await User.findByIdAndRemove(id);
    const user = await User.findByIdAndUpdate(id, deleteUser);
    res.json({
      ok: true,
      user
    });
  }
  catch (err) {
    return res.status(400).json({
      ok: false,
      err: {
        message: "Usuario no existe."
      }
    });
  }
});

module.exports = app;