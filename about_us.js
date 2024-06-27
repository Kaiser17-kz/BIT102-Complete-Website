document.addEventListener('DOMContentLoaded', function() {
    // Function to toggle a class for header navigation items
    function toggleActiveClass(event) {
        const navLinks = document.querySelectorAll('header nav ul li a');
        navLinks.forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');
    }

    // Add event listeners to header navigation links
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            toggleActiveClass(event);
            // Smooth scrolling to anchor link
            const targetId = event.target.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Function to handle scroll behavior (example)
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Example: Scroll to top button functionality
    const scrollToTopButton = document.getElementById('scrollToTopButton');
    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', scrollToTop);
    }
});
