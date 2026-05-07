import { useState } from "react";
import "./App.css";

type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  tags: string[];
  url: string;
  score: number;
  reasons: string[];
};

function App() {
  const [country, setCountry] = useState("Sri Lanka");
  const [timezone, setTimezone] = useState("Asia/Colombo");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const query = new URLSearchParams({
        country,
        timezone,
      }).toString();

      const response = await fetch(`http://localhost:5000/api/jobs?${query}`);

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data: Job[] = await response.json();
      setJobs(data);
    } catch {
      setError("Something went wrong while fetching jobs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <section className="hero">
        <h1>Remote Job Optimizer</h1>
        <p>
          Find remote jobs ranked by timezone compatibility, region match, and
          salary availability.
        </p>

        <div className="search-box">
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country / Region"
          />

          <input
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            placeholder="Timezone"
          />

          <button onClick={fetchJobs} disabled={loading}>
            {loading ? "Searching..." : "Find Jobs"}
          </button>
        </div>
      </section>

      {error && <p className="error">{error}</p>}
      
      {!loading && jobs.length > 0 && (
         <p className="result-count">
           Showing {jobs.length} optimized remote jobs
         </p>
      )}

      {!loading && jobs.length === 0 && !error && (
        <p className="empty-state">
       Enter your country and timezone, then click Find Jobs.
      </p>
      )}

      <section className="jobs-list">
        {jobs.map((job) => (
          <article key={job.id} className="job-card">
            <div className="job-header">
              <div>
                <h2>{job.title}</h2>
                <p>{job.company}</p>
              </div>
              <span className="score">{job.score}</span>
            </div>

            <p>
              <strong>Location:</strong> {job.location}
            </p>

            <p>
              <strong>Salary:</strong> {job.salary}
            </p>

            <div className="tags">
              {job.tags.slice(0, 5).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <ul>
              {job.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>

            <a href={job.url} target="_blank" rel="noreferrer">
              View Job
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;