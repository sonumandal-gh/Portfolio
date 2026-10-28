/**
 * Sonu Mandal - Portfolio Main Logic & Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypingEffect();
  initProjectFilters();
  initContactForm();
  initCopyButtons();
  initModals();
  syncDynamicData();
});

/* ==========================================================================
   1. Navbar & Mobile Drawer
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinksItems = document.querySelectorAll('.nav-link');

  // Scroll event for sticky glass navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveSection();
  });

  // Mobile toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.textContent = isOpen ? '✕' : '☰';
    });

    // Close mobile nav on link click
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.textContent = '☰';
      });
    });
  }

  // Active section indicator
  function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  }
}

/* ==========================================================================
   2. Typing Headline Effect
   ========================================================================== */
function initTypingEffect() {
  const typingTarget = document.getElementById('typingTarget');
  if (!typingTarget) return;

  const roles = [
    'MERN Stack Developer',
    'Backend & REST API Architect',
    'MVC Architecture Specialist',
    'MongoDB & Node.js Engineer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingTarget.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingTarget.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}


/* ==========================================================================
   5. Project Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.dataset.filter;

      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   7. Contact Form & Toast Notifications
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('portfolioContactForm');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const toastContainer = document.getElementById('toastContainer');

  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    if (message.length < 10) {
      showToast('Message must be at least 10 characters long.', 'error');
      return;
    }

    // Submit state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending Message... 🚀';

    try {
      const result = await window.PortfolioAPI.sendContactMessage({
        name,
        email,
        subject,
        message
      });

      if (result && result.activationNeeded) {
        showToast(
          'Message dispatched! FormSubmit sent a 1-time activation link to your Gmail. Please click "Activate Form" in your inbox.',
          'success'
        );
      } else {
        showToast(
          (result && result.message) || 'Thank you! Your message has been sent successfully. I will get back to you soon.',
          'success'
        );
      }
      contactForm.reset();
    } catch (err) {
      console.error('Contact submission error:', err);
      showToast(
        err.message || 'Could not send message. Please email directly at sonu.bcastudent@gmail.com',
        'error'
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message ✉️';
    }
  });

  function showToast(message, type = 'success') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✅' : '⚠️'}</span>
      <span class="toast-text">${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  window.showToast = showToast;
}

/* ==========================================================================
   8. Copy Buttons
   ========================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const textToCopy = btn.dataset.copy;
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied! ✓';
        btn.style.color = '#34d399';
        btn.style.borderColor = '#10b981';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2000);
      });
    });
  });
}

/* ==========================================================================
   9. Modals (Architecture Deep Dive & Certifications)
   ========================================================================== */
function initModals() {
  const modalBackdrop = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalBody = document.getElementById('modalProjectBody');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const openModalButtons = document.querySelectorAll('.btn-inspect-architecture');

  const ARCHITECTURE_DATA = {
    skillarena: {
      title: "SkillArena — MERN Architecture & Schemas",
      content: `
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <p style="color:var(--text-muted); font-size:0.92rem;">
            SkillArena is engineered with a strict <strong>MVC pattern</strong>. The Node/Express backend evaluates DSA submissions against sandboxed test cases, computes XP points, and updates the real-time leaderboard ranking.
          </p>

          <h4 style="color:#38bdf8; font-size:1rem; margin-top:0.5rem;">Core REST API Endpoints</h4>
          <pre style="background:#090e18; padding:1rem; border-radius:8px; border:1px solid var(--border-subtle); color:#94a3b8; font-size:0.8rem; overflow-x:auto;">
POST /api/auth/register       -> User registration with bcrypt hashing
POST /api/auth/login          -> JWT session creation
GET  /api/challenges          -> List DSA challenges with difficulty filters
POST /api/challenges/:id/eval -> Run code against test cases & compute XP
GET  /api/leaderboard         -> Global rank ordered by XP accumulation
GET  /api/user/statistics     -> User solved problem breakdown & streaks
          </pre>

          <h4 style="color:#10b981; font-size:1rem;">Mongoose Data Models</h4>
          <ul style="color:var(--text-muted); font-size:0.88rem; list-style:disc; margin-left:1.25rem; line-height:1.6;">
            <li><strong>User Schema:</strong> username, email, passwordHash, totalXp, solvedProblems (array of ObjectIds), rank</li>
            <li><strong>Challenge Schema:</strong> title, slug, difficulty, constraints, testCases (input, expectedOutput, isHidden)</li>
            <li><strong>Submission Schema:</strong> userId, challengeId, code, language, status (Accepted/Wrong/RuntimeError), executionTimeMs</li>
          </ul>
        </div>
      `
    },
    grocery: {
      title: "Grocery Website — E-Commerce Architecture & Payments",
      content: `
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <p style="color:var(--text-muted); font-size:0.92rem;">
            Production-ready MERN e-commerce application featuring <strong>dual authentication (JWT + Google OAuth 2.0)</strong>, atomic shopping cart synchronization, and complete <strong>Razorpay payment gateway integration</strong>.
          </p>

          <h4 style="color:#38bdf8; font-size:1rem; margin-top:0.5rem;">Razorpay Payment Workflow</h4>
          <pre style="background:#090e18; padding:1rem; border-radius:8px; border:1px solid var(--border-subtle); color:#94a3b8; font-size:0.8rem; overflow-x:auto;">
1. Client Cart -> POST /api/payment/razorpay/order
   -> Server creates cryptographic order via Razorpay SDK with currency & amount
2. Razorpay Checkout Modal completes payment on client
3. Client receives paymentId & signature -> POST /api/payment/verify
   -> Server computes HMAC SHA256 digest to verify payment integrity
4. Server transitions Order status to "PAID" & decrements inventory atomically
          </pre>

          <h4 style="color:#10b981; font-size:1rem;">Architecture Highlights</h4>
          <ul style="color:var(--text-muted); font-size:0.88rem; list-style:disc; margin-left:1.25rem; line-height:1.6;">
            <li>4 complete CRUD modules: Products, Cart, Orders, Users</li>
            <li>Role-Based Access Control (Admin vs Customer) with protected Express middleware</li>
            <li>Google OAuth 2.0 integrated alongside email/password with token exchange</li>
          </ul>
        </div>
      `
    },
    hostel: {
      title: "Hostel Booking System — API Services Architecture",
      content: `
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          <p style="color:var(--text-muted); font-size:0.92rem;">
            A modular backend service built with Node.js and Express.js, providing robust room booking services, date collision detection, and automated validation tested 100% in Postman.
          </p>

          <h4 style="color:#38bdf8; font-size:1rem; margin-top:0.5rem;">Endpoints Tested in Postman</h4>
          <pre style="background:#090e18; padding:1rem; border-radius:8px; border:1px solid var(--border-subtle); color:#94a3b8; font-size:0.8rem; overflow-x:auto;">
GET    /api/rooms/availability?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD
POST   /api/rooms               -> Admin room creation with validation
GET    /api/rooms/:id           -> Single room details & amenities
POST   /api/bookings            -> Create booking with conflict check
PUT    /api/bookings/:id/cancel -> Cancel reservation & free room availability
          </pre>

          <h4 style="color:#10b981; font-size:1rem;">Data Consistency & Reliability</h4>
          <ul style="color:var(--text-muted); font-size:0.88rem; list-style:disc; margin-left:1.25rem; line-height:1.6;">
            <li>Prevents double-booking via MongoDB date overlap range queries ($gte, $lte)</li>
            <li>Centralized error handling middleware with standardized JSON error schemas</li>
            <li>Comprehensive Postman collections with automated test assertions</li>
          </ul>
        </div>
      `
    }
  };

  openModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.dataset.project;
      const data = ARCHITECTURE_DATA[projectKey];

      if (data && modalBackdrop && modalTitle && modalBody) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.content;
        modalBackdrop.classList.add('open');
      }
    });
  });

  if (closeModalBtn && modalBackdrop) {
    closeModalBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('open');
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('open');
      }
    });
  }
}

