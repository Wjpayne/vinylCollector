const router = require("express").Router();
const auth = require("../Middleware/auth");
Record = require("../Models/Records");

//get records

router.get("/get", auth, async (req, res) => {
  const records = await Record.find({ userId: req.user });
  res.json(records);
});

//add records
router.post("/add", auth, async (req, res) => {
  try {
    const { title, artist, rating, genre, description } = req.body;

    const newRecord = new Record({
      userId: req.user,
      title,
      artist,
      rating,
      genre,
      description,
      
    });
    const savedRecords = await newRecord.save();
    res.json(savedRecords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get records by id

router.route("/id").get((req, res) => {
  const { id } = req.query;
  Record.findById(id)
    .then((records) => res.json(records))
    .catch((err) => res.status(400).json("Error: " + err));
});

//delete records

router.route("/:id").delete((req, res) => {
  Record.findByIdAndRemove(req.params.id)
    .then(() => res.json("Record deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//edit records

router.route("/update/:id").post((req, res) => {
  Record.findByIdAndUpdate(req.params.id)
    .then((records) => {
      records.title = req.body.title;
      records.artist = req.body.artist;
      records.rating = req.body.rating;
      records.genre = req.body.genre;
      records.description = req.body.description;

      records
        .save()
        .then(() => res.json("Records updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
