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
      dashboard: 'web/components/dashboard.html',
      clients: 'web/components/clients.html',
      products: 'web/components/products.html',
      supplies: 'web/components/sales.html',
      sales: 'web/components/sales.html',
      payments: 'web/components/sales.html',
      inventory: 'web/components/sales.html',
      documents: 'web/components/products.html',
      notifications: 'web/components/clients.html',
      users: 'web/components/clients.html',
      backups: 'web/components/products.html'
    };

    fetch(viewMap[viewName] || 'web/components/dashboard.html')
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
