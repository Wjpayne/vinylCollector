const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
  {
    userId: { type: String },
    title: { type: String },
    artist: { type: String },
    rating: { type: String },
    genre: { type: String },
    description: {type: String},
    isFavorite: { type: String }
    
  },
  {
    timestamps: true,
  }
);

const Favorite = mongoose.model("favorite", favoriteSchema);

module.exports = Favorite;
