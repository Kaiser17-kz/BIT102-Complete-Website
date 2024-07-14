document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle the active class for header navigation items
    function toggleActiveClass(event) {
        const navLinks = document.querySelectorAll('header nav ul li a');
        navLinks.forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');
    }

    // Add event listeners to header navigation links
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = event.target.getAttribute('href');
            const targetId = href.startsWith('#') ? href.substring(1) : null;
            const targetElement = targetId ? document.getElementById(targetId) : null;

            if (targetElement) {
                // Internal link
                event.preventDefault();
                toggleActiveClass(event);
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                // External link
                toggleActiveClass(event);
            }
        });
    });

    // Function to handle scroll behavior
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Scroll to top button functionality
    const scrollToTopButton = document.getElementById('scrollToTopButton');
    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', scrollToTop);
    }
});
