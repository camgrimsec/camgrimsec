/* camgrimsec — minimal interactions */
(function(){
  document.getElementById('yr').textContent = new Date().getFullYear();
  const navEl = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 8) navEl.classList.add('scrolled');
    else navEl.classList.remove('scrolled');
  });
  // smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior:'smooth', block:'start' });
    });
  });
})();
