# Sonu Mandal - Portfolio Frontend Client

Modern, responsive portfolio web application designed for **Sonu Mandal — MERN Stack & Backend Developer**.

## ✨ Design & Visual Features

- **Obsidian Glassmorphism Aesthetic**: Deep cosmic space palette with neon cyan (`#06b6d4`), emerald green (`#10b981`), and violet accents.
- **Modern Typography**: Google Fonts **Outfit** (headings), **Inter** (body), and **JetBrains Mono** (code / terminal / API).
- **Hero Dynamic Typing**: Auto-cycling typing cursor effect highlighting core developer roles.
- **Interactive Code Terminal**: Embedded terminal widget simulating live `curl` and `jq` API responses with copy functionality.
- **Live Server Health Indicator**: Real-time ping monitor showing whether the Express backend is online on port 5000.
- **Projects Showcase & Dynamic Filters**: Filter between Full-Stack MERN and Backend Microservices with preview screenshots, live demo links, and GitHub links.
- **Interactive Architecture & Schema Modal**: Deep dive into Mongoose schemas, REST routes, and Razorpay payment flow for SkillArena, Grocery E-Commerce, and Hostel Booking System.
- **REST API Playground / Explorer**: Built-in interactive API tester allowing recruiters and engineers to test live backend endpoints directly in the browser and inspect HTTP status codes, latency, and formatted JSON output.
- **AJAX Contact Form**: Direct submission to the backend API with client-side validation, loading animations, and toast feedback.
- **Printable ATS-Friendly Resume**: Dedicated printable resume document located at `assets/docs/Sonu_Mandal_Resume.html`.

## 📁 Directory Structure

```text
frontend/
├── index.html                  # Main semantic HTML structure
├── css/
│   └── style.css              # Custom Vanilla CSS design system
├── js/
│   ├── api.js                 # Backend API client with offline fallback
│   └── main.js                # Interactive logic & event listeners
├── assets/
│   ├── images/
│   │   ├── avatar.jpg         # High-resolution developer portrait
│   │   ├── skillarena.jpg     # SkillArena platform screenshot
│   │   ├── grocery.jpg        # Grocery e-commerce screenshot
│   │   └── hostel.jpg         # Hostel booking system screenshot
│   └── docs/
│       └── Sonu_Mandal_Resume.html # Printable ATS resume
└── package.json               # Optional dev server script
```

## 🛠️ How to Run

### Option 1: Via Node / NPX Serve
```bash
npm run dev
# Or: npx serve . -l 3000
```
Then visit `http://localhost:3000`.

### Option 2: Direct via Backend Server
Run the backend server (`node server.js` from `../backend`), then open:
`http://localhost:5000`
The backend automatically serves this frontend!

### Option 3: Direct File Opening
Double-click `index.html` to open directly in any browser. The built-in offline fallback ensures full functionality even without a web server.
