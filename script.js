// ---------------------------------------------------------------------
// Preloader
// ---------------------------------------------------------------------
const preloader = document.getElementById('preloader');
if (preloader){
  document.body.classList.add('lock');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('is-hidden');
      document.body.classList.remove('lock');
      animateHero();
    }, 600);
  });
} else {
  animateHero();
}

// ---------------------------------------------------------------------
// Header scroll state
// ---------------------------------------------------------------------
const header = document.getElementById('header');
if (header){
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---------------------------------------------------------------------
// Mobile nav toggle
// ---------------------------------------------------------------------
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
if (navToggle && mobileNav){
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('is-open');
    mobileNav.classList.toggle('is-open');
    document.body.classList.toggle('lock');
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navToggle.classList.remove('is-open');
      mobileNav.classList.remove('is-open');
      document.body.classList.remove('lock');
    });
  });
}

// ---------------------------------------------------------------------
// Hero load-in animation
// ---------------------------------------------------------------------
function animateHero(){
  const title = document.querySelector('.hero__title span');
  if (title){
    title.style.transition = 'transform .9s cubic-bezier(.16,.84,.44,1)';
    requestAnimationFrame(() => { title.style.transform = 'translateY(0)'; });
  }
}

// ---------------------------------------------------------------------
// Case video slots: hide gracefully until the real file is uploaded
// ---------------------------------------------------------------------
document.querySelectorAll('.case-video source').forEach(src => {
  src.addEventListener('error', () => {
    const wrapper = src.closest('.case-video');
    if (wrapper) wrapper.style.display = 'none';
  });
});

document.querySelectorAll('.case-photo img').forEach(img => {
  img.addEventListener('error', () => {
    const wrapper = img.closest('.case-photo');
    if (wrapper) wrapper.style.display = 'none';
  });
});

// ---------------------------------------------------------------------
// Scroll reveal (sections + case cards)
// ---------------------------------------------------------------------
const revealTargets = document.querySelectorAll('.reveal, .case-card');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting){
      setTimeout(() => entry.target.classList.add('is-visible'), i * 60);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => io.observe(el));
