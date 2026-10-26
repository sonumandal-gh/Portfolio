/**
 * Sonu Mandal Portfolio - API Client
 * Connects frontend directly to Express backend with smart offline fallback
 */

const API_BASE_URL = window.PORTFOLIO_API_URL || (
  window.location.port === '5000'
    ? '/api'
    : (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:')
      ? 'http://localhost:5000/api'
      : '/api'
);

const FALLBACK_DATA = {
  profile: {
    name: "Sonu Mandal",
    role: "MERN Stack Developer | Backend Developer",
    location: "Jaipur, Rajasthan, India",
    phone: "+91 8252663421",
    email: "sonu.bcastudent@gmail.com",
    linkedin: "https://linkedin.com/in/sonu-mandal-9b878a344",
    github: "https://github.com/sonumandal-gh",
    summary:
      "MERN Stack Developer and BCA student (CGPA 8.48) with a backend internship and 2 live full-stack applications deployed. Experienced in building REST APIs with Node.js, Express.js and MongoDB, and in implementing JWT authentication, Google OAuth, Razorpay payments and MVC architecture across 3 backend projects.",
    status: "Available for Full-time Roles & Internships",
    cgpa: "8.48",
    avatar: "assets/images/avatar.jpg"
  },
  stats: [
    { label: "Live Deployed Apps", value: "2+", icon: "rocket" },
    { label: "Backend Projects", value: "3+", icon: "server" },
    { label: "Academic CGPA", value: "8.48", icon: "award" },
    { label: "REST Endpoints Engineered", value: "30+", icon: "code" }
  ],
  projects: [
    {
      id: "skillarena",
      title: "SkillArena — MERN Stack Coding & DSA Platform",
      category: "Full Stack",
      duration: "Jul 2026 – Present",
      status: "Live & Active",
      liveUrl: "https://skillarena.sonumandal.in",
      githubUrl: "https://github.com/sonumandal-gh",
      image: "assets/images/skillarena.jpg",
      badge: "Flagship Project",
      shortDescription:
        "High-performance coding and DSA practice platform with live test case execution, XP scoring, and real-time leaderboard ranking.",
      techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "REST API", "JWT"],
      keyHighlights: [
        "Engineered a MERN-stack coding and DSA practice platform with JWT-secured user sessions, deployed live.",
        "Implemented REST endpoints across 5 feature areas: challenge management, code submissions, XP scoring, user statistics and leaderboard ranking.",
        "Designed Mongoose models and MVC controllers, integrated with a React.js frontend."
      ],
      apiFeatures: [
        "POST /api/challenges/submit — Evaluate user code & award XP dynamically",
        "GET /api/leaderboard — Compute real-time rank ordering based on global XP",
        "GET /api/user/stats — Aggregate solved challenges & streak metrics"
      ]
    },
    {
      id: "grocery-website",
      title: "Grocery Website — Full Stack E-Commerce Application",
      category: "Full Stack",
      duration: "Jan 2026 – Mar 2026",
      status: "Deployed Live",
      liveUrl: "https://grocery.sonumandal.in",
      githubUrl: "https://github.com/sonumandal-gh",
      image: "assets/images/grocery.jpg",
      badge: "E-Commerce + Payments",
      shortDescription:
        "Full-stack MERN e-commerce store with dual auth (JWT & Google OAuth), inventory management, and complete Razorpay payment integration.",
      techStack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "React.js", "JWT", "Google OAuth", "Razorpay"],
      keyHighlights: [
        "Developed a full-stack e-commerce platform on the MERN stack with MVC architecture, deployed live.",
        "Architected REST APIs for 4 modules (products, cart, orders, users), each supporting full CRUD operations.",
        "Secured routes with 2 authentication methods: JWT sessions and Google OAuth, restricting sensitive endpoints to logged-in users.",
        "Integrated the Razorpay payment gateway, enabling an end-to-end checkout flow from shopping cart to paid order confirmation."
      ],
      apiFeatures: [
        "POST /api/payment/razorpay/order — Generate secure order signature & keys",
        "POST /api/payment/verify — Verify Razorpay cryptographic HMAC webhook/payload",
        "GET /api/cart & PUT /api/cart — Atomic cart synchronization per authenticated user"
      ]
    },
    {
      id: "hostel-booking-system",
      title: "Hostel Booking System — Backend Services",
      category: "Backend API",
      duration: "Mar 2025 – Apr 2025",
      status: "Completed",
      liveUrl: null,
      githubUrl: "https://github.com/sonumandal-gh",
      image: "assets/images/hostel.jpg",
      badge: "Backend Microservices",
      shortDescription:
        "Modular backend services managing hostel room allocations, room availability checks, pricing tiers, and Postman-tested REST APIs.",
      techStack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST API", "Postman"],
      keyHighlights: [
        "Delivered backend services for hostel room booking, covering room creation, updates and availability checks.",
        "Added validation and error handling to keep data consistent and API responses reliable.",
        "Tested every endpoint in Postman throughout development."
      ],
      apiFeatures: [
        "GET /api/rooms/availability — Dynamic check across date ranges and room tiers",
        "POST /api/rooms — Admin-protected room creation with validation middleware",
        "POST /api/bookings — Atomically book room with double-booking prevention"
      ]
    }
  ]
};

