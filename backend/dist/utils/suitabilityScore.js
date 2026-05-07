"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSuitabilityScore = void 0;
const calculateSuitabilityScore = (job, userPreference) => {
    let score = 0;
    const reasons = [];
    const location = job.candidate_required_location?.toLowerCase() || "";
    const country = userPreference.country.toLowerCase();
    const timezone = userPreference.timezone.toLowerCase();
    if (country && location.includes(country)) {
        score += 40;
        reasons.push("Job location matches your country/region");
    }
    if (timezone && location.includes(timezone)) {
        score += 30;
        reasons.push("Job mentions your timezone");
    }
    if (location.includes("worldwide") ||
        location.includes("anywhere") ||
        location.includes("remote")) {
        score += 25;
        reasons.push("Remote-friendly location");
    }
    if (job.salary && job.salary.trim() !== "") {
        score += 25;
        reasons.push("Salary information is available");
    }
    if (job.tags && job.tags.length > 0) {
        score += 10;
        reasons.push("Technology tags are available");
    }
    return {
        score,
        reasons,
    };
};
exports.calculateSuitabilityScore = calculateSuitabilityScore;
