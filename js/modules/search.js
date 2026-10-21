/* ==================================================
   MODULE : RECHERCHE
   RESPONSABILITÉ : filtrer les éléments visibles dans la vue.
   FUTUR FICHIER : js/modules/search.js
   RÔLE DANS LE PROJET : recherche de démonstration pour la maquette.
   ================================================== */
window.NutriTrack = window.NutriTrack || {};

window.NutriTrack.search = {
  init: function () {
    const searchInput = document.querySelector('.search input');
    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
      const value = this.value.trim().toLowerCase();
      const rows = document.querySelectorAll('.table-card tbody tr');

      rows.forEach((row) => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(value) ? '' : 'none';
      });
    });
  }
};
