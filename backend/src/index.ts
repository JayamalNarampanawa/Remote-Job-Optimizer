import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import jobsRoutes from "./routes/jobs";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Remote Job Optimizer API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});