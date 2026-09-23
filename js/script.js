// Topollo Nts'eo — portfolio interactions
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Mobile menu ---------------------------------------------------- */
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.mobile-menu');
  const closeX = document.querySelector('.mobile-menu .close-x');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.add('open'));
    if (closeX) closeX.addEventListener('click', () => menu.classList.remove('open'));
    menu.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => menu.classList.remove('open'))
    );
  }

  /* Scroll reveal — one orchestrated pass -------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('in'), i * 70);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* Mouse-following light on glass panels --------------------------- */
  if (!reduceMotion && window.matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.glass').forEach((panel) => {
      panel.addEventListener('mousemove', (e) => {
        const r = panel.getBoundingClientRect();
        const mx = ((e.clientX - r.left) / r.width) * 100;
        const my = ((e.clientY - r.top) / r.height) * 100;
        panel.style.background = `
          radial-gradient(320px circle at ${mx}% ${my}%, rgba(255,255,255,0.10), transparent 60%),
          linear-gradient(155deg, rgba(255,255,255,0.09), rgba(255,255,255,0.015) 40%, rgba(255,255,255,0.03) 100%),
          var(--panel)`;
      });
      panel.addEventListener('mouseleave', () => {
        panel.style.background = '';
      });
    });
  }

  /* Magnetic primary buttons ---------------------------------------- */
  if (!reduceMotion && window.matchMedia('(hover:hover)').matches) {
    document.querySelectorAll('.btn-primary, .project-link').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0,0)';
      });
    });
  }

  /* Subtle parallax on hero orbs -------------------------------------- */
  const orbField = document.querySelector('.orb-field');
  if (orbField && !reduceMotion && window.matchMedia('(hover:hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      orbField.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  /* Active nav link by current page ------------------------------------ */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach((a) => {
    const href = a.getAttribute('href').split('#')[0] || 'index.html';
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* Sticky nav shadow on scroll ------------------------------------------ */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 12) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
