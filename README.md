# Remote Job Optimizer

A full-stack TypeScript application that helps users discover remote jobs optimized for their country, region, and timezone preferences.

The application fetches remote job listings from the Remotive public API, calculates a custom Suitability Score for each job, shapes and optimizes the API response, and displays ranked jobs in a clean React frontend.

---

# Live Demo -

Hosted on Render - https://remote-job-optimizer.onrender.com/

---

# Features

- Fetches live remote jobs from the Remotive API
- Optimizes jobs using a custom Suitability Score algorithm
- Supports country and timezone preferences
- Ranks jobs based on compatibility
- Backend result shaping to reduce unnecessary payload data
- Clean React + TypeScript frontend
- Responsive and user-friendly UI
- Loading, empty, and error states handled properly

---

# Why This Project Matters

This project focuses not only on frontend UI development, but also on backend engineering concepts such as:

- API result shaping
- data optimization
- recommendation algorithms
- middleware architecture
- frontend/backend separation
- scalable TypeScript structure

The goal was to demonstrate practical engineering decision-making under realistic constraints.

---

# Tech Stack

## Frontend
- React
- TypeScript
- Vite
- CSS

## Backend
- Node.js
- Express.js
- TypeScript
- Axios

---

# Project Structure

```txt
remote-job-optimizer/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.ts
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   └── App.css
│
└── README.md
```

---

# How to Run the Project

## Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# API Architecture

```txt
Frontend
   ↓
Node.js Backend
   ↓
Remotive Public API
```

The backend acts as a middleware layer between the frontend and the external API.

This allows:
- result shaping
- scoring logic
- filtering
- bandwidth optimization
- centralized API handling

---

# Suitability Score Algorithm

Each job receives a custom score based on several conditions.

## Scoring Rules

| Condition | Score |
|---|---|
| Country/region match | +40 |
| Timezone match | +30 |
| Worldwide/remote-friendly location | +25 |
| Salary information available | +25 |
| Technology tags available | +10 |

Jobs are sorted from highest score to lowest score before being sent to the frontend.

---

# Result Shaping

The Remotive API returns very large nested JSON payloads.

The frontend only needs a small subset of data.

The backend performs strict result shaping before sending data to the frontend.

## Raw API Data

The original API contains:
- unnecessary metadata
- nested objects
- unused fields
- large payload sizes

## Optimized Response

The backend only returns:

```ts
{
  id,
  title,
  company,
  location,
  salary,
  tags,
  url,
  score,
  reasons
}
```

This significantly reduces payload size and improves frontend efficiency.

---

# Important Design Decisions

## 1. Backend Result Shaping

Instead of allowing the frontend to directly consume the external API, the backend shapes and optimizes the response.

Why:
- improves performance
- reduces bandwidth
- simplifies frontend logic
- follows real-world backend architecture patterns

---

## 2. Explainable Suitability Score

The scoring system not only calculates a score but also returns human-readable reasons.

Example:

```txt
- Remote-friendly location
- Salary information is available
```

Why:
- improves transparency
- easier debugging
- better user experience

---

## 3. Separation of Concerns

The project separates:
- routes
- utility logic
- frontend UI
- API communication

Why:
- cleaner architecture
- maintainability
- scalability
- easier debugging

---

# AI Usage

AI tools such as ChatGPT were used for:
- architecture planning
- TypeScript guidance
- debugging support
- algorithm refinement
- README structuring

All implementation decisions, integration, debugging, and customization were completed manually.

---

# Future Improvements

Possible future improvements include:

- authentication
- pagination
- advanced filtering
- caching API responses
- database persistence
- machine learning-based recommendations
- job bookmarking
- dark mode
- responsive mobile optimization

---

# Challenges Faced

- Handling large API payloads
- Designing a balanced scoring algorithm
- Structuring backend architecture cleanly
- Managing frontend/backend communication
- Debugging TypeScript import paths

---

# Final Notes

This project focuses heavily on:
- backend optimization
- API architecture
- result shaping
- algorithmic ranking
- engineering decision-making

The goal was not just to build a UI, but to demonstrate practical full-stack engineering concepts under realistic constraints.
