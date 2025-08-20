## Upolitic API & App

This project includes a React app (Vite) and an Express + MongoDB API for US election data.

### Prerequisites
- Node 18+
- MongoDB (Atlas or local) connection string

### Setup
1. Create a `.env` file in the project root and set:
   - `MONGO_URI` (e.g., `mongodb://localhost:27017/upolitic` or Atlas SRV)
   - `PORT` (optional; defaults to 3000)
2. Install dependencies:
```bash
npm install
```
3. Seed sample data (optional):
```bash
npm run seed
```
4. Start server:
```bash
npm run start
```
   - Server: `http://localhost:3000` (or your `PORT`)
   - API root: `http://localhost:3000/api`

### API
Base path: `/api`

- `GET /api/health`
- Elections
  - `GET /api/elections?year=2024&type=general&jurisdiction=US`
  - `GET /api/elections/:id`
  - `POST /api/elections`
  - `PATCH /api/elections/:id`
  - `DELETE /api/elections/:id`
- Races
  - `GET /api/races?electionId=<id>&state=US&office=President`
  - `GET /api/races/:id`
  - `GET /api/races/:id/results`
  - `POST /api/races`
  - `PATCH /api/races/:id`
  - `DELETE /api/races/:id`
- Candidates
  - `GET /api/candidates?raceId=<id>&name=alice`
  - `GET /api/candidates/:id`
  - `POST /api/candidates`
  - `PATCH /api/candidates/:id`
  - `DELETE /api/candidates/:id`
- Results
  - `GET /api/results?raceId=<id>&candidateId=<id>`
  - `GET /api/results/:id`
  - `POST /api/results`
  - `PATCH /api/results/:id`
  - `DELETE /api/results/:id`

All POST/PATCH endpoints accept JSON bodies. CORS is enabled for cross-origin use.

