# Sonu Mandal - Portfolio Backend API Server

High-performance, modular REST API server built with **Node.js, Express.js, and MVC architecture** for Sonu Mandal's developer portfolio.

## 🚀 Features

- **Strict MVC Architecture**: Organized into Models, Controllers, Routes, and Middleware.
- **RESTful Endpoints**: Full API suite covering developer profile, technical skills, deployed projects, work experience, metrics, and resume details.
- **Persistent Contact Form API**: Validates visitor messages via custom Express middleware and persists them with unique receipt IDs.
- **Real-time Server Health Check**: `/api/health` providing live uptime, system memory, and environment info.
- **CORS & Security**: Configured with CORS for multi-origin access, input sanitization, and centralized error handling.
- **Unified Static Hosting**: Configured to serve the frontend client directly on port `5000` or independently.

## 📁 Architecture & Directory Structure

```text
backend/
├── src/
│   ├── config/
│   │   └── constants.js       # Complete resume & portfolio dataset
│   ├── controllers/
│   │   ├── portfolioController.js  # Endpoints for profile, stats, skills, projects
│   │   └── contactController.js    # Contact message submission & retrieval
│   ├── models/
│   │   └── messageModel.js    # Message persistence & schema validation
│   ├── routes/
│   │   ├── portfolioRoutes.js # Portfolio router definition
│   │   └── contactRoutes.js   # Contact router with validation middleware
│   ├── middleware/
│   │   ├── validator.js       # Input validation & sanitization
│   │   └── errorHandler.js    # Centralized error & 404 handlers
│   └── data/
│       └── messages.json      # Persisted contact messages
├── .env.example
├── .env
├── package.json
└── server.js                  # Express entry point
```

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (.env)
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
# Production / Start
npm start

# Watch mode
npm run dev
```

The server will boot at `http://localhost:5000`.

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Live server health, uptime, and Node runtime |
| `GET` | `/api/profile` | Personal summary, contact details, social links |
| `GET` | `/api/stats` | Real-time counts (deployed apps, CGPA, endpoints) |
| `GET` | `/api/skills` | Categorized technical competencies & proficiency % |
| `GET` | `/api/projects` | All projects with live links & architectural notes |
| `GET` | `/api/projects?category=fullstack` | Filter projects by category |
| `GET` | `/api/projects/:id` | Single project schema & architecture |
| `GET` | `/api/experience` | UpToSkills internship & VGU Jaipur education |
| `GET` | `/api/resume` | Full structured resume payload |
| `POST` | `/api/contact` | Submit visitor message (persisted + email notification dispatched) |
| `GET` | `/api/contact/messages` | Retrieve stored contact submissions |
| `GET` | `/api/contact/email-config` | Get current notification email status |
| `POST` | `/api/contact/email-config` | Update email recipient & SMTP settings |
| `POST` | `/api/contact/test-email` | Send a test notification email |

## 📧 Email Notifications Setup (Gmail SMTP)

Whenever someone submits a message on your portfolio contact form, an instant HTML notification is dispatched to your email (`sonu.bcastudent@gmail.com`).

To activate live delivery:
1. Open your Google Account: [myaccount.google.com](https://myaccount.google.com)
2. Go to **Security** and ensure **2-Step Verification** is turned ON.
3. Search for **App Passwords** (or visit [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)).
4. Create an app named **"Portfolio"**.
5. Copy the 16-character password into `backend/.env` under `EMAIL_PASS`, or configure it directly in the Admin CMS (`admin.html`) under the **Inbox Messages** tab!

