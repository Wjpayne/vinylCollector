const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
  {
    userId: { type: String },
    title: { type:String },
    favorite: { type: String, default: "false" },
    artist: { type: String },
    rating: { type: String },
    genre: { type: String },
    description: {type: String},
    
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model("favorite", favoriteSchema);

module.exports = Favorite;
