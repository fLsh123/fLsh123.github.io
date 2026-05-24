/* ============================================================
   animations.js — Emmanuel Senaij Portfolio Animations
   ============================================================ */

/* ── 1. LOADING SCREEN ─────────────────────────────────────── */
(function () {
  const loader = document.getElementById('loader');
  if (!loader) return;
  const lines = [
    '> Initializing secure connection...',
    '> Loading profile data...',
    '> Bypassing firewall...',
    '> Access granted. Welcome.'
  ];
  const output = loader.querySelector('.loader-output');
  let i = 0;
  function typeLine(text, cb) {
    let j = 0;
    const el = document.createElement('div');
    output.appendChild(el);
    const t = setInterval(() => {
      el.textContent += text[j++];
      if (j >= text.length) { clearInterval(t); cb && cb(); }
    }, 30);
  }
  function nextLine() {
    if (i >= lines.length) {
      setTimeout(() => {
        loader.classList.add('loader-hide');
        setTimeout(() => loader.remove(), 600);
      }, 400);
      return;
    }
    typeLine(lines[i++], () => setTimeout(nextLine, 120));
  }
  nextLine();
})();

/* ── 2. MATRIX RAIN CANVAS ─────────────────────────────────── */
(function () {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(5, 5, 16, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0aff00';
    ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = i % 5 === 0 ? '#00f3ff' : '#0aff00';
      ctx.globalAlpha = Math.random() * 0.5 + 0.2;
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      ctx.globalAlpha = 1;
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  // Recalculate columns on resize
  window.addEventListener('resize', () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  });

  setInterval(draw, 50);
})();

/* ── 3. TYPEWRITER ROLE CYCLER ─────────────────────────────── */
(function () {
  const el = document.getElementById('typewriter-roles');
  if (!el) return;
  const roles = [
    'Cyber Security Analyst',
    'Penetration Tester',
    'Ethical Hacker',
    'SOC Analyst',
    'Vulnerability Manager',
    'Programmer'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = roles[roleIndex];
    if (isDeleting) {
      el.textContent = current.substring(0, charIndex--);
    } else {
      el.textContent = current.substring(0, charIndex++);
    }

    let delay = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex > current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex < 0) {
      isDeleting = false;
      charIndex = 0;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 300;
    }
    setTimeout(type, delay);
  }
  type();
})();

/* ── 4. SCROLL-REVEAL ──────────────────────────────────────── */
(function () {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));
})();

/* ── 5. PAGE TRANSITION ────────────────────────────────────── */
(function () {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;

  // Animate out on load
  window.addEventListener('load', () => {
    setTimeout(() => overlay.classList.add('transition-out'), 50);
  });

  // Animate in on nav clicks
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      overlay.classList.remove('transition-out');
      overlay.classList.add('transition-in');
      setTimeout(() => { window.location.href = href; }, 350);
    });
  });
})();

/* ── 6. CURSOR GLOW TRAIL ──────────────────────────────────── */
(function () {
  const trail = document.getElementById('cursor-trail');
  if (!trail) return;
  let mx = -100, my = -100;
  let tx = -100, ty = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animate() {
    tx += (mx - tx) * 0.15;
    ty += (my - ty) * 0.15;
    trail.style.left = tx + 'px';
    trail.style.top = ty + 'px';
    requestAnimationFrame(animate);
  }
  animate();
})();

/* ── 7. STAT COUNTERS ──────────────────────────────────────── */
(function () {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  if (!nums.length) return;

  function countUp(el) {
    const target = +el.dataset.target;
    const duration = 1600;
    const step = Math.ceil(duration / target / 16);
    let current = 0;
    const t = setInterval(() => {
      current += 1;
      el.textContent = current;
      if (current >= target) {
        el.textContent = target;
        clearInterval(t);
      }
    }, step);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(el => observer.observe(el));
})();

/* ── 8. SKILL BAR FILL ─────────────────────────────────────── */
(function () {
  const fills = document.querySelectorAll('.skill-bar-fill[data-width]');
  if (!fills.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(el => observer.observe(el));
})();

