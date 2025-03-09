const express = require("express");
require("dotenv").config();

const app = express();

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.API_KEY;

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//Middleware
app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST");
  next();
});

// API endpoints
app.get("/now-playing", async (req, res) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch now playing movies");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching now playing movies",
      error: error.message,
    });
  }
});
