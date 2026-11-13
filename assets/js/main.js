/**
 * Sol Tropical Bebidas — Scripts Oficiais
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualizar ano no rodapé
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Menu Responsivo Mobile Toggle
  const headerMenuToggle = document.getElementById('headerMenuToggle');
  const topNav = document.getElementById('topNav');

  if (headerMenuToggle && topNav) {
    const hamburgerSvg = `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`;
    const closeSvg = `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`;

    headerMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = topNav.classList.toggle('open');
      headerMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      headerMenuToggle.innerHTML = isOpen ? closeSvg : hamburgerSvg;
    });

    // Fechar ao clicar em qualquer link do menu
    topNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (topNav.classList.contains('open')) {
          topNav.classList.remove('open');
          headerMenuToggle.setAttribute('aria-expanded', 'false');
          headerMenuToggle.innerHTML = hamburgerSvg;
        }
      });
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (topNav.classList.contains('open') && !topNav.contains(e.target) && !headerMenuToggle.contains(e.target)) {
        topNav.classList.remove('open');
        headerMenuToggle.setAttribute('aria-expanded', 'false');
        headerMenuToggle.innerHTML = hamburgerSvg;
      }
    });
  }

  // 3. ScrollSpy para destacar secção ativa no menu
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.top-nav .nav-link');

  if (sections.length && navLinks.length) {
    const onScroll = () => {
      const scrollPos = window.scrollY + 120;
      let currentSectionId = '';

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = section.getAttribute('id');
        }
      });

      if (!currentSectionId && window.scrollY < 200) {
        currentSectionId = 'inicio';
      }

      if (currentSectionId) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
});

