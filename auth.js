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