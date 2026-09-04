document.addEventListener('DOMContentLoaded', () => {
    // Remove loading class
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 100);

    // Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    
    // Check if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Follower uses slight delay with transform
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        });

        // Hover effects on interactable elements
        const interactables = document.querySelectorAll('a, button, .skill-tag');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.classList.add('hoverActive');
            });
            el.addEventListener('mouseleave', () => {
                follower.classList.remove('hoverActive');
            });
        });
    } else {
        // hide cursors on touch devices
        cursor.style.display = 'none';
        follower.style.display = 'none';
    }

    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Animations with Intersection Observer
    const animatedElements = document.querySelectorAll('.fade-in-up');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
});
