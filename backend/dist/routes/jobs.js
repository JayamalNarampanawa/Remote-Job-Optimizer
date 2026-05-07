"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const suitabilityScore_1 = require("../utils/suitabilityScore");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    try {
        const country = req.query.country || "Sri Lanka";
        const timezone = req.query.timezone || "Asia/Colombo"; //Reads values from URL.
        const response = await axios_1.default.get("https://remotive.com/api/remote-jobs");
        const jobs = response.data.jobs;
        // Result shaping + scoring
        const optimizedJobs = jobs.map((job) => {
            const { score, reasons } = (0, suitabilityScore_1.calculateSuitabilityScore)(job, { country, timezone });
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
        optimizedJobs.sort((a, b) => b.score - a.score);
        res.json(optimizedJobs);
    }
    catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({
            message: "Failed to fetch jobs",
        });
    }
});
exports.default = router;
