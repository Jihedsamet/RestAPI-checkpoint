const express = require("express");
const dbconn = require("./config/dbConnect");
const movieSchema = require("./modeles/Movies.js");
require("dotenv").config();
var cors = require("cors");

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

dbconn();

//addmovie
app.post("/addmovie", async (req, res) => {
  try {
    console.log(req.body);
    const newmovie = new movieSchema(req.body);
    await newmovie.save().then((result) => {
      res.status(200).send(result);
    });
  } catch (error) {
    res.status(500).send("unable to add movie");
    console.log(error);
  }
});

//getmovie
app.get("/getmovie", async (req, res) => {
  try {
    const movies = await movieSchema.find();
    res.status(200).send(movies);
  } catch (error) {
    res.status(400).send("no movie");
    console.log(error);
  }
});

//deletemovie
app.delete("/deletemovie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await movieSchema.findByIdAndDelete(id).then(async (result) => {
      
     if (result) {
        let newlist = await movieSchema.find();
        res.status(200).send(newlist)
     } else{
        res.status(200).send("unable to delete ");
    }
        
    });
  } catch (error) {
    res.status(500).send("unable to delete person");
    console.log(error);
  }
});

//start server
app.listen(port, (error) => {
  error
    ? console.log(error)
    : console.log(` server running on ..http://localhost:${port}`);
});
