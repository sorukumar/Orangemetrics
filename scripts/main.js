document.addEventListener('DOMContentLoaded', function() {
    FormManager.init();
    NavigationManager.init();
});

// Form Management System
const FormManager = {
    init() {
        this.setupFormListeners();
        this.setupGoogleFormsCallback();
    },
    
    setupFormListeners() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        });
    },

    setupGoogleFormsCallback() {
        const iframe = document.getElementById('hidden_iframe');
        if (iframe) {
            iframe.addEventListener('load', () => {
                const submittedForm = document.querySelector('form[data-submitted="true"]');
                if (submittedForm) {
                    this.showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                    submittedForm.reset();
                    submittedForm.removeAttribute('data-submitted');
                }
            });
        }
    },

    handleFormSubmit(event) {
        const form = event.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const messageField = form.querySelector('textarea[name="entry.778966652"]');
        const formSource = form.querySelector('input[name="form-source"]');
        
        if (messageField && formSource) {
            const source = formSource.value;
            const userMessage = messageField.value;
            messageField.value = `[Form Source: ${source}]\n\n${userMessage}`;
        }
        
        // Show loading state
        const originalText = submitButton.textContent;
        this.setLoadingState(submitButton, true);
        
        // Mark form as submitted for iframe callback
        form.setAttribute('data-submitted', 'true');
        
        // Reset loading state after submission
        setTimeout(() => {
            this.setLoadingState(submitButton, false, originalText);
        }, 2000);
    },
    
    setLoadingState(button, isLoading, originalText = '') {
        button.disabled = isLoading;
        button.innerHTML = isLoading ? '<span class="loading-spinner"></span> Sending...' : originalText;
    },
    
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} show`;
        notification.textContent = message;
        
        const notifications = document.getElementById('notifications');
        notifications.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
};

// Navigation Management
const NavigationManager = {
    init() {
        this.setupMobileNav();
        this.setupSmoothScrolling();
        this.setupScrollAwareHeader();
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
    }
};

// Your existing animation initialization code goes here
// For example:
