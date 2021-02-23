const router = require("express").Router();
const auth = require("../Middleware/auth");
const Favorite = require("../Models/Favorite");

//get favorite records

router.get("/get", auth, async (req, res) => {
  const favorite = await Favorite.find({ userId: req.user });
  res.json(favorite);
});

//add favorite records by using the update method from edit records

router.post("/add", auth, async (req, res) => {
  try {
    const { title, artist, rating, genre, description } = req.body;

    const newRecord = new Favorite({
      userId: req.user,
      title,
      artist,
      rating,
      genre,
      description,
      isFavorite: "1"
    });
    const savedRecords = await newRecord.save();
    res.json(savedRecords, {status: "success"});
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route("/delete").delete((req, res) => {
  Favorite.deleteOne({ title: req.body.title })
    .then(() => res.json("Record deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
