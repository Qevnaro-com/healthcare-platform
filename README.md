# Pulse n Care — Healthcare Platform

[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Council-registered nurses and verified caregivers at your doorstep in Delhi NCR. Post-operative care, elderly care, palliative care, and newborn & mother care with a 24x7 clinical care desk.

---

## 🚀 Features

- **Home Nursing & Clinical Care:** Post-operative, palliative, ICU-at-home, elder care, and mother & child nursing.
- **Service Discovery & Interactive Cost Calculator:** Instant estimate calculation for transparent healthcare budgeting.
- **Interactive Leaflet Geo-Coverage:** Delhi NCR operational hubs (Delhi, Gurugram, Noida, Faridabad, Ghaziabad).
- **Responsive & 60fps Smooth UI:** Glassmorphism accents, Framer Motion animations, accessible forms, and zero layout shift.
- **SPA Routing & Vercel Ready:** Client-side routing with deep link fallback configured via `vercel.json`.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS v4 + PostCSS
- **Animations:** Framer Motion, Lottie-React
- **Icons:** Lucide React
- **Mapping:** Leaflet & @types/leaflet
- **Linter:** Oxlint

---

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pulsencare-rgb/healthcare-platform.git
   cd healthcare-platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Outputs production assets to the `dist/` directory.

---

## 🌐 Deployment (Vercel)

This project includes a pre-configured `vercel.json` for single-page application (SPA) routing:

1. Import the repository in [Vercel](https://vercel.com).
2. Framework Preset: **Vite**
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**.

---

## 📄 License & Attribution

Pulse n Care © 2026. All rights reserved.
