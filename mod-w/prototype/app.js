/* ============================================================
   Frank McGuire Portfolio — Prototype interactions
   Research artifact. Non-authoritative. Plain JS only.
   ============================================================ */
(function () {
  'use strict';

  /* Enable reveal animations only when JS is running */
  document.documentElement.classList.add('js');

  /* --- Mobile menu ---------------------------------------- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  var close = document.getElementById('navClose');

  function openMenu() { menu.classList.add('open'); }
  function closeMenu() { menu.classList.remove('open'); }

  if (toggle) toggle.addEventListener('click', openMenu);
  if (close) close.addEventListener('click', closeMenu);
  if (menu) {
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* --- Scroll-spy: highlight active nav pill -------------- */
  var pills = Array.prototype.slice.call(document.querySelectorAll('.navpill a'));
  var sectionMap = pills
    .map(function (a) {
      var id = a.getAttribute('href').replace('#', '');
      var el = id === 'top' ? document.getElementById('top') : document.getElementById(id);
      return el ? { link: a, el: el } : null;
    })
    .filter(Boolean);

  function onScroll() {
    var pos = window.scrollY + 120;
    var current = sectionMap[0];
    sectionMap.forEach(function (m) {
      if (m.el.offsetTop <= pos) current = m;
    });
    pills.forEach(function (p) { p.classList.remove('active'); });
    if (current) current.link.classList.add('active');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Reveal-on-scroll ----------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (r) { io.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add('in'); });
  }
})();
