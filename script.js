/* =========================================
   AUORA: INTERACTIVE LOGIC
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- CUSTOM CURSOR ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .service-card, .review-item');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Slight delay for follower
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Hover effects for cursor
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            follower.classList.add('active');
        });
        link.addEventListener('mouseleave', () => {
            follower.classList.remove('active');
        });
    });


    // --- MOBILE MENU TOGGLE ---
    const menuBtn = document.querySelector('.nav-menu-btn');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-links a');
    const hamburger = document.querySelector('.hamburger');

    let isMenuOpen = false;

    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock scroll
            menuBtn.querySelector('span').textContent = 'CLOSE';
            hamburger.style.opacity = '0'; // Hide lines, maybe change to X
        } else {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            menuBtn.querySelector('span').textContent = 'MENU';
            hamburger.style.opacity = '1';
        }
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            menuBtn.querySelector('span').textContent = 'MENU';
            hamburger.style.opacity = '1';
        });
    });


    // --- SCROLL REVEAL ANIMATIONS (IntersectionObserver) ---
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing once revealed
                // revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to reveal
    const revealElements = document.querySelectorAll('.intro-text h2, .service-card, .review-item, .footer-cta');

    // Add initial css state for js-enabled browsers
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    // Inject CSS for the 'revealed' class
    const style = document.createElement('style');
    style.innerHTML = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);


    // --- PARALLAX EFFECT FOR IMAGE BREAK ---
    const parallaxImage = document.querySelector('.parallax-image-container');
    window.addEventListener('scroll', () => {
        if (!parallaxImage) return;

        const scrollPosition = window.scrollY;
        // Simple parallax calculation
        // Limit the effect to when it's in view could be better, but this is simple enough
        // parallaxImage.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    });

    // --- REMOVE LOADING CLASS ---
    window.onload = () => {
        document.body.classList.remove('is-loading');
    };

});
