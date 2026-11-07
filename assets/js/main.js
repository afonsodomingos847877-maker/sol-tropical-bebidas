/**
 * Sol Tropical Bebidas — Scripts Oficiais & Interatividade
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualizar ano no rodapé
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Base de Dados dos 9 Sabores Sorriso
  const flavorsData = {
    'Tamarindo': {
      title: 'Sorriso Tamarindo',
      desc: 'Sabor exótico, encorpado e agridoce. Um dos favoritos mais tradicionais e autênticos de Moçambique.',
      tag: 'Exótico & Tradicional',
      color: '#b25e29'
    },
    'Maçã Verde': {
      title: 'Sorriso Maçã Verde',
      desc: 'Frescura intensa com toque crocante e equilibrado de acidez, perfeito para matar a sede em dias quentes.',
      tag: 'Crocante & Refrescante',
      color: '#55b338'
    },
    'Ananás': {
      title: 'Sorriso Ananás',
      desc: 'O autêntico sabor tropical da fruta madura ao sol moçambicano. Doçura sumarenta e aroma irresistível.',
      tag: 'Tropical & Doce',
      color: '#e5a912'
    },
    'Limão': {
      title: 'Sorriso Limão',
      desc: 'Explosão cítrica revigorante, equilibrada com gás fino para recarregar energias a qualquer hora.',
      tag: 'Cítrico & Revigorante',
      color: '#84cc16'
    },
    'Maracujá': {
      title: 'Sorriso Maracujá',
      desc: 'Intenso, aromático e aveludado. A essência dos frutos tropicais numa bebida irresistível.',
      tag: 'Aromático & Intenso',
      color: '#f59e0b'
    },
    'Uva': {
      title: 'Sorriso Uva',
      desc: 'Sabor suave e encorpado de uvas selecionadas, com final doce e reconfortante.',
      tag: 'Doce & Encorpado',
      color: '#8b5cf6'
    },
    'Laranja': {
      title: 'Sorriso Laranja',
      desc: 'A clássica energia cítrica, alegre e vibrante que agrada a toda a família à mesa.',
      tag: 'Clássico & Vibrante',
      color: '#f97316'
    },
    'Maçã & Canela': {
      title: 'Sorriso Maçã & Canela',
      desc: 'Combinação rica e exclusiva da doçura da maçã com o aroma quente e especiado da canela.',
      tag: 'Exclusivo & Aromático',
      color: '#dc2626'
    },
    'Morango': {
      title: 'Sorriso Morango',
      desc: 'Vibrante, doce e frutado. A escolha perfeita para momentos alegres e festivos.',
      tag: 'Frutado & Irresistível',
      color: '#ef4444'
    }
  };

  const flavorTags = document.querySelectorAll('.flavor-tag');
  const previewBox = document.getElementById('flavor-preview-box');

  if (flavorTags.length && previewBox) {
    flavorTags.forEach(tag => {
      tag.addEventListener('click', () => {
        const name = tag.getAttribute('data-flavor') || tag.textContent.trim();
        const data = flavorsData[name];
        if (!data) return;

        flavorTags.forEach(t => t.classList.remove('active'));
        tag.classList.add('active');

        previewBox.innerHTML = `
          <div class="flavor-detail" style="border-left: 4px solid ${data.color};">
            <h4>
              ${data.title}
              <span class="flavor-mini-tag" style="background:${data.color}20; color:${data.color}; border:1px solid ${data.color}45;">
                ${data.tag}
              </span>
            </h4>
            <p>${data.desc}</p>
          </div>
        `;
      });
    });
  }

  // 3. Modal / Lightbox para o Banner 2000px em Alta Definição
  const bannerCard = document.querySelector('.banner-card');
  const bannerImg = document.querySelector('.banner-media img');
  const modal = document.getElementById('banner-modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');

  if (bannerCard && modal && modalImg && modalClose) {
    const openModal = () => {
      modalImg.src = bannerImg ? bannerImg.src : 'assets/images/sorriso-banner.png';
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    bannerCard.addEventListener('click', openModal);
    modalClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeModal();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 4. Botão Voltar ao Topo
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
