// Performance-optimized animation configuration
const ANIMATION_CONFIG = {
    duration: {
        short: 0.3,
        medium: 0.6,
        long: 1
    },
    ease: {
        default: 'power2.out',
        smooth: 'sine.inOut'
    },
    // Use transform instead of top/left for better performance
    transformOrigin: '50% 50%',
    force3D: true,
    // Batch animations for better performance
    batchMax: 3
};

// Initialize animations with performance optimizations
function initializeAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Batch similar animations
    const heroElements = [
        '.hero-content h1',
        '.hero-content h3',
        '.cta-button'
    ];

    // Create timeline for hero animations
    const heroTimeline = gsap.timeline({
        defaults: {
            ease: ANIMATION_CONFIG.ease.default,
            force3D: true
        }
    });

    heroTimeline
        .from(heroElements[0], {
            y: 30,
            opacity: 0,
            duration: ANIMATION_CONFIG.duration.medium
        })
        .from(heroElements[1], {
            y: 30,
            opacity: 0,
            duration: ANIMATION_CONFIG.duration.medium
        }, "-=0.4")
        .from(heroElements[2], {
            y: 20,
            opacity: 0,
            duration: ANIMATION_CONFIG.duration.short
        }, "-=0.3");

    // Initialize other animations
    initializeProductAnimations();
    setupScrollAnimations();
    setupReducedMotion();
}

// Hero Content Animations
function initializeHeroContent() {
    gsap.from('.hero-content h1', {
        duration: ANIMATION_CONFIG.duration.medium,
        y: 30,
        opacity: 0,
        ease: ANIMATION_CONFIG.ease.default
    });

    gsap.from('.hero-content h3', {
        duration: ANIMATION_CONFIG.duration.medium,
        y: 30,
        opacity: 0,
        ease: ANIMATION_CONFIG.ease.default,
        delay: 0.2
    });

    gsap.from('.cta-button', {
        duration: ANIMATION_CONFIG.duration.short,
        y: 20,
        opacity: 0,
        ease: ANIMATION_CONFIG.ease.default,
        delay: 0.6
    });
}

// Hero Background Animations
function initializeHeroBackground() {
    const svg = document.querySelector('#hero-animation').contentDocument;
    if (!svg) return;

    const allPaths = svg.querySelectorAll('path, circle, line, rect');
    allPaths.forEach(path => {
        path.style.mixBlendMode = 'normal';
    });

    // Graph animations
    const graphNodes = svg.querySelectorAll('#graphTheory circle');
    graphNodes.forEach((node, i) => {
        gsap.to(node, {
            scale: 1.1,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: ANIMATION_CONFIG.ease.smooth,
            delay: i * 0.5
        });
    });

    const graphEdges = svg.querySelectorAll('#graphTheory line');
    graphEdges.forEach((edge, i) => {
        edge.style.mixBlendMode = 'normal';
        gsap.to(edge, {
            opacity: 0.6,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: ANIMATION_CONFIG.ease.smooth,
            delay: i * 0.3
        });
    });
}

// Product section animations with batching
function initializeProductAnimations() {
    // Batch product section animations
    ScrollTrigger.batch(".product-section", {
        batchMax: ANIMATION_CONFIG.batchMax,
        onEnter: batch => {
            gsap.from(batch, {
                y: 30,
                opacity: 0,
                duration: ANIMATION_CONFIG.duration.medium,
                force3D: true,
                stagger: 0.15
            });
        },
        start: "top 85%"
    });

    // Optimize SVG animations
    gsap.utils.toArray('.section-animation').forEach(animation => {
        gsap.set(animation, { willChange: "transform" });
        ScrollTrigger.create({
            trigger: animation,
            start: "top center",
            onEnter: () => {
                gsap.to(animation, {
                    scale: 1.05,
                    duration: ANIMATION_CONFIG.duration.medium,
                    force3D: true
                });
            },
            onLeaveBack: () => {
                gsap.to(animation, {
                    scale: 1,
                    duration: ANIMATION_CONFIG.duration.medium,
                    force3D: true
                });
            }
        });
    });
}

// Scroll animations with batching and throttling
function setupScrollAnimations() {
    // Batch testimonial animations
    ScrollTrigger.batch(".testimonial-card", {
        batchMax: ANIMATION_CONFIG.batchMax,
        onEnter: batch => {
            gsap.from(batch, {
                y: 30,
                opacity: 0,
                duration: ANIMATION_CONFIG.duration.medium,
                force3D: true,
                stagger: 0.15
            });
        },
        start: "top 85%"
    });
}

// Optimized reduced motion handling
function setupReducedMotion() {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function updateAnimationPreference(event) {
        if (event.matches) {
            // Disable animations
            gsap.globalTimeline.timeScale(0.1);
            ScrollTrigger.defaults({ disable: true });
        } else {
            // Re-enable animations
            gsap.globalTimeline.timeScale(1);
            ScrollTrigger.defaults({ disable: false });
        }
    }
    
    mediaQuery.addEventListener('change', updateAnimationPreference);
    updateAnimationPreference(mediaQuery);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeAnimations);

// Memory cleanup on page unload
window.addEventListener('unload', () => {
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.globalTimeline.clear();
});
