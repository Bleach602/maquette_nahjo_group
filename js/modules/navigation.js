/* ==================================================
   MODULE : NAVIGATION
   RESPONSABILITÉ : gérer la navigation entre les écrans.
   FUTUR FICHIER : js/modules/navigation.js
   RÔLE DANS LE PROJET : changer le contenu central sans recharger tout l'app.
   ================================================== */
window.NutriTrack = window.NutriTrack || {};

window.NutriTrack.navigation = {
  currentView: 'dashboard',

  init: function () {
    const menuItems = document.querySelectorAll('.nav__item');

    menuItems.forEach((item) => {
      item.addEventListener('click', () => {
        const view = item.dataset.view;
        if (!view) return;
        this.setActiveMenu(item);
        this.loadView(view);
      });
    });

    this.loadView(this.currentView);
  },

  setActiveMenu: function (activeItem) {
    document.querySelectorAll('.nav__item').forEach((item) => {
      item.classList.toggle('active', item === activeItem);
    });
  },

  loadView: function (viewName) {
    const contentRoot = document.getElementById('content-root');

    if (!contentRoot) {
      return;
    }

    const titles = {
      dashboard: 'Tableau de bord',
      clients: 'Clients',
      products: 'Produits',
      supplies: 'Approvisionnements',
      sales: 'Ventes',
      payments: 'Paiements',
      inventory: 'Inventaires',
      documents: 'Documents',
      notifications: 'Notifications',
      users: 'Utilisateurs',
      backups: 'Sauvegardes'
    };

    const viewMap = {
      dashboard: 'components/dashboard.html',
      clients: 'components/dashboard.html',
      products: 'components/dashboard.html',
      supplies: 'components/dashboard.html',
      sales: 'components/dashboard.html',
      payments: 'components/dashboard.html',
      inventory: 'components/dashboard.html',
      documents: 'components/dashboard.html',
      notifications: 'components/dashboard.html',
      users: 'components/dashboard.html',
      backups: 'components/dashboard.html'
    };

    fetch(viewMap[viewName] || 'components/dashboard.html')
      .then((response) => response.text())
      .then((html) => {
        contentRoot.innerHTML = html;
        const titleNode = document.querySelector('.topbar__title');
        if (titleNode) {
          titleNode.textContent = titles[viewName] || 'Tableau de bord';
        }
      })
      .catch((error) => {
        console.error('Erreur de chargement de la vue', error);
        contentRoot.innerHTML = '<div class="error-state">Vue indisponible.</div>';
      });

    this.currentView = viewName;
  }
};
