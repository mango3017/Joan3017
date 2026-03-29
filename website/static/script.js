// Basic auth simulation
let users = JSON.parse(localStorage.getItem('users')) || [];

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const logoutBtn = document.getElementById('logout-btn');
    const welcomeUser = document.getElementById('welcome-user');
    const authLinks = document.getElementById('auth-links');

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('signup-username').value;
            const password = document.getElementById('signup-password').value;
            if (users.find(u => u.username === username)) {
                document.getElementById('signup-message').textContent = 'User already exists';
            } else {
                users.push({username, password});
                localStorage.setItem('users', JSON.stringify(users));
                document.getElementById('signup-message').textContent = 'Sign up successful';
                setTimeout(() => window.location.href = '/login', 1000);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                localStorage.setItem('currentUser', username);
                document.getElementById('login-message').textContent = 'Login successful';
                setTimeout(() => window.location.href = '/', 1000);
            } else {
                document.getElementById('login-message').textContent = 'Invalid credentials';
            }
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            updateUI();
        });
    }

    function updateUI() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            if (authLinks) authLinks.style.display = 'none';
            if (welcomeUser) welcomeUser.textContent = `Welcome, ${currentUser}`;
            if (logoutBtn) logoutBtn.style.display = 'inline';
            // Hide modal if it exists
            const modal = document.getElementById('auth-modal');
            if (modal) modal.style.display = 'none';
        } else {
            if (authLinks) authLinks.style.display = 'block';
            if (welcomeUser) welcomeUser.textContent = '';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }

    updateUI();
});