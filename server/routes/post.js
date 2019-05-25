const express = require('express');
const Post = require('../models/post');

var app = express();

app.post('/posts', async (req, res) => {

  let body = req.body;

  let post = new Post({
    content: body.content,
    likes: body.likes,
    user: body.user,
    location: body.location,
    comment: body.comment,
    caption: body.caption
  });

  post = await post.save();

  if (!post) {
    return res.status(400).json({
      ok: false,
      err: err
    });
  }
  res.json({
    ok: true,
    post: post
  });
});

app.get('/posts', async (req, res) => {

  const posts = await Post.find({});

  if (!posts) {
    return res.status(400).json({
      ok: false,
      err: err
    });
  }

  res.json({
    ok: true,
    posts,
  });
});

// app.delete('/user/:id', async (req, res) => {
//   const { id } = req.params;
//   const deletePost = {
//     status: false
//   };

//   const delPost = await Post.findByIdAndUpdate(id, deletePost);
//   if (!delPost) {
//     return res.status(400).json({
//       ok: false,
//       err: err
//     });
//   };
//   res.json({
//     ok: true, post: delPost
//   });
// });

module.exports = app;
