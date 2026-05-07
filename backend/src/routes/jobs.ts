import express from "express";
import axios from "axios";

const router = express.Router(); 
// to split backend logic into separate modules (separate features)

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://remotive.com/api/remote-jobs"
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching jobs:", error);

    res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
});

export default router;