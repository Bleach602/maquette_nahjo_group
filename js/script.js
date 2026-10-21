document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.querySelector('.mobile-menu');
  const sidebar = document.querySelector('.sidebar');

  if (mobileMenu && sidebar) {
    mobileMenu.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
});
