const express = require("express");
const morgan = require("morgan");
const app = express();
const pool = require("./db");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

//Routes
//add fishes
app.post("/fishes", async (req, res) => {
  try {
    const { name, type } = req.body;
    const newFish = await pool.query(
      "INSERT INTO fishes (name, type) VALUES($1, $2) RETURNING *",
      [name, type]
    );
    res.json(newFish.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all fishes
app.get("/fishes", async (req, res) => {
  try {
    const allFishes = await pool.query("SELECT * FROM fishes");
    res.json(allFishes.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//get a fish
app.get("/fishes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fish = await pool.query("SELECT * FROM fishes WHERE id = $1", [id]);
    res.json(fish.rows[0]);
  } catch (err) {
    console.err(err.message);
  }
});
//update a fishes
app.put("/fishes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;
    const updateFishes = await pool.query(
      "UPDATE fishes SET name=$1, type=$2 WHERE id = $3",
      [name, type, id]
    );
    res.json("Fishes was updated");
  } catch (err) {
    console.error(err.message);
  }
});
//delete a todo
app.delete("/fishes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFish = await pool.query("DELETE FROM fishes WHERE id = $1", [
      id,
    ]);
    res.json("Fish was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3040, function () {
  console.log("Server Started!");
});
