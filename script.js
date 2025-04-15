// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change hamburger to X when menu is open
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking on a nav link
    const navLinksItems = document.querySelectorAll('.nav-links a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                mobileMenuToggle.click();
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation and submission
    const waitlistForm = document.getElementById('waitlist-form');
    const formMessage = document.getElementById('form-message');

    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                formMessage.textContent = 'Please enter a valid email address';
                formMessage.className = 'form-message error';
                return;
            }
            
            // Simulate form submission
            formMessage.textContent = 'Processing...';
            formMessage.className = 'form-message';
            
            // Mock API call (would be replaced with actual API endpoint)
            setTimeout(() => {
                formMessage.textContent = 'Thank you for joining our waitlist! We\'ll be in touch soon.';
                formMessage.className = 'form-message success';
                waitlistForm.reset();
            }, 1500);
        });
    }

    // Add scroll animation for sections
    const revealElements = document.querySelectorAll('.feature-card, .audience-card');
    
    const revealOnScroll = function() {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].style.opacity = '1';
                revealElements[i].style.transform = 'translateY(0)';
            }
        }
    };

    // Set initial state for animation
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run on load
    revealOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', revealOnScroll);
});