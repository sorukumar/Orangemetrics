document.addEventListener('DOMContentLoaded', function() {
    NavigationManager.init();
});

// Navigation Management
const NavigationManager = {
    init() {
        this.setupMobileNav();
        this.setupSmoothScrolling();
        this.setupScrollAwareHeader();
        this.setupScrollSpy();
    },
    
    setupMobileNav() {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                }
            });
            
            // Close menu when clicking a link
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });
        }
    },
    
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // If it's a contact form link, focus the first input
                    if (targetId === '#contact') {
                        setTimeout(() => {
                            const firstInput = document.querySelector('#contact form input:first-of-type');
                            if (firstInput) {
                                firstInput.focus();
                            }
                        }, 800); // Wait for scroll to complete
                    }
                }
            });
        });
    },

    setupScrollAwareHeader() {
        const header = document.querySelector('header');
        let scrollTimeout;
        const logo = document.querySelector('.logo img');

        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }

            scrollTimeout = window.requestAnimationFrame(() => {
                // Add header-scrolled class when scrolled down more than 50px
                if (window.pageYOffset > 50) {
                    header.classList.add('header-scrolled');
                } else {
                    header.classList.remove('header-scrolled');
                }
                
                // Optional: Calculate proportional size reduction for more granular control
                if (window.innerWidth > 768) { // Only on desktop
                    const scrollPercentage = Math.min(window.pageYOffset / 300, 1);
                    const scale = 1 - (scrollPercentage * 0.15); // Reduces by up to 15%
                    
                    // Apply smooth proportional scaling to container width
                    const container = header.querySelector('.container');
                    if (container) {
                        const baseWidth = 1300;
                        const minWidth = 1200;
                        const width = baseWidth - (scrollPercentage * (baseWidth - minWidth));
                        container.style.maxWidth = `${width}px`;
                    }
                }
            });
        });
    },

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id], .product-section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 150) {
                    current = section.getAttribute('id') || '';
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
};

// Your existing animation initialization code goes here
// For example:
