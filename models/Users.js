const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//User schema content
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  avatar: {
    type: String
  }
});

module.exports = User = mongoose.model("users", UserSchema);
