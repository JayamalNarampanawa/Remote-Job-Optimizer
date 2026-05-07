import express from "express";
import axios from "axios";

import { calculateSuitabilityScore } from "../utils/suitabilityScore";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userRegion =
      (req.query.region as string) || "Sri Lanka"; //Reads values from URL.

    const response = await axios.get(
      "https://remotive.com/api/remote-jobs"
    );

    const jobs = response.data.jobs;

    // Result shaping + scoring
    const optimizedJobs = jobs.map((job: any) => {
      const { score, reasons } =
        calculateSuitabilityScore(job, userRegion);

      return {
        id: job.id,
        title: job.title,
        company: job.company_name,
        location: job.candidate_required_location,
        salary: job.salary || "Not specified",
        tags: job.tags || [],
        url: job.url,
        score,
        reasons,
      };
    });

    // Sort by highest score
    optimizedJobs.sort(
      (a: any, b: any) => b.score - a.score
    );

    res.json(optimizedJobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);

    res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
});

export default router;