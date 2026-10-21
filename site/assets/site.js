// Gracious Gardens — scroll reveals, gentle parallax and header state.
// Progressive enhancement: without this file every element is simply visible.
(() => {
  const root = document.documentElement;
  root.classList.add('js-ready');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');

  // Count-up for numbers like $800,000 once their stat scrolls into view.
  const easeOut = (t) => 1 - Math.pow(1 - t, 4);
  const countUp = (el) => {
    const target = Number(el.dataset.count);
    const start = performance.now();
    const duration = 1600;
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = Math.round(target * easeOut(t)).toLocaleString('en-US');
      if (t < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  };
  const reveal = (el) => {
    el.classList.add('is-in');
    if (!reduceMotion) el.querySelectorAll('[data-count]').forEach(countUp);
  };

  // Reveal on scroll, staggering siblings that enter together.
  const targets = document.querySelectorAll('[data-reveal], [data-reveal-mark]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    document.querySelectorAll('[data-count]').forEach((el) => { el.textContent = '0'; });
    targets.forEach((el) => {
      const siblings = [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal'));
      const index = siblings.indexOf(el);
      if (index > 0) el.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 90}ms`);
      observer.observe(el);
    });
  }

  // Parallax: each [data-parallax] gets --p from -1 (below centre) to 1 (above),
  // and CSS decides what to do with it.
  const parallax = reduceMotion ? [] : [...document.querySelectorAll('[data-parallax]')];
  let queued = false;

  const update = () => {
    queued = false;
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
    const vh = window.innerHeight;
    for (const el of parallax) {
      const box = el.parentElement.getBoundingClientRect();
      if (box.bottom < -vh || box.top > vh * 2) continue;
      const progress = (vh / 2 - (box.top + box.height / 2)) / vh;
      el.style.setProperty('--p', Math.max(-1, Math.min(1, progress)).toFixed(3));
    }
  };

  const requestUpdate = () => {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  update();
})();
