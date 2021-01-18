const router = require("express").Router();
const auth = require("../Middleware/auth");
Favorite = require("../Models/Favorite");

//get favorite records

router.get("/get", auth, async(req,res) =>{
    const favorite = await Favorite.find({ userId: req.user});
    res.json(favorite)
  })

//add favorite records by using the update method from edit records


router.post("/add", auth, async(req,res) =>{
  try {

    const { title, artist, rating, genre, description } = req.body;

    const newRecord = new Favorite({
      userId: req.user,
      title,
      artist,
      rating,
      genre,
      description,
      
      
    })
    const savedRecords = await newRecord.save();
    res.json(savedRecords)

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.route("/:id").delete((req, res) => {
  Record.findByIdAndRemove(req.params.id)
    .then(() => res.json("Record deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});
  
  module.exports = router;
