const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const validRoles = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} is not valid role'
}

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Username must be unique'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'E-mail is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: validRoles
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  },
  followers: [
    {
      type: Schema.Types.ObjectId, ref: 'User'
    }
  ],
  following: [
    {
      type: Schema.Types.ObjectId, ref: 'User'
    }
  ],
});

userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('user', userSchema)