/* ==================================================
   MODULE : APPLICATION
   RESPONSABILITÉ : initialisation globale de l'interface.
   FUTUR FICHIER : js/app.js
   RÔLE DANS LE PROJET : orchestrer le démarrage des modules.
   ================================================== */
window.NutriTrack = window.NutriTrack || {};

window.NutriTrack.initApp = async function () {
  const appRoot = document.getElementById('app');

  if (!appRoot) {
    return;
  }

  try {
    const layoutResponse = await fetch('components/layout.html');
    const layoutMarkup = await layoutResponse.text();
    appRoot.innerHTML = layoutMarkup;

    const [sidebarHtml, navbarHtml] = await Promise.all([
      fetch('components/sidebar.html').then((r) => r.text()),
      fetch('components/navbar.html').then((r) => r.text())
    ]);

    const sidebarRoot = document.getElementById('sidebar-root');
    const navbarRoot = document.getElementById('navbar-root');

    if (sidebarRoot) sidebarRoot.innerHTML = sidebarHtml;
    if (navbarRoot) navbarRoot.innerHTML = navbarHtml;

    if (window.NutriTrack.navigation && typeof window.NutriTrack.navigation.init === 'function') {
      window.NutriTrack.navigation.init();
    }

    if (window.NutriTrack.search && typeof window.NutriTrack.search.init === 'function') {
      window.NutriTrack.search.init();
    }
  } catch (error) {
    console.error('Erreur de chargement de la maquette NutriTrack', error);
    appRoot.innerHTML = '<div class="error-state">Impossible de charger la maquette.</div>';
  }
};

document.addEventListener('DOMContentLoaded', function () {
  window.NutriTrack.initApp();
});
