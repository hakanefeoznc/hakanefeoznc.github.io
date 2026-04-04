/* ============================================
   HAKAN ÖZENÇ — PERSONAL WEBSITE
   main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- MOBILE NAV TOGGLE ----
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ---- SCROLL: navbar shadow ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.style.background = 'rgba(8,8,15,0.95)';
    } else {
      navbar.style.background = 'rgba(8,8,15,0.75)';
    }
  });

  // ---- INTERSECTION OBSERVER for animations ----
  const animEls = document.querySelectorAll('.animate-up, .animate-left, .animate-right');
  if (animEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.15 });

    animEls.forEach(el => obs.observe(el));
  }

  // ---- TYPEWRITER (home page) ----
  const tw = document.getElementById('typewriter');
  if (tw) {
    const phrases = [
      'Yazılım Geliştirici',
      'UI/UX Tasarımcı',
      'Full-Stack Developer',
      'Problem Çözücü'
    ];
    let pIdx = 0, cIdx = 0, deleting = false;

    function type() {
      const current = phrases[pIdx];
      if (!deleting) {
        tw.textContent = current.slice(0, ++cIdx);
        if (cIdx === current.length) {
          deleting = true;
          setTimeout(type, 2000);
          return;
        }
      } else {
        tw.textContent = current.slice(0, --cIdx);
        if (cIdx === 0) {
          deleting = false;
          pIdx = (pIdx + 1) % phrases.length;
        }
      }
      setTimeout(type, deleting ? 60 : 90);
    }
    type();
  }

  // ---- COUNTER ANIMATION (stats section) ----
  const counters = document.querySelectorAll('.stat-num');
  if (counters.length) {
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'));
          let current = 0;
          const step = Math.ceil(target / 50);
          const interval = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current;
            if (current >= target) clearInterval(interval);
          }, 30);
          cObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => cObs.observe(c));
  }

  // ---- SKILL BARS animation ----
  const bars = document.querySelectorAll('.bar-fill');
  if (bars.length) {
    const bObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.getAttribute('data-w') + '%';
          bObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(b => bObs.observe(b));
  }

  // ---- PROJECT FILTER ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projCards  = document.querySelectorAll('.proj-card');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        projCards.forEach(card => {
          const cat = card.getAttribute('data-cat');
          if (filter === 'all' || cat === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // ---- CONTACT FORM ----
  window.handleSend = function() {
    const name    = document.getElementById('fname')?.value.trim();
    const email   = document.getElementById('femail')?.value.trim();
    const subject = document.getElementById('fsubject')?.value.trim();
    const msg     = document.getElementById('fmsg')?.value.trim();
    const success = document.getElementById('formSuccess');
    const btn     = document.getElementById('sendBtn');

    if (!name || !email || !msg) {
      alert('Lütfen ad, e-posta ve mesaj alanlarını doldurun.');
      return;
    }
    if (!email.includes('@')) {
      alert('Geçerli bir e-posta adresi girin.');
      return;
    }

    // Simulate send
    if (btn) {
      btn.textContent = 'Gönderiliyor...';
      btn.disabled = true;
    }
    setTimeout(() => {
      if (success) success.style.display = 'block';
      if (btn) {
        btn.textContent = 'Gönderildi ✓';
        btn.style.background = '#4ecb71';
        btn.style.color = '#08080f';
      }
      document.getElementById('fname').value = '';
      document.getElementById('femail').value = '';
      document.getElementById('fsubject').value = '';
      document.getElementById('fmsg').value = '';
    }, 1200);
  };

  // ---- SMOOTH appear for hero elements (immediate) ----
  // Trigger hero animations immediately on load
  setTimeout(() => {
    document.querySelectorAll('.animate-up, .animate-left, .animate-right').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('in-view');
      }
    });
  }, 100);

});
