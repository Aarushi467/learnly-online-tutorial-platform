/* ======================================
   Learnly – Main Script (Clean Version)
   Features:
   1) Smooth scroll + course alert
   2) Contact form demo submit
   3) Hero entrance + tilt + height fix
   4) Animated counters
   5) Course progress updater
   6) Simple theme toggle (logo / "T")
   ====================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ========== 1. SMOOTH SCROLL ========== */

  // buttons / links that use data-scroll-target
  const scrollButtons = document.querySelectorAll("[data-scroll-target]");

  scrollButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selector = btn.getAttribute("data-scroll-target");
      const target = document.querySelector(selector);

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }

      const courseName = btn.getAttribute("data-course");
      if (courseName) {
        alert(
          `Great choice! We'll follow this course in the roadmap: ${courseName}`
        );
      }
    });
  });

  // also smooth-scroll all <a href="#...">
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ========== 2. CONTACT FORM DEMO ========== */

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const name = formData.get("name");

      status.textContent = `Thank you, ${
        name || "Learner"
      }! Your message was recorded for our SNW project demo.`;
      form.reset();

      setTimeout(() => {
        status.textContent = "";
      }, 5000);
    });
  }

  /* ========== 3. HERO ANIMATIONS ========== */

  // entrance fade-in
  const heroText = document.querySelector(".hero-text");
  const heroCard = document.querySelector(".hero-image-card");
  const progressCard = document.querySelector(".hero-progress-card");

  [heroText, heroCard, progressCard].forEach((el, i) => {
    if (!el) return;
    el.classList.add("fade-in-up");
    el.style.animationDelay = `${120 + i * 120}ms`;
  });

  // small parallax tilt on hero image
  const imgCard = document.querySelector(".hero-image-card");
  const img = document.querySelector(".hero-img");

  if (imgCard && img) {
    imgCard.addEventListener("mousemove", (e) => {
      const rect = imgCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotY = (x - 0.5) * 12; // -6 to 6
      const rotX = (0.5 - y) * 8;  // -4 to 4

      img.style.transform = `
        perspective(900px)
        rotateX(${rotX}deg)
        rotateY(${rotY}deg)
        scale(1.02)
      `;
    });

    imgCard.addEventListener("mouseleave", () => {
      img.style.transform = "";
    });
  }

  // compress hero on very tall screens
  const hero = document.querySelector("#hero");

  function compressHeroIfTall() {
    if (!hero) return;
    const vh = window.innerHeight;

    if (vh > 900) {
      hero.style.paddingTop = "2.2rem";
      hero.style.paddingBottom = "1.4rem";
    } else {
      hero.style.paddingTop = "";
      hero.style.paddingBottom = "";
    }
  }

  compressHeroIfTall();
  window.addEventListener("resize", compressHeroIfTall);

  /* ========== 4. ANIMATED STAT COUNTERS ========== */

  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((el) => {
    const rawTarget = el.getAttribute("data-count");
    if (!rawTarget) return;

    const target = parseFloat(rawTarget);
    const hasPlus = el.textContent.trim().endsWith("+");
    const duration = 1200; // ms

    let start = null;

    function updateCounter(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = Math.floor(progress * target);

      if (target % 1 !== 0) {
        // for decimal ratings like 4.9
        const value = (progress * target).toFixed(1);
        el.textContent = value;
      } else {
        el.textContent = current.toString();
      }

      if (hasPlus) {
        el.textContent += "+";
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  });

  /* ========== 5. COURSE PROGRESS UPDATER ========== */

  const progressTitle = document.querySelector(".progress-title");
  const progressBarFill = document.querySelector(".progress-bar-fill");
  const progressItems = document.querySelectorAll(".progress-list li");
  const courseButtons = document.querySelectorAll(".btn-course");

  const courseData = {
    "HTML Fundamentals": {
      title: "Finish HTML Fundamentals Module",
      percent: 40,
      topics: [
        "Introduction to HTML ✓",
        "Document structure ✓",
        "Links & Images",
        "Forms & Tables",
      ],
    },
    "CSS Styling Mastery": {
      title: "Build CSS Layouts Module",
      percent: 70,
      topics: [
        "Selectors & Colors ✓",
        "Flexbox basics ✓",
        "Responsive Grid Layouts",
        "Animations & Transitions",
      ],
    },
    "JavaScript Essentials": {
      title: "JavaScript Essentials Module",
      percent: 90,
      topics: [
        "Variables & Data Types ✓",
        "Functions & Events ✓",
        "DOM Manipulation ✓",
        "Mini Project: Counter App",
      ],
    },
  };

  if (progressBarFill) {
    progressBarFill.style.transition = "width 0.6s ease";
  }

  courseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const courseName = btn.getAttribute("data-course");
      const data = courseData[courseName];

      if (!data) return;

      if (progressTitle) {
        progressTitle.textContent = data.title;
      }

      if (progressBarFill) {
        progressBarFill.style.width = data.percent + "%";
      }

      progressItems.forEach((item, index) => {
        const topic = data.topics[index];
        if (topic) item.textContent = topic;
      });
    });
  });

  /* ========== 6. SIMPLE THEME TOGGLE ========== */

  const root = document.documentElement;
  const logo = document.querySelector(".logo");

  const darkTheme = {
    "--bg": "#020617",
    "--bg-alt": "#020818",
    "--card": "#020617",
    "--text-main": "#e5e7eb",
    "--text-muted": "#9ca3af",
  };

  const lightTheme = {
    "--bg": "#f3f4f6",
    "--bg-alt": "#e5e7eb",
    "--card": "#ffffff",
    "--text-main": "#020617",
    "--text-muted": "#4b5563",
  };

  let isLight = false;

  function applyTheme(theme) {
    Object.keys(theme).forEach((key) => {
      root.style.setProperty(key, theme[key]);
    });

    if (theme === lightTheme) {
      document.body.style.background =
        "radial-gradient(circle at top left, #e5f2ff 0, #f3f4f6 45%, #e5e7eb 90%)";
    } else {
      document.body.style.background =
        "radial-gradient(circle at top left, #1d2447 0, #020617 45%, #000 90%)";
    }
  }


  // Shailesh: Added helper notes for theme toggle logic
  function toggleTheme() {
    isLight = !isLight;
    applyTheme(isLight ? lightTheme : darkTheme);
  }

  // click on logo to toggle theme
  if (logo) {
    logo.style.cursor = "pointer";
    logo.title = "Click to toggle theme";
    logo.addEventListener("click", toggleTheme);
  }

  // also allow pressing "T" key
  window.addEventListener("keydown", (e) => {
    if (e.key === "t" || e.key === "T") {
      toggleTheme();
    }
  });
});
console.log("Shailesh’s JS contribution works!");

