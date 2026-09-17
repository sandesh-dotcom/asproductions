// ===== AS Production: script.js =====

document.addEventListener("DOMContentLoaded", () => {
  const bar = document.getElementById("bar");
  const menuBtn = document.getElementById("menuBtn");
  const overlayNav = document.getElementById("overlayNav");
  const nowPlayingText = document.getElementById("nowPlayingText");
  const progressBar = document.getElementById("progressBar");

  // Top bar: transparent -> glass on scroll + scroll progress bar
  const onScroll = () => {
    if (window.scrollY > 40) bar.classList.add("scrolled");
    else bar.classList.remove("scrolled");

    if (progressBar) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      progressBar.style.width = pct + "%";
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Magnetic buttons: pull slightly toward the cursor within their bounds
  const magnets = document.querySelectorAll(".magnetic");
  if (window.matchMedia("(pointer: fine)").matches) {
    magnets.forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "translate(0, 0)";
      });
    });
  }

  // Fullscreen overlay nav toggle
  const closeNav = () => {
    overlayNav.classList.remove("open");
    document.body.classList.remove("nav-open");
  };
  menuBtn.addEventListener("click", () => {
    const isOpen = overlayNav.classList.toggle("open");
    document.body.classList.toggle("nav-open", isOpen);
  });
  overlayNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlayNav.classList.contains("open")) {
      closeNav();
      menuBtn.focus();
    }
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  // Count-up stats
  const counters = document.querySelectorAll(".stat-num");
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10) || 0;
        const suffix = el.dataset.suffix || "";
        const duration = 1400;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => countObserver.observe(el));

  // "Now playing" readout: tracks which labeled section is in view, and
  // mirrors the same section as the "current" link in the fullscreen nav
  const labeledSections = document.querySelectorAll("[data-label]");
  const overlayLinks = overlayNav.querySelectorAll("a[href^='#']");
  if (labeledSections.length && nowPlayingText) {
    const nowPlayingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            nowPlayingText.textContent = entry.target.dataset.label.toUpperCase();
            const id = "#" + entry.target.id;
            overlayLinks.forEach((a) => a.classList.toggle("current", a.getAttribute("href") === id));
          }
        });
      },
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
    );
    labeledSections.forEach((el) => nowPlayingObserver.observe(el));
  }

  // Polaroid tilt-on-mousemove: layers a 3D tilt on top of each photo's
  // resting rotation (read from data-rot) instead of fighting it
  const polaroids = document.querySelectorAll(".polaroid[data-rot]");
  if (window.matchMedia("(pointer: fine)").matches) {
    polaroids.forEach((el) => {
      const rest = parseFloat(el.dataset.rot) || 0;
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `rotate(${rest * 0.3}deg) perspective(600px) rotateX(${py * -12}deg) rotateY(${px * 12}deg) scale(1.04)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  // Cursor-follow accent dot, hero only
  const hero = document.querySelector(".hero");
  const cursorDot = document.getElementById("cursorDot");
  if (hero && cursorDot && window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener("mouseenter", (e) => {
      const rect = hero.getBoundingClientRect();
      cursorDot.style.left = e.clientX - rect.left + "px";
      cursorDot.style.top = e.clientY - rect.top + "px";
      cursorDot.classList.add("active");
    });
    hero.addEventListener("mouseleave", () => cursorDot.classList.remove("active"));
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      cursorDot.style.left = e.clientX - rect.left + "px";
      cursorDot.style.top = e.clientY - rect.top + "px";
    });
    hero.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => cursorDot.classList.add("on-target"));
      el.addEventListener("mouseleave", () => cursorDot.classList.remove("on-target"));
    });
  }

  // Click-to-copy email
  document.querySelectorAll(".copy-email").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const email = btn.dataset.email;
      const original = btn.textContent;
      try {
        await navigator.clipboard.writeText(email);
      } catch (err) {
        /* clipboard API unavailable: still show feedback so the click doesn't feel dead */
      }
      btn.textContent = "Copied!";
      btn.classList.add("copied");
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove("copied");
      }, 1600);
    });
  });

  // Smooth anchor scroll offset for fixed bar
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 76;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
});