const PortfolioAPI = {
  baseUrl: API_BASE_URL,
  isOnline: false,

  async checkServerHealth() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const response = await fetch(`${this.baseUrl}/health`, {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        this.isOnline = true;
        return { online: true, details: data };
      }
      this.isOnline = false;
      return { online: false, error: 'Bad status' };
    } catch (err) {
      this.isOnline = false;
      return { online: false, error: err.message };
    }
  },

  async getProfile() {
    try {
      const response = await fetch(`${this.baseUrl}/profile`);
      if (!response.ok) throw new Error('Network error');
      const json = await response.json();
      return json.data;
    } catch {
      return FALLBACK_DATA.profile;
    }
  },

  async getStats() {
    try {
      const response = await fetch(`${this.baseUrl}/stats`);
      if (!response.ok) throw new Error('Network error');
      const json = await response.json();
      return json.data;
    } catch {
      return FALLBACK_DATA.stats;
    }
  },

  async getProjects(category = 'all') {
    try {
      const url = category && category !== 'all' 
        ? `${this.baseUrl}/projects?category=${encodeURIComponent(category)}`
        : `${this.baseUrl}/projects`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network error');
      const json = await response.json();
      return json.data;
    } catch {
      if (category === 'all') return FALLBACK_DATA.projects;
      return FALLBACK_DATA.projects.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }
  },

  async getSkills() {
    try {
      const response = await fetch(`${this.baseUrl}/skills`);
      if (!response.ok) throw new Error('Network error');
      const json = await response.json();
      return json.data;
    } catch {
      return null; // Frontend has complete semantic skills markup
    }
  },

  async getExperience() {
    try {
      const response = await fetch(`${this.baseUrl}/experience`);
      if (!response.ok) throw new Error('Network error');
      const json = await response.json();
      return json.data;
    } catch {
      return null;
    }
  },

  async sendContactMessage(payload) {
    try {
      const response = await fetch(`${this.baseUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const contentType = response.headers.get('content-type') || '';
      let data = {};
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const rawText = await response.text();
        throw new Error(`Server returned HTTP ${response.status}. Please make sure backend is running.`);
      }

      if (!response.ok) {
        throw new Error(data.message || (data.errors && data.errors.join(', ')) || 'Submission failed');
      }
      return data;
    } catch (err) {
      throw err;
    }
  },

  async testEndpoint(endpoint) {
    const startTime = performance.now();
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      const duration = Math.round(performance.now() - startTime);
      const data = await response.json();
      return {
        status: response.status,
        statusText: response.statusText,
        duration,
        data
      };
    } catch (err) {
      const duration = Math.round(performance.now() - startTime);
      // If backend unreachable, return synthetic demonstration response
      return {
        status: 200,
        statusText: 'OK (Cached/Local Simulation)',
        duration: Math.max(duration, 12),
        data: endpoint === '/profile' 
          ? FALLBACK_DATA.profile 
          : endpoint === '/stats' 
            ? FALLBACK_DATA.stats 
            : FALLBACK_DATA.projects
      };
    }
  }
};

window.PortfolioAPI = PortfolioAPI;
