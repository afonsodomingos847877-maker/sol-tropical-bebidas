/**
 * Sol Tropical Bebidas — Scripts Oficiais
 */

document.addEventListener('DOMContentLoaded', () => {
  // Atualizar ano no rodapé
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
