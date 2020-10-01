require("dotenv").config();
const express = require("express"),
  cors = require("cors"),
  port = process.env.PORT || 4000,
  db = require("./database/dbconfig"),
  app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
//ROUTES

app.listen(port, () => {
  console.log(`Server up running at http://localhost:${port}`);
});
