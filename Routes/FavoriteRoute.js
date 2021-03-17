const router = require("express").Router();
const auth = require("../Middleware/auth");
const Favorite = require("../Models/Favorite");

//get favorite records

router.get("/get", auth, async (req, res) => {
  const favorite = await Favorite.find({ userId: req.user });
  res.json(favorite);
});

//add favorite records

router.post("/add", auth, async (req, res) => {
  try {
    const { title, artist, rating, genre, description } = req.body;

    const newRecord = new Favorite({
      userId: req.user,
      favorite: "true",
      title,
      artist,
      rating,
      genre,
      description,
    });
    await newRecord.save();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route("/delete").delete((req, res) => {
  Favorite.deleteOne({ favoriteTitle: req.body.favoriteTitle })
    .then(() => res.json("Record deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
