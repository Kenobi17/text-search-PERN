require("dotenv").config();
const express = require("express"),
  cors = require("cors"),
  port = process.env.PORT || 4000,
  db = require("./database/dbconfig"),
  app = express();

// MIDDLEWARE
app.use(cors());
//ROUTES
app.get("/users", async (req, res) => {
  try {
    const name = req.query.name || "";
    const users = await db.query(
      "SELECT * FROM users WHERE first_name || ' ' || last_name ILIKE $1",
      [`%${name}%`]
    );
    res.json(users.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server up running at http://localhost:${port}`);
});
