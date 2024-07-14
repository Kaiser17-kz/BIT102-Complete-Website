/*checks if a user is logged in when the webpage loads */
document.addEventListener('DOMContentLoaded', function() {
    fetch('check_login.php')
    .then(response => response.json()) //process a json response from the server
    .then(data => {
        const loginLink = document.getElementById('login-link');
        const registerLink = document.getElementById('register-link');
        const logoutLink = document.getElementById('logout-link');
        const userProfile = document.getElementById('user-profile');

        if (data.loggedin) {
            loginLink.style.display = 'none';
            registerLink.style.display = 'none';
            logoutLink.style.display = 'block';
            userProfile.textContent = $_SESSION['username'];
        } else {
            loginLink.style.display = 'block';
            registerLink.style.display = 'block';
            logoutLink.style.display = 'none';
            userProfile.textContent = 'USER PROFILE';
        }
    });
});
