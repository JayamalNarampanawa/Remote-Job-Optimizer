import { useState } from "react";

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

      const query = new URLSearchParams({ country, timezone }).toString();
      const response = await fetch(`/api/jobs?${query}`);

      if (!response.ok) throw new Error("Failed to fetch jobs");

      const data: Job[] = await response.json();
      setJobs(data);
    } catch {
      setError("Something went wrong while fetching jobs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div>
            <h2 className="text-lg font-extrabold text-white">
              Remote Job Optimizer
            </h2>
            <p className="text-xs text-slate-400">
              Full-Stack TypeScript Assessment
            </p>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              Backend Optimized
            </span>

            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">
              React + TypeScript
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <section className="animate-[fadeIn_0.7s_ease-out] text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 text-2xl">
            💼
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            Remote Job{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
              Optimizer
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-400 sm:text-lg">
            Find remote jobs ranked by timezone compatibility, region match,
            and salary availability.
          </p>
        </section>

        <section className="mt-10 animate-[fadeInUp_0.8s_ease-out] rounded-3xl border border-slate-800 bg-slate-900/70 p-4 shadow-2xl shadow-violet-950/20 backdrop-blur sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3">
              <label className="text-sm text-slate-400">Country / Region</label>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 w-full bg-transparent text-lg font-semibold text-white outline-none"
              />
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3">
              <label className="text-sm text-slate-400">Timezone</label>
              <input
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="mt-1 w-full bg-transparent text-lg font-semibold text-white outline-none"
              />
            </div>

            <button
              onClick={fetchJobs}
              disabled={loading}
              className="rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 px-8 py-4 font-bold text-white shadow-lg shadow-violet-900/30 transition duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Searching..." : "Find Jobs"}
            </button>
          </div>
        </section>

        {error && (
          <p className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-300">
            {error}
          </p>
        )}

        {!loading && jobs.length === 0 && !error && (
          <p className="mt-8 text-center text-slate-400">
            Enter your country and timezone, then click Find Jobs.
          </p>
        )}

        {!loading && jobs.length > 0 && (
          <div className="mt-8 animate-[fadeInUp_0.4s_ease-out] rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-slate-300">
            Showing{" "}
            <span className="font-bold text-emerald-400">{jobs.length}</span>{" "}
            optimized remote jobs
          </div>
        )}

        {loading && (
          <div className="mt-8 grid gap-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-52 animate-pulse rounded-3xl border border-slate-800 bg-slate-900/60"
              />
            ))}
          </div>
        )}

        <section className="mt-6 grid gap-5">
          {jobs.map((job) => (
            <article
              key={job.id}
              className="animate-[fadeInUp_0.4s_ease-out] rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-xl shadow-black/30 transition duration-300 hover:-translate-y-1 hover:border-violet-500/50"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <p className="text-sm font-bold text-violet-400">
                    {job.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold text-white">
                    {job.company}
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
                    <span className="rounded-full border border-slate-700 px-4 py-2">
                      🌍 {job.location}
                    </span>
                    <span className="rounded-full border border-slate-700 px-4 py-2">
                      💰 {job.salary}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags.length > 0 ? (
                      job.tags.slice(0, 6).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300 ring-1 ring-blue-400/20"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-slate-500">
                        No tags available
                      </span>
                    )}
                  </div>

                  <ul className="mt-5 space-y-2 text-slate-300">
                    {job.reasons.map((reason) => (
                      <li key={reason} className="flex items-center gap-2">
                        <span className="text-emerald-400">✓</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-violet-500/80 bg-slate-950 text-3xl font-extrabold text-white">
                    {job.score}
                  </div>
                  <p className="text-sm text-slate-400">Match Score</p>

                  <a
                    href={job.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-violet-500/50 bg-violet-500/10 px-5 py-3 font-bold text-violet-300 transition duration-300 hover:bg-violet-500 hover:text-white"
                  >
                    View Job ↗
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>

      <footer className="mt-16 border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-slate-500 md:flex-row">
          <div>
            Built by{" "}
            <span className="font-semibold text-slate-300">Jayamal</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Remote Job Optimizer</span>
            <span>•</span>
            <span>Innovior Assessment</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;