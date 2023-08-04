const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000; // You can use any desired port number

require("dotenv").config();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiKey = process.env.YOUR_API_KEY; // Replace this with your actual YouTube API key

// Endpoint to fetch the search volume using YouTube API
app.get("/api/searchVolume/:keyword", async (req, res) => {
  const { keyword } = req.params;


  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          key: apiKey,
          q: keyword,
          part: "snippet",
          type: "video",
        },
      }
    );

    const searchVolume = response.data.pageInfo.totalResults;
    res.json({ keyword, searchVolume }); 
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch search volume" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
