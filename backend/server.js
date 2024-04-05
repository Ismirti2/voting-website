const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const PORT = 3000;

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yourpassword",
  database: "voting_website",
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Registration endpoint
app.post("/register", (req, res) => {
  const { citizenCardNumber, name, address, password } = req.body;

  // Backend validation
  if (!citizenCardNumber || !name || !address || !password) {
    return res.status(400).send("All fields are required.");
  }

  // Perform additional backend validations here

  // Insert into database
  const sql =
    "INSERT INTO voters (citizen_card_number, name, address, password) VALUES (?, ?, ?, ?)";
  db.query(sql, [citizenCardNumber, name, address, password], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error registering voter.");
    }
    console.log("Voter registered successfully.");
    return res.status(200).send("Voter registered successfully.");
  });
});
///reset app

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
