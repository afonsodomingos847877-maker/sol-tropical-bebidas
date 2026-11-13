/**
 * Sol Tropical Bebidas — Scripts Oficiais
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualizar ano em todos os rodapés
  const yearEls = document.querySelectorAll('#year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(el => {
    el.textContent = currentYear;
  });

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

    // Fechar ao clicar em qualquer link simples ou dropdown item
    topNav.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item').forEach(link => {
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

  // 3. Dropdown Menu Toggle (Especialmente no Mobile / Touch)
  const navDropdowns = document.querySelectorAll('.nav-dropdown');
  navDropdowns.forEach(dropdown => {
    const toggleBtn = dropdown.querySelector('.dropdown-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        // No telemóvel, alternar o submenu ao tocar
        if (window.innerWidth <= 900) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    }
  });

  // Fechar dropdown ao clicar fora no desktop
  document.addEventListener('click', (e) => {
    navDropdowns.forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  });

  // 4. Detecção de Página Ativa para Links Internos
  const currentPath = window.location.pathname;
  if (currentPath.includes('quem-somos.html')) {
    const sobreDropdown = document.getElementById('dropdownSobre');
    if (sobreDropdown) sobreDropdown.classList.add('active');
    const linkQuemSomos = document.getElementById('linkQuemSomos');
    if (linkQuemSomos) linkQuemSomos.classList.add('active');
  } else if (currentPath.includes('missao-valores.html')) {
    const sobreDropdown = document.getElementById('dropdownSobre');
    if (sobreDropdown) sobreDropdown.classList.add('active');
    const linkMissao = document.getElementById('linkMissao');
    if (linkMissao) linkMissao.classList.add('active');
  } else if (currentPath.includes('produtos.html')) {
    const linkProdutos = document.getElementById('linkProdutos');
    if (linkProdutos) linkProdutos.classList.add('active');
  } else {
    // 5. ScrollSpy apenas na Página Inicial (index.html)
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
            if (link.getAttribute('href') === `#${currentSectionId}` || link.getAttribute('href') === `index.html#${currentSectionId}`) {
              link.classList.add('active');
            } else if (!link.classList.contains('dropdown-toggle')) {
              link.classList.remove('active');
            }
          });
        }
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }
});


