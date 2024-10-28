const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

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
