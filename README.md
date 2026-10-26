# Sonu Mandal — Portfolio Website

A modern, full-stack portfolio website built for **Sonu Mandal**, MERN Stack & Backend Developer.

As requested, all backend logic is organized in the **`backend/`** directory, and all frontend assets and code are in the **`frontend/`** directory.

---

## 📂 Project Structure

```text
Portfolio Sonu/
├── backend/                       # All Backend Services (Node.js & Express)
│   ├── src/
│   │   ├── config/constants.js    # Structured portfolio data from resume
│   │   ├── controllers/           # Portfolio & contact controllers
│   │   ├── models/                # Message persistence model
│   │   ├── routes/                # Express API routes
│   │   ├── middleware/            # Input validator & error handlers
│   │   └── data/messages.json     # Saved visitor messages
│   ├── .env                       # Environment configuration
│   ├── package.json               # Backend dependencies
│   ├── server.js                  # Main Express entry point
│   └── README.md
│
├── frontend/                      # All Frontend Assets & Client Code
│   ├── assets/
│   │   ├── images/                # Generated project screenshots & portrait
│   │   │   ├── avatar.jpg
│   │   │   ├── skillarena.jpg
│   │   │   ├── grocery.jpg
│   │   │   └── hostel.jpg
│   │   └── docs/                  # Printable resume document
│   │       └── Sonu_Mandal_Resume.html
│   ├── css/
│   │   └── style.css              # Obsidian glassmorphic design system
│   ├── js/
│   │   ├── api.js                 # API client with smart offline fallback
│   │   └── main.js                # Dynamic typing, interactive terminal & modals
│   ├── index.html                 # Semantic, responsive, SEO-optimized HTML
│   ├── package.json               # Frontend dev scripts
│   └── README.md
│
└── README.md                      # Workspace documentation
```

---

## ⚡ Quick Start

### 1. Start the Backend Server

```bash
cd backend
npm install
npm start
```
The backend server runs at `http://localhost:5000`.

### 2. View the Portfolio Website

You can view the portfolio in two convenient ways:

- **Via the Unified Backend Server**:  
  Open **`http://localhost:5000`** in your browser. The backend server automatically serves the entire frontend and provides live API endpoints!

- **Or Run the Frontend Independently**:  
  ```bash
  cd frontend
  npm run dev
  ```
  Then open **`http://localhost:3000`**.

---

## 🌟 Resume Highlights Included

- **Developer**: Sonu Mandal
- **Role**: MERN Stack Developer | Backend Developer
- **Location**: Jaipur, Rajasthan, India
- **Contact**: +91 8252663421 | sonu.bcastudent@gmail.com
- **LinkedIn**: [linkedin.com/in/sonu-mandal-9b878a344](https://linkedin.com/in/sonu-mandal-9b878a344)
- **GitHub**: [github.com/sonumandal-gh](https://github.com/sonumandal-gh)
- **Education**: Bachelor of Computer Applications (BCA) — Full Stack and Cloud Computing (2024–2027), Vivekananda Global University, Jaipur | **CGPA: 8.48**
- **Internship**: Backend Developer Intern — UpToSkills (UTS) (Jun 2026 – Sep 2026)
- **Deployed Projects**:
  1. **SkillArena**: MERN Stack Coding & DSA Platform (Live: `https://skillarena.sonumandal.in`)
  2. **Grocery Website**: Full-Stack E-Commerce with Razorpay & Google OAuth (Live: `https://grocery.sonumandal.in`)
  3. **Hostel Booking System**: Backend API Services & Postman Testing
- **Certifications**: Backend Developer Internship Certificate — UpToSkills (UTS) 2026

---

## 🛠️ Key Interactive Features

1. **Live Server Health Pill**: Automatically verifies backend status on port `5000` (`🟢 API: Online`).
2. **Hero Typing Animation**: Dynamically switches roles ("MERN Stack Developer", "Backend & REST API Architect").
3. **Hero Terminal Widget**: Interactive tabs for `GET /profile`, `GET /skills`, and `GET /architecture` with one-click JSON copying.
4. **Project Filters**: Toggle between "All Projects", "Full-Stack MERN", and "Backend Services".
5. **Architecture & Schema Deep Dive**: Modals for inspecting Mongoose schemas, REST routes, and payment verification flow.
6. **Live REST API Playground**: An in-browser API explorer to execute requests to `/api/health`, `/api/profile`, `/api/projects`, `/api/stats`, and inspect live latency and status codes.
7. **Interactive Contact Form**: Submits messages directly to the Express backend (`POST /api/contact`) with validation and toast notifications.
8. **Printable / Downloadable Resume**: ATS-compliant HTML/PDF printable version.
