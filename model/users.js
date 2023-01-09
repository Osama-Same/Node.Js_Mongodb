const mongoose = require("mongoose");

// by initializing a new schema it is possible to create a document that would hold user information
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  image: { type: String, require: true },
  cloudinary_id: { type: String, require: true },
  authorization: { type: String, require: true },
});

module.exports = mongoose.model("users", userSchema);
