const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recordSchema = new Schema(
  {
    userId: { type: String },
    favorite: {type: String, default: "false"},
    title: { type: String },
    artist: { type: String },
    rating: { type: String },
    genre: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Records = mongoose.model("Record", recordSchema);

module.exports = Records;
