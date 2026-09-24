# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

```markdown
# 🏟️ StadiumHub — Sports Video & Broadcast Network

StadiumHub is a high-performance, sports-only video streaming platform designed to deliver a dedicated broadcast experience for football, cricket, tennis, motorsport, and combat sports. Built with modern React, Vite, and Tailwind CSS, StadiumHub moves away from standard video platform visual clones by incorporating real-time scoreboard tickers, team matchup headers, live stream toggles, and browser-persisted watchlists.

---

## ✨ Key Features

* **⚽ Live Sports Scoreboard Ticker:** Fixed top broadcast bar featuring simulated live scores, animated status indicators, and current match timers.
* **⚡ Multi-Field Instant Search:** Real-time search engine filtering videos across team names, tournament/league names, sports, and match titles.
* **🔴 Dedicated Live Stream Filter:** One-click filter toggle to isolate active live broadcasts (`LIVE NOW`) from replays and highlight reels.
* **📺 Custom Match Watch Experience:** Dedicated player view with interactive like metrics, match details, player control overlays, and related match recommendations.
* **💾 LocalStorage Watchlist Persistence:** Bookmark system using `localStorage` for saving matches, accessible via a dedicated Watchlist drawer menu.
* **🛡️ Robust UI Fallbacks & Custom Aesthetics:** High-contrast stadium dark layout (`bg-slate-950`), custom ultra-thin scrollbars, and image load error handling to maintain UI integrity.

---

## 🛠️ Tech Stack

* **Frontend Framework:** [React](https://react.dev/) (Hooks, State Management)
* **Build Tooling:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v3 via PostCSS & Autoprefixer)
* **Iconography:** [Lucide React](https://lucide.dev/)
* **Storage:** Web Browser `localStorage` API

---

## 📁 Project Architecture

```text
stadium-hub/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Integrated search, live score ticker, live stream toggle & categories
│   │   ├── Sidebar.jsx      # Sleek collapsible sidebar navigation with glowing indicators
│   │   ├── VideoCard.jsx    # Match card featuring status badges, duration overlays & image fallbacks
│   │   └── WatchPage.jsx    # Custom video player view, like buttons, watchlist & related queue
│   ├── data/
│   │   └── mockVideos.js    # Sports dataset (teams, leagues, match status, views, durations)
│   ├── App.jsx              # Main view routing, search/filter pipeline & state management
│   ├── index.css            # Tailwind directives & custom sleek scrollbar utilities
│   └── main.jsx             # React entry point
├── public/
├── package.json
└── README.md

```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/?utm_source=gemini) installed on your machine.

### Installation

1. **Clone the repository:**
```bash
git clone [https://github.com/](https://github.com/)<YOUR-USERNAME>/stadium-hub.git
cd stadium-hub

```


2. **Install dependencies:**
```bash
npm install

```


3. **Start the local development server:**
```bash
npm run dev

```


4. Open your browser and navigate to `http://localhost:5173`.

---

## 🎯 Future Enhancements

* Integration with real-time sports data APIs (e.g., live score webhooks).
* Custom video player controls for quality switching (1080p / 60fps) and playback speed.
* Team subscription and custom user match notification center.

---

## 📄 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE&utm_source=gemini).

```

---

### Step to Save to Git:

After creating your `README.md` file, save your final repository state by running:

```bash
git add README.md
git commit -m "docs: add comprehensive README documentation for StadiumHub"
git push origin main

```