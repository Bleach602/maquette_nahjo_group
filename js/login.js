(function () {
    'use strict';

    const form       = document.getElementById('loginForm');
    const email      = document.getElementById('email');
    const password   = document.getElementById('password');
    const emailField = document.getElementById('emailField');
    const passField  = document.getElementById('passwordField');
    const emailErr   = document.getElementById('emailError');
    const passErr    = document.getElementById('passwordError');
    const toggle     = document.getElementById('togglePassword');
    const submitBtn  = document.getElementById('submitBtn');
    const submitLbl  = document.getElementById('submitLabel');
    const alertBox   = document.getElementById('alertBox');

    const isValidEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

    function setError(field, el, msg) {
        field.classList.add('has-error');
        el.textContent = msg;
    }
    function clearError(field, el) {
        field.classList.remove('has-error');
        el.textContent = '';
    }
    function showAlert(msg, type = 'error') {
        alertBox.textContent = msg;
        alertBox.className = 'alert' + (type === 'success' ? ' alert--success' : '');
        alertBox.hidden = false;
    }
    function hideAlert() { alertBox.hidden = true; }

    function checkEmail() {
        const v = email.value.trim();
        if (!v)               { setError(emailField, emailErr, 'Veuillez saisir votre email.'); return false; }
        if (!isValidEmail(v)) { setError(emailField, emailErr, 'Adresse email invalide.'); return false; }
        clearError(emailField, emailErr);
        return true;
    }
    function checkPassword() {
        const v = password.value;
        if (!v)           { setError(passField, passErr, 'Veuillez saisir votre mot de passe.'); return false; }
        if (v.length < 6) { setError(passField, passErr, 'Minimum 6 caractères.'); return false; }
        clearError(passField, passErr);
        return true;
    }

    email.addEventListener('blur', checkEmail);
    password.addEventListener('blur', checkPassword);
    email.addEventListener('input', () => emailField.classList.contains('has-error') && checkEmail());
    password.addEventListener('input', () => passField.classList.contains('has-error') && checkPassword());

    toggle.addEventListener('click', () => {
        const hidden = password.type === 'password';
        password.type = hidden ? 'text' : 'password';
        toggle.textContent = hidden ? 'Masquer' : 'Afficher';
        toggle.setAttribute('aria-label', hidden ? 'Masquer le mot de passe' : 'Afficher le mot de passe');
        toggle.setAttribute('aria-pressed', String(hidden));
        password.focus();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        hideAlert();

        const okEmail = checkEmail();
        const okPass  = checkPassword();
        if (!okEmail || !okPass) {
            (!okEmail ? email : password).focus();
            return;
        }

        submitBtn.disabled = true;
        submitBtn.classList.add('is-loading');
        submitLbl.textContent = 'Connexion…';

        setTimeout(() => {
            if (email.value.trim().toLowerCase() === 'admin@nahjo.com') {
                showAlert('Connexion réussie. Redirection…', 'success');
            } else {
                showAlert('Identifiants incorrects. Vérifiez votre email et votre mot de passe.');
            }
            submitBtn.disabled = false;
            submitBtn.classList.remove('is-loading');
            submitLbl.textContent = 'Se connecter';
        }, 800);
    });
})();