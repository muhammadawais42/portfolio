/**
 * Muhammad Awais - Portfolio Interactive Logic
 * Modern, High-Performance Vanilla JS
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Theme Management (Dark / Light Mode)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  const currentTheme = localStorage.getItem('awais-portfolio-theme') || 
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('awais-portfolio-theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.setAttribute('data-lucide', 'sun');
    } else {
      themeIcon.setAttribute('data-lucide', 'moon');
    }
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // --------------------------------------------------------------------------
  // 2. Custom Interactive Cursor
  // --------------------------------------------------------------------------
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouch && cursor && follower) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    function renderCursorFollower() {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      requestAnimationFrame(renderCursorFollower);
    }
    renderCursorFollower();

    // Hover effect for interactive elements
    const hoverTargets = document.querySelectorAll('a, button, input, textarea, .glass-card, .skill-badge, .filter-btn');
    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => follower.classList.add('hover-active'));
      target.addEventListener('mouseleave', () => follower.classList.remove('hover-active'));
    });
  }

  // --------------------------------------------------------------------------
  // 3. Navbar Scroll Behavior & Mobile Drawer
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileClose = document.getElementById('mobile-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
  drawerLinks.forEach((link) => link.addEventListener('click', closeDrawer));

  // --------------------------------------------------------------------------
  // 4. Hero Role Typing Effect
  // --------------------------------------------------------------------------
  const typingElement = document.getElementById('role-typing');
  if (typingElement) {
    const roles = [
      'Software Engineer',
      'Machine Learning Developer',
      'Flutter & Android Specialist',
      'Full-Stack Developer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeRole() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 110;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
      }

      setTimeout(typeRole, typingSpeed);
    }
    typeRole();
  }

  // --------------------------------------------------------------------------
  // 5. Interactive Ambient Background Canvas
  // --------------------------------------------------------------------------
  const bgCanvas = document.getElementById('bg-canvas');
  if (bgCanvas) {
    const ctx = bgCanvas.getContext('2d');
    let width = (bgCanvas.width = window.innerWidth);
    let height = (bgCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = bgCanvas.width = window.innerWidth;
      height = bgCanvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 30), 40);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.1
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const particleColor = isDark ? '129, 140, 248' : '99, 102, 241';

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColor}, ${p.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // --------------------------------------------------------------------------
  // 6. Interactive Project Filtering
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 7. Project Quick-View Modal
  // --------------------------------------------------------------------------
  const projectData = {
    'agri-ai': {
      title: 'Smart AI-Powered Agriculture System',
      badge: 'Final Year Project / Research',
      cover: 'assets/images/agri_ai.jpg',
      tags: ['Flutter', 'Node.js', 'MySQL', 'IoT', 'Pandas & NumPy', 'Scikit-learn'],
      desc: 'An end-to-end intelligent agricultural monitoring and predictive irrigation platform. Uses IoT sensor telemetry to stream soil moisture, environmental temperature, and atmospheric humidity into an ML pipeline that forecasts irrigation requirements and alerts farmers to crop health anomalies.',
      metrics: [
        'Real-time IoT telemetry ingestion with low-latency Node.js broker',
        'Machine Learning model predicting soil dehydration with high accuracy',
        'Cross-platform Flutter mobile client for real-time farm diagnostics'
      ],
      github: 'https://github.com/muhammadawais42',
      demo: 'https://github.com/muhammadawais42'
    },
    'emotion-ai': {
      title: 'AI Facial Emotion Recognition System',
      badge: 'Computer Vision & Deep Learning',
      cover: 'assets/images/emotion_ai.jpg',
      tags: ['Python', 'OpenCV', 'EAR/MAR', 'NumPy', 'TensorFlow/Keras'],
      desc: 'A high-speed facial emotion classification and gaze tracking pipeline. Leverages OpenCV facial landmark detection and EAR (Eye Aspect Ratio) / MAR (Mouth Aspect Ratio) algorithms for micro-expression analysis and attention monitoring.',
      metrics: [
        'Real-time inference at 60 FPS on standard webcam hardware',
        'Robust multi-face landmark detection and pose normalization',
        'Modular architecture ready for proctoring or driver drowsiness detection'
      ],
      github: 'https://github.com/muhammadawais42',
      demo: 'https://github.com/muhammadawais42'
    },
    'attendance-ai': {
      title: 'Smart AI Attendance System',
      badge: 'Computer Vision & Biometrics',
      cover: 'assets/images/emotion_ai.jpg',
      tags: ['Python', 'OpenCV', 'Face Recognition', 'SQLite', 'Tkinter'],
      desc: 'An automated attendance management solution using face encoding and real-time verification to prevent proxy clock-ins and streamline campus/workplace attendance logging.',
      metrics: [
        'Sub-second face verification against local database encodings',
        'Automated CSV & database attendance export with timestamp auditing',
        'Anti-spoofing heuristics to prevent static photo manipulation'
      ],
      github: 'https://github.com/muhammadawais42',
      demo: 'https://github.com/muhammadawais42'
    },
    'pos-store': {
      title: 'OmniSell POS & Online Store Platform',
      badge: 'Full-Stack Web Application',
      cover: 'assets/images/pos_store.jpg',
      tags: ['PHP', 'Laravel / Vanilla', 'MySQL', 'JavaScript', 'Bootstrap'],
      desc: 'Comprehensive retail point-of-sale and e-commerce platform. Features multi-role role-based access control (Admin, Cashier, Manager), real-time inventory management, barcoding, and automated sales reporting.',
      metrics: [
        'Dual dashboard system for cashier checkout and executive inventory reporting',
        'Optimized relational schema handling hundreds of SKUs with zero lag',
        'Integrated receipt generation and transaction history'
      ],
      github: 'https://github.com/muhammadawais42',
      demo: 'https://github.com/muhammadawais42'
    },
    'tasbih-app': {
      title: 'Digital Tasbih & Dhikr Tracker',
      badge: 'Mobile App Development',
      cover: 'assets/images/flutter_mobile.jpg',
      tags: ['Flutter', 'Dart', 'Shared Preferences', 'Haptic Feedback'],
      desc: 'An ultra-clean, distraction-free digital tasbih counter built in Flutter with customizable themes, persistent state storage, and tactile haptic feedback on target completion.',
      metrics: [
        'Persistent state tracking across app restarts',
        'Smooth animations and customizable counter targets',
        '100% offline functionality with zero battery drain'
      ],
      github: 'https://github.com/muhammadawais42',
      demo: 'https://github.com/muhammadawais42'
    },
    'expense-tracker': {
      title: 'Smart Expense & Budget Tracker',
      badge: 'Android Native Development',
      cover: 'assets/images/flutter_mobile.jpg',
      tags: ['Java', 'Kotlin', 'Room DB / SQLite', 'Android SDK', 'MPAndroidChart'],
      desc: 'An Android native finance application for daily budget planning and expense categorization. Features visual monthly spending charts, spending threshold alerts, and instant local search.',
      metrics: [
        'Fast Room SQLite storage for secure on-device financial privacy',
        'Dynamic spending category breakdowns with visual analytics',
        'Exportable monthly expense summaries'
      ],
      github: 'https://github.com/muhammadawais42',
      demo: 'https://github.com/muhammadawais42'
    },
    'infinite-rush': {
      title: 'Infinite Rush 3D Cyber Racer',
      badge: 'Game Development',
      cover: 'assets/images/unity_game.jpg',
      tags: ['Unity 3D', 'C#', 'Physics Engine', 'Procedural Generation'],
      desc: 'A dynamic 3D endless runner racing game set in a futuristic cyber cityscape. Implements procedural track generation, speed progression algorithms, dynamic obstacle spawning, and responsive car physics.',
      metrics: [
        'Procedural obstacle and road generation for infinite replayability',
        'Custom C# physics controller for tight handling and drift mechanics',
        'Optimized particle and lighting shaders maintaining solid 60 FPS'
      ],
      github: 'https://github.com/muhammadawais42',
      demo: 'https://github.com/muhammadawais42'
    }
  };

  const modalOverlay = document.getElementById('project-modal');
  const modalBox = document.getElementById('modal-box');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data || !modalOverlay) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-badge').textContent = data.badge;
    document.getElementById('modal-cover').src = data.cover;
    document.getElementById('modal-desc').textContent = data.desc;
    document.getElementById('modal-github').href = data.github;
    document.getElementById('modal-demo').href = data.demo;

    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = '';
    data.tags.forEach((tag) => {
      const span = document.createElement('span');
      span.className = 'project-tag';
      span.textContent = tag;
      tagsContainer.appendChild(span);
    });

    const metricsList = document.getElementById('modal-metrics');
    metricsList.innerHTML = '';
    data.metrics.forEach((m) => {
      const li = document.createElement('li');
      li.textContent = m;
      metricsList.appendChild(li);
    });

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.open-modal-trigger').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project');
      openModal(id);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // --------------------------------------------------------------------------
  // 8. 3D Card Tilt Effect
  // --------------------------------------------------------------------------
  if (!isTouch) {
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 9. Contact Form & Clipboard Copy
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      // Open mailto client with pre-filled message
      const mailtoUrl = `mailto:awaismuhammad7823@gmail.com?subject=${encodeURIComponent(
        subject || `Inquiry from ${name}`
      )}&body=${encodeURIComponent(`Hi Muhammad Awais,\n\n${message}\n\nFrom: ${name} (${email})`)}`;

      window.location.href = mailtoUrl;
      showToast('Opening your email client... Thank you!');
      contactForm.reset();
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('awaismuhammad7823@gmail.com').then(() => {
        showToast('Copied email (awaismuhammad7823@gmail.com) to clipboard!');
      }).catch(() => {
        showToast('Email: awaismuhammad7823@gmail.com');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 10. Toast Notification System
  // --------------------------------------------------------------------------
  function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    if (type === 'error') {
      toast.style.borderColor = '#ef4444';
    }
    toast.innerHTML = `
      <i data-lucide="${type === 'error' ? 'alert-circle' : 'check-circle'}" style="color: ${type === 'error' ? '#ef4444' : '#10b981'};"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // --------------------------------------------------------------------------
  // 11. Scroll Intersection Observer for Reveal Animations
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => observer.observe(el));

  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }
});
