const express = require("express");
const router = express.Router();
const pool = require("../db");

//Routes
//add fishes
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    const allFishes = await pool.query("SELECT * FROM fishes");
    res.json(allFishes.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//get a fish
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fish = await pool.query("SELECT * FROM fishes WHERE id = $1", [id]);
    res.json(fish.rows[0]);
  } catch (err) {
    console.err(err.message);
  }
});
//update a fishes
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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

module.exports = router;
