# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

Markdown
# 🏟️ StadiumHub — Full-Stack Sports Broadcast Network

StadiumHub is a high-performance, full-stack MERN application (MongoDB, Express, React, Node.js) built specifically for sports video streaming and live broadcast tracking. Moving away from standard generic video clones, StadiumHub features a real-time live scoreboard ticker, team matchup headers, multi-field regex match search, JWT user authentication, and MongoDB-persisted match watchlists.

---

## ✨ Key Features

* **⚽ Live Sports Scoreboard Ticker:** Top broadcast bar featuring simulated live scores, animated status indicators, and current match timers.
* **⚡ Multi-Field Instant Search & Regex Pipeline:** Real-time search engine querying MongoDB across team names, tournament/league titles, sports, and match titles.
* **🔴 Dedicated Live Stream Filter:** One-click filter toggle to isolate active live broadcasts (`LIVE NOW`) from replays and highlight reels.
* **📺 Custom Match Watch Experience:** Interactive player view with live engagement metrics, match details, player control overlays, and related match recommendations.
* **🔐 JWT User Authentication:** Secure registration and login flow with salted `bcryptjs` password hashing and `jsonwebtoken` session security.
* **💾 Dual-Mode Watchlist Persistence:** MongoDB database watchlist synchronization for logged-in users with seamless `localStorage` fallback for guests.
* **🎨 Stadium Dark Aesthetic & Custom Styling:** High-contrast stadium dark theme (`bg-slate-950`), custom slate scrollbars, standalone user avatar badges, and image fallback handling.

---

## 🛠️ Tech Stack

### Frontend (`client/`)
* **Framework:** [React](https://react.dev/) (Hooks, State Management)
* **Build Tooling:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Iconography:** [Lucide React](https://lucide.dev/)

### Backend (`server/`)
* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose ORM](https://mongoosejs.com/)
* **Authentication:** JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
* **Utilities:** `dotenv`, `cors`, `nodemon`

---

## 📁 Project Architecture

```text
sport-stream/
├── client/                     # React + Vite Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthModal.jsx   # User login & registration modal
│   │   │   ├── Navbar.jsx      # Live score ticker, categories & circular avatar
│   │   │   ├── Sidebar.jsx     # Collapsible navigation drawer
│   │   │   ├── VideoCard.jsx   # Match preview cards with live badges
│   │   │   └── WatchPage.jsx   # Custom video player & recommendations
│   │   ├── App.jsx             # Main view routing & API fetch state
│   │   ├── index.css           # Tailwind directives & custom dark scrollbars
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── server/                     # Node.js + Express + MongoDB Backend
    ├── config/
    │   └── db.js               # MongoDB Mongoose connection
    ├── controllers/
    │   ├── authController.js   # JWT authentication logic
    │   ├── userController.js   # Profile & MongoDB watchlist endpoints
    │   └── videoController.js  # Matches CRUD & search filters
    ├── middleware/
    │   └── authMiddleware.js   # Bearer JWT verification
    ├── models/
    │   ├── User.js             # User Mongoose schema & password hashing
    │   └── Video.js            # Match / Video Mongoose schema
    ├── routes/
    │   ├── authRoutes.js       # /api/auth routes
    │   ├── userRoutes.js       # /api/user routes
    │   └── videoRoutes.js      # /api/videos routes
    ├── .env                    # PORT, MONGO_URI, JWT_SECRET
    ├── package.json
    ├── seeder.js               # Database seeding utility
    └── server.js               # Express application entry point
🔌 API Endpoints
Videos (/api/videos)
GET /api/videos — Fetch matches (supports ?category=, ?search=, ?isLive=true)

GET /api/videos/:id — Fetch single match details

Authentication (/api/auth)
POST /api/auth/register — Create new user account & return JWT

POST /api/auth/login — Authenticate user & return JWT

User & Watchlist (/api/user) — Protected Routes
GET /api/user/profile — Fetch user profile and populated watchlist

POST /api/user/watchlist/:videoId — Toggle match in user's MongoDB watchlist

🚀 Getting Started
Prerequisites
Node.js (v18+ recommended)

MongoDB Community Server running locally on port 27017 (or a MongoDB Atlas connection string)

1. Backend Setup
Bash
cd server
npm install
Create a .env file in the server directory:

Code snippet
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/stadiumhub
JWT_SECRET=stadiumhub_jwt_secret_key_2026
Seed the database with sample sports matches:

Bash
npm run data:import
Start the backend development server:

Bash
npm run dev
(Server runs on http://localhost:5000)

2. Frontend Setup
In a new terminal window:

Bash
cd client
npm install
npm run dev
(Client runs on http://localhost:5173)

📄 License
This project is open-source and available under the MIT License.


---

### Step 2: Commit to Git

Once you've updated `README.md`, save your repository state by running:

```bash
git add README.md
git commit -m "docs: update README with full-stack MERN architecture, API routes, and setup instructions"
git push origin main