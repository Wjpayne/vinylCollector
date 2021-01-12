const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    
    displayName: { type: String, minLength: 3 },
    password: { type: String, required: true, minLength: 5 },
    email: { type: String, required: true },
   
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
