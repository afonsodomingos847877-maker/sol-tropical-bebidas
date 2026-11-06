/**
 * Sol Tropical Bebidas — Scripts Oficiais
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualizar ano no rodapé
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Dados dos Sabores Sorriso
  const flavorsData = {
    'Tamarindo': {
      title: 'Sorriso Tamarindo',
      desc: 'Sabor exótico, encorpado e agridoce. Um dos favoritos tradicionais de Moçambique.',
      tag: 'Exótico & Tradicional',
      color: '#b25e29'
    },
    'Maçã Verde': {
      title: 'Sorriso Maçã Verde',
      desc: 'Frescura intensa com toque crocante e equilibrado de acidez para dias quentes.',
      tag: 'Crocante & Refrescante',
      color: '#55b338'
    },
    'Ananás': {
      title: 'Sorriso Ananás',
      desc: 'O autêntico sabor tropical da fruta madura ao sol. Doçura e aroma irresistíveis.',
      tag: 'Tropical & Doce',
      color: '#e5a912'
    },
    'Limão': {
      title: 'Sorriso Limão',
      desc: 'Explosão cítrica revigorante, perfeito para matar a sede e recarregar energias.',
      tag: 'Cítrico & Revigorante',
      color: '#84cc16'
    },
    'Maracujá': {
      title: 'Sorriso Maracujá',
      desc: 'Intenso, aromático e aveludado. A essência tropical numa bebida refrescante.',
      tag: 'Aromático & Intenso',
      color: '#f59e0b'
    },
    'Uva': {
      title: 'Sorriso Uva',
      desc: 'Sabor suave e encorpado de uvas selecionadas, com doçura equilibrada.',
      tag: 'Doce & Encorpado',
      color: '#8b5cf6'
    },
    'Laranja': {
      title: 'Sorriso Laranja',
      desc: 'A clássica energia cítrica e vibrante que agrada a toda a família.',
      tag: 'Clássico & Vibrante',
      color: '#f97316'
    },
    'Maçã & Canela': {
      title: 'Sorriso Maçã & Canela',
      desc: 'Uma combinação rica e exclusiva de notas frutadas com especiarias perfumadas.',
      tag: 'Exclusivo & Aromático',
      color: '#dc2626'
    },
    'Morango': {
      title: 'Sorriso Morango',
      desc: 'Vibrante, doce e frutado. A alegria das crianças e de todos que apreciam momentos doces.',
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
          <div class="flavor-detail" style="border-left: 4px solid ${data.color}">
            <h4>${data.title} <span class="flavor-mini-tag" style="background:${data.color}20; color:${data.color}; border:1px solid ${data.color}40">${data.tag}</span></h4>
            <p>${data.desc}</p>
          </div>
        `;
        previewBox.classList.add('show');
      });
    });
  }

  // 3. Modal / Lightbox para o Banner 2000px
  const bannerImg = document.querySelector('.banner-media img');
  const modal = document.getElementById('banner-modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');

  if (bannerImg && modal && modalImg && modalClose) {
    const openModal = () => {
      modalImg.src = bannerImg.src;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    bannerImg.style.cursor = 'zoom-in';
    bannerImg.title = 'Clique para ver o banner em alta resolução';
    bannerImg.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 4. Seletor Rápido de Assunto para WhatsApp
  const quoteBtns = document.querySelectorAll('.quick-quote-btn');
  const mainWhatsappBtn = document.getElementById('main-whatsapp-btn');

  if (quoteBtns.length && mainWhatsappBtn) {
    quoteBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        quoteBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const messageType = btn.getAttribute('data-type');
        let text = 'Olá! Gostaria de mais informações sobre os produtos da Sol Tropical Bebidas.';

        if (messageType === 'revenda') {
          text = 'Olá! Gostaria de cotação e condições para ser revendedor/distribuidor das bebidas Sol Tropical (Sorriso, First Cola, Água Serena).';
        } else if (messageType === 'sorriso') {
          text = 'Olá! Gostaria de encomendar a linha de Refrigerantes Sorriso (sabores e formatos).';
        } else if (messageType === 'first-cola') {
          text = 'Olá! Tenho interesse em encomendar o lote de First Cola 350ml.';
        } else if (messageType === 'agua-serena') {
          text = 'Olá! Gostaria de cotação para fardos de Água Serena 500ml.';
        }

        const encoded = encodeURIComponent(text);
        mainWhatsappBtn.href = `https://wa.me/258865588888?text=${encoded}`;
        
        // feedback visual
        mainWhatsappBtn.classList.add('btn-highlight');
        setTimeout(() => mainWhatsappBtn.classList.remove('btn-highlight'), 600);
      });
    });
  }

  // 5. Botão Voltar ao Topo
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
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

