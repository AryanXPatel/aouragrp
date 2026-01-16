/* =========================================
   AOURA: INTERACTIVE LOGIC
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- PRELOADER ---
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('loaded');
        }
    }, 1500); // 1.5 seconds synthetic load

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
        const offset = scrollPosition * 0.15;
        parallaxImage.style.transform = `translateY(${offset - 100}px)`; // Offset logic
    });

    // --- MAGNETIC BUTTON EFFECT (Think Hard Improvement) ---
    // Applies to the main CTA button for a premium feel
    const magneticBtns = document.querySelectorAll('.btn-primary');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px) scale(1)';
        });
    });

    // --- DUBAI TIME CLOCK ---
    function updateDubaiTime() {
        const timeDisplay = document.getElementById('dubai-time');
        if (timeDisplay) {
            const now = new Date();
            const options = { timeZone: "Asia/Dubai", hour: '2-digit', minute: '2-digit' };
            timeDisplay.textContent = now.toLocaleTimeString('en-US', options);
        }
    }
    setInterval(updateDubaiTime, 1000);
    updateDubaiTime(); // Initial call



    // --- REMOVE LOADING CLASS ---
    window.onload = () => {
        document.body.classList.remove('is-loading');
    };

});
