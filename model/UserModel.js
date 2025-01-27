const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "Firstname should be at least 3 characters long"],
    },
    lastname: {
      type: String,
      required: false,
      minlength: [3, "last should be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email should be at least 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
    required: false,
  },
});

// Instance Methods
UserSchema.methods.generateAuth = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.comparePassword(password, this.password);
};

UserSchema.static.hashpassword = async function () {
  return await bcrypt.hash(this.password, 10);
};

const userModel = mongoose.model("user", UserSchema);

module.exports = { userModel };
