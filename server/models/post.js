const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Content = new Schema({
  src: {
    type: String,
    require: true,
  }
});

const User = new Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
});

const Comments = new Schema({
  User,
  likes: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const Post = new Schema({
  likes: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  content: [Content],
  user: User,
  location: String,
  comment: [Comments],
  caption: String,
});

module.exports = mongoose.model('post', Post)