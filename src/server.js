const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { pool } = require('./config');
const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {
res.json({message: "Server is running"});
})

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("There was a error fetching users:", error);
    res.status(500).json({ error: "I failed to fetch users" });
  }
});

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

module.exports = app;