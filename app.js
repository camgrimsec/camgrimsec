/* camgrimsec — scroll expansion hero (vanilla, ported from React component) */
(function(){
  document.getElementById('yr').textContent = new Date().getFullYear();

  const hero       = document.getElementById('hero');
  const media      = document.getElementById('heroMedia');
  const meta       = document.getElementById('heroMeta');
  const title      = document.getElementById('heroTitle');
  const leftWord   = title.querySelector('.ht-left');
  const rightWord  = title.querySelector('.ht-right');
  const tint       = media.querySelector('.hero-media-tint');
  const navEl      = document.querySelector('.nav');

  if (!hero || !media) return;

  let progress = 0;          // 0 → 1
  let expanded = false;      // true once hero fully expanded
  let touchStartY = 0;
  let isMobile = window.innerWidth < 768;

  window.addEventListener('resize', () => { isMobile = window.innerWidth < 768; render(); });

  // freeze body scroll while hero in progress
  function lockScroll(lock){
    document.documentElement.style.overflow = lock ? 'hidden' : '';
    document.body.style.overflow = lock ? 'hidden' : '';
  }
  lockScroll(true);

  function render(){
    const mw = 300 + progress * (isMobile ? 650 : 1250);
    const mh = 400 + progress * (isMobile ? 200 : 400);
    const tx = progress * (isMobile ? 180 : 150);

    media.style.width  = mw + 'px';
    media.style.height = mh + 'px';

    leftWord.style.transform  = `translateX(-${tx}vw)`;
    rightWord.style.transform = `translateX(${tx}vw)`;

    // meta text fades + slides out as expansion fills
    meta.style.opacity = String(Math.max(0, 1 - progress * 1.4));
    meta.style.transform = `translateY(${progress * 12}px)`;

    // tint lifts on the media as it grows
    tint.style.opacity = String(Math.max(0, 0.5 - progress * 0.45));

    // background fades down a touch
    const bgImg = hero.querySelector('.hero-bg img');
    if (bgImg) bgImg.style.opacity = String(1 - progress * 0.25);
  }
  render();

  function setProgress(p){
    progress = Math.min(1, Math.max(0, p));
    render();
    if (progress >= 1 && !expanded){
      expanded = true;
      lockScroll(false);
    }
  }

  // WHEEL
  window.addEventListener('wheel', (e) => {
    if (expanded && e.deltaY < 0 && window.scrollY <= 5){
      // scrolling back up to top → re-enter hero
      expanded = false;
      lockScroll(true);
      e.preventDefault();
      setProgress(progress - 0.05);
      return;
    }
    if (!expanded){
      e.preventDefault();
      setProgress(progress + e.deltaY * 0.0009);
    }
  }, { passive:false });

  // TOUCH
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive:true });

  window.addEventListener('touchmove', (e) => {
    if (!touchStartY) return;
    const y = e.touches[0].clientY;
    const dy = touchStartY - y;

    if (expanded && dy < -20 && window.scrollY <= 5){
      expanded = false; lockScroll(true);
      e.preventDefault();
      setProgress(progress - 0.05);
    } else if (!expanded){
      e.preventDefault();
      const factor = dy < 0 ? 0.008 : 0.005;
      setProgress(progress + dy * factor);
      touchStartY = y;
    }
  }, { passive:false });

  window.addEventListener('touchend', () => { touchStartY = 0; });

  // keep window pinned to top while hero animates
  window.addEventListener('scroll', () => {
    if (!expanded) window.scrollTo(0, 0);
    if (window.scrollY > 8) navEl.classList.add('scrolled');
    else navEl.classList.remove('scrolled');
  });

  // smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      if (!expanded){
        // jump-expand the hero so the user lands at the section
        setProgress(1);
      }
      requestAnimationFrame(() => el.scrollIntoView({ behavior:'smooth', block:'start' }));
    });
  });
})();
