type Job = {
  candidate_required_location?: string;
  salary?: string;
  tags?: string[];
};

export const calculateSuitabilityScore = (
  job: Job,
  userRegion: string
) => {
  let score = 0;

  const reasons: string[] = [];

  const location = job.candidate_required_location?.toLowerCase() || "";

  // Region match
  if (location.includes(userRegion.toLowerCase())) {
    score += 40;
    reasons.push("Region/timezone compatible");
  }

  // Worldwide remote jobs
  if (
    location.includes("worldwide") ||
    location.includes("anywhere")
  ) {
    score += 25;
    reasons.push("Worldwide remote friendly");
  }

  // Salary exists
  if (job.salary && job.salary.trim() !== "") {
    score += 25;
    reasons.push("Salary information available");
  }

  // Relevant tags exist
  if (job.tags && job.tags.length > 0) {
    score += 10;
    reasons.push("Relevant technology tags included");
  }

  return {
    score,
    reasons,
  };
};