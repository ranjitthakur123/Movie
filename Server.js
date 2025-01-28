
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password", // Replace with your MySQL password
  database: "movieDB", // Ensure this database is created in MySQL
});



db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// API Endpoints
app.get("/movies", (req, res) => {
  const query = "SELECT * FROM movies";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM movies WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) throw err;
    res.sendStatus(200);
  });
});


// Endpoint to fetch a single movie by ID
app.get("/movies/:id", (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM movieslist WHERE id = ?";
    
    db.query(query, [id], (err, results) => {
        if (err || results.length === 0) {
            res.status(404).send("Movie not found.");
        } else {
            res.json(results[0]);
        }
    });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


