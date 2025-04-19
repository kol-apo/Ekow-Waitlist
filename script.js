document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const waitlistForm = document.getElementById('waitlistForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const successMessage = document.getElementById('successMessage');
    
    // Get all CTA buttons (excluding the removed header button)
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    // Add event listeners to all CTA buttons that aren't in the form
    ctaButtons.forEach(button => {
      // Skip the submit button in the form
      if (button.type !== 'submit') {
        button.addEventListener('click', function() {
          // Scroll to the form section
          const waitlistSection = document.querySelector('.waitlist');
          waitlistSection.scrollIntoView({ behavior: 'smooth' });
          
          // Focus on the name input after scrolling
          setTimeout(() => {
            nameInput.focus();
          }, 800);
        });
      }
    });
    
    // Validate email function
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
    
    // Form submit event
    waitlistForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset error messages
      nameError.textContent = '';
      emailError.textContent = '';
      nameInput.classList.remove('error');
      emailInput.classList.remove('error');
      
      // Get input values
      const nameValue = nameInput.value.trim();
      const emailValue = emailInput.value.trim();
      
      // Validate inputs
      let isValid = true;
      
      if (!nameValue) {
        nameError.textContent = 'Please enter your name';
        nameInput.classList.add('error');
        isValid = false;
      }
      
      if (!emailValue) {
        emailError.textContent = 'Please enter your email address';
        emailInput.classList.add('error');
        isValid = false;
      } else if (!validateEmail(emailValue)) {
        emailError.textContent = 'Please enter a valid email address';
        emailInput.classList.add('error');
        isValid = false;
      }
      
      // If valid, submit the form (simulated)
      if (isValid) {
        // In a real implementation, you would send the form data to a server here
        console.log('Form submitted:', { name: nameValue, email: emailValue });
        
        // Hide the form
        waitlistForm.style.display = 'none';
        
        // Show success message
        successMessage.style.display = 'block';
      }
    });
    
    // Add scroll animation for elements
    const animateOnScroll = function() {
      const elements = document.querySelectorAll('.card, .target-card, .form-container');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
    
    // Set initial styles for animation
    const elementsToAnimate = document.querySelectorAll('.card, .target-card, .form-container');
    elementsToAnimate.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
  });
  
  