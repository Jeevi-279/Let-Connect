document.addEventListener('DOMContentLoaded', () => {
    /* --- Hamburger Menu & Overlay --- */
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('overlay');

    // Toggle hamburger menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    overlay.addEventListener('click', () => {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    /* --- Scroll-triggered animations for dynamic sections --- */
    const dynamicSections = document.querySelectorAll('.dynamic-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const videoElement = entry.target.querySelector('video');
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                if (videoElement && videoElement.paused) {
                    videoElement.play().catch(error => {
                        console.warn("Autoplay was prevented:", error);
                    });
                }
            } else {
                if (videoElement && !videoElement.paused) {
                    videoElement.pause();
                }
            }
        });
    }, observerOptions);

    dynamicSections.forEach(section => {
        sectionObserver.observe(section);
    });

    /* --- Smooth scroll for nav links --- */
    document.querySelectorAll('.main-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* --- Pricing Plan Toggle (REVISED) --- */
    document.querySelectorAll('.toggle-details').forEach(button => {
        button.addEventListener('click', () => {
            const planId = button.dataset.plan;
            const content = document.getElementById(`plan-${planId}`);

            // Hide all other plan contents
            document.querySelectorAll('.plan-content').forEach(div => {
                if (div !== content) div.style.display = 'none';
            });

            // Toggle selected plan content
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
});

