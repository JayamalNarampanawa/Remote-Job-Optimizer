import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import jobsRoutes from "./routes/jobs";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobsRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    message: "Remote Job Optimizer API is running",
  });
});

const frontendDistPath = path.join(__dirname, "../../frontend/dist");

app.use(express.static(frontendDistPath));

app.use((req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});