/* ==========================================================================
   10. Sync Live Dynamic Data from Backend API
   ========================================================================== */
async function syncDynamicData() {
  try {
    // 1. Sync Profile & Resume URL
    const profile = await window.PortfolioAPI.getProfile();
    if (profile && profile.resumeUrl) {
      updateResumeLinks(profile.resumeUrl);
    }

    // 2. Sync Dynamic Work Experience
    const expData = await window.PortfolioAPI.getExperience();
    if (expData && expData.internship && expData.internship.length > 0) {
      renderLiveExperience(expData.internship, profile ? profile.resumeUrl : null);
    }

    // 3. Sync Dynamic Projects
    const projects = await window.PortfolioAPI.getProjects('all');
    if (projects && projects.length > 0) {
      renderLiveProjects(projects);
    }
  } catch (e) {
    console.warn('Could not sync dynamic data:', e);
  }
}

function updateResumeLinks(resumeUrl) {
  if (!resumeUrl) return;
  const links = document.querySelectorAll('#navResumeBtn, #footerResumeBtn, #timelineResumeBtn, .timeline-resume-link, a[href*="Resume"]');
  links.forEach(link => {
    link.href = resumeUrl;
  });
}

function renderLiveExperience(experienceList, resumeUrl) {
  const stream = document.getElementById('experienceTimelineStream');
  if (!stream || !experienceList || experienceList.length === 0) return;

  stream.innerHTML = '';
  const activeResume = resumeUrl || 'assets/docs/Sonu_Mandal_Resume.html';

  experienceList.forEach(exp => {
    const item = document.createElement('div');
    item.className = 'timeline-item';

    const bullets = (exp.responsibilities || [])
      .map(b => `<div class="timeline-bullet-item">${b}</div>`)
      .join('');

    const tags = (exp.technologies || [])
      .map(t => `<span class="tech-tag">${t}</span>`)
      .join('');

    const typeBadge = exp.type ? `<span class="badge badge-cyan" style="font-size:0.7rem; padding:0.15rem 0.45rem; margin-left:0.5rem;">${exp.type}</span>` : '';

    item.innerHTML = `
      <div class="timeline-node"></div>
      <div class="timeline-card">
        <div class="timeline-header">
          <h4 class="timeline-role">${exp.role || 'Developer'}</h4>
          <span class="timeline-date">${exp.period || ''}</span>
        </div>
        <div class="timeline-company">${exp.company || ''} ${exp.location ? '• ' + exp.location : ''} ${typeBadge}</div>

        <div class="timeline-bullets">
          ${bullets}
        </div>

        <div class="timeline-tech-tags">
          ${tags}
        </div>

        <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
          <span class="badge badge-emerald">${exp.certificate || 'Verified Experience'}</span>
          <a href="${activeResume}" target="_blank" class="timeline-resume-link" style="font-size: 0.8rem; font-weight: 600;">View in Resume ↗</a>
        </div>
      </div>
    `;
    stream.appendChild(item);
  });
}

function renderLiveProjects(projects) {
  const container = document.getElementById('projectsGrid');
  if (!container) return;

  container.innerHTML = '';
  projects.forEach(p => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.dataset.category = p.category ? p.category.toLowerCase().replace(/[^a-z]/g, '') : 'all';
    card.id = 'project_' + (p.id || Math.random().toString(36).substr(2, 6));

    const techChips = (p.techStack || [])
      .map(t => `<span class="tech-chip">${t}</span>`)
      .join('');

    const highlights = (p.keyHighlights || [])
      .map(h => `<div class="project-highlight-item">${h}</div>`)
      .join('');

    card.innerHTML = `
      <div class="project-thumbnail">
        <img src="${p.image || 'assets/images/skillarena.jpg'}" alt="${p.title}" loading="lazy">
        <div class="project-badges">
          <span class="badge ${p.badge && p.badge.includes('E-Com') ? 'badge-emerald' : 'badge-cyan'}">${p.badge || 'Project'}</span>
        </div>
        ${p.liveUrl ? `<div class="project-live-indicator"><span class="status-dot"></span> Live Deployed</div>` : ''}
      </div>

      <div class="project-content">
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; color: #38bdf8; margin-bottom: 0.25rem;">
          ${p.duration || '2026'}
        </div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-description">${p.shortDescription || ''}</p>

        <div class="project-highlights-list">
          ${highlights}
        </div>

        <div class="project-tech-stack">
          ${techChips}
        </div>

        <div class="project-footer-actions">
          ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Live Site ↗</a>` : ''}
          ${p.id && ['skillarena', 'grocery', 'hostel'].includes(p.id) ? `<button class="btn btn-outline btn-sm btn-inspect-architecture" data-project="${p.id}">Architecture & Schema 🔍</button>` : ''}
          ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" title="GitHub Repo" style="width:34px; height:34px; margin-left:auto;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"/></svg>
          </a>` : ''}
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Re-bind architecture modal clicks
  initModals();
}
