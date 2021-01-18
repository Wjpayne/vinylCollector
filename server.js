const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

//setup express

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});


const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");

  const recordRouter = require("./Routes/RecordRoute");
  const usersRouter = require("./Routes/UserRoute");
  const favoriteRouter = require("./Routes/FavoriteRoute");

  app.use("/record", recordRouter);
  app.use("/users", usersRouter);
  app.use("/favorite", favoriteRouter)
});






if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("/profile", (req, res) => {
    res.sendFile(path.join (__dirname, "client", "build", "index.html"));
  });
}



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
