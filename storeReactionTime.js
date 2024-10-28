const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Set up a route for the root URL to serve 'home.html'
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

const PORT = 3000;
const FILE_PATH = "reactionTimes.txt";

app.post("/store-reaction-time", (req, res) => {
  const { reactionTime } = req.body;

  // Format the data to include a timestamp
  const data = `Reaction Time: ${reactionTime} ms - ${new Date().toISOString()}\n`;

  // Append data to the text file
  fs.appendFile(FILE_PATH, data, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return res.status(500).json({ status: "error", message: "Failed to save data" });
    }
    console.log(`Saved reaction time: ${reactionTime} ms`);
    res.json({ status: "success", savedReactionTime: reactionTime });
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
