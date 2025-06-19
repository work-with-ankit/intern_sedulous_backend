const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  otp: {
    type: Number,
    min: 1000,
    max: 9999
  },
  otpExpiry: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
