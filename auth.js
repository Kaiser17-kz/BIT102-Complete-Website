document.addEventListener('DOMContentLoaded', function() {
    fetch('check_login.php')
    .then(response => response.json())
    .then(data => {
        const loginLink = document.getElementById('login-link');
        const registerLink = document.getElementById('register-link');
        const logoutLink = document.getElementById('logout-link');
        const userProfile = document.getElementById('user-profile');

        if (data.loggedin) {
            loginLink.style.display = 'none';
            registerLink.style.display = 'none';
            logoutLink.style.display = 'block';
            userProfile.textContent = $_SESSION['username']; // Update the profile text
        } else {
            loginLink.style.display = 'block';
            registerLink.style.display = 'block';
            logoutLink.style.display = 'none';
            userProfile.textContent = 'USER PROFILE';
        }
    });
});

const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const signUpLink = document.querySelector('.signUp-link');
const signInLink = document.querySelector('.signIn-link');
const wrapper = document.querySelector('.wrapper');
const closeIcon = document.querySelector('.icon-close');

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.style.display = 'flex';
    document.querySelector('.sign-in').style.display = 'block';
    document.querySelector('.sign-up').style.display = 'none';
});

registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    wrapper.style.display = 'flex';
    document.querySelector('.sign-in').style.display = 'none';
    document.querySelector('.sign-up').style.display = 'block';
});

signUpLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.sign-in').style.display = 'none';
    document.querySelector('.sign-up').style.display = 'block';
});

signInLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.sign-in').style.display = 'block';
    document.querySelector('.sign-up').style.display = 'none';
});

closeIcon.addEventListener('click', function() {
    wrapper.style.display = 'none';
});