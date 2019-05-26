const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
const validRoles = {
  values: ['ADMIN_ROLE', 'USER_ROLE'],
  message: '{VALUE} no es un rol válido'
}

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre es necesario'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'El username debe ser único'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El e-mail es necesario'],
  },
  password: {
    type: String,
    required: [true, 'la contraseña es obligatoria'],
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

userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

module.exports = mongoose.model('user', userSchema